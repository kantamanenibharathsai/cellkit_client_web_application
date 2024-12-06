import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { style, useStyles } from "./useStyles";
import { translate } from "../../config/i18n";
import { colors } from "../../config/theme";
import CommonButton from "../common/commonButton/CommonButton";
import { navigation } from "../../utils/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import {
  createNotifications,
  setCurrentNotifications,
  setEditNotification,
  UpdateNotifications,
} from "../../redux/reducers/notifications";
import { useAppDispatch, useAppSelector } from "../../utils/useRedux";
import { ToastError, ToastSuccess } from "../../utils/Validate";
import { RiArrowDownSLine } from "react-icons/ri";
export interface CreateNotificationState {
  content: string;
  deliveryMethod: string;

  title: string;
  trigger: string;
}

const Notificationsection = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const datePickerRef = useRef<any>(null);
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const { isEditingNotification, currentNotification } = useAppSelector(
    (state) => state.notifications
  );
  const [notificationData, setNotificationData] =
    useState<CreateNotificationState>({
      trigger: "",
      content: "",
      deliveryMethod: "",
      title: "",
    });
  const handleCancel = () => {
    dispatch(setEditNotification(false));
    dispatch(setCurrentNotifications(""));
    return navigation.navigate("dashboard/template-management");
  };
  const validateNotificationData = (): boolean => {
    const { trigger, content, deliveryMethod, title } = notificationData;
    const emptyFields: string[] = [];

    if (!trigger) emptyFields.push("Trigger");
    if (!content) emptyFields.push("Content");
    if (!deliveryMethod) emptyFields.push("Delivery Method");
    if (!title) emptyFields.push("Title");
    if (emptyFields.length > 3) {
      ToastError(`Please fill all the fields`);
      return false;
    } else if (emptyFields.length > 0) {
      ToastError(`Please fields: ${emptyFields.join(", ")}`);
      return false;
    }

    return true;
  };
  const handleSave = async () => {
    if (validateNotificationData()) {
      const response = await dispatch(
        createNotifications({
          data: notificationData,
          image: image ?? undefined,
        })
      );
      if (response.payload.status) {
        dispatch(setEditNotification(false));
        dispatch(setCurrentNotifications(""));
        ToastSuccess(response.payload.message);
      } else {
        ToastError(response.payload?.message);
      }
      navigation.navigate("dashboard/template-management");
    }
  };

  const handleChange = (
    event:
      | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<string>
  ) => {
    const {
      target: { value, name },
    } = event;

    setNotificationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelect = (event: SelectChangeEvent<string>) => {
    const {
      target: { value, name },
    } = event;
    if (name === "status") {
      setStatus(value);
    } else {
      setNotificationData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(file!);
  };
  useEffect(() => {
    if (isEditingNotification) {
      setNotificationData({
        content: currentNotification.content,
        deliveryMethod: currentNotification.deliveryMethod ?? "",

        title: currentNotification.title ?? "",
        trigger: currentNotification.trigger ?? "",
      });
    }
  }, []);
  const handleUpdate = async () => {
    const response = await dispatch(
      UpdateNotifications({
        id: currentNotification.id.toString(),
        data: notificationData,
        image: image ?? undefined,
        status: status ?? "",
      })
    );
    if (response.payload.status) {
      ToastSuccess(response.payload.message);
    } else {
      ToastError("error");
    }
    dispatch(setEditNotification(false));
    dispatch(setCurrentNotifications(""));
    navigation.navigate("dashboard/template-management");
  };
  const handleReturn = () => {
    navigation.navigate("dashboard/template-management");
    dispatch(setEditNotification(false));
    dispatch(setCurrentNotifications(""));
  };

  return (
    <Box p="22px">
      <Box className={classes.backIconAndTitleContainer}>
        <IconButton onClick={handleReturn}>
          <RiArrowDownSLine className={classes.leftArrow} />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: "800" }}>
          {isEditingNotification
            ? translate("Notificationsection.textEditNotification")
            : translate("Notificationsection.textAddNewNotification")}
        </Typography>
      </Box>
      <Paper elevation={0} className={classes.paper}>
        <Box sx={style.mainContainerInputs}>
          <Box sx={style.subContainersInputs}>
            <Box className={classes.fieldContainer}>
              <Typography className={classes.label}>
                {translate("Notificationsection.textNotificationTitle")} :
              </Typography>
              <TextField
                name="title"
                type="text"
                sx={style.textInput}
                value={notificationData.title}
                placeholder="Title"
                onChange={handleChange}
              />
            </Box>

            <Box className={classes.fieldContainer}>
              <Typography className={classes.label}>
                {translate("Notificationsection.textTrigger")} :
              </Typography>
              <Select
                sx={style.dropDowns}
                name="trigger"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={notificationData.trigger}
                placeholder="Post-Purchase"
                onChange={handleSelect}
              >
                <MenuItem value={"BIRTHDAY_NOTIFICATION"}>
                  BIRTHDAY NOTIFICATION
                </MenuItem>
                <MenuItem value={"EXPIRY_NOTIFICATION"}>
                  EXPIRY NOTIFICATION
                </MenuItem>
                <MenuItem value={"PAYMENT_SUCCESS"}>PAYMENT SUCCESS</MenuItem>
                <MenuItem value={"PAYMENT_FAILURE"}>PAYMENT FAILURE</MenuItem>
              </Select>
            </Box>
            <Box className={classes.fieldContainer}>
              <Typography className={classes.label}>
                {translate("Notificationsection.textNotificationContent")} :
              </Typography>
              <TextField
                type="text"
                sx={style.textInputContent}
                name="content"
                value={notificationData.content}
                placeholder="Post-Purchase"
                onChange={handleChange}
              />
            </Box>
            <Box className={classes.fieldContainer}>
              <Typography className={classes.label}>
                {translate("Notificationsection.textDeliveryMethod")} :
              </Typography>
              <Select
                sx={style.dropDowns}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="deliveryMethod"
                value={notificationData.deliveryMethod}
                placeholder="Post-Purchase"
                onChange={handleSelect}
              >
                <MenuItem value={"Notification"}>Notification</MenuItem>
                <MenuItem value={"Email"}>Email</MenuItem>
              </Select>
            </Box>
          </Box>
          <Box sx={style.subContainersInputs}>
            {isEditingNotification && (
              <Box className={classes.fieldContainer}>
                <Typography className={classes.label}>
                  {translate("Notificationsection.textStatus")} :
                </Typography>
                <Select
                  sx={style.dropDowns}
                  name="status"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  placeholder="Post-Purchase"
                  onChange={handleSelect}
                >
                  <MenuItem value={"true"}>true</MenuItem>
                  <MenuItem value={"false"}>false</MenuItem>
                </Select>
              </Box>
            )}
            <Box className={classes.fieldContainer}>
              <Typography className={classes.label}>
                {translate("Notificationsection.textUploadImage")} :
              </Typography>
              <Box
                sx={{
                  ...style.imageBox,
                  justifyContent: image ? "space-between" : "flex-end",
                }}
              >
                {image && (
                  <Box
                    component={"img"}
                    src={URL.createObjectURL(image)}
                    alt="thumbnail"
                    sx={{
                      width: 40,
                      height: 40,
                      objectFit: "cover",
                      marginRight: 2,
                    }}
                  />
                )}

                <Button
                  component="label"
                  sx={{
                    ...style.imageButton,
                    background: image ? colors.primaryGreen : "none",
                    color: image ? colors.white : "#6D6D6D",
                  }}
                >
                  {image ? "Change" : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                  />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={classes.bottomBtnsContainer}>
          <CommonButton
            title={
              isEditingNotification
                ? translate("Notificationsection.textUpdate")
                : translate("Notificationsection.textSave")
            }
            styles={style.button}
            onClick={isEditingNotification ? handleUpdate : handleSave}
          />
          <CommonButton
            title={translate("Notificationsection.textCancel")}
            styles={style.button}
            onClick={handleCancel}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Notificationsection;
