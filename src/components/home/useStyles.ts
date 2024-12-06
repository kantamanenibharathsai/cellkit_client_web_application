import { SxProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors, hex2rgba, theme } from "../../config/theme";


const opacity = 0.2;

export const useStyles = makeStyles(() => ({
  root: {
  },
  container: {
    width: "100%",
    padding: "min(2rem,2%)",
  },
  planCardsCon: {
    width: "100%",
    display: "flex",
    gap: "2rem",
    flexWrap: "wrap",
    marginTop: "1rem",
    "& .iconCon": {
      flexShrink: 0,
      width: "4rem",
      height: "4rem",

      [theme.breakpoints.down("md")]: {
        width: "3.5rem",
        height: "3.5rem",
      },
      [theme.breakpoints.down("sm")]: {
        width: "2.8rem",
        height: "2.8rem",
      },
      borderRadius: "35%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .red": {
      backgroundColor: hex2rgba(colors.primaryRed, opacity),
    },
    "& .yellow": {
      backgroundColor: hex2rgba(colors.secondaryYellow, opacity),
    },
    "& .green": {
      backgroundColor: hex2rgba(colors.secondayGreen, opacity),
    },
    "& .violate": {
      backgroundColor: hex2rgba(colors.primaryViolate, opacity),
    },
  },
  planCard: {
    backgroundColor: colors.white,
    boxShadow: `6px 6px 54px ${hex2rgba(colors.black, 0.05)}`,
    padding: "1.5rem",
    borderRadius: "1rem",
    height: "100%",
    width: " max(33%,290px)",
    flexShrink: 0,
    "@media (min-width:1215px) and (max-width:1449px)": {
      width: "min(25%,190px)",
      flexGrow: 1,
    },
    "@media (min-width:1450px)": {
      flexBasis: "265px",
      flexGrow: 1,
    },
    "&  p": {
      fontSize: "1rem",
      color: colors.primaryDark,
    },
  },
  planCardNameIconCon: {
    display: "flex",
    gap: "1rem",
    justifyContent: "space-between",
  },
  planCardNameCountCon: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: ".5rem",
  },
  dippingCon: {
    display: "flex",
    gap: ".25rem",
    alignItems: "center",
    marginTop: "1rem",
    "& .fall": {
      color: colors.secondaryRed
    },
    "& .raise": {
      color: colors.primaryGreen
    }
  },
  addBtnText: {
    color: `${colors.white} !important`,
    marginRight: '14px !important',
    fontSize: '0.75rem !important',
    fontWeight: "bolder !important"
  },
  titleAndBtnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }
}));

export const style = {
  text: {
    backgroundColor: "black",
  },
  statisticNumber: {
    fontSize: { xl: "1.75rem", lg: "1.5rem", md: '1.5rem', sm: '1.25rem', xs: "1rem" }
  }, addNewButton: {
    color: colors.white,
    padding: '7px 15px',
    backgroundColor: colors.primaryGreen,
    borderRadius: '5px',
    textTransform: "capitalize",
    fontSize: '1rem'
  }, addIcon: {
    color: "#FFFFFF",
    fontSize: "21px",
    fontWeight: "bolder",
  },
} satisfies Record<string, SxProps>
