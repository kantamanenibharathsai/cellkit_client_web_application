import { SxProps, } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors, hex2rgba, theme } from "../../../config/theme";

export const useStyles = makeStyles(() => ({
  container: {},
  labelCon: {
    marginTop: "2rem",
    width: "100%",
    boxShadow: `6px 6px 54px ${hex2rgba(colors.black, 0.05)}`,
    [theme.breakpoints.down('sm')]: { padding: "0.5rem", },
    [theme.breakpoints.up('sm')]: { padding: "2rem", },
    backgroundColor: colors.white,
    borderRadius: "15px",
    "& .button": {
      bakckgroundColor: "red"
    }
  },
}));

export const style = {
  button: {

  },
} satisfies Record<string, SxProps>;
