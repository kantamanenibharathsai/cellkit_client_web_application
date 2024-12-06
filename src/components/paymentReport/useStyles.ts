import { SxProps, } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { theme } from "../../config/theme";

export const useStyles = makeStyles(() => ({

    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'space-between',
        }
    },
    inputContainer: {
        marginBottom: '28px',
        width: '100%',
    },
    label: {
        color: 'rgba(0, 0, 0, 0.38) !important',
        fontWeight: '400 !important',
        fontSize: 'clamp(8px, 10px + 0.5vw, 0.75rem) !important',
        fontFamily: "Roboto !important ",
        textTransform: "capitalize ! important" as "capitalize"
    },
    labelValue: {
        color: 'rgba(0, 0, 0, 0.87) !important',
        fontWeight: '500 !important',
        fontSize: 'clamp(10px, 16px + 0.5vw, 0.75rem) !important',
        fontFamily: "Roboto !important "
    },

    body: {
        marginBottom: "1rem",
        padding: 0,
        minWidth: "300px",
        maxWidth: "357px",
        height: "320px",

    },

}));


export const style = {
    legendContainer: { display: "flex", flexDirection: "row", width: "100%", justifyContent: { xs: 'space-between', md: 'space-between' }, flexWrap: "wrap", gap: "5px", marginBottom: "-1rem", },
    dotAndDescription: { display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "flex-start", gap: "5px" },
    legendDot: { fontSize: 8, marginTop: "5px" },
    nameValue: { display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "start", textTransform: "capitalize" }
} satisfies Record<string, SxProps>