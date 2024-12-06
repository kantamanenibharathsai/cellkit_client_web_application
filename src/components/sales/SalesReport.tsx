import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, SelectChangeEvent, Typography } from "@mui/material";

import { translate } from "../../config/i18n";
import { useStyles } from "./useStyles";
import CommonTable, {
  ETableNames,
  IData,
  TThreedotsActions,
} from "../common/commonTable/CommonTable";
import CommonSelect from "../common/commonSelect/CommonSelect";
import { ERouteNames, monthsList } from "../../utils/utils";
import CommonWhiteBg from "../common/commonWhiteBg/CommonWhiteBg";
import { useAppDispatch, useAppSelector } from "../../utils/useRedux";
import {
  getSalesReport,
  setmonthSalesReport,
} from "../../redux/reducers/dashBoard";
import { useLocation } from "react-router-dom";
import useLoadingStates from "../../utils/useLoadingStates";
import CommonLoader from "../../utils/CommonLoader";
import CommonPagination from "../common/commonPagination/CommonPagination";
import { formatPath } from "../../utils/formatPath";

interface IProps {
  tableList?: IData[];
  tableTitle?: ETableNames[];
  title?: string;
  handleActions?: (action: TThreedotsActions, id: string) => void;
}

const SalesReport: React.FC<IProps> = (props) => {
  const { tableTitle = [], tableList = [], title } = props;
  const classes = useStyles();
  const location = useLocation();
  const { monthofSalesReport, paginationDashBoard } = useAppSelector(
    (state) => state.dashBoard
  );
  const { salesAPILoading } = useLoadingStates();
  const dispatch = useAppDispatch();
  const handleOnChange = (event: SelectChangeEvent) => {
    dispatch(setmonthSalesReport(event.target.value));
    const index = monthsList.findIndex((each) => each === event.target.value);
    if (formatPath(location.pathname) === ERouteNames.ExtendedWaranty) {
      dispatch(
        getSalesReport({
          planType: "EXTENDED_WARRANTY",
          month: String(index + 1).padStart(2, "0"),
        })
      );
    } else if (formatPath(location.pathname) === ERouteNames.ProtectionPlan) {
      dispatch(
        getSalesReport({
          planType: "CSAFE_PROTECTION_PLAN",
          month: String(index + 1).padStart(2, "0"),
        })
      );
    } else {
      dispatch(getSalesReport({ month: String(index + 1).padStart(2, "0") }));
    }
  };
  const handlePagenation = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const index = monthsList.findIndex((each) => each === monthofSalesReport);
    if (value === paginationDashBoard.currentPage) {
      return;
    } else {
      if (formatPath(location.pathname) === ERouteNames.ExtendedWaranty) {
        if (index !== -1) {
          dispatch(
            getSalesReport({
              planType: "EXTENDED_WARRANTY",
              page: value,
              month: String(index + 1).padStart(2, "0"),
            })
          );
        } else {
          dispatch(
            getSalesReport({
              planType: "EXTENDED_WARRANTY",
              page: value,
            })
          );
        }
      } else if (formatPath(location.pathname) === ERouteNames.ProtectionPlan) {
        if (index !== -1) {
          dispatch(
            getSalesReport({
              planType: "CSAFE_PROTECTION_PLAN",
              page: value,
              month: String(index + 1).padStart(2, "0"),
            })
          );
        } else {
          dispatch(
            getSalesReport({
              planType: "CSAFE_PROTECTION_PLAN",
              page: value,
            })
          );
        }
      } else {
        if (index !== -1) {
          dispatch(
            getSalesReport({
              page: value,
              month: String(index + 1).padStart(2, "0"),
            })
          );
        } else {
          dispatch(
            getSalesReport({
              page: value,
            })
          );
        }
      }
    }
  };
  return (
    <Box className={classes.container}>
      <CommonWhiteBg>
        <Box className={classes.titleCon}>
          <Typography variant="h3">
            {title || translate("home.salesDetails")}
          </Typography>
          <Box className={classes.selectFieldsCon}>
            <CommonSelect
              list={[]}
              value=""
              onChange={() => {}}
              placeholder={translate("home.allPlans")}
            />
            <CommonSelect
              list={monthsList}
              value={monthofSalesReport}
              onChange={handleOnChange}
              placeholder={translate("home.selectMonthText")}
            />
          </Box>
        </Box>
        {salesAPILoading ? (
          <CommonLoader />
        ) : (
          <>
            <CommonTable
              data={tableList}
              titles={tableTitle}
              handleActions={props?.handleActions}
            />
            <CommonPagination
              totalPages={paginationDashBoard.totalPages}
              handlePagination={handlePagenation}
              pageSize={paginationDashBoard.pageSize}
              currentPage={paginationDashBoard.currentPage}
              totalItems={paginationDashBoard.totalItems}
            />
          </>
        )}
      </CommonWhiteBg>
    </Box>
  );
};

export default SalesReport;
