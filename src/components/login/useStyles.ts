import { SxProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { bgShape } from "./assets";
import { colors, fonts } from "../../config/theme";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  mainContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundImage: `url(${bgShape})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  signInBtnContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "29px",
    marginBottom: "22px",
  },
  rememberPassordContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "22px",
    marginLeft:'-6px',
  },
  checkedIcon: {
    height: "24px",
    width: "24px",
    border: `0.6px solid ${colors.white}`,
    borderRadius: "6px",
  },
  labelForgotPasswordContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  subHeading: {
    color: `${colors.black} !important`,
    fontSize: "1rem !important",
  },
  emailPasswrdLabel: {
    color: colors.primaryBlack,
    fontSize: "1.125rem !important",
  },
  forgotPwrd: {
    color: colors.black,
    fontSize: "1.125rem ! important",
  },
  rememberMe: {
    color: colors.black,
    fontFamily:fonts.primary,
    fontSize: "1.125rem ! important",
    marginLeft: "5px",
  },
  rememberMeCheck: {
    stokeWidth: 1,
    height: "24px",
    borderRadius: "12px",
    borderWidth: "0.6px",
    color: colors.primaryGrey,
    marginLeft: "-8px",
  },
  logoImage: {
    height: '4rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '35px',
  }
}));

export const style = {
  button: {
    height: "50px",
    width: "80% !important",
    borderRadius: "8px",
    fontSize: "20px",
    marginTop: "12px",
    marginBottom: "12px",
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: colors.primaryYellow,
    color: colors.black,
  },
  text: {
    backgroundColor: "black",
  },
  passwordTextField: { 
    marginTop: 2,
    borderRadius: "15px",
    height: "56px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent"
    }
  },
  containerPaper: {
    width: { lg: "510px", md: "550px", sm: "55vw",xs:'75%' },
    py: "2vh",
    px:5,
    borderRadius: "24px",
    m: "auto",
    display: "flex",  
    justifyContent: "center ",
    flexDirection: "column",
    background: `linear-gradient(180deg, ${colors.neonGreen} 0%, ${colors.primaryGreen} 100%)`,
    border: `0.3px solid ${colors.primaryGrey}`,
    boxShadow:'none'
  },
  textFieldInputProp: { borderRadius: "10px", backgroundColor:'white' ,borderColor:'transparent'},
} satisfies Record<string, SxProps>;
