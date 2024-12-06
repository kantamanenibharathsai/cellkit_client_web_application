import { SxProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors, fonts } from "../../../config/theme";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {

  },
  labelCon: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: "1rem",
    marginBottom: ".5rem",
    "& span": {
      color: colors.error
    }
  },
  label: {
    color: '#232323 !important',
    fontWeight: '400 !important',
    fontSize: '1rem !important',
  },
  textfield: {
    border: '1px solid #DFEAF2 !important',
    borderRadius:"15px !important",
  },
  input:{
    color:`${colors.tertiaryGrey} !important`,
  }
}));

export const style = {
  text: {
    backgroundColor: "black",
  },
} satisfies Record<string, SxProps>;
