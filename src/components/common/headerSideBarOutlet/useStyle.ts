import { SxProps, } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { headerHeight } from "../../header/useStyles";
import { colors, theme } from "../../../config/theme";


export const useStyles = makeStyles(() => ({
  root: {
  },
  container: {
    display: "flex",
    height: "100vh"
  },
  outletHeaderCon: {
    [theme.breakpoints.up('md')]: { width: 'calc(100% - 240px)' },
    [theme.breakpoints.down('md')]: { width: '100%' }

  },
  overflowCon: {
    height: `calc(100vh - ${headerHeight})`,
    overflow: "auto",
    backgroundColor: colors.tertiaryWhite,

  }
}));

export const style = {
  text: {
    backgroundColor: "black",
  },
} satisfies Record<string, SxProps>;
