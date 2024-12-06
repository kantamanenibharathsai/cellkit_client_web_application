import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { colors } from "../config/theme";
import useLoadingStates from "./useLoadingStates";

const CommonLoader = () => {
  const { loginLoading } = useLoadingStates();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: loginLoading ? "100vh" : "100%",

        alignItems: "center",
        color: colors.primaryGreen,
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
};
export default CommonLoader;
