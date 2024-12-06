import { SxProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors } from "../../config/theme";

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    minHeight: "50vh",
    borderRadius: "15px !important",
    marginTop: "12px",
    padding: "3rem",
  },
  label: {
    color: "#232323 !important",
    fontWeight: "400 !important",
    fontSize: "1rem !important",
  },
  bottomBtnsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  fieldContainer: {
    marginBottom: "25px"
  }
}));

export const style = {
  selectBar: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#DFEAF2",
    height: "52px",
    width: {
      md: "418px",
      xs: "100%",
    },
    borderRadius: "15px !important",
    marginTop: "12px",
    color: colors.tertiaryDark,
    "& fieldset": { border: "none" },
    input: { color: colors.primaryGrey },
  },
  selectDate: {
    border: `1px solid ${colors.borderLightGrey}`,
    marginTop: "15px",
    height: '50px',
    width: { md: "418px", xs: "100%" }
    , borderRadius: "15px",
    "& fieldset": { border: "none" },
    input: { color: colors.primaryGrey },
  },
  button: {
    marginRight: "32px",
    borderRadius: "15px",
    fontSize: {
      md: "18px", xs: "12px"
    }
  },
} satisfies Record<string, SxProps>;
