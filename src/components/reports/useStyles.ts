import { SxProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors, theme } from "../../config/theme";

export const useStyles = makeStyles(() => ({
  paymentsReports: {
    width: "365px",
    marginTop: "0",
    [theme.breakpoints.down("sm")]: {},
  },
  mainContainer: {
    padding: "min(1rem,2%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    flexDirection: "row",
  },
  garphcontainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: "10px",
    },
  },

  headingCon: {
    padding: "1rem 1rem 2rem 2rem",
    borderBottom: `1px solid ${colors.shadowWhiteTwo}`,
    width: "calc(100%)",
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "Center"
  },
  addBtnText: {
    color: `${colors.white} !important`,
    marginRight: '14px !important',
    fontSize: '0.75rem !important',
    fontWeight: "bolder !important"
  },
}));

export const style = {
  headingConHeading: {
    fontSize: { md: "1.5rem", xs: "16px" },
    fontWeight: 700,
    lineHeight: "20px",
    color: colors.primaryBlack,
  }, addIcon: {
    color: "#FFFFFF",
    fontSize: "21px",
    fontWeight: "bolder",
  },
  text: {
    backgroundColor: "black",
  },
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    color: colors.primaryGreen,
  },
  addNewButton: {
    color: colors.white,
    padding: '7px 15px',
    backgroundColor: colors.primaryGreen,
    borderRadius: '5px',
    textTransform: "capitalize",
    fontSize: '1rem'
  }
} satisfies Record<string, SxProps>
