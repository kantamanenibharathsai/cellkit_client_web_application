import React, { useEffect, useState } from "react";
import { style, useStyles } from "./useStyles";
import {
  Box,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import {
  convertFromHTML,
  convertToRaw,
  EditorState,
  ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor, RawDraftContentState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CommonButton from "../common/commonButton/CommonButton";
import toolbar from "./toolbar";
import { translate } from "../../config/i18n";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  putLegalTextsSlice,
  postLegalTextsSlice,
  getPrivacyPolicyById,
  setProtectionPlan,
} from "../../redux/reducers/leagalTextEdit";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastError } from "../../utils/Validate";
import { useAppSelector } from "../../utils/useRedux";
interface IProps {}
interface IState {
  openDrawer: boolean;
  currentTab: number;
  convertedContent: string;
  data: string;
  editoText: string;
  editorState: EditorState;
  editingData: {
    type: any;
    id: number;
    planId: number;
    termsAndConditions: string;
  };
  isEdit: boolean;
  roleId: string | number;
  isPrivacyPolicy: boolean;
}
const LagalTextEditor: React.FC<IProps> = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editingData, setEditingData] = useState<IState["editingData"]>({
    id: 0,
    planId: 0,
    termsAndConditions: "",
    type: "",
  });
  const [_, setContentState] = useState<RawDraftContentState | null | string>(
    null
  );
  const { protectionPlan } = useAppSelector((state) => state.leagalTextEdit);
  const [isPrivacyPolicy, setIsPrivacyPolicy] =
    useState<IState["isPrivacyPolicy"]>(false);
  const [convertedContent, setConvertedContent] =
    useState<IState["convertedContent"]>("");

  const handleContentStateChange = (contentState: RawDraftContentState) => {
    setContentState(draftToHtml(contentState));
  };

  const handleEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setConvertedContent(html);
  };
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const handlePrivacyPublish = async () => {
    await dispatch(
      postLegalTextsSlice({
        content: convertedContent,
        roleId: 1,
        type: protectionPlan,
        isPrivacyPolicy: true,
      })
    );
  };

  const handleGetPrivacy = async () => {
    const response = await dispatch(getPrivacyPolicyById(1));

    if (response.payload.statusCode === "200") {
      const blocksFromHTML = convertFromHTML(
        response?.payload?.data[0]?.privacyPolicy
      );
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
      let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      setConvertedContent(html);
    } else {
      ToastError(response.payload.message);
    }
  };
  const handlePublish = async () => {
    if (isPrivacyPolicy) {
      handlePrivacyPublish();
    } else {
      const editedTerms = await dispatch(
        putLegalTextsSlice({
          id: editingData?.id!,
          termsAndConditions: convertedContent,
          type: editingData?.type,
          ...(editingData?.planId !== null && {
            planId: String(editingData?.planId),
          }),
        })
      );
      if (editedTerms.payload.statusCode === "200") {
        navigate("/dashboard/terms-condition");
      } else {
        ToastError(translate("legal_text_edit.textSomeError"));
      }
    }
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    dispatch(setProtectionPlan(event.target.value as string));
  };

  useEffect(() => {
    const pageName = window.location.pathname;
    if (pageName === "/dashboard/privacy-policy") {
      setIsPrivacyPolicy(true);
      handleGetPrivacy();
    } else {
      setIsPrivacyPolicy(false);
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (Array.isArray(location.state)) {
      setEditingData(location.state[0]);
    } else {
      setEditingData(location.state);
    }
  }, [location.state?.termsAndConditions]);

  const startEditing = () => {
    if (editingData) {
      const blocksFromHTML = convertFromHTML(editingData?.termsAndConditions);

      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
      let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      setConvertedContent(html);
    }
  };

  return (
    <Box className={classes.mainContainer}>
      <Typography variant="h3">
        {translate("legal_text_edit.textSettings")}
      </Typography>
      <Paper className={classes.paperContainer}>
        <Box className={classes.btnContainer}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={protectionPlan}
            onChange={handleTypeChange}
            className={classes.select}
            placeholder="Select Type"
          >
            <MenuItem value={"CSafePlan"}>
              {translate("legal_text_edit.textCsafeplan")}
            </MenuItem>
            <MenuItem value={"CSafeExtendedWarranty"}>
              {translate("legal_text_edit.textCSafeExtendedWarranty")}
            </MenuItem>
            <MenuItem value={"Master"}>
              {translate("legal_text_edit.textMaster")}
            </MenuItem>
          </Select>
          <CommonButton
            title={translate("legal_text_edit.textEdit")}
            styles={style.button}
            onClick={startEditing}
          />
        </Box>
        <Box className={classes.editContainer}>
          <Editor
            editorState={editorState}
            toolbarClassName={classes.toolbar}
            wrapperClassName="editor-wrapper"
            editorClassName="editor"
            onEditorStateChange={handleEditorStateChange}
            onContentStateChange={handleContentStateChange}
            toolbar={toolbar}
            spellCheck
            placeholder={
              window.location.pathname === "/dashboard/privacy-policy"
                ? translate("legal_text_edit.placeholderNote")
                : translate("legal_text_edit.placeholderEditNote")
            }
          />
        </Box>
        <Box className={classes.btnContainer}>
          {/*<CommonButton title={translate("legal_text_edit.textSave")} styles={style.saveButton} /> // this button is in design but for now there is no use*/}
          <CommonButton
            title={translate("legal_text_edit.textPublish")}
            styles={style.button}
            onClick={handlePublish}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default LagalTextEditor;
