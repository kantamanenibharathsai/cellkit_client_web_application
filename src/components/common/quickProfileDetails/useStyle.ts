import { SxProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors, fonts } from "../../../config/theme";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  tableContainer: {
    height: '100vh',
    width: '60%',
  },
  profileDetailsContainer: {
    height: '100vh',
    width: '30%',
    minWidth: '350px',
    maxWidth: '350px',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0px 0px 4px 0px #FF8E291A',
    backgroundColor: colors.white,
  },
  profilePicContainer: {
    borderBottom: '1px solid #E1E1E1',
  },
  profileIdText: {
    color: `${colors.tertiaryDark} !important`,
    fontSize: '0.875rem',
    fontWeight: '400',
    fontFamily: fonts.primary
  },
  profilePicAvatar: {
    height: '130px !important',
    width: '130px !important',
    marginTop: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor:`${colors.primaryYellow} !important`,
  },
  profileNameText: {
    color: '#050F24',
    fontFamily: fonts.primary,
    fontSize: '1rem',
    fontWeight: '500',
    marginTop: '20px !important',
  },
  profileIconsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '25px',
    marginBottom: '25px',

  },
  profileIconsBtn: {
    height: '40px',
    width: '40px',
    backgroundColor: '#F5F5F5 !important',
    borderRadius: '50%',
    marginLeft: '5px !important',
    marginRight: '5px !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIcons: {
    height: '16px',
    width: '16px',
    margin: 'auto !important',
  },
  profileMoreDetailsContainer: {
    display: 'flex',
    width: '100%',
    marginTop: '5rem',
  },
  profileMoreDetailsBoxContainer: {
    height: '250px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  profileMoreDetailsBox: {
    width: '100%',
    height: '100%',
    display: "flex",
    flexDirection: 'column',
  },
  profileMoreDetailsBoxHeading: {
    color: '#050F24',
    fontSize: '1rem !important',
    fontWeight: '700',
    fontFamily: fonts.primary
  },
  profileMoreDetailsBoxInfo: {
    color: `${colors.tertiaryDark} !important`,
    fontSize: '0.8rem',
    fontWeight: '400',
    fontFamily: fonts.primary,
    marginTop: '20px !important',
  },
  closeBtnContainer: {
    display: 'flex',
    justifyContent: "end",
    alignItems: "center",
  }
}));

export const style = {
  text: {
    backgroundColor: "black",
  },
} satisfies Record<string, SxProps>;
