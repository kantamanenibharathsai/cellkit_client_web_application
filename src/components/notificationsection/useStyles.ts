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
  },
  leftArrow: {
    backgroundColor: colors.white,
    color: colors.black,
    borderRadius: "50%",
    fontSize: "2.5rem",
    height: "1.5rem",
    width: "1.5rem",
    transform: "rotate(90deg)"
  },
  backIconAndTitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px"
  },
  containerBtn: {
    padding: '0',
  },
}));

export const style = {
  button: {
    marginRight: "32px",
    borderRadius: "15px",
  },
  textInput: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#DFEAF2",
    height: "52px",
    width: {
      lg: "418px",
      md: "100%",
      sm: "100%",
    },
    borderRadius: "15px !important",
    marginTop: "12px",
    color: colors.tertiaryDark,
    "& fieldset": { border: "none" },
    input: { color: colors.primaryGrey },
  },
  textInputContent: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#DFEAF2",
    height: "77px",
    width: {
      lg: "418px",
      md: "100%",
      sm: "100%",
    },
    borderRadius: "15px !important",
    marginTop: "12px",
    color: colors.tertiaryDark,
    "& fieldset": { border: "none" },
    input: { color: colors.primaryGrey },
  },
  textInputContentDate: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#DFEAF2",
    height: "51px",
    width: {
      lg: "418px",
      md: "100%",
      sm: "100%",
    },
    borderRadius: "15px !important",
    marginTop: "12px",
    color: colors.tertiaryDark,
    "& fieldset": { border: "none" },
    input: { color: colors.primaryGrey },
  },
  dropDowns: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#DFEAF2",
    height: "52px",
    width: {
      lg: "418px",
      md: "100%",
      sm: "100%",
    },
    borderRadius: "15px !important",
    marginTop: "12px",
    color: colors.tertiaryDark,
    "& fieldset": { border: "none" },
    input: { color: colors.primaryGrey },
  },
  imageBox: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#DFEAF2",
    height: "52px",
    width: {
      lg: "418px",
      md: "100%",
      sm: "100%",
    },
    borderRadius: "15px !important",
    marginTop: "12px",
    display: "flex",
    alignItems: "center",
    padding: "10px 15px ",
    boxSizing: "border-box",
  }, mainContainerInputs: {
    display: "flex",
    flexDirection: { md: "row", xs: "column" },
    justifyContent: "space-between",
  },
  subContainersInputs: { width: { md: "49%", xs: "100%" } },
  imageButton: {
    textTransform: "none",
    fontWeight: 600,
    border: "1px solid  #CECECE",
    padding: "5px 15px",

    borderRadius: "10px",
  }
} satisfies Record<string, SxProps>;
