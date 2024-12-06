import React from "react";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useStyles } from "./useStyle";
import { translate } from "../../../config/i18n";
import { MessageIcon, PhoneIcon, SmsIcon, VideoCallIcon } from "./assets/Svgs";
import { RiCloseFill } from "react-icons/ri";
import moment from "moment";
import { imgUrl } from "./config";

interface IProps {
  handleCloseProfile?: () => void;
  data: any;
}
const QuickProfileDetails: React.FC<IProps> = ({
  handleCloseProfile,
  data,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.profileDetailsContainer}>
        <Box className={classes.profilePicContainer}>
          <Box className={classes.closeBtnContainer}>
            <IconButton onClick={handleCloseProfile}>
              <RiCloseFill />
            </IconButton>
          </Box>
          <Typography className={classes.profileIdText} textAlign="center">
            {translate("QuickProfileDetails.textId")} :
            {data?.celektUserId ?? data?.userId ?? data?.id ?? "-"}
          </Typography>
          <Avatar
            className={classes.profilePicAvatar}
            alt={data?.fullName}
            src={data?.image ?? imgUrl}
          />
          <Typography textAlign="center" className={classes.profileNameText}>
            {data?.fullName ?? "-"}
          </Typography>
          <Box className={classes.profileIconsContainer}>
            <IconButton className={classes.profileIconsBtn}>
              <SmsIcon className={classes.btnIcons} />
            </IconButton>
            <IconButton className={classes.profileIconsBtn}>
              <PhoneIcon className={classes.btnIcons} />
            </IconButton>
            <IconButton className={classes.profileIconsBtn}>
              <VideoCallIcon className={classes.btnIcons} />
            </IconButton>
            <IconButton className={classes.profileIconsBtn}>
              <MessageIcon className={classes.btnIcons} />
            </IconButton>
          </Box>
        </Box>
        <Box className={classes.profileMoreDetailsContainer}>
          <Box className={classes.profileMoreDetailsBoxContainer}>
            <Box className={classes.profileMoreDetailsBox}>
              <Typography className={classes.profileMoreDetailsBoxHeading}>
                {"Age"}
              </Typography>
              <Typography className={classes.profileMoreDetailsBoxInfo}>
                {"-"}
              </Typography>
            </Box>
            <Box className={classes.profileMoreDetailsBox}>
              <Typography className={classes.profileMoreDetailsBoxHeading}>
                {"Date of birth"}
              </Typography>
              <Typography className={classes.profileMoreDetailsBoxInfo}>
                {data?.dob
                  ? moment(data?.dob, "YYYY/MM/DD").format("DD MMM YYYY")
                  : "-"}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.profileMoreDetailsBoxContainer}>
            <Box className={classes.profileMoreDetailsBox}>
              <Typography className={classes.profileMoreDetailsBoxHeading}>
                {"Gender"}
              </Typography>
              <Typography
                textTransform={"capitalize"}
                className={classes.profileMoreDetailsBoxInfo}
              >
                {data?.gender ?? "-"}
              </Typography>
            </Box>
            <Box className={classes.profileMoreDetailsBox}>
              <Typography className={classes.profileMoreDetailsBoxHeading}>
                {"Address"}
              </Typography>
              <Typography className={classes.profileMoreDetailsBoxInfo}>
                {data?.address ?? "-"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuickProfileDetails;
