import { SxProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors } from "../../../config/theme";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {},
  labelCon: {
  },
}));

export const style = {
  button: {
    backgroundColor: `${colors.primaryGreen}`,
    height: "50px",
    width: "min(100%,190px)",
    color: colors.white,
    textTransform: "none",
    fontWeight: 500,
    fontSize: "1.125rem",
    lineHeight: "21.78px",
    "&:hover": {
      backgroundColor: `${colors.primaryGreen}`,
      color: colors.white,
    },
  },
} satisfies Record<string, SxProps>;
