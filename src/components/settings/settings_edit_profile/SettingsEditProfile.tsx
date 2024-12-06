import React, { ChangeEvent, useEffect, useState } from "react";
import { Avatar, Box, Grid, IconButton, InputLabel } from "@mui/material";
import { style, useStyles } from "./useStyles";
import EditProfileForm from "./EditProfileForm";
import { FaPencilAlt } from "react-icons/fa";
import { colors } from "../../../config/theme";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { editProfile } from "../../../redux/reducers/auth";
import { ToastError, ToastSuccess } from "../../../utils/Validate";
import { UserProfile } from "./Interfaces";
interface IProps {}

const SettingsEditProfile: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { userData, token } = useAppSelector((state) => state.Auth);

  const [image, setImage] = useState<File | null>(null);
  const setImagedetails = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(file!);
  };

  const imgHandler = () => {
    let img;
    if (image) {
      img = URL.createObjectURL(image);
    } else if (userData?.image) {
      img = `${userData.image}/${token}`;
    } else {
      img = require("../assets/profile.jpg");
    }
    return img;
  };

  const updateUser = async (stateData: UserProfile) => {
    const response = await dispatch(
      editProfile({
        ...stateData,
        userId: Number(userData?.id),
        token: token!,
        image: image ? image : "",
      })
    );
    setImage(null);

    const fullfiled = response.payload;
    if (fullfiled.status) {
      ToastSuccess("Successfully updated");
    } else {
      ToastError(fullfiled.message);
    }
    return fullfiled;
  };

  return (
    <Box>
      <Grid container>
        <Grid item md={3} style={style.gridItem}>
          <Box style={style.avatarContainer}>
            <Avatar
              className={classes.profilePicAvatar}
              alt="Profile"
              src={imgHandler()}
            />
            <IconButton className={classes.penIconBtn}>
              <InputLabel htmlFor="upload">
                <FaPencilAlt color={colors.white} style={style.penIcon} />
              </InputLabel>
            </IconButton>
          </Box>
          <Box
            component={"input"}
            name="image"
            placeholder="choose file"
            type="file"
            id="upload"
            sx={style.imageInput}
            accept="image/png, image/gif, image/jpeg"
            onChange={(event) => setImagedetails(event)}
          />
        </Grid>
        <Grid item md={9}>
          <EditProfileForm updateUser={updateUser} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsEditProfile;
