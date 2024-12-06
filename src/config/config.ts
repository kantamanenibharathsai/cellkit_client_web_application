export const baseURL = "http://192.168.1.50:8088";

export const endpoints = {
  GET_USER: "csafe-api/user",
  LOGIN: "csafe-api/user/emaillogin",
  GET_PRODUCTS: "csafe-api/product",
  SINGLE_PRODUCTS: "products/:productId",
  GET_CATEGORIES: "csafe-api/category",
  TERMS_CONDITIONS: 'csafe-api/termsandconditions',
  PRIVACY_POLICY: 'csafe-api/privacypolicy',
  UPDATE_PROFILE: "csafe-api/user",
  CREATE_CATEGORY: 'csafe-api/category',
  UPLOAD_FILE_DASHBOARD: "csafe-api/csafeexcel",
  CREATE_PRODUCT: 'csafe-api/product',
  GET_COUPON: "csafe-api/coupon",
  CREATE_COUPON: "csafe-api/coupon",
  GET_BANNER: "csafe-api/banner",
  GET_TERMS_AND_CONDITIONS_PLAN: "csafe-api/termsandconditions/planId",
  GET_TERMS_AND_CONDITIONS_TYPE: "csafe-api/termsandconditions/type",
  GET_PLAN: "csafe-api/plan",
  GET_TERMS_AND_CONDITIONS_LANGUAGE: "csafe-api/termsandconditions/language",
  GET_USER_REPORT: 'csafe-api/user/user-reports',
  GET_USER_CERTIFICATE_REPORT: "csafe-api/certificate/report",
  GET_BIRTHDAY_REPORT: 'csafe-api/birthdaytheme/birthday-report',
  GET_BIRTHDAY_EXPIRY_REPORT: 'csafe-api/export/birthday-expiry-excel-report',
  GET_EXPORT_REPORTS: "csafe-api/export/excelreport",
  GET_EXPORT_COUPONS_DATA: "csafe-api/export/coupon-and-acknowlegement",
  GET_CUSTOM_REPORT_EXPORT: "csafe-api/export/custom-report",
  GET_PAYMENT_REPORT: "csafe-api/payments/payment-report",
  GET_GRAPH_DATA: 'csafe-api/payments/graphreport',
  GET_EXPIRY_REPORT: "csafe-api/plan/expiry-report",
  GET_NOTIFICATIONS: 'csafe-api/admin/notification',
  GET_CUSTOM_REPORT: 'csafe-api/plan/custom-report',
  GET_DASHBOARD: 'csafe-api/dashboard',
  GET_DASHBOARD_STATISTICS: 'csafe-api/dashboard/statistics',
  GET_DASHBOARD_SALESREPORT: "csafe-api/dashboard/sales-report",
  GET_CERTIFICATE_EXPORT_REPORT: "csafe-api/export/certificate-report",
  CREATE_PRODUCT_FILES: "csafe-api/product/files",
  CREATE_NOTIFICATION: "csafe-api/admin/notification"

};

export const encryptionSalt = "4910474157405c535f5710081053565f";
