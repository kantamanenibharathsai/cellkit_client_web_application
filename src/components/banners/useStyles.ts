import { SxProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors, theme } from "../../config/theme";

export const useStyles = makeStyles(() => ({
  heading: {
    fontSize: '1.438rem !important',
    fontColor: `${colors.black} !important`,
    fontWeight: '700 !important',
  },
  paper: {
    minHeight: "50vh",
    width: "100%",
    marginTop: "22px",
    borderRadius: "15px !important",
    padding: "2rem",
  },
  mainContainer: {
    minHeight: "80vh",
    margin: "22px",
  },
  textfieldsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  labelCon: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: "1rem",
    marginBottom: ".5rem",
    "& span": {
      color: colors.error,
    },
  },
  label: {
    color: "#232323 !important",
    fontWeight: "400 !important",
    fontSize: "1rem !important",
    marginTop: "12px !important",
  },
  textfield: {
  },
  input: {
    color: `${colors.tertiaryGrey} !important`,
  },
  InputRoot: {
    "&::-webkit-calendar-picker-indicator": {
      display: "none !important",
      "-webkit-appearance": "none !important",
    },
  },
  fileUploadContainer: {
    maxHeight: "50vh",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  buttonsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "22px",
  },
  fieldContainer: {
    marginBottom: "25px",
    width: "48%",
    [theme.breakpoints.down('md')]: { width: "100%" }
  },
  mainBody: { display: "flex", flexDirection: "row" },
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
  }
}));

export const style = {
  mainContainer: {
    display: "flex",
    flexDirection: { md: "row", sm: "column", xs: "column" },
    justifyContent: "space-between",
  },
  imageUploadMainContainer: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#DFEAF2",
    height: "52px",
    width: {
      lg: "418px",
      md: "100%",
      xs: "100%",
    },
    borderRadius: "15px !important",
    marginTop: "12px",
    display: "flex",
    alignItems: "center",
    padding: "10px 15px ",
    boxSizing: "border-box",
  },
  imageThumbnail: {
    width: 40,
    height: 40,
    objectFit: "cover",
    marginRight: 2,
  },
  uploadButton: {
    textTransform: "none",
    fontWeight: 600,
    border: "1px solid  #CECECE",
    padding: "5px 15px",
    borderRadius: "10px",
  },
  button: {
    marginRight: "32px",
    borderRadius: "15px",
    fontSize: { md: "18px", xs: "12px", }
  },
  inputs: {
    border: `1px solid ${colors.borderLightGrey}`,
    marginTop: "15px",
    height: '50px',
    width: { lg: "418px", md: "100%", sm: "100%", borderRadius: "15px" },
    "& fieldset": { border: "none" },
    input: { color: colors.primaryGrey },
  },
  subContainer: { width: { xs: "100%", md: "48%" } },
  endAdornment: {
    color: colors.black, fontSize: "14px",
    marginRight: "10px"
  }

} satisfies Record<string, SxProps>;
