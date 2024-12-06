import { SxProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors, hex2rgba, theme } from "../../config/theme";
import { accordianRadius, summaryHeight } from "./SidebarAccordian";

export const useStyles = makeStyles(() => ({
  root: {
  },
  dividerCon: {
    borderColor: `${hex2rgba(colors.white, 0.5)} !important`,
  },
  container: {

    backgroundColor: colors.white,
    width: "min(260px,100%)",
    minHeight: "100vh",
    "& .icon": {
      color: colors.white,
      fontSize: "1.5rem",
    },
    "& .icon-accordian": {
      fontSize: "1.25rem",
    },
  },
  greenBg: {
    backgroundColor: colors.primaryGreen,
  },
  responsiveCon: {
    padding: ".5rem 1rem",
    [theme.breakpoints.down('md')]: {
      padding: "0px",
    },
    height: "100vh",
    borderLeft: `1px solid ${colors.shadowWhite}`
  },
  responsiveConTwo: {
    padding: "1rem",
    height: "auto",
    borderRadius: "1.5rem",
    [theme.breakpoints.down('md')]: {
      borderRadius: "0px",
      height: "100%",
    },
    boxShadow: `0 0 4px 0 ${hex2rgba(colors.shadowOrange, .4)}`
  },
  logoCon: {
    height: "80px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  naviConOne: {
    padding: "2rem 0 1rem 0",
  },
  naviConTwo: {
    paddingTop: ".5rem",
    paddingBottom: "1rem",
  },
  naviConThree: {
    paddingTop: "1rem",
  },
  otherText: {
    color: `${colors.white} !important`,
    marginBottom: "1rem !important",
    paddingLeft: "calc(1rem + 4px + 1rem)",
  },
  sideBarCon: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    height: "50px",
    cursor: "pointer",
    padding: "0 1.5rem 0 0",
    transition: "all 1s ease-in",
    marginBottom: "0.125rem",
    "&:hover": {
      "& .iconCon": {
        backgroundColor: colors.primaryYellow,
      },
      "& .bar": {
        border: `2px solid ${colors.primaryYellow}`,
      },
    },
    "& .activeBar": {
      width: "0",
      border: `2px solid ${colors.primaryYellow}`,
      borderBottomRightRadius: ".5rem",
      borderTopRightRadius: ".5rem",
      height: "100%",
    },
    "& .bar": {
      border: `2px solid transparent`,
    },
    "& .rotate": {
      transform: "rotateX(90deg)",
    },
    "& .iconCon": {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      height: "100%",
      flexGrow: 1,
      borderRadius: ".25rem",
      paddingLeft: "1rem",
    },
    "& .activeIconCon": {
      backgroundColor: colors.primaryYellow,
    },
    "& .iconName": {
      color: colors.white,
      letterSpacing: "0.3px",
    },
  },
  accoMenuItem: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    gap: ".5rem",
    lineHeight: "19.1px",
    fontWeight: "700 !important",
    fontSize: "0.875rem",
    color: `${colors.primaryGreen} !important`,

  },
  accoMenuItem2: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    gap: ".5rem",
    lineHeight: "19.1px",
    fontWeight: "700 !important",
    fontSize: "0.875rem",
    color: `${colors.primaryGreen} !important`,
    "& p": {
      color: `${colors.white} !important`,
      fontWeight: "700 !important",
    },
  },
  activeAccMenuItem: {
    color: `${colors.white} !important`,
    fontWeight: 500,
  },
  settingButton: {
    padding: "0.25rem 0.5rem",
    height: summaryHeight,
    cursor: "pointer",
    transition: "all .5s ease",
    borderRadius: accordianRadius,
    marginTop: ".5rem",
    color: colors.white,
  },
  yellowBg: {
    backgroundColor: hex2rgba(colors.white, 0.4),
  },
  logoutButton: {
    marginTop: "3rem",
  },
}));

export const style = {
  text: {
    backgroundColor: "black",
  }
} satisfies Record<string, SxProps>