import { SxProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors, fonts, theme } from "../../config/theme";

export const useStyles = makeStyles(() => ({
  mainContainer: { minHeight: '80vh', margin: '2rem' },
  headingContainer: {
    display: 'flex',
    justifyContent: "space-between",
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  selectValue: {
    fontSize: '14px',
    color: colors.primaryBlack,
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textTransform: 'capitalize',
  },
  filterContainer: {
    borderWidth: 0.6,
    borderColor: colors.quaternaryGrey,
    borderStyle: 'solid',
    height: '50px',
    width: 'fit-content',
    marginLeft: 'auto',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: "space-between",
    backgroundColor: `${colors.whiteBackground} !important`,
    [theme.breakpoints.down("md")]: {
      marginTop: "22px !important",
    },
  },
  filterIconBox: {
    height: '100%',
    width: '10%',
    borderRight: `0.3px solid ${colors.tertiaryGrey}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
  },
  filterByBox: {
    height: '100%',
    width: '15%',
    borderRight: `0.3px solid ${colors.tertiaryGrey}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    fontSize: '14px',
    fontWeight: '700',
    fontFamily: fonts.primary,
  },
  containerBtn: {
    padding: '0',
  },
  planTypeModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    backgroundColor: colors.white,
    backdropFilter: 'blur(5px)',
    padding: "4",
  },
  applyBtn: {
    height: '36px',
    width: '129px',
    borderRadius: '8px !important',
    backgroundColor: `${colors.primaryGreen}!important`,
    marginTop: '40px !important',
    marginLeft: '180px !important',
    marginRight: 'auto !important',
    color: `${colors.white} !important`,
    fontWeight: '700 as 700 !important',
  },
  dateApplyBtn: {
    height: '36px',
    width: '129px',
    borderRadius: '8px !important',
    backgroundColor: `${colors.primaryGreen}!important`,
    marginTop: '40px !important',
    marginLeft: '6px !important',
    marginRight: 'auto !important',
    color: `${colors.white} !important`,
    fontWeight: '700 as 700 !important',
  },
  planTypeModalOptions: {
    fontFamily: fonts.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryYellow,
    height: '34px',
    minWidth: '147px',
    paddingLeft: "12px",
    paddingRight: '12px',
    borderRadius: '18px',
    border: `0.6px solid ${colors.primaryYellow}`,
    color: colors.primaryBlack,
    margin: '5px',
    marginLeft: '0px'
  },
  planTypeMenu: {
    marginTop: '22px'
  },
  planTypeMenuContainer: {
    maxWidth: '521px',
    marginTop: "-12px",
  },
  planTypeModalHeading: {
    fontSize: '18px',
    fontWeight: '700',
    fontFamily: fonts.primary,
  },
  planTypeModalOptionsContainer: {
    paddingTop: '10px',
    paddingBottom: '10px',
    display: 'flex',
    flexDirection: "column",
    overflow: 'auto',
  },
  planTypeModalApplyBtnContainer: {
    borderTop: `0.4px solid ${colors.tertiaryGrey}`,
    padding: '20px',
  },
  planTypeNote: {
    color: '#434343',
    fontSize: '14px',
    fontWeight: '400',
    opacity: '82.58%',
  },
  dateCalendarNote: {
    color: colors.primaryGreen,
    fontSize: '14px',
    fontWeight: '400',
    opacity: '82.58%',
    textAlign: 'left'
  },
  planTypeBtnContainer: {
    height: '100%',
    paddingRight: "1vw !important",
    paddingLeft: "1vw !important",
    paddingTop: "12px !important",
    paddingBottom: "12px !important",
    borderRight: `0.1px solid ${colors.tertiaryGrey}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
  },
  dateBtnContainer: {
    position: "relative",
    height: '100%',
    width: '20%',
    paddingX: 2,
    borderRight: `0.3px solid ${colors.tertiaryGrey}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
  },
  dateNoteAndBtnContainer: {
    borderTop: `0.4px solid ${colors.tertiaryGrey}`,
    padding: '15px',
  },
  exportBtnContainer: {
    height: '100%',
    paddingRight: "22px !important",
    paddingLeft: "22px !important",
    paddingTop: "12px !important",
    paddingBottom: "12px !important",
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
  },
  expandMoreIcon: {
    marginLeft: '12px',
  },
  exportBtn: {
    color: `${colors.primaryGreen} !important`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    cursor: 'pointer'
  },
  fileDownloadIcon: {
    marginRight: 12,
    fontSize: 24,
  },
  textBox: {
    height: '55vh',
    width: '100%',
    marginTop: '20px',
    backgroundColor: 'white',
    borderRadius: '14px',
    overflowY: 'auto',
    padding: '35px',
    '&::-webkit-scrollbar': {
      width: '4px',
      border: '8px solid transparent',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: "inset 0 0 10px 10px green",
      border: '8px solid transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `${colors.primaryGreen}!important`,
      borderRadius: '5px',
      border: '8px solid transparent',
    },
  },
  selectorMainContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  selectBtnsContainer: {
    width: '100%',
    padding: '16.99px 0px 0px 0px',
    borderRadius: '7.28px 0px 0px 0px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  selectBtnMainText: {
    fontSize: '16px !important',
  },
  selectBtnSubText: {
    fontSize: '12px !important',
  },
  selectBtnPriceText: {
    fontSize: '16px !important',
    textAlign: "left"
  },
  btnCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '15px',
    cursor: 'pointer',
    borderRadius: '7.8px',
    marginRight: '15px',
    marginTop: '10px',
    height: '75px',
    width: '150px',
  }, checkboxLabel: {
    fontFamily: fonts.primary,
    fontSize: '1rem !important',
    fontWeight: 400,
  },
  checkIconContainer: {
    height: "22px",
    width: "22px",
    border: `1.36px solid ${colors.primaryGrey}`,
    backgroundColor: colors.primaryYellow,
    borderRadius: "5.46px",
    margin: "1px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  checkIcon: {
    color: colors.white,
    fontSize: "18px",
    fontWeight: "bold",
  },
  checkboxIcon: {
    height: "22px",
    width: "22px",
    border: `1.36px solid ${colors.primaryGrey}`,
    borderRadius: "5.46px",
    margin: "1px",
  }

}));

export const style = {
  text: {
    backgroundColor: "black",
  }
} satisfies Record<string, SxProps>
