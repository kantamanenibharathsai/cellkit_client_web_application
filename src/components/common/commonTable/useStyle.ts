import { SxProps, } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors, theme } from "../../../config/theme";

const titleRadius = "1rem"

export const useStyles = makeStyles(() => ({
  root: {
  },
  container: {
    display: "flex",
    overflowX: "auto"
  },

  tableTitleCon: {
    borderRadius: ".8rem",
    "& th": {
      color: colors.primaryBlack,
      lineHeight: "19.1px",
      fontSize: "14px",
      fontWeight: 700,
      backgroundColor: colors.secondaryWhite,
      border: "none",
      textAlign: "center",
      "&:first-child": {
        borderTopLeftRadius: titleRadius,
        borderBottomLeftRadius: titleRadius,
      },
      "&:last-child": {
        borderTopRightRadius: titleRadius,
        borderBottomRightRadius: titleRadius,
      },
    },
  },
  popover: {
    boxShadow: 'none'
  },
  paper: {
    padding: theme.spacing(1),
    boxShadow: 'none'
  },
  tableDataCon: {
    "& .type": {
      textTransform: 'capitalize',
    },
    "& td": {
      fontWeight: 600,
      [theme.breakpoints.down('sm')]: { fontSize: 10 },
      textAlign: "center",
    },
    "& .profileCon": {
      margin: "auto",
      "& .profileSubCon": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        paddingLeft: "1rem",
        [theme.breakpoints.down('md')]: {
          paddingLeft: "10px",
          gap: "10px"
        },
        [theme.breakpoints.down('sm')]: {
          paddingLeft: "5px",
          gap: "5px"
        }
      }
    },

    "& .previewCon": {
      width: "100%",
      marginLeft: "2rem",

    },
    "& .status": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .chip": {

      borderRadius: "2rem",
      height: "1.5rem",
      width: "fit-content",
      padding: "0 1rem",
      display: "flex",
      margin: "auto",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "inherit",
      [theme.breakpoints.down('sm')]: { fontSize: 10 }
    },
    "& .active": {
      backgroundColor: colors.primaryGreen,
      color: colors.white,
      [theme.breakpoints.down('sm')]: { fontSize: 10 }
    },
    "& .expired": {
      backgroundColor: colors.secondaryRed,
      color: colors.white,
      [theme.breakpoints.down('sm')]: { fontSize: 10 }
    },
    "& .paused": {
      backgroundColor: colors.red,
      color: colors.white,
      [theme.breakpoints.down('sm')]: { fontSize: 10 }
    },
    "& .yearPlan": {
      backgroundColor: colors.primaryYellow,
      color: colors.white,
      marginTop: ".4rem",
    },
  },
  threeDotsIcon: {
    color: `${colors.primaryBlack} !important`,
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
  modalButtonsContainer: { display: "flex", flexDirection: "row", gap: "25px" }, modalStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menuItem: {
    display: "flex",
    gap: ".25rem",
    alignItems: "center",
    justifyContent: "center",
    width: "178px",
    position: "relative",
    "& p": {
      color: colors.black,
      flexGrow: 1,
      textAlign: "center",
      fontWeight: `${600} !important`
    },
    "& .icon": {
      fontSize: "1rem",
      color: colors.primaryGreen,
    },
    "& .iconCon": {
      position: "absolute",
      left: ".5rem",
    },
  },
}));

export const style = {
  text: {
    backgroundColor: "black",
  }, button: {
    backgroundColor: `${colors.primaryGreen} ! important`,
    color: `${colors.white}  ! important`,
    border: "none",
    borderRadius: "5px",
    textTransform: 'none !important',
  },
  menuCon: {
    marginLeft: "-2.5rem"
  },
  smallImg: { height: "50px", width: "50px", borderRadius: '8px', objectFit: "cover" },
  editAndDelete: {
    cursor: "pointer",
    padding: "5px 15px"
  },
  popover: {
    "& .MuiPopover-paper": {
      borderRadius: "5px",
      border: `1px solid ${colors.primaryGrey}`,
      boxShadow: "none",
    },

  }
} satisfies Record<string, SxProps>;
