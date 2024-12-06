import { configureStore } from "@reduxjs/toolkit";
import Auth from "./reducers/auth";
import Products from "./reducers/products";
import Coupons from "./reducers/couponManagement";
import banners from "./reducers/banners";
import leagalTextEdit from "./reducers/leagalTextEdit";
import notifications from "./reducers/notifications";
import dashBoard from "./reducers/dashBoard";
import reports from "./reducers/reports";

export const store = configureStore({
  reducer: {
    Auth,
    Products,
    Coupons,
    banners,
    leagalTextEdit,
    notifications,
    dashBoard,
    reports,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
