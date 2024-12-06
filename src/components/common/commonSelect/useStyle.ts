import { SxProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors } from "../../../config/theme";

export const useStyles = makeStyles((theme: Theme) => ({
  selectCom: {
    minWidth: "108px",
    height: "28px !important",
    paddingRight: ".5rem",
    zIndex: 1,
    "& p": {
      marginTop: "2px",
    },
    "& .expandMoreIcon": {
      cursor: "pointer",
      position: "absolute",
      right: ".5rem",
      zIndex: -1,
      color: colors.primaryDark,
      fontSize: "1.2rem",
    },
  },
}));

export const style = {
  text: {
    backgroundColor: "black",
  },
} satisfies Record<string, SxProps>;
