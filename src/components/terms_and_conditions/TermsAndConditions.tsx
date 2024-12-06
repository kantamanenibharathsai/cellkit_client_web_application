import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  Menu,
  Typography,
} from "@mui/material";
import { useStyles } from "./useStyles";
import { translate } from "../../config/i18n";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdOutlineEditNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TermsAndConditionSelectors from "./TermsAndConditionsSelectors";
import { useAppDispatch, useAppSelector } from "../../utils/useRedux";
import CheckIcon from "@mui/icons-material/Check";
import {
  getPlansLegal,
  getTermsAndCondition,
  getTermsAndConditionMaster,
  setProtectionPlan,
  setSelectedItemId,
} from "../../redux/reducers/leagalTextEdit";
import { ToastError } from "../../utils/Validate";

interface IBtnsArr {
  id: number;
  validityMonths: string;
}
interface IState {
  isPlanTypeOpen: boolean;
  btnArr: IBtnsArr[];
  id: null | number;
  text: string;
  plansArr: string[];
}

const TermsAndCondition = () => {
  const [_, setIsPlanTypeOpen] = useState<IState["isPlanTypeOpen"]>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [plansArr] = useState<IState["plansArr"]>([
    "CSafePlan",
    "CSafeExtendedWarranty",
    "Master",
  ]);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, protectionPlan } = useAppSelector(
    (state) => state.leagalTextEdit
  );

  const handleOpenPlanType = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsPlanTypeOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsPlanTypeOpen((prev) => !prev);
    setAnchorEl(null);
  };

  const handleEditBtn = () => {
    navigate("legalTextEdit", {
      state: data,
    });
  };

  const handlePlanSelection = async (plan: string) => {
    if (plan === protectionPlan) {
      dispatch(getPlansLegal({ pages: 1 }));
      dispatch(setProtectionPlan(""));
    } else if (plan === "CSafeExtendedWarranty") {
      dispatch(setProtectionPlan(plan));
      const response = await dispatch(
        getPlansLegal({ pages: 1, planTypeName: "EXTENDED_WARRANTY" })
      );
      const fullfiled = response.payload;
      if (fullfiled.status) {
        fullfiled?.data.length > 0 &&
          dispatch(setSelectedItemId(fullfiled?.data[0].id));
        fullfiled?.data.length > 0 &&
          dispatch(getTermsAndCondition(fullfiled?.data[0].id));
      } else {
        ToastError(fullfiled.message);
      }
    } else if (plan === "CSafePlan") {
      dispatch(setProtectionPlan(plan));
      const response = await dispatch(
        getPlansLegal({ pages: 1, planTypeName: "CSAFE_PROTECTION_PLAN" })
      );
      const fullfiled = response.payload;
      if (fullfiled.status) {
        fullfiled?.data.length > 0 &&
          dispatch(setSelectedItemId(fullfiled?.data[0].id));
        fullfiled?.data.length > 0 &&
          dispatch(getTermsAndCondition(fullfiled?.data[0].id));
      } else {
        ToastError(fullfiled.message);
      }
    } else if (plan === "Master") {
      dispatch(getTermsAndConditionMaster({ type: plan }));
      dispatch(setProtectionPlan(plan));
    }
  };
  const checkTheChecker = (item: string) => {
    return protectionPlan === item;
  };
  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.headingContainer}>
        <Typography variant="h2">
          {translate("tandc.textTerms&Conditions")}
        </Typography>
        <Box className={classes.filterContainer}>
          <Box className={classes.planTypeBtnContainer}>
            <Button
              variant="text"
              className={classes.containerBtn}
              onClick={handleOpenPlanType}
            >
              <Typography className={classes.selectValue}>
                {translate("tandc.textProtectionPlan")}
                <ExpandMoreIcon className={classes.expandMoreIcon} />
              </Typography>
            </Button>
            <Menu
              slotProps={{
                paper: {
                  style: {
                    borderRadius: "18px",
                  },
                },
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              className={classes.planTypeMenu}
            >
              <Box className={classes.planTypeMenuContainer}>
                <Box p={"20px"}>
                  <Typography
                    fontWeight={"700"}
                    fontSize={"1.125rem"}
                    className={classes.planTypeModalHeading}
                  >
                    {translate("tandc.textProtectionPlan")}
                  </Typography>
                  <Box className={classes.planTypeModalOptionsContainer}>
                    <List>
                      {plansArr.map((item) => {
                        return (
                          <ListItem key={item}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name={item}
                                  onChange={(event) => {
                                    handlePlanSelection(event.target.name);
                                  }}
                                  checked={checkTheChecker(item)}
                                  checkedIcon={
                                    <Box className={classes.checkIconContainer}>
                                      <CheckIcon
                                        className={classes.checkIcon}
                                      />
                                    </Box>
                                  }
                                  icon={
                                    <Box className={classes.checkboxIcon} />
                                  }
                                />
                              }
                              label={
                                <Typography className={classes.checkboxLabel}>
                                  {item}
                                </Typography>
                              }
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                </Box>
              </Box>
            </Menu>
          </Box>
          <Box className={classes.exportBtnContainer}>
            <Button
              variant="text"
              className={classes.exportBtn}
              sx={{ textTransform: "capitalize" }}
              onClick={handleEditBtn}
            >
              <MdOutlineEditNote className={classes.fileDownloadIcon} />
              {translate("tandc.textEdit")}
            </Button>
          </Box>
        </Box>
      </Box>
      <TermsAndConditionSelectors />
    </Box>
  );
};

export default TermsAndCondition;
