import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useNavigate } from "react-router-dom";
import { navigation } from "./utils/navigation";
import { ThemeProvider } from "@mui/material";
import { theme } from "./config/theme";
import { SnackbarProvider } from "notistack";
import { ToastContainer } from "react-toastify";

const AppRoute = React.lazy(
  () => import("./components/common/routes/AppRoutes")
);

const App = () => {
  const navigate = useNavigate();
  navigation.navigate = navigate;

  return (
    <Suspense>
      <Provider store={store}>
        <SnackbarProvider />
        <ThemeProvider theme={theme}>
          <AppRoute />
        </ThemeProvider>
      </Provider>
      <ToastContainer />
    </Suspense>
  );
};

export default App;
