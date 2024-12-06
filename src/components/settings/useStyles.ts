import { SxProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  container: {
    width: "100%",
    padding: "min(2rem,2%)",
  },
  accordion: {
    boxShadow: "none !important",
  },
  accordionSummery: {
    padding: "0 !important",
  }, 
}));

export const style = {
  button: {
    marginLeft: "auto",
    marginTop: "2rem"
  }
} satisfies Record<string, SxProps>
