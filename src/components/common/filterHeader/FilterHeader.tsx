import React, { useEffect, useRef, useState } from "react";
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FiDownload } from "react-icons/fi";
import DatePicker from "react-multi-date-picker";
import { translate } from "../../../config/i18n";
import { useLocation, useNavigate } from "react-router-dom";
import { ERouteNames } from "../../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import Storage from "../../../utils/Storage";
import {
  getBirthdayReport,
  getCerficateExportReport,
  getExpiryReport,
  setReportsType,
  setDateRange,
  getPlans,
  getPaymentReport,
  getCustomReport,
  getCerticateReport,
  exportReportBirthdayExpiry,
  exportCustomReport,
  exportExcelReport,
  couponExportReport,
} from "../../../redux/reducers/reports";
import CheckIcon from "@mui/icons-material/Check";
import { setNotificationTypeReducer } from "../../../redux/reducers/notifications";
import { formatPath } from "../../../utils/formatPath";
interface IProps {}
interface IState {
  dates: any[];
  isPlanTypeOpen: boolean;
}

const FilterHeader: React.FC<IProps> = () => {
  const [isPlanTypeOpen, setIsPlanTypeOpen] =
    useState<IState["isPlanTypeOpen"]>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = React.useState<string>("month");
  const today = new Date();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { notificationType } = useAppSelector((state) => state.notifications);
  const [dates, setDates] = useState<IState["dates"]>([today]);
  const open = Boolean(anchorEl);

  const { plans, reportType } = useAppSelector((state) => state.reports);

  const checkPathAndReturnOptions = () => {
    if (
      formatPath(location.pathname) === ERouteNames.PostPurchase ||
      formatPath(location.pathname) === ERouteNames.AllNotifications ||
      formatPath(location.pathname) === ERouteNames.BirthdayNotifications ||
      formatPath(location.pathname) === ERouteNames.ExpireNotifications ||
      formatPath(location.pathname) === ERouteNames.TemplateManagement
    ) {
      return [
        "all-notifications",
        "post-purchase",
        "expire-notifications",
        "birthday-notifications",
      ];
    } else if (formatPath(location.pathname) === ERouteNames.BirthdayReport) {
      return ["Today's Birthday", "This Weeks", "This Month's", "Date Range"];
    } else if (formatPath(location.pathname) === ERouteNames.ExpiryReport) {
      return [
        "Expiring Today",
        "Expiring This Week",
        "Expiring This Month",
        "Date Range",
      ];
    } else {
      return plans;
    }
  };
  const certificateReportsFilterOptions = checkPathAndReturnOptions();
  const [timeframe, setSlectedTimeFrame] = useState<string>("month");
  const expiryAndBirthdayReportTypes = [
    formatPath(location.pathname) === ERouteNames.BirthdayReport
      ? "Today's BirthDays"
      : "Expiring Today",
    "This week",
    "This Month",
    "Date Range",
  ];
  const notificationTypes = [
    "All Notifications",
    "Post Purchase",
    "Expiry Notifications",
    "Birthday",
  ];
  const handleOpenPlanType = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsPlanTypeOpen((prev) => !prev);
  };
  const filterPlanType = () => {
    if (
      formatPath(location.pathname) === ERouteNames.PostPurchase ||
      formatPath(location.pathname) === ERouteNames.AllNotifications ||
      formatPath(location.pathname) === ERouteNames.BirthdayNotifications ||
      formatPath(location.pathname) === ERouteNames.ExpireNotifications ||
      formatPath(location.pathname) === ERouteNames.TemplateManagement
    ) {
      const matchingReports = notificationTypes.filter((each) =>
        notificationType.toLowerCase().includes(each.toLowerCase())
      );

      return matchingReports.length > 0
        ? matchingReports[0]
        : translate("FilterHeader.textAllNotifications");
    } else if (formatPath(location.pathname) === ERouteNames.BirthdayReport) {
      const matchingReports = expiryAndBirthdayReportTypes.filter((each) =>
        selectedOption.toLowerCase().includes(each.toLowerCase())
      );

      return matchingReports.length > 0
        ? matchingReports[0]
        : translate("FilterHeader.textThisMonthBirthdays");
    } else if (formatPath(location.pathname) === ERouteNames.ExpiryReport) {
      const matchingReports = expiryAndBirthdayReportTypes.filter((each) =>
        selectedOption.toLowerCase().includes(each.toLowerCase())
      );

      return matchingReports.length > 0
        ? matchingReports[0]
        : translate("FilterHeader.textExpiringToday");
    } else {
      if (plans.includes(reportType)) {
        return reportType;
      } else {
        return translate("FilterHeader.textPlanType");
      }
    }
  };

  const filterHeader = () => {
    if (formatPath(location.pathname) === ERouteNames.PostPurchase) {
      return translate("FilterHeader.textSelectNotificationsType");
    } else {
      return translate("FilterHeader.textSelectPlanType");
    }
  };
  const handleClose = () => {
    setIsPlanTypeOpen((prev) => !prev);
    setAnchorEl(null);
  };

  const navigateAcrossfilters = (data: { path: string; name: string }) => {
    dispatch(setNotificationTypeReducer(data.name));
    navigate(`/dashboard/${data.path}`);
  };
  const birthdayReportchange = (type: string) => {
    if (selectedOption === "This Month's" && type === "This Month's") {
      setSelectedOption("This Month's");
      return;
    }
    if (selectedOption === type) {
      dispatch(setReportsType("month"));
      setSelectedOption("This Month's");
      dispatch(getBirthdayReport({ type: "month" }));
      return;
    }
    setSelectedOption(type);
    dispatch(setReportsType(type));
    if (type.toLowerCase().includes("today")) {
      setDates([]);
      dispatch(getBirthdayReport({ type: "today" }));
      dispatch(setReportsType("today"));
    } else if (type.toLowerCase().includes("week")) {
      setDates([]);
      dispatch(getBirthdayReport({ type: "week" }));
      dispatch(setReportsType("week"));
    } else if (type.includes("Date Range")) {
      setIsPlanTypeOpen((prev) => !prev);
      setAnchorEl(null);
      datePickerRef.current !== null &&
        datePickerRef.current &&
        datePickerRef.current.openCalendar();
      dispatch(setReportsType("date_range"));
    } else {
      setDates([]);
      dispatch(getBirthdayReport({ type: "month" }));
      dispatch(setReportsType("month"));
    }
  };

  const datePickerRef = useRef<any>(null);
  const formatDate = (dateObj: any) => {
    const date = dateObj.toDate();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleDateChange = (newDates: any[]) => {
    const validDates = newDates
      .slice(0, 2)
      .sort((a, b) => a.toDate().getTime() - b.toDate().getTime())
      .map((dateObj) => formatDate(dateObj));
    setDates(validDates);
    dispatch(setDateRange(validDates));
  };

  const handleFilterOptionSelection = (option: string) => {
    if (
      formatPath(location.pathname) === ERouteNames.PostPurchase ||
      formatPath(location.pathname) === ERouteNames.AllNotifications ||
      formatPath(location.pathname) === ERouteNames.BirthdayNotifications ||
      formatPath(location.pathname) === ERouteNames.ExpireNotifications ||
      formatPath(location.pathname) === ERouteNames.TemplateManagement
    ) {
      const paths = [
        "all-notifications",
        "post-purchase",
        "expire-notifications",
        "birthday-notifications",
      ];

      const indx = paths.indexOf(option);
      dispatch(setNotificationTypeReducer(option));
      navigateAcrossfilters({ path: option, name: notificationTypes[indx] });
      setSelectedOption(option);
      setIsPlanTypeOpen((prev) => !prev);
      setAnchorEl(null);
      return;
    } else if (formatPath(location.pathname) === ERouteNames.BirthdayReport) {
      setSelectedOption(option);
      birthdayReportchange(option);
    } else if (formatPath(location.pathname) === ERouteNames.ExpiryReport) {
      setSelectedOption(option);
      expiryReportsChange(option);
    } else {
      setSelectedOption(option);
      planChangeApiCalls(option);
    }
    setIsPlanTypeOpen((prev) => !prev);
    setAnchorEl(null);
  };
  const planChangeApiCalls = (option: string) => {
    switch (formatPath(location.pathname)) {
      case ERouteNames.AllNotifications: {
        return;
      }
      case ERouteNames.ExpireNotifications: {
        return;
      }
      case ERouteNames.TemplateManagement: {
        return;
      }
      case ERouteNames.BirthdayNotifications: {
        return;
      }
      case ERouteNames.PostPurchase: {
        return;
      }

      case ERouteNames.BirthdayOffer: {
        return;
      }

      case ERouteNames.PaymentReport: {
        if (reportType === option) {
          dispatch(setReportsType(""));
          dispatch(getPaymentReport({}));
        } else {
          dispatch(setReportsType(option));
          dispatch(getPaymentReport({ planType: option }));
        }
        return;
      }
      case ERouteNames.CustomReport: {
        if (reportType === option) {
          dispatch(setReportsType(""));
          dispatch(getCustomReport({}));
        } else {
          dispatch(setReportsType(option));
          dispatch(getCustomReport({ planType: option }));
        }
        return;
      }
      case ERouteNames.ProductsManagement: {
        return;
      }
      case ERouteNames.CouponManagement: {
        return;
      }
      case ERouteNames.Banners: {
        return;
      }
      case ERouteNames.RewardsManagement: {
        return;
      }
      case ERouteNames.CertificateReport: {
        if (reportType === option) {
          dispatch(setReportsType(""));
          dispatch(
            getCerticateReport({ pages: 1, direction: "ASC", size: 10 })
          );
        } else {
          dispatch(setReportsType(option));
          dispatch(
            getCerticateReport({
              direction: "ASC",
              pages: 1,
              planType: option,
              size: 10,
            })
          );
        }
        return;
      }
      default: {
        return;
      }
    }
  };

  const expiryReportsChange = (type: string) => {
    if (
      selectedOption === "Expiring This Month" &&
      type === "Expiring This Month"
    ) {
      setSelectedOption("Expiring This Month");
      return;
    }
    if (selectedOption === type) {
      dispatch(setReportsType("month"));
      setSelectedOption("Expiring This Month");
      dispatch(getExpiryReport({ type: "month" }));
      return;
    }
    setSelectedOption(type);

    if (type.toLowerCase().includes("today")) {
      setDates([]);
      dispatch(getExpiryReport({ type: "today" }));
      dispatch(setReportsType("today"));
    } else if (type.toLowerCase().includes("week")) {
      setDates([]);
      dispatch(getExpiryReport({ type: "week" }));
      dispatch(setReportsType("week"));
    } else if (type.includes("Date Range")) {
      setIsPlanTypeOpen((prev) => !prev);
      setAnchorEl(null);
      datePickerRef.current !== null &&
        datePickerRef.current &&
        datePickerRef.current.openCalendar();
      dispatch(setReportsType("date_range"));
    } else {
      setDates([]);
      dispatch(getExpiryReport({ type: "month" }));
      dispatch(setReportsType("month"));
    }
  };

  useEffect(() => {
    dispatch(getPlans());
  }, []);

  const classes = useStyles();

  const handleExportButton = async () => {
    const token = Storage.get("token");
    switch (formatPath(location.pathname)) {
      case ERouteNames.CertificateReport:
        {
          const res = await dispatch(
            getCerficateExportReport({ size: 10, ASC: "ASC", page: 10 })
          );
          const file = `${res.payload?.data}/${token}`;
          window.location.href = file;
        }
        break;
      case ERouteNames.BirthdayReport:
        {
          const res = await dispatch(exportReportBirthdayExpiry("birthday"));
          if (res.payload?.data) {
            const file = `${res.payload?.data}/${token}`;
            window.location.href = file;
          }
        }
        break;
      case ERouteNames.CustomReport:
        {
          const res = await dispatch(exportCustomReport());
          const file = `${res.payload?.data}/${token}`;
          window.location.href = file;
        }
        break;
      case ERouteNames.ExpiryReport:
        {
          const res = await dispatch(
            exportReportBirthdayExpiry("expiryreport")
          );
          if (res.payload?.data) {
            const file = `${res.payload?.data}/${token}`;
            window.location.href = file;
          }
        }
        break;
      case ERouteNames.PaymentReport:
        break;
      case ERouteNames.ProductsManagement:
        {
          const res = await dispatch(exportExcelReport("PRODUCTS"));
          const file = `${res.payload?.data}/${token}`;
          window.location.href = file;
        }
        break;
      case ERouteNames.Banners:
        {
          const res = await dispatch(exportExcelReport("BANNERS"));
          const file = `${res.payload?.data}/${token}`;
          window.location.href = file;
        }
        break;
      case ERouteNames.BirthdayOffer:
        {
          const res = await dispatch(couponExportReport("birthdaycoupon"));
          const file = `${res.payload?.data}/${token}`;
          window.location.href = file;
        }

        break;
      case ERouteNames.CouponManagement:
        {
          const res = await dispatch(couponExportReport("coupon"));
          const file = `${res.payload?.data}/${token}`;
          window.location.href = file;
        }
        break;
      case ERouteNames.AllNotifications:
      case ERouteNames.PostPurchase:
      case ERouteNames.ExpireNotifications:
      case ERouteNames.BirthdayNotifications:
      case ERouteNames.TemplateManagement:
        {
          const res = await dispatch(exportExcelReport("NOTIFICATIONS"));
          const file = `${res.payload?.data}/${token}`;
          window.location.href = file;
        }
        break;
    }
  };
  const checkTheChecker = (item: any) => {
    if (
      formatPath(location.pathname) === ERouteNames.CertificateReport ||
      formatPath(location.pathname) === ERouteNames.CustomReport ||
      formatPath(location.pathname) === ERouteNames.PaymentReport
    ) {
      return item === reportType;
    } else {
      return item.toLowerCase().includes(selectedOption.toLowerCase());
    }
  };
  const applyDates = () => {
    if (
      dates.length === 2 &&
      selectedOption.includes("Date Range") &&
      formatPath(location.pathname) === ERouteNames.BirthdayReport
    ) {
      dispatch(getBirthdayReport({ type: "date_range", dateRange: dates }));
    } else if (
      dates.length === 2 &&
      selectedOption.includes("Date Range") &&
      formatPath(location.pathname) === ERouteNames.ExpiryReport
    ) {
      dispatch(getExpiryReport({ type: "date_range", dateRange: dates }));
    }
    datePickerRef.current !== null &&
      datePickerRef.current &&
      datePickerRef.current.closeCalendar();
  };
  const showFilter = () => {
    if (
      formatPath(location.pathname) === ERouteNames.ProductsManagement ||
      formatPath(location.pathname) === ERouteNames.Banners ||
      formatPath(location.pathname) === ERouteNames.RewardsManagement ||
      formatPath(location.pathname) === ERouteNames.BirthdayOffer ||
      formatPath(location.pathname) === ERouteNames.CouponManagement
    ) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.filterContainer}>
        {showFilter() && (
          <>
            <Box className={classes.dateBtnContainer}>
              <Button
                variant="text"
                className={classes.containerBtn}
                onClick={() =>
                  datePickerRef.current !== null &&
                  datePickerRef.current &&
                  datePickerRef.current.openCalendar()
                }
              >
                <Typography className={classes.selectValue}>
                  {translate("FilterHeader.textDate")}
                  <ExpandMoreIcon className={classes.expandMoreIcon} />
                </Typography>
              </Button>
              <DatePicker
                multiple
                fixRelativePosition
                calendarPosition="bottom-center"
                style={{ display: "none" }}
                ref={datePickerRef}
                value={dates}
                onChange={handleDateChange}
              >
                <Box className={classes.dateNoteAndBtnContainer}>
                  <Typography className={classes.dateCalendarNote}>
                    {translate("FilterHeader.dateCalendarNote")}
                  </Typography>
                  <Button
                    className={classes.dateApplyBtn}
                    sx={{ textTransform: "capitalize", marginLeft: "12px" }}
                    onClick={applyDates}
                  >
                    {translate("FilterHeader.textApplyNow")}
                  </Button>
                </Box>
              </DatePicker>
            </Box>
            <Box className={classes.planTypeBtnContainer}>
              <Button
                variant="text"
                className={classes.containerBtn}
                onClick={handleOpenPlanType}
              >
                <Typography className={classes.selectValueNotifications}>
                  {filterPlanType()}
                  <ExpandMoreIcon className={classes.expandMoreIcon} />
                </Typography>
              </Button>
            </Box>
          </>
        )}
        <Box className={classes.exportBtnContainer}>
          <Button
            variant="text"
            className={classes.exportBtn}
            sx={{ textTransform: "capitalize" }}
            onClick={handleExportButton}
          >
            <FiDownload className={classes.fileDownloadIcon} />
            {translate("FilterHeader.textExport")}
          </Button>
        </Box>
      </Box>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={classes.planTypeMenu}
        slotProps={{
          paper: { className: classes.paperOne },
        }}
      >
        <List>
          {certificateReportsFilterOptions.map((item) => {
            return (
              <ListItem key={item}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={item}
                      onChange={(event) => {
                        handleFilterOptionSelection(event.target.name);
                      }}
                      checked={checkTheChecker(item)}
                      checkedIcon={
                        <Box className={classes.checkIconContainer}>
                          <CheckIcon className={classes.checkIcon} />
                        </Box>
                      }
                      icon={<Box className={classes.checkboxIcon} />}
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
      </Menu>
    </Box>
  );
};

export default FilterHeader;
