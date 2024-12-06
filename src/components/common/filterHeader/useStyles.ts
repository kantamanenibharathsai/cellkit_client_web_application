import { SxProps, } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors, fonts, theme } from "../../../config/theme";

export const useStyles = makeStyles(() => ({
  selectValue: {
    color: colors.primaryBlack,
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textTransform: 'capitalize',
  },
  selectValueNotifications: {
    color: colors.primaryBlack,
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textTransform: 'capitalize',
  },
  mainContainer: {
    paddingLeft: '22px',
    marginBottom: "20px",
    height: '45px',
    [theme.breakpoints.down('sm')]: { fontSize: '12px ! important', },
  },
  filterContainer: {
    height: '100%',
    [theme.breakpoints.up('sm')]: { width: 'fit-content', },
    marginLeft: 'auto',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
  filterIconBox: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
  },
  filterByBox: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    fontSize: '14px',
    fontWeight: '700 !important',
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
    width: '147px',
    borderRadius: '18px',
    border: `0.6px solid ${colors.primaryYellow}`,
    color: colors.primaryBlack,
    margin: '5px',
    marginLeft: '0px'
  },
  planTypeModalOptionsUnfilled: {
    fontFamily: fonts.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '34px',
    width: '147px',
    borderRadius: '18px',
    border: `0.6px solid ${colors.black}`,
    color: colors.primaryBlack,
    margin: '5px',
    marginLeft: '0px'
  },
  planTypeMenu: {
    marginTop: '8px',
    boxShadow: '0px 0px 13.64px -6.82px #00000040,0px 0px 4px 0px #00000040',
  },
  paperOne: {
    borderRadius: '10px !important',
  },
  planTypeMenuContainer: {
    height: '272px',
    width: '521px',
    marginTop: "-12px"
  },
  planTypeModalHeading: {
    fontSize: '18px',
    fontWeight: '700',
  },
  planTypeModalOptionsContainer: {
    paddingTop: '10px',
    paddingBottom: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    maxHeight: '100px',
    overflow: 'auto'
  },
  planTypeModalApplyBtnContainer: {
    borderRight: `0.4px solid ${colors.tertiaryGrey}`,
    padding: '20px',
  },
  planTypeNote: {
    color: '#434343',
    fontSize: '14px',
    fontWeight: '400',
    opacity: '82.58%',
  },
  dateCalendarNote: {
    color: `${colors.primaryGreen} ! important`,
    fontWeight: '400',
    opacity: '82.58%',
    textAlign: 'left'
  },
  planTypeBtnContainer: {
    height: '100%',
    paddingLeft: "12px",
    paddingRight: "12px",
    borderRight: `0.3px solid ${colors.tertiaryGrey}`,
    borderLeft: `0.3px solid ${colors.tertiaryGrey}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  dateBtnContainer: {
    position: "relative",
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '12px',
    paddingRight: "10px",
  },
  dateNoteAndBtnContainer: {
    padding: '15px',
  },
  exportBtnContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '12px',
    paddingRight: "10px",
  },
  expandMoreIcon: {
    [theme.breakpoints.up('md')]: { marginLeft: '12px', },
    [theme.breakpoints.up('sm')]: { marginLeft: '4px', },
    [theme.breakpoints.down('sm')]: { marginLeft: '-4px', },
  },
  exportBtn: {
    color: `${colors.primaryGreen} !important`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    cursor: 'pointer',
  },
  fileDownloadIcon: {
    marginRight: 12,
    fontSize: 16,
  },
  checkboxLabel: {
    fontFamily: fonts.primary,
    fontSize: '1rem !important',
    fontWeight: 400,
    textTransform: "capitalize"
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
