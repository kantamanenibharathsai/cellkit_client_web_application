import { SxProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors, theme } from "../../config/theme";

export const headerHeight = "80px";

export const useStyles = makeStyles(() => ({
  modalStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    background: "white",
    [theme.breakpoints.down("xs")]: {
      padding: "10px ! important",
    },
    [theme.breakpoints.up("xs")]: {
      padding: "10px ! important",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "20px ! important",
    },
    [theme.breakpoints.up("md")]: {
      padding: "30px ! important",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    borderRadius: "10px",
  },
  modalButtonsContainer: { display: "flex", flexDirection: "row", gap: "25px" },

  root: {},
  girlIcon: {
    width: "42.8px",
    height: "44.52px",
    borderRadius: '50%',
    margin: "5px",
  },
  notificationIcon: {
    [theme.breakpoints.down("xs")]: {
      width: "20px",
    },
  },
  container: {
    display: "flex",
  },
  backgroundCon: {
    backgroundColor: colors.primaryYellow,
    height: headerHeight,
    display: "flex",
    alignItems: "center",
    width: "100%",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "0.5rem",
      paddingRight: "1rem",
    },
    "& .downArrow": {
      backgroundColor: colors.white,
      color: colors.black,
      borderRadius: "50%",
      fontSize: "2.5rem",
      height: "1.5rem",
      width: "1.5rem",
    },
  },
  inputCon: {
    backgroundColor: colors.white,
    height: "38px",
    width: "min(100%,388px)",
    [theme.breakpoints.down("sm")]: {
      width: "45%",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    padding: "0 1rem",
    borderRadius: "90px",
    "& input": {
      outline: "none",
      border: "none",
      height: "100%",
      flexGrow: 1,
      [theme.breakpoints.down("sm")]: {
        width: "40%",
      },
    },
  },
  badgeCon: {},
  userCon: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    gap: "1rem",
    [theme.breakpoints.down("xs")]: {
      gap: "0px",
    },
    "& .userDetailsCon": {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    "& .userNameAndRole": {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  },
  notificationText: {
    fontSize: "0.938rem",
    lineHeight: "20.46px",
    color: colors.secondaryBlack,
    fontWeight: 500,
  },
  notifiyIcon: {
    color: colors.white,
    fontSize: "1rem",
  },
  notificationIconCon: {
    backgroundColor: colors.primaryGreen,
    height: "2.25rem",
    width: "2.25rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: ".5rem",
    borderRadius: "50%",
  },
  accountIcon: {
    color: colors.primaryGreen,
    fontSize: "1.25rem",
  },
  accountIconImage: {
    height: "14px",
    width: "16px",
    objectFit: "contain",
  },
  removeDividerPadding: {
    margin: "0 !important",
  },

}));

export const style = {
  menuIcon: {
    display: {
      md: "none",
      xs: "flex",
    },
  },
  text: {
    backgroundColor: "black",
  },
  button: {
    backgroundColor: `${colors.primaryGreen} ! important`,
    color: `${colors.white}  ! important`,
    border: "none",
    borderRadius: "5px",
    textTransform: 'none !important',
  },
  seeAllNotificationText: {
    textAlign: "center",
    display: "block",
    fontSize: "0.813rem",
    lineHeight: "16.44px",
    color: colors.secondaryGrey,
    fontWeight: "400",
  },
  myAccountTextCon: {
    display: "flex",
    alignItems: "center",
    gap: ".5rem",
    paddingBottom: ".5rem",
    paddingTop: ".5rem",
    paddingRight: '30px',
    paddingLeft: '20px',
    "& span": {},
    "& p": {
      color: colors.secondaryBlack,
    },
  },
  notifyMenu: {
    marginLeft: "-5rem",
  },
  accountMenu: {
    borderRadius: ".8rem",
  },
} satisfies Record<string, SxProps>;
