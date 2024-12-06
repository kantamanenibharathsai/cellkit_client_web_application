import { Route, Routes } from "react-router-dom";
import HeaderSideBarOutlet from "../headerSideBarOutlet/HeaderSideBarOutlet";
import LagalTextEditor from "../../legal_text_edit/LegalTextEditor";
import Home from "../../home/Home";
import Reports from "../../reports/Reports";
import { ERouteNames } from "../../../utils/utils";
import TermsAndCondition from "../../terms_and_conditions/TermsAndConditions";
import ProtectedRoute from "../../../utils/ProtectedRoute";
import Login from "../../login/Login";
import SettingsTabs from "../../settings/SettingsTabs";
import ProductManagment from "../../product_management/ProductManagment";
import Banners from "../../banners/Banners";
import Notificationsection from "../../notificationsection/Notificationsection";
import Rewardmanagement from "../../rewardmanagement/Rewardmanagement";
import Couponmanagement from "../../couponmanagement/Couponmanagement";
import BirthdayCouponMangement from "../../birthday/BirthdayCouponMangement";
import useLoadingStates from "../../../utils/useLoadingStates";
import CommonLoader from "../../../utils/CommonLoader";

const AppRoutes = () => {
  const { loginLoading } = useLoadingStates();

  return (
    <>
      {loginLoading ? (
        <CommonLoader />
      ) : (
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path={ERouteNames.Dashboard as string}
              element={<HeaderSideBarOutlet />}
            >
              <Route
                path={ERouteNames.Dashboard as string}
                element={<Home />}
              ></Route>
              <Route
                path={ERouteNames.ProtectionPlan as string}
                element={<Home />}
              />
              <Route
                path={ERouteNames.ExtendedWaranty as string}
                element={<Home />}
              />
              <Route path={ERouteNames.Sales as string} element={<Home />} />
              <Route
                path={ERouteNames.CertificateReport as string}
                element={<Reports />}
              />
              <Route
                path={ERouteNames.BirthdayReport as string}
                element={<Reports />}
              />
              <Route
                path={ERouteNames.ExpiryReport as string}
                element={<Reports />}
              />
              <Route
                path={ERouteNames.PaymentReport as string}
                element={<Reports />}
              />
              <Route
                path={ERouteNames.CustomReport as string}
                element={<Reports />}
              />
              <Route
                path={ERouteNames.RewardsManagement as string}
                element={<Reports />}
              />
              <Route
                path={ERouteNames.AddReward as string}
                element={<Rewardmanagement />}
              />
              <Route
                path={ERouteNames.CouponManagement as string}
                element={<Reports />}
              />
              <Route
                path={ERouteNames.RewardsManagement as string}
                element={<Reports />}
              />
              <Route
                path={ERouteNames.AddCoupon as string}
                element={<Couponmanagement />}
              />
              <Route
                path={ERouteNames.BirthdayOffer as string}
                element={<Reports />}
              />
              <Route
                path={ERouteNames.AddBirthdayCoupon as string}
                element={<BirthdayCouponMangement />}
              />
              <Route
                path={ERouteNames.Settings as string}
                element={<SettingsTabs />}
              />
              <Route
                path={ERouteNames.PrivacyPolicy as string}
                element={<LagalTextEditor />}
              />
              <Route
                path={ERouteNames.LegalTextEdit as string}
                element={<LagalTextEditor />}
              />
              <Route
                path={ERouteNames.TermsCondition as string}
                element={<TermsAndCondition />}
              />
              <Route
                path={ERouteNames.ProductsManagement as string}
                element={<Reports />}
              />
              <Route
                path={ERouteNames.AddNewProduct as string}
                element={<ProductManagment />}
              />
              <Route
                path={ERouteNames.TermsCondition as string}
                element={<LagalTextEditor />}
              />
              <Route
                path={ERouteNames.Banners as string}
                element={<Reports />}
              />
              <Route
                path={ERouteNames.AddBanner as string}
                element={<Banners />}
              />
              <Route
                path={ERouteNames.AllNotifications as string}
                element={<Reports />}
              />
              <Route
                path={ERouteNames.PostPurchase as string}
                element={<Reports />}
              />
              <Route
                path={ERouteNames.BirthdayNotifications as string}
                element={<Reports />}
              />
              <Route
                path={ERouteNames.AddNotification as string}
                element={<Notificationsection />}
              />
              <Route
                path={ERouteNames.ExpireNotifications as string}
                element={<Reports />}
              />
              <Route
                path={ERouteNames.TemplateManagement as string}
                element={<Reports />}
              />
              <Route path="*" element={<h1>Not found</h1>} />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
