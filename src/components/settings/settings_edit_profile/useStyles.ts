import { SxProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors } from "../../../config/theme";

export const useStyles = makeStyles((theme: Theme) => ({
  profilePicAvatar: {
    height: "130px !important",
    width: "130px !important",
    position: "relative ! important" as "relative",
  },
  penIconBtn: {
    color: colors.white,
    height: "30px",
    width: "30px",
    backgroundColor: `${colors.primaryGreen} !important`,
    position: "absolute",
    left: "93px",
    bottom: "35px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"

  },
}));

export const style = {
  penIcon: { position: "relative", left: "1px", top: "2px" },
  avatarContainer: { position: "relative", height: "fit-content" },
  button: {
    marginLeft: "auto",
    marginTop: "2rem",
    borderRadius: "15px",
    marginRight: "3rem",
  },
  imageInput: { display: "none" },
  gridItem: { display: "flex", justifyContent: "center", width: "100%" },
} satisfies Record<string, SxProps>;
