import { SxProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors } from "../../config/theme";

export const useStyles = makeStyles((theme: Theme) => ({
  paperContainer: {
    borderRadius: "15px !important",
    padding: '2rem !important',
    marginTop: "1rem",
    minHeight: "80vh",
  },
  inputContainer: {
    marginBottom: '28px',
    width: '100%',
  },
  label: {
    color: '#232323 !important',
    fontWeight: '400 !important',
    fontSize: '1rem !important',
  },
  fileUploadContainer: {

  },
  mainHeading: { fontWeight: '800 !important' },
  numericInput: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
  },

}));


export const style = {
  container: { padding: '22px' },
  button: {
    marginRight: "32px",
    borderRadius: '15px',
    fontSize: { md: "18px", xs: "12px", }
  }, containerPaper: {
    borderRadius: "15px", padding: 4, marginTop: '1rem', minHeight: '80vh',
  },
  inputsContainer: { display: 'flex', flexDirection: { md: "row", xs: "column" }, justifyContent: 'space-between', marginBottom: "10px" },
  productDescriptionsContainer: { width: { md: '40%', xs: "95%" }, display: 'flex', flexDirection: 'column', },
  multilineInput: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#DFEAF2',
    height: '152px',
    borderRadius: '15px !important',
    marginTop: '12px',
    color: colors.tertiaryDark,
    "& fieldset": { border: 'none', height: '152px', }, input: { color: colors.primaryGrey }
  },
  fileUploaderAndButtonsContainer: { maxHeight: "50vh", width: { md: '50%', xs: "90%" }, display: "flex", justifyContent: 'flex-start', flexDirection: 'column', },
  buttonsContainer: { width: '100%', display: 'flex', justifyContent: "flex-end", alignItems: "center" }
} satisfies Record<string, SxProps>