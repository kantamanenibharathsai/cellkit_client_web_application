import { Box, Typography } from "@mui/material";
import { useStyles } from "./useStyles";
import { colors } from "../../config/theme";
import {
  getPlansLegal,
  getTermsAndCondition,
  setSelectedItemId,
} from "../../redux/reducers/leagalTextEdit";
import { useAppDispatch, useAppSelector } from "../../utils/useRedux";
import { useEffect, useState } from "react";
import { ToastError } from "../../utils/Validate";
import ReactHtmlParser from "react-html-parser";
import useLoadingStates from "../../utils/useLoadingStates";
import CommonLoader from "../../utils/CommonLoader";

interface IBtnsArr {
  id: number;
  validityMonths: string;
}
interface IState {
  btnArr: IBtnsArr[];
  id: null | number;
  text: string;
}

const PAGES = 1;
const SIZE = 3;

const TermsAndConditionSelectors = () => {
  const [, setText] = useState<IState["text"]>("");
  const { data, protectionPlan, btnArr, selectedItemId } = useAppSelector(
    (state) => state.leagalTextEdit
  );
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { anyLoading } = useLoadingStates();
  const handleGetPlanList = async () => {
    const response = await dispatch(getPlansLegal({ pages: PAGES }));
    const fullfiled = response.payload;
    if (fullfiled.status) {
      fullfiled?.data.length > 0 && handleSelectionPlan(fullfiled?.data[0].id);
    } else {
      ToastError(fullfiled.message);
    }
  };
  const returnTerms = () => {
    if (data.termsAndConditions) {
      return ReactHtmlParser(data.termsAndConditions);
    } else if (protectionPlan === "Master") {
      if (Array.isArray(data) && data.length > 0) {
        return ReactHtmlParser(data[0].termsAndConditions);
      }
    } else {
      return ReactHtmlParser("<p>data not available</p>");
    }
  };
  const handleSelectionPlan = async (itemId: number) => {
    dispatch(setSelectedItemId(itemId));
    const response = await dispatch(getTermsAndCondition(itemId));
  };
  useEffect(() => {
    handleGetPlanList();
  }, []);
  return (
    <Box className={classes.selectorMainContainer}>
      {anyLoading ? (
        <CommonLoader />
      ) : (
        <Box className={classes.selectBtnsContainer}>
          {protectionPlan === "Master" ? (
            <Box
              component={"div"}
              sx={{
                backgroundColor: `${colors.primaryGreen}`,

                border: `1px solid ${colors.primaryGreen}`,
              }}
              className={classes.btnCard}
            >
              <Typography
                fontWeight={500}
                className={classes.selectBtnMainText}
                sx={{
                  color: `${colors.white}`,
                }}
              >
                {`Master Plan`}
              </Typography>
            </Box>
          ) : (
            btnArr?.length > 0 &&
            btnArr.map((item) => {
              return (
                <Box
                  component={"div"}
                  onClick={() => handleSelectionPlan(item.id)}
                  sx={{
                    backgroundColor:
                      item.id === selectedItemId
                        ? `${colors.primaryGreen}`
                        : `${colors.white}`,
                    border:
                      item.id === selectedItemId
                        ? `1px solid ${colors.primaryGreen}`
                        : `1px solid ${colors.tertiaryGrey}`,
                  }}
                  className={classes.btnCard}
                  key={item.id}
                >
                  <Typography
                    fontWeight={500}
                    className={classes.selectBtnMainText}
                    sx={{
                      color:
                        item.id === selectedItemId
                          ? `${colors.white}`
                          : `${colors.black}`,
                    }}
                  >
                    {`${item?.validityMonths}  Months Plan`}
                  </Typography>
                </Box>
              );
            })
          )}
        </Box>
      )}
      <Box className={classes.textBox}>{returnTerms()}</Box>
    </Box>
  );
};

export default TermsAndConditionSelectors;
