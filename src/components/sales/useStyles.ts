import { SxProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors, hex2rgba } from "../../config/theme";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  container: {
    width: "100%",
  },
  titleCon: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.5rem"
  },
  selectFieldsCon: {
    display: "flex",
    gap: "1rem",
    alignItems: "center"
  }
}));

export const style = {
  text: {
    backgroundColor: "black",
  }
} satisfies Record<string, SxProps>
