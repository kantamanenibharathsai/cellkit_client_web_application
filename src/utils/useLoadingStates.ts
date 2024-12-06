import { useAppSelector } from "./useRedux";


const useLoadingStates = () => {
  const productsLoading = useAppSelector((state) => state.Products.loading);
  const couponsLoading = useAppSelector((state) => state.Coupons.loading);
  const bannersLoading = useAppSelector((state) => state.banners.loading);
  const reportsLoading = useAppSelector((state) => state.reports.loading);
  const authLoading = useAppSelector((state) => state.Auth.loading)
  const { loginLoading } = useAppSelector((state) => state.Auth)
  const dashboardLoading = useAppSelector((state) => state.dashBoard.loading)
  const { salesAPILoading, graphApiLoading } = useAppSelector((state) => state.dashBoard)
  const legalTextEditLoading = useAppSelector((state) => state.leagalTextEdit.loading)
  const notificationsLoading = useAppSelector((state) => state.notifications.loading)

  return {
    loginLoading, salesAPILoading, graphApiLoading, dashboardLoading,
    anyLoading: productsLoading || couponsLoading || bannersLoading || reportsLoading || authLoading || dashboardLoading || legalTextEditLoading || notificationsLoading,
  };
};

export default useLoadingStates;