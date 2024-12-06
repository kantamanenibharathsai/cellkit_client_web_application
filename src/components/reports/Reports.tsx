import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { style, useStyles } from "./useStyles";
import CommonTable, {
  ETableNames,
  IData,
} from "../common/commonTable/CommonTable";
import { Box, Button, TextField, Typography } from "@mui/material";
import CommonWhiteBg from "../common/commonWhiteBg/CommonWhiteBg";
import { ERouteNames } from "../../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import CommonPagination from "../common/commonPagination/CommonPagination";
import QuickProfileDetails from "../common/quickProfileDetails/QuickProfileDetails";
import FilterHeader from "../common/filterHeader/FilterHeader";
import { useAppDispatch, useAppSelector } from "../../utils/useRedux";
import {
  createNewProductUploadFile,
  getProducts,
  ProductsReducer,
} from "../../redux/reducers/products";
import Storage from "../../utils/Storage";
import {
  CouponData,
  getCoupons,
  getCouponWithId,
  setIsEdit,
} from "../../redux/reducers/couponManagement";
import { BannerData, getBaners } from "../../redux/reducers/banners";
import PaymentReports from "../paymentReport/PaymentReports";
import RevenueGraph from "../common/revenueGraph/RevenueGraph";
import { colors, theme } from "../../config/theme";
import {
  getAllNotifications,
  getNotifications,
  NotificationData,
  setCurrentNotifications,
  setEditNotification,
} from "../../redux/reducers/notifications";
import {
  getBirthdayReport,
  getCustomReport,
  getExpiryReport,
  getPaymentReport,
  getPieChartData,
  getCerticateReport,
  getProfileData,
  ReportReducer,
  setReportsType,
} from "../../redux/reducers/reports";
import { translate } from "../../config/i18n";
import AddIcon from "@mui/icons-material/Add";
import useLoadingStates from "../../utils/useLoadingStates";
import CommonLoader from "../../utils/CommonLoader";
import {
  getDashBoardStatistics,
  setmonthGraph,
} from "../../redux/reducers/dashBoard";
import { ToastError, ToastSuccess } from "../../utils/Validate";
import { formatPath } from "../../utils/formatPath";
import { ensureDecimal } from "../../utils/ensureDecimal";
const certificateReportTitles = [
  ETableNames.CertificateID,
  ETableNames.UserID,
  ETableNames.UserName,
  ETableNames.IssueDate,
  ETableNames.ExpiredDate,
  ETableNames.Actions,
];

const birthdayReportsTitles = [
  ETableNames.UserName,
  ETableNames.Location,
  ETableNames.PlanDetails,
  ETableNames.PlanValue,
  ETableNames.Actions,
];
const birthdayCouponTitles = [
  ETableNames.CouponCode,
  ETableNames.DiscountValue,
  ETableNames.ValidityPeriod,
  ETableNames.ExpiredPeriod,
  ETableNames.MaxUsageUser,
  ETableNames.Actions,
];

const expiryRoportTitles = [
  ETableNames.UserName,
  ETableNames.UserID,
  ETableNames.PlanDetails,
  ETableNames.ExpirationDate,
  ETableNames.Status,
  ETableNames.Actions,
];

const paymentReportsTitles = [
  ETableNames.TransactionID,
  ETableNames.UserID,
  ETableNames.FullName,
  ETableNames.Amount,
  ETableNames.PaymentMethod,
  ETableNames.Actions,
];

const customReportTitles = [
  ETableNames.MobileName,
  ETableNames.PlanName,
  ETableNames.PlanValue,
  ETableNames.StartDate,
  ETableNames.EndDate,
  ETableNames.Actions,
];
const ProductsReportTitles = [
  ETableNames.Brand,
  // ETableNames.BannerImage,
  ETableNames.ProductName,
  ETableNames.ItemCode,
  ETableNames.Item,
  ETableNames.MRP,
  ETableNames.Sellingprice,
];
const CouponManagementReportTitles = [
  ETableNames.CouponCode,
  ETableNames.DiscountValue,
  ETableNames.ValidityPeriod,
  ETableNames.ExpiredPeriod,
  ETableNames.MaxUsageUser,
  ETableNames.Actions,
];
const BannersReportTitles = [
  ETableNames.BannerImage,
  ETableNames.StartDate,
  ETableNames.EndDate,
  ETableNames.Target,
  ETableNames.Status,
  ETableNames.Actions,
];
const RewardsReportTitles = [
  ETableNames.UserID,
  ETableNames.UserName,
  ETableNames.TotalPoints,
  ETableNames.Actions,
];
const ManageNotificationsTitles = [
  ETableNames.Trigger,
  ETableNames.Delivery,
  ETableNames.CreatedBy,
  ETableNames.LastModified,
  ETableNames.Actions,
];
const AllNotificationsTitles = [
  ETableNames.Title,
  ETableNames.Trigger,
  ETableNames.Delivery,
  ETableNames.Status,
  ETableNames.Actions,
];

const certificateReportData: IData[] = [
  {
    "Certificate ID": "C1001",
    "User ID": "U1001",
    "User Name": "John Doe",
    image: "",
    id: "1",
    "Issue Date": "2024-01-15",
    "Expired Date": "2024-06-15",
  },
];

const birthdayData: IData[] = [
  {
    "Graphic Preview": "",
    "Message Preview": "Happy Birthday! Enjoy...",
    "Display Period": "2024-01-30",
    "Expired Period": "2025-01-30",
  },
];

const birthdayReportsData: IData[] = [
  {
    "User Name": "John Doe",
    Location: "store A",
    "Plan Details": "PP360",
    "Plan value ": "₹ 200",
  },
];
const AllNotificationsData: IData[] = [
  {
    Type: "Post",
    Title: "Welcome Offer",
    Scheduled: "10:30 Pm",
    Delivery: "www.example.com",
    Status: "Active",
  },
];
const ManageNotificationsData: IData[] = [
  {
    "Template Name": "Happy Birthday Discount",
    "Notification Type": "Birthday",
    "Created By": "Admin 1",
    "Last Modified": "Aug 15, 2024",
  },
];
const birthdayCouponsData: IData[] = [
  {
    "Coupon Code": "BDAY10",
    "Discount Value": "20%",
    "Validity Period": "2024-01-15 ",
    "Expired Period": "2025-01-30",
    "Max usage/user": "1",
  },
];

const expireReportData: IData[] = [
  {
    "User Name": "John Doe",
    image: "",
    "User ID": "U1001",
    "Plan Details": "PP360-1 Year",
    "Expiration Date": "2024-01-30",
    Status: "Expiring Soon",
  },
];

const paymentReportData: IData[] = [
  {
    "Transaction ID": "TXN123456",
    "User ID": "U1001",
    "Full Name": "John Doe",
    Amount: "₹ 1000.00",
    "Payment Method ": "Credit Card",
  },
];

const customReportData: IData[] = [
  {
    "Mobile Name": "Samsung s21",
    "Plan Name": "PP360",
    "Plan value ": "₹ 1000.00",
    "Start Date": "2024-01-15",
    "End Date": "2024-01-15",
  },
];
const productReportData: IData[] = [
  {
    image: "",
    "Start Date": "2024-01-15",
    "End Date": "2024-06-15",
    Target: "www.example.com",
    Status: "Expiring soon",
  },
];
const CouponManagementData: IData[] = [
  {
    "Coupon Code": "BDAY10",
    "Discount Value": "20%",
    "Validity Period": "2024-01-15",
    "Expired Period": "2024-01-30",
    "Max usage/user": "1",
  },
];

const BannerstData: IData[] = [
  {
    image: "",
    "Start Date": "2024-01-15",
    "End Date": "2024-06-15",
    Target: "www.example.com",
    Status: "Expiring soon",
  },
];
const RewardsData: IData[] = [
  {
    "User ID": "User78910",
    "User Name": "John Doe",
    "Total Points": "150.00",
  },
];

interface IProps {}
interface IState {
  isProfileOpen: boolean;
  profileData: {
    UserID: number;
    "User Name": string;
  };
}
const Reports: React.FC<IProps> = (props) => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [profileDATA, setProfileData] = useState<IState["profileData"]>({
    UserID: 0,
    "User Name": "",
  });
  const [file, setFile] = useState<File | null>(null);
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const token = Storage.get("token");

  const { allProducts, paginationDataProducts } = useAppSelector(
    (state) => state.Products
  );
  const { coupons, birthDayCoupons, paginationDataCoupons } = useAppSelector(
    (state) => state.Coupons
  );
  const { banners, paginationDataBanners } = useAppSelector(
    (state) => state.banners
  );
  const {
    paymentReportData,
    customReportData,
    BirthdayReportData,
    paginationData,
    certificateData,
    profileData,
    expiryReportData,
    date_range,
    reportType,
    plans,
  } = useAppSelector((state) => state.reports);

  const {
    notificationsData,
    allNotifications,
    paginationDataNotifications,
    notificationType,
  } = useAppSelector((state) => state.notifications);
  const { anyLoading } = useLoadingStates();
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
    const shortMonthName = date.toLocaleString("default", { month: "short" });
    hours = hours % 12;
    hours = hours ? hours : 12;
    if (formatPath(location.pathname) === "template-management") {
      return `${shortMonthName} ${day}, ${year}`;
    } else {
      return `${year}-${month}-${day} ${String(hours).padStart(
        2,
        "0"
      )}:${minutes} ${ampm}`;
    }
  };

  const transformApiResponse = (
    allProducts: ProductsReducer["allProducts"]
  ) => {
    return allProducts!.map((res) => ({
      Brand: res.brand,
      // image: res.image ? `${res.image}/${token}` : "",
      "Product Name": res.productName ?? "-",
      "Item/Model Code": res.modelCode ?? "-",
      "Item/Model": res.itemModel ?? "-",
      MRP: res.mrp ? ensureDecimal(res.mrp) : "-",
      "SELLING PRICE": res.sellingPrice ? ensureDecimal(res.sellingPrice) : "-",
    }));
  };
  const transformBannerApiResponse = (data: BannerData[]) => {
    return data!.map((res) => ({
      ID: String(res.id),
      image: res.image ? `${res.image}/${token}` : "",
      "Start Date": res.createdAt.split("T")[0],
      "End Date": res.endDate ?? "-",
      Target: res.targetUrl ?? "-",
      Status: res.status ?? "-",
    }));
  };
  const transformNotifications = (data: NotificationData[]) => {
    return data!.map((res) => ({
      ID: String(res.id),
      Type: res.notificationType ?? "-",
      Title: res.title ?? "-",
      Trigger: res.trigger ?? "-",
      Delivery: res.deliveryMethod ? res.deliveryMethod : "www.exaple.com",
      Status: res.status ? "Active" : "inactive",
    }));
  };

  const transformManageNotifications = (data: NotificationData[]) => {
    return data!.map((res) => ({
      ID: String(res.id),
      Trigger: res.trigger ?? "-",
      Delivery: res.deliveryMethod ?? "-",
      "Notification Type": res.notificationType ?? "-",
      "Created By": String(res.createdBy) ?? "-",
      "Last Modified": res.updatedAt ? formatDate(res.updatedAt) : "-",
    }));
  };
  const formatCustomReportsData = (data: ReportReducer["customReportData"]) => {
    return data!.map((res) => ({
      ID: String(res.userId),
      "Mobile Name": res.mobileName ? String(res.mobileName) : "-",
      "Plan Name": res.planName ?? "-",
      "Plan value ": res.planValue ? ensureDecimal(res.planValue) : "-",
      "Start Date": res.planStartDate ?? "-",
      "End Date": res.planEndDate ?? "-",
      "User ID": String(res.celektUserId) ?? "-",
      UserID: String(res.userId) ?? "-",
    }));
  };

  const transformCouponData = (data: CouponData[]) => {
    const formattedData =
      data &&
      data!.reduce((acc: IData[], curr) => {
        const reqobj = {
          ID: curr.id.toString(),
          "Coupon Code": curr.code ?? "-",
          "Discount Value": String(
            curr.discountPercentage
              ? `${curr.discountPercentage} %`
              : curr.flatDiscount
              ? `${curr.flatDiscount} %`
              : "-"
          ),
          "Validity Period": curr.createdAt.split("T")[0] ?? "-",
          "Expired Period": curr.expiryDate ?? "-",
          "Max usage/user": `${curr.overallLimit ?? "-"}/${
            curr.perUser ?? "-"
          }`,
        };
        acc.push(reqobj);
        return acc;
      }, []);
    return formattedData;
  };
  const transformPaymentData = (data: ReportReducer["paymentReportData"]) => {
    const formattedData =
      data &&
      data!.reduce((acc: IData[], curr) => {
        const reqobj = {
          "Transaction ID": curr.transactionId ?? "-",
          "User ID": String(curr.celektUserId) ?? "-",
          UserID: String(curr.userId) ?? "-",
          "Full Name": curr.userName ?? "-",
          Amount: curr.paymentAmount ? ensureDecimal(curr.paymentAmount) : "-",
          "Payment Method ":
            curr.paymentMethod !== null ? curr.paymentMethod : "-",
        };
        acc.push(reqobj);
        return acc;
      }, []);
    return formattedData;
  };
  const transformBirthDayReportData = (
    data: ReportReducer["BirthdayReportData"]
  ) => {
    const formattedData =
      data &&
      data!.reduce((acc: IData[], curr) => {
        const reqobj = {
          "User ID": curr.celektUserId,
          UserID: curr.userId,
          "User Name": curr.userName ?? "-",
          Location: curr.storeLocation ?? "-",
          "Plan Details": curr.planName ?? "-",
          "Plan value ": curr.planValue ? ensureDecimal(curr.planValue) : "-",
        };
        acc.push(reqobj);
        return acc;
      }, []);
    return formattedData;
  };
  const transformExpiryReportsData = (
    data: ReportReducer["expiryReportData"]
  ) => {
    const formattedData =
      data &&
      data!.reduce((acc: IData[], curr) => {
        const reqobj = {
          "User Name": curr.userName ?? "-",
          "User ID": String(curr.celektUserId ?? "-"),
          UserID: curr.userId.toString() ?? "-",
          "Plan Details": curr.planName ?? "-",
          "Expiration Date": String(curr.planExpiryDate) ?? "-",
          Status: curr.status ?? "-",
        };
        acc.push(reqobj);
        return acc;
      }, []);
    return formattedData;
  };
  const transformCerficatetData = (data: ReportReducer["certificateData"]) => {
    const formattedData =
      data &&
      data.reduce((acc: IData[], curr) => {
        const reqobj = {
          "Certificate ID": String(curr.certificateId) ?? "-",
          UserID: String(curr.userId) ?? "-",
          "User ID": String(curr.celektUserId ?? "-"),
          "User Name": curr.userName ?? "-",
          "Issue Date": curr.createdAt ?? "-",
          "Expired Date": curr.expiryDate ?? "-",
        };
        acc.push(reqobj);
        return acc;
      }, []);
    return formattedData;
  };

  const transformedDataCoupons = transformCouponData(coupons);
  const transformedDataBirthDayCoupons = transformCouponData(birthDayCoupons);
  const transformedDataProducts = transformApiResponse(allProducts);

  const getDataBasedOnPath = useMemo(() => {
    switch (formatPath(location.pathname)) {
      case ERouteNames.AllNotifications: {
        dispatch(getAllNotifications({}));

        return {
          heading: "All Notifications",
          titles: AllNotificationsTitles,
          data: AllNotificationsData,
        };
      }
      case ERouteNames.ExpireNotifications: {
        dispatch(getNotifications({ type: "EXPIRY" }));
        return {
          heading: "Expiry Notifications",
          titles: AllNotificationsTitles,
          data: AllNotificationsData,
        };
      }
      case ERouteNames.TemplateManagement: {
        dispatch(getAllNotifications({}));
        return {
          heading: "Manage Notification",
          titles: ManageNotificationsTitles,
          data: ManageNotificationsData,
        };
      }
      case ERouteNames.BirthdayNotifications: {
        dispatch(getNotifications({ type: "BIRTHDAY" }));
        return {
          heading: "Birthday   Notifications",
          titles: AllNotificationsTitles,
          data: AllNotificationsData,
        };
      }
      case ERouteNames.PostPurchase: {
        dispatch(getNotifications({ type: "POSTPURCHASE" }));
        return {
          heading: "Post-Purchase Notifications",
          titles: AllNotificationsTitles,
          data: AllNotificationsData,
        };
      }
      case ERouteNames.BirthdayReport: {
        dispatch(getBirthdayReport({ type: "month" }));
        dispatch(setReportsType("month"));
        return {
          heading: "Birthday Report",
          titles: birthdayReportsTitles,
          data: birthdayReportsData,
        };
      }
      case ERouteNames.BirthdayOffer: {
        dispatch(getCoupons({ type: "birthdaycoupon" }));
        return {
          heading: "Birthday Coupon",
          titles: birthdayCouponTitles,
          data: birthdayCouponsData,
        };
      }
      case ERouteNames.ExpiryReport: {
        dispatch(getExpiryReport({ type: "month" }));
        dispatch(setReportsType("month"));
        return {
          heading: "Expiry Report",
          titles: expiryRoportTitles,
          data: expireReportData,
        };
      }
      case ERouteNames.PaymentReport: {
        dispatch(getPaymentReport({ page: 1 }));
        dispatch(getPieChartData());
        dispatch(getDashBoardStatistics({}));
        dispatch(setmonthGraph(""));
        return {
          heading: "Payment report",
          titles: paymentReportsTitles,
          data: paymentReportData,
        };
      }
      case ERouteNames.CustomReport: {
        dispatch(getCustomReport({}));
        return {
          heading: "Custom report",
          titles: customReportTitles,
          data: customReportData,
        };
      }
      case ERouteNames.ProductsManagement: {
        dispatch(getProducts({}));
        return {
          heading: "Products Management",
          titles: ProductsReportTitles,
          data: productReportData,
        };
      }
      case ERouteNames.CouponManagement: {
        dispatch(getCoupons({ type: "coupon" }));
        return {
          heading: "Coupon Management",
          titles: CouponManagementReportTitles,
          data: CouponManagementData,
        };
      }
      case ERouteNames.Banners: {
        dispatch(getBaners({}));
        return {
          heading: "Banners",
          titles: BannersReportTitles,
          data: BannerstData,
        };
      }
      case ERouteNames.RewardsManagement: {
        return {
          heading: "Rewards Management",
          titles: RewardsReportTitles,
          data: RewardsData,
        };
      }
      case ERouteNames.CertificateReport: {
        dispatch(
          getCerticateReport({
            direction: "ASC",
            pages: 1,
            size: 10,
          })
        );
        return {
          heading: "Certificates",
          titles: certificateReportTitles,
          data: certificateData,
        };
      }
      default: {
        return {
          heading: "Certificates",
          titles: certificateReportTitles,
          data: certificateReportData,
        };
      }
    }
  }, [location]);

  const handlePagenation = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    switch (formatPath(location.pathname)) {
      case ERouteNames.AllNotifications: {
        dispatch(getAllNotifications({ page: value.toString() }));
        return;
      }
      case ERouteNames.ExpireNotifications: {
        dispatch(getNotifications({ type: "EXPIRY", page: value }));
        return;
      }
      case ERouteNames.TemplateManagement: {
        dispatch(getAllNotifications({ page: value.toString() }));
        return;
      }
      case ERouteNames.BirthdayNotifications: {
        dispatch(getNotifications({ type: "BIRTHDAY", page: value }));
        return;
      }
      case ERouteNames.PostPurchase: {
        dispatch(getNotifications({ type: "POSTPURCHASE", page: value }));
        return;
      }
      case ERouteNames.BirthdayReport: {
        if (reportType.toLowerCase().includes("date_range")) {
          dispatch(
            getBirthdayReport({
              page: value,
              type: reportType,
              dateRange: date_range,
            })
          );
        } else {
          dispatch(getBirthdayReport({ page: value, type: reportType }));
        }
        return;
      }
      case ERouteNames.BirthdayOffer: {
        dispatch(getCoupons({ type: "birthdaycoupon", page: value }));
        return;
      }
      case ERouteNames.ExpiryReport: {
        if (reportType.toLowerCase().includes("date_range")) {
          dispatch(
            getExpiryReport({
              page: value,
              type: reportType,
              dateRange: date_range,
            })
          );
        } else {
          dispatch(getExpiryReport({ page: value, type: reportType }));
        }
        return;
      }
      case ERouteNames.PaymentReport: {
        if (plans.includes(reportType)) {
          dispatch(getPaymentReport({ page: value, planType: reportType }));
        } else {
          dispatch(getPaymentReport({ page: value }));
        }
        return;
      }
      case ERouteNames.CustomReport: {
        if (plans.includes(reportType)) {
          dispatch(getCustomReport({ page: value, planType: reportType }));
        } else {
          dispatch(getCustomReport({ page: value }));
        }
        return;
      }
      case ERouteNames.ProductsManagement: {
        dispatch(getProducts({ page: value }));
        return;
      }
      case ERouteNames.CouponManagement: {
        dispatch(getCoupons({ type: "coupon", page: value }));
        return;
      }
      case ERouteNames.Banners: {
        dispatch(getBaners({ page: value }));
        return;
      }
      case ERouteNames.RewardsManagement: {
        return;
      }
      case ERouteNames.CertificateReport:
        {
          if (plans.includes(reportType)) {
            dispatch(
              getCerticateReport({
                pages: value,
                planType: reportType,
                direction: "ASC",
                size: 10,
              })
            );
          } else {
            dispatch(
              getCerticateReport({
                direction: "ASC",
                pages: value,
                size: 10,
              })
            );
          }
        }
        return;
      default: {
        return;
      }
    }
  };

  const getPathBasedPagenation = () => {
    if (
      formatPath(location.pathname) === ERouteNames.BirthdayReport ||
      formatPath(location.pathname) === ERouteNames.ExpiryReport ||
      formatPath(location.pathname) === ERouteNames.PaymentReport ||
      formatPath(location.pathname) === ERouteNames.CertificateReport ||
      formatPath(location.pathname) === ERouteNames.CustomReport
    ) {
      return paginationData;
    } else if (
      formatPath(location.pathname) === ERouteNames.CouponManagement ||
      formatPath(location.pathname) === ERouteNames.BirthdayOffer
    ) {
      return paginationDataCoupons;
    } else if (formatPath(location.pathname) === ERouteNames.Banners) {
      return paginationDataBanners;
    } else if (
      formatPath(location.pathname) === ERouteNames.ProductsManagement
    ) {
      return paginationDataProducts;
    } else if (
      formatPath(location.pathname) === ERouteNames.AllNotifications ||
      formatPath(location.pathname) === ERouteNames.PostPurchase ||
      formatPath(location.pathname) === ERouteNames.BirthdayNotifications ||
      formatPath(location.pathname) === ERouteNames.ExpireNotifications ||
      formatPath(location.pathname) === ERouteNames.TemplateManagement
    ) {
      return paginationDataNotifications;
    } else {
      return {
        currentPage: 0,
        pageSize: 0,
        totalItems: 0,
        totalPages: 0,
      };
    }
  };
  const handleProfile = async (data: IState["profileData"]) => {
    setProfileOpen(true);
    await dispatch(getProfileData({ id: data["UserID"] }));
    setProfileData(data);
  };
  const handleCloseProfile = () => {
    setProfileOpen(false);
  };
  const addNew = (screen: string) => {
    switch (screen) {
      case "Products Management":
        navigate("/dashboard/create-products");
        break;
      case "Coupon Management":
        navigate("/dashboard/create-Coupon");
        break;
      case "Banners":
        navigate("/dashboard/create-Banner");
        break;
      case "Rewards Management":
        navigate("/dashboard/add-reward");
        break;
      case "Birthday Coupon":
        navigate("/dashboard/birthday-coupon");
        break;
      case "Manage Notification":
        dispatch(setEditNotification(false));
        navigate("/dashboard/create-notification");
        break;

      default:
        console.log(screen, "havent assigned any path for now");
        break;
    }
  };

  const fillData = (path: string) => {
    switch (path) {
      case "Products Management":
        return transformedDataProducts;
      case "Coupon Management":
        return transformedDataCoupons;
      case "Manage Notification":
        return transformManageNotifications(allNotifications);
      case "All Notifications":
        return transformNotifications(allNotifications);
      case "Post-Purchase Notifications":
        return transformNotifications(notificationsData);
      case "Expiry Notifications":
        return transformNotifications(notificationsData);
      case "Birthday   Notifications":
        return transformNotifications(notificationsData);
      case "Banners":
        return transformBannerApiResponse(banners);
      case "Payment report":
        return transformPaymentData(paymentReportData);
      case "Custom report":
        return formatCustomReportsData(customReportData);
      case "Birthday Coupon":
        return transformedDataBirthDayCoupons;
      case "Certificates":
        return transformCerficatetData(certificateData);
      case "Birthday Report":
        return transformBirthDayReportData(BirthdayReportData);
      case "Expiry Report":
        return transformExpiryReportsData(expiryReportData);
      default:
        return [];
    }
  };
  const showButton = (path: string) => {
    switch (path) {
      case "Products Management":
        return true;
      case "Coupon Management":
        return true;
      case "Rewards Management":
        return true;
      case "Banners":
        return true;
      case "Birthday Coupon":
        return true;
      case "Manage Notification":
        return true;
      default:
        return false;
    }
  };
  const editAProduct = (data: any) => {
    const path = formatPath(location.pathname);
    switch (path) {
      case ERouteNames.ProductsManagement:
        return false;
      case ERouteNames.CouponManagement:
        dispatch(getCouponWithId({ id: data }));
        dispatch(setIsEdit(true));

        navigate("/dashboard/create-Coupon");
        return;
      case ERouteNames.RewardsManagement:
        return false;
      case ERouteNames.Banners:
        return true;
      case ERouteNames.BirthdayOffer:
        dispatch(getCouponWithId({ id: data }));
        dispatch(setIsEdit(true));

        navigate("/dashboard/birthday-coupon");
        return false;
      case ERouteNames.TemplateManagement:
        dispatch(setCurrentNotifications(data));
        dispatch(setEditNotification(true));
        navigate("/dashboard/create-notification");
        return;
      case ERouteNames.AllNotifications:
        dispatch(setCurrentNotifications(data));
        dispatch(setEditNotification(true));
        navigate("/dashboard/create-notification");

        return;
      case ERouteNames.PostPurchase:
        dispatch(setCurrentNotifications(data));
        dispatch(setEditNotification(true));
        navigate("/dashboard/create-notification");

        return;
      case ERouteNames.BirthdayNotifications:
        dispatch(setCurrentNotifications(data));
        dispatch(setEditNotification(true));
        navigate("/dashboard/create-notification");

        return;
      case ERouteNames.ExpireNotifications:
        dispatch(setCurrentNotifications(data));
        dispatch(setEditNotification(true));
        navigate("/dashboard/create-notification");

        return;
      default:
        return false;
    }
  };
  const passEditFunction = () => {
    const path = formatPath(location.pathname);
    switch (path) {
      case ERouteNames.ProductsManagement:
        return false;
      case ERouteNames.CouponManagement:
        return true;
      case ERouteNames.RewardsManagement:
        return false;
      case ERouteNames.Banners:
        return true;
      case ERouteNames.BirthdayOffer:
        return true;
      case ERouteNames.TemplateManagement:
        return true;
      case ERouteNames.AllNotifications:
        return true;
      case ERouteNames.PostPurchase:
        return true;
      case ERouteNames.BirthdayNotifications:
        return true;
      case ERouteNames.ExpireNotifications:
        return true;

      default:
        return false;
    }
  };
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
        const response = await dispatch(
          createNewProductUploadFile(selectedFile)
        );
        if (response.payload?.status) {
          ToastSuccess(response.payload.message);
          dispatch(getProducts({}));
        } else {
          ToastError(response.payload?.message);
        }
      } else {
        alert("Please select a valid Excel file (.xls, .xlsx)");
      }
    }
  };
  useEffect(() => {
    setProfileOpen(false);
  }, [window.location.pathname]);
  const input = (
    <TextField
      placeholder="Search Criteria"
      sx={{
        "& label.Mui-focused": {
          color: "white",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: colors.primaryGreen,
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: colors.primaryGreen,
            borderRadius: "8px",
          },
          "&:hover fieldset": {
            borderColor: colors.primaryGreen,
          },
          "&.Mui-focused fieldset": {
            borderColor: colors.primaryGreen,
          },
        },
      }}
    />
  );
  return (
    <Box className={classes.mainContainer}>
      <FilterHeader />
      {formatPath(location.pathname) === ERouteNames.PaymentReport && (
        <Box className={classes.garphcontainer}>
          <CommonWhiteBg styles={{ marginTop: "0", marginRight: "1%" }}>
            <RevenueGraph title="Statistics" />
          </CommonWhiteBg>
          <CommonWhiteBg
            styles={{
              width: "350px",
              marginTop: "0px",
              padding: "1rem 2rem 1rem 2rem",
              [theme.breakpoints.down("sm")]: {
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            <PaymentReports />
          </CommonWhiteBg>
        </Box>
      )}
      <Box className={classes.container}>
        <CommonWhiteBg
          styles={{
            marginTop: "0",
            marginRight: `${isProfileOpen ? "1%" : "0"}`,
          }}
        >
          <Box className={classes.headingCon}>
            <Typography sx={style.headingConHeading} variant="h3">
              {getDataBasedOnPath.heading}
            </Typography>
            {showButton(getDataBasedOnPath.heading) ? (
              <Button
                sx={style.addNewButton}
                onClick={() =>
                  formatPath(location.pathname) ===
                  ERouteNames.ProductsManagement
                    ? document.getElementById("file-input")?.click()
                    : addNew(getDataBasedOnPath.heading)
                }
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
            ) : getDataBasedOnPath.heading === "Custom report" ? (
              input
            ) : (
              ""
            )}
          </Box>
          {anyLoading ? (
            <CommonLoader />
          ) : (
            <>
              <CommonTable
                titles={getDataBasedOnPath.titles}
                data={fillData(getDataBasedOnPath.heading)}
                handleProfile={passEditFunction() ? undefined : handleProfile}
                editAProduct={passEditFunction() ? editAProduct : undefined}
              />
              <CommonPagination
                totalPages={getPathBasedPagenation().totalPages}
                handlePagination={handlePagenation}
                pageSize={getPathBasedPagenation().pageSize}
                currentPage={getPathBasedPagenation().currentPage}
                totalItems={getPathBasedPagenation().totalItems}
              />
            </>
          )}
        </CommonWhiteBg>
        {isProfileOpen && (
          <QuickProfileDetails
            data={profileData}
            handleCloseProfile={handleCloseProfile}
          />
        )}
      </Box>
    </Box>
  );
};

export default Reports;
