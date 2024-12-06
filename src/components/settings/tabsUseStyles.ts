import { SxProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors } from "../../config/theme";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  container: {
    width:'90%',
    margin:'2rem'
  },
  paperContainer:{
    height:'100%',
    width:'100%',
    margin:'auto',
    marginTop:'10px',
    borderRadius:'14px !important',
  },
  tab:{
    color:colors.primaryGreen,
    textTransform:'capitalize',
    fontWeight:'700',
    paddingBottom: '3px',
  },
}));

export const style = {
  button: {
    marginLeft: "auto",
    marginTop: "2rem"
  }
} satisfies Record<string, SxProps>
