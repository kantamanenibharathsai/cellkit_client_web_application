import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ActivePlansIcon,
  ExpiredPlanIcon,
  GroupIcon,
  RevenueIcon,
} from "./assets/Svgs";
import { style, useStyles } from "./useStyles";
import { translate } from "../../config/i18n";
import { Box, Button, Typography } from "@mui/material";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import AddIcon from "@mui/icons-material/Add";
import RevenueGraph from "../common/revenueGraph/RevenueGraph";
import {
  salesData,
  ERouteNames,
  plansAndWarrentyData,
} from "../../utils/utils";
import SalesReport from "../sales/SalesReport";
import {
  ETableNames,
  IData,
  TThreedotsActions,
} from "../common/commonTable/CommonTable";
import CommonWhiteBg from "../common/commonWhiteBg/CommonWhiteBg";
import { useAppDispatch, useAppSelector } from "../../utils/useRedux";
import {
  getDashBoardData,
  getDashBoardStatistics,
  getSalesReport,
  setmonthGraph,
  setmonthSalesReport,
  uploadFileDashboard,
} from "../../redux/reducers/dashBoard";
import { getProfileData } from "../../redux/reducers/reports";
import useLoadingStates from "../../utils/useLoadingStates";
import CommonLoader from "../../utils/CommonLoader";
import { formatPath } from "../../utils/formatPath";
import { ensureDecimal } from "../../utils/ensureDecimal";
import { ToastError, ToastSuccess } from "../../utils/Validate";

interface IProps {}
interface IState {
  isProfileOpen: boolean;
  profileData: {
    "User ID": number;
    "User Name": string;
  };
}
const ProtectionPlanTitles = [
  ETableNames.PlanType,
  ETableNames.UserID,
  ETableNames.RegistrationDate,
  ETableNames.PlanEndDate,
  ETableNames.Status,
  ETableNames.Actions,
];
const ExtendedWarentyTitles = [
  ETableNames.UserID,
  ETableNames.RegistrationDate,
  ETableNames.PlanEndDate,
  ETableNames.Status,
  ETableNames.Actions,
];
const SalesTitles = [
  ETableNames.CustomerName,
  ETableNames.IMEI,
  ETableNames.DateTime,
  ETableNames.Price,
  ETableNames.ProtectionPlan,
  ETableNames.PlanStatus,
];

const Home: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const { dashBoardData, salesReport } = useAppSelector(
    (state) => state.dashBoard
  );
  const { anyLoading, dashboardLoading, graphApiLoading, salesAPILoading } =
    useLoadingStates();
  const plansList = useMemo(() => {
    return [
      {
        id: 1,
        name: translate("home.totalUsersHeading"),
        count: dashBoardData?.totalUsers
          ? dashBoardData?.totalUsers
          : dashBoardData?.totalUsers === 0
          ? dashBoardData?.totalUsers
          : translate("home.totalUserCount"),
        description: translate("home.totalUserDescription"),
        Icon: GroupIcon,
        isDipping:
          dashBoardData?.previousMonthUsers! < dashBoardData?.thisMonthUsers!
            ? false
            : true,
        value: dashBoardData.usersChangePercentage
          ? dashBoardData.usersChangePercentage
          : dashBoardData.usersChangePercentage === 0
          ? dashBoardData.usersChangePercentage
          : 8.5,
        background: "violate",
      },
      {
        id: 2,
        name: translate("home.revenueHeading"),
        count: dashBoardData.totalRevenue
          ? dashBoardData.thisMonthRevenue
          : dashBoardData.totalRevenue === 0
          ? dashBoardData.totalRevenue
          : translate("home.revenueCount"),
        description: translate("home.revenueDescription"),
        Icon: RevenueIcon,
        isDipping:
          dashBoardData.previousMonthRevenue! < dashBoardData.thisMonthRevenue!
            ? false
            : true,
        value: dashBoardData.revenueChangePercentage
          ? dashBoardData.revenueChangePercentage
          : dashBoardData.revenueChangePercentage === 0
          ? dashBoardData.revenueChangePercentage
          : 4.3,
        background: "green",
      },
      {
        id: 3,
        name: translate("home.activePlansHeading"),
        count: dashBoardData.totalActivePlans
          ? dashBoardData.totalActivePlans
          : dashBoardData.totalActivePlans === 0
          ? dashBoardData.totalActivePlans
          : translate("home.activePlansCount"),
        description: translate("home.activePlansDescription"),
        Icon: ActivePlansIcon,
        isDipping:
          dashBoardData.thisMonthActivePlans! >
          dashBoardData.previousMonthActivePlans!
            ? false
            : true,
        background: "yellow",
        value: dashBoardData.activePlansChangePercentage
          ? dashBoardData.activePlansChangePercentage
          : dashBoardData.activePlansChangePercentage === 0
          ? dashBoardData.activePlansChangePercentage
          : 1.3,
      },
      {
        id: 4,
        name: translate("home.expiredPlanHeading"),
        count: dashBoardData.totalExpirePlans
          ? dashBoardData.totalExpirePlans
          : dashBoardData.totalExpirePlans === 0
          ? dashBoardData.totalExpirePlans
          : translate("home.expiredPlanCount"),
        description: translate("home.expiredPlanDescription"),
        Icon: ExpiredPlanIcon,
        isDipping:
          dashBoardData.previousMonthExpirePlans! >
          dashBoardData.thisMonthExpirePlans!
            ? true
            : false,
        background: "red",
        value: dashBoardData.expirePlansChangePercentage
          ? dashBoardData.expirePlansChangePercentage
          : dashBoardData.expirePlansChangePercentage === 0
          ? dashBoardData.expirePlansChangePercentage
          : 1.8,
      },
    ];
  }, [dashBoardData]);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }
    const year: number = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, "0");
    const day: string = String(date.getDate()).padStart(2, "0");
    let hours: number = date.getHours();
    const minutes: string = String(date.getMinutes()).padStart(2, "0");
    const ampm: string = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${year}-${month}-${day} ${String(hours).padStart(
      2,
      "0"
    )}:${minutes} ${ampm}`;
  };

  const showSalesReport = () => {
    return salesReport.map((each) => ({
      ID: String(each.userId ?? "-"),
      "User ID": String(each.userId ?? "-"),
      "Plan Type": each.planName ?? "-",
      "Registration Date": each.createdDate ?? "-",
      "Plan End Date": each.planExipiryDate ?? "-",
      Status: each.planStatus ?? "-",
      id: String(each.userId ?? "-"),
      "Customer Name": each.customerName ?? "-",
      IMEI: String(each.imeiNumber ?? "-"),
      "Date-Time": formatDate(each.dateTime) ?? "-",
      Price: each.price ? ensureDecimal(each.price) : "-",
      "Protection Plan": each.protectionPlan ?? "-",
      "Plan Status": each.planStatus ?? "-",
      image: "",
    }));
  };

  const getDataBasedOnPath = useMemo(() => {
    const object: {
      graphTitle: string;
      tableTtile: string;
      titles: ETableNames[];
      data: IData[];
    } = Object.create({});

    switch (formatPath(location.pathname)) {
      case ERouteNames.ProtectionPlan: {
        object.graphTitle = "Protection Plan";
        object.tableTtile = "Plan Details ";
        object.titles = ProtectionPlanTitles;
        object.data = showSalesReport();
        dispatch(setmonthGraph(""));
        break;
      }
      case ERouteNames.ExtendedWaranty: {
        object.graphTitle = "Extended Warranty";
        object.tableTtile = "Warranty Details ";
        object.titles = ExtendedWarentyTitles;
        object.data = showSalesReport();
        dispatch(setmonthGraph(""));
        break;
      }
      case ERouteNames.Sales: {
        object.graphTitle = "Sale";
        object.tableTtile = "Top Selling ";
        object.titles = SalesTitles;
        object.data = salesData;
        dispatch(setmonthGraph(""));
        break;
      }
      default: {
        object.graphTitle = "Statistics";
        object.tableTtile = "Sale Details";
        object.titles = SalesTitles;
        object.data = showSalesReport();
        dispatch(setmonthGraph(""));
      }
    }
    return object;
  }, [location, salesReport]);

  const handleActions = async (actionType: TThreedotsActions, id: string) => {
    alert(JSON.stringify({ id, actionType }));
  };

  const renderPlanCards = useCallback(() => {
    return plansList.map(({ Icon, ...plan }) =>
      dashboardLoading ? (
        <CommonLoader />
      ) : (
        <Box key={plan.id} className={classes.planCard}>
          <Box className={classes.planCardNameIconCon}>
            <Box className={classes.planCardNameCountCon}>
              <Typography>{plan.name}</Typography>
              <Typography variant="h1" sx={style.statisticNumber}>
                {plan.count}
              </Typography>
            </Box>
            <Box className={`iconCon ${plan.background}`}>
              <Icon />
            </Box>
          </Box>
          <Box className={classes.dippingCon}>
            {plan.isDipping && <IoMdTrendingDown className="fall" />}
            {!plan.isDipping && <IoMdTrendingUp className="raise" />}
            <Typography>
              <Box
                component={"span"}
                className={plan.isDipping ? "fall" : "raise"}
              >{`${plan.value}${translate(
                "home.percentageSymbal"
              )} `}</Box>{" "}
              {plan.description}
            </Typography>
          </Box>
        </Box>
      )
    );
  }, [classes.planCard, dashBoardData]);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        selectedFile.type === "application/vnd.ms-excel"
      ) {
        setFile(selectedFile);
        const response = await dispatch(uploadFileDashboard(selectedFile));
        if (response.payload?.status) {
          ToastSuccess(response.payload.message);
        } else {
          ToastError(response.payload?.message);
        }
      } else {
        alert("Please select a valid Excel file (.xls, .xlsx)");
      }
    }
  };
  useEffect(() => {
    if (formatPath(location.pathname) === ERouteNames.ExtendedWaranty) {
      dispatch(getSalesReport({ planType: "EXTENDED_WARRANTY" }));
      dispatch(
        getDashBoardStatistics({
          planType: "EXTENDED_WARRANTY",
        })
      );
    } else if (formatPath(location.pathname) === ERouteNames.ProtectionPlan) {
      dispatch(
        getSalesReport({
          planType: "CSAFE_PROTECTION_PLAN",
        })
      );
      dispatch(
        getDashBoardStatistics({
          planType: "CSAFE_PROTECTION_PLAN",
        })
      );
    } else {
      dispatch(getSalesReport({}));
      dispatch(getDashBoardData());
      dispatch(getDashBoardStatistics({}));
    }
  }, [location]);

  const checkAllLoading = () => {
    if (dashboardLoading && graphApiLoading && salesAPILoading) {
      return true;
    }
  };
  return (
    <Box className={classes.container}>
      <Box className={classes.titleAndBtnContainer}>
        <Typography variant="h2">{translate("home.dashboardText")}</Typography>
        <Button
          sx={style.addNewButton}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Typography className={classes.addBtnText}>
            {translate("Reports.textAddNew")}
          </Typography>
          <AddIcon sx={style.addIcon} />
        </Button>
      </Box>
      {checkAllLoading() ? (
        <CommonLoader />
      ) : (
        <>
          <Box className={classes.planCardsCon}>{renderPlanCards()}</Box>
          <CommonWhiteBg>
            <RevenueGraph title={getDataBasedOnPath.graphTitle} />
          </CommonWhiteBg>

          <SalesReport
            title={getDataBasedOnPath.tableTtile}
            tableList={
              `/${formatPath(location.pathname)}` === ERouteNames.Dashboard
                ? showSalesReport()
                : getDataBasedOnPath.data
            }
            tableTitle={getDataBasedOnPath.titles}
            handleActions={handleActions}
          />
        </>
      )}
    </Box>
  );
};

export default Home;
