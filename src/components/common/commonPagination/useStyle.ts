import { SxProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors } from "../../../config/theme";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {},
  labelCon: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    marginTop: "2rem",
    "& p": {
      color: colors.tertiaryDark,
    },
  },
}));

export const style = {
  button: {},
  paginationCon: {
    "& .MuiPaginationItem-root": {
      backgroundColor: colors.shadowWhiteTwo,
      color: colors.primaryGreen,
      margin: "0 5px",
      "&:hover": {
        backgroundColor: colors.shadowWhiteTwo,
      },
    },
    "& .Mui-selected": {
      backgroundColor: `${colors.primaryGreen} !important`,
      color: colors.white,
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: colors.primaryGreen,
      },
    },
  },
  handleButtonStyles: {
    fontSize: ".825rem !important",
    color: colors.primaryGreen,
    backgroundColor: colors.white,
    opacity: "1",
    textTransform: "none",
    "&:hover": {
      backgroundColor: colors.white,
    },
  },
} satisfies Record<string, SxProps>;
