import moment from "moment";
import {
  IData,
  ETableNames,
} from "../components/common/commonTable/CommonTable";

export const formateDate = (date: string | Date) => {
  return moment(date).format("DD-MM-YYYY");
};

export const checkEmailValidation = (email: string) => {
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validEmail = regEx.test(String(email).toLowerCase().trim());
  if (!validEmail) {
    return false;
  }
  return true;
};

export type TRouteNames =
  | ERouteNames.Dashboard
  | ERouteNames.ProductsManagement
  | ERouteNames.ExtendedWaranty
  | ERouteNames.Sales
  | ERouteNames.CertificateReport
  | ERouteNames.BirthdayReport
  | ERouteNames.ExpiryReport
  | ERouteNames.PaymentReport
  | ERouteNames.CustomReport
  | ERouteNames.Banners
  | ERouteNames.RewardsManagement
  | ERouteNames.BirthdayOffer
  | ERouteNames.CouponManagement
  | ERouteNames.PostPurchase
  | ERouteNames.ExpireNotifications
  | ERouteNames.BirthdayNotifications
  | ERouteNames.TemplateManagement
  | ERouteNames.Settings
  | ERouteNames.TermsCondition
  | ERouteNames.PrivacyPolicy
  | ERouteNames.Logout
  | ERouteNames.AllNotifications;

export enum ERouteNames {
  Dashboard = "/dashboard",
  ProtectionPlan = "protection-plan",
  ExtendedWaranty = "extended-warranty",
  Sales = "sales",
  CertificateReport = "cartificate-report",
  BirthdayReport = "birthday-report",
  ExpiryReport = "expiry-report",
  PaymentReport = "payment-report",
  CustomReport = "custom-report",
  ProductsManagement = "products-management",
  AddNewProduct = "create-products",
  Banners = "banners",
  RewardsManagement = "rewards-management",
  BirthdayOffer = "birthday-offer",
  AddReward = "add-reward",
  AddBirthdayCoupon = 'birthday-coupon',
  CouponManagement = "coupon-management",
  AddCoupon = 'create-Coupon',
  PostPurchase = "post-purchase",
  ExpireNotifications = "expire-notifications",
  BirthdayNotifications = "birthday-notifications",
  TemplateManagement = "template-management",
  Settings = "settings",
  TermsCondition = "terms-condition",
  PrivacyPolicy = "privacy-policy",
  Logout = "logout",
  LegalTextEdit = "terms-condition/legalTextEdit",
  AddBanner = "create-Banner",
  AllNotifications = "all-notifications",
  AddNotification = 'create-notification'

}

export const monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const salesTitles = [
  ETableNames.CustomerName,
  ETableNames.IMEI,
  ETableNames.DateTime,
  ETableNames.Price,
  ETableNames.ProtectionPlan,
  ETableNames.PlanStatus,
];
export const plansAndWarrentyData: IData[] = [
  {
    'Plan Type': "PP730",
    "Registered": "500.00",
    'Sold': "450",
    "Certificates Generated": "500.00",
    "Protection Plan": "Extended Warranty",
  },
  {
    'Plan Type': "PP730",
    "Registered": "300.00",
    'Sold': "300",
    "Certificates Generated": "500.00",
    "Protection Plan": "Extended Warranty",
  },
  {
    'Plan Type': "PP730",
    "Registered": "500.00",
    'Sold': "150",
    "Certificates Generated": "140.00",
    "Protection Plan": "Extended Warranty",
  }, {
    'Plan Type': "PP730",
    "Registered": "450.00",
    'Sold': "450",
    "Certificates Generated": "500.00",
    "Protection Plan": "Extended Warranty",
  }, {
    'Plan Type': "PP730",
    "Registered": "500.00",
    'Sold': "450",
    "Certificates Generated": "500.00",
    "Protection Plan": "Extended Warranty",
  },
]

export const salesData: IData[] = [
  {
    id: "1",
    "Customer Name": "John Doe",
    IMEI: "350962370052232",
    "Date-Time": "12.09.2024 - 12.53 PM",
    Price: "1999.00",
    "Protection Plan": "Extended Warranty",
    "Plan Status": "Active",
    image: "",
  },
  {
    id: "2",
    "Customer Name": "John Doe",
    IMEI: "350962370052232",
    "Date-Time": "12.09.2024 - 12.53 PM",
    Price: "1999.00",
    "Protection Plan": "Protection Plan",
    "Plan Status": "Expired Soon",
    image: "",
  },
  {
    id: "3",
    "Customer Name": "John Doe",
    IMEI: "350962370052232",
    "Date-Time": "12.09.2024 - 12.53 PM",
    Price: "1999.00",
    "Protection Plan": "Protection Plan",
    "Plan Status": "Expired Soon",
    image: "",
  },
];

export type TextFieldInputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";
