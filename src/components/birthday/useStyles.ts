import { SxProps, } from "@mui/material";
import { colors, theme } from "../../config/theme";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    container: { flexGrow: 1 },
    paper: {
        minHeight: "50vh",
        borderRadius: "15px !important",
        marginTop: "12px",
        padding: "3rem",
        backgroundColor: colors.white,
    },
    mainHeading: {
        fontWeight: "800 !important",
    },
    label: {
        color: "#232323 !important",
        fontWeight: "400 !important",
        fontSize: "1rem !important",
    },
    bottomBtnsContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    fieldContainer: {
        marginBottom: "25px"
    },
    textfield: {
    },
    input: {
        color: `${colors.tertiaryGrey} !important`,
    },
    InputRoot: {
        "&::-webkit-calendar-picker-indicator": {
            display: "none !important",
            "-webkit-appearance": "none !important",
        },
    },
    textInputfield: {
        borderWidth: "1px !important",
        borderStyle: "solid !important",
        borderColor: "#DFEAF2 !important",
        height: "50px",
        borderRadius: "15px !important",
        marginTop: "12px !important",
        color: `${colors.tertiaryDark} !important`,
        "& fieldset": { border: "none" },
        input: { color: `${colors.tertiaryDark} !important` },
        width: "418px !important",
        [theme.breakpoints?.down('sm')]: {
            width: "100% !important",
        }
    },
    selectInputfield: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#DFEAF2',
        height: '52px',
        borderRadius: '15px !important',
        marginTop: '12px !important',
        color: colors.tertiaryDark,
        "& fieldset": { border: 'none', },
        input: { color: colors.primaryGrey }
    },
    leftArrow: {
        backgroundColor: colors.white,
        color: colors.black,
        borderRadius: "50%",
        fontSize: "2.5rem",
        height: "1.5rem",
        width: "1.5rem",
        transform: "rotate(90deg)"
    },
    backIconAndTitleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px"
    }
}));

export const style = {
    button: {
        marginRight: "32px",
        borderRadius: "15px",
        fontSize: {
            md: "18px", xs: "12px"
        }
    },
    selectBar: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#DFEAF2",
        height: "52px",
        width: {
            md: "418px",
            xs: "100%"
        },
        borderRadius: "15px !important",
        marginTop: "12px",
        color: colors.tertiaryDark,
        "& fieldset": { border: "none" },
        input: { color: colors.tertiaryDark },
    },
    commonTextInput: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#DFEAF2",
        height: "50px",
        width: {
            md: "418px",
            xs: "100%"
        },
        borderRadius: "15px !important",
        marginTop: "12px",
        color: colors.tertiaryDark,
        "& fieldset": { border: "none" },
        input: { color: colors.black },
    },

    commonDateInput: {
        border: `1px solid ${colors.borderLightGrey}`,
        marginTop: "10px",
        marginBottom: "15px",
        height: '50px',
        width: { md: "418px", xs: "100%", }, borderRadius: "15px",
        "& fieldset": { border: "none" },
        input: { color: colors.primaryGrey },
        paddingBottom: "15px"
    },
    overallLimitAndSelect: {
        width: {
            md: "418px",
            sm: "100%",
        }
    }
} satisfies Record<string, SxProps>;
