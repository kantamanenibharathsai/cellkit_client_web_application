import { SxProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({

  container: {
  },

  selectRevenueCon: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    alignItems: "center"
  }
}));

export const style = {
  text: {
    backgroundColor: "black",
  },
} satisfies Record<string, SxProps>;
