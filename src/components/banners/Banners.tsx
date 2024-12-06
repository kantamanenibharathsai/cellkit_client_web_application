import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { style, useStyles } from "./useStyles";
import { translate } from "../../config/i18n";
import { colors } from "../../config/theme";
import FileUploader from "../product_management/FileUploader";
import CommonButton from "../common/commonButton/CommonButton";
import { ChangeEvent, useState } from "react";
import { displayAlert, displayAlertRed } from "../../utils/toastMessage";
import { createNewBaners } from "../../redux/reducers/banners";
import { useAppDispatch } from "../../utils/useRedux";
import { ToastSuccess } from "../../utils/Validate";
import { navigation } from "../../utils/navigation";
import { RiArrowDownSLine } from "react-icons/ri";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
interface Banner {
  startDate: string;
  endDate: string;
  targetUrl: string;
}
const Banners = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [newBanner, setNewBanner] = useState<Banner>({
    startDate: "",
    endDate: "",
    targetUrl: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const handeleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewBanner((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setImage(file!);
  };

  const createNewBanner = async () => {
    if (newBanner.endDate && newBanner.startDate && newBanner.targetUrl) {
      if (newBanner.endDate < newBanner.startDate) {
        displayAlertRed(translate("Banners.textDatesError"));
      } else {
        const createBanner = {
          ...newBanner,
          image: image,
        };

        const response = await dispatch(createNewBaners(createBanner));
        if (response.payload.status) {
          ToastSuccess(response.payload?.message);
          navigation.navigate("dashboard/banners");
        }
        setNewBanner({ startDate: "", endDate: "", targetUrl: "" });
        setImages([]);
      }
    } else {
      displayAlertRed(translate("Banners.textFillRequredFields"));
    }
  };
  const clearFields = () => {
    setNewBanner({ startDate: "", endDate: "", targetUrl: "" });
    setImages([]);
    navigation.navigate("dashboard/banners");
  };
  const handleReturn = () => {
    navigation.navigate("dashboard/banners");
  };
  const focused = (name: keyof typeof newBanner) => {
    setNewBanner((prev) => ({
      ...prev,
      [name]: prev[name] || String(new Date()),
    }));
  };
  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.backIconAndTitleContainer}>
        <IconButton onClick={handleReturn}>
          <RiArrowDownSLine className={classes.leftArrow} />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: "800" }}>
          {" "}
          {translate("Banners.textAddNewBanner")}
        </Typography>
      </Box>
      <Paper className={classes.paper}>
        <Box>
          <Box sx={style.mainContainer}>
            <Box sx={style.subContainer}>
              <Box className={classes.labelCon}>
                <Typography className={classes.label}>
                  {translate("Banners.textDisplayDuration")}
                </Typography>
              </Box>
              <Box className={classes.textfieldsContainer}>
                <TextField
                  type={newBanner.startDate ? "date" : "text"}
                  name="startDate"
                  placeholder="start Date"
                  required
                  onFocus={(event) =>
                    focused(event.target.name as keyof Banner)
                  }
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarTodayIcon
                            onClick={() => focused("startDate")}
                            style={{
                              ...style.endAdornment,
                              display: newBanner.startDate ? "none" : "flex",
                            }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  onChange={handeleChange}
                  classes={{ root: classes.InputRoot }}
                  className={classes.textfield}
                  value={newBanner.startDate}
                  InputLabelProps={{ shrink: true }}
                  sx={style.inputs}
                />

                <TextField
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarTodayIcon
                            onClick={() => focused("endDate")}
                            style={{
                              ...style.endAdornment,
                              display: newBanner.endDate ? "none" : "flex",
                            }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  type={newBanner.endDate ? "date" : "text"}
                  onFocus={(event) =>
                    focused(event.target.name as keyof Banner)
                  }
                  placeholder="End Date"
                  classes={{ root: classes.InputRoot }}
                  className={classes.textfield}
                  value={newBanner.endDate}
                  name="endDate"
                  required
                  onChange={handeleChange}
                  sx={style.inputs}
                />
                <Typography className={classes.label} mt={2}>
                  Target URL :
                </Typography>
                <TextField
                  type="text"
                  inputMode="url"
                  name="targetUrl"
                  required
                  value={newBanner.targetUrl}
                  placeholder="https://example.com/promo"
                  className={classes.textfield}
                  onChange={handeleChange}
                  sx={style.inputs}
                />
                <Box className={classes.fileUploadContainer}>
                  <Typography className={classes.label}>
                    {translate("Banners.textUploadFiles")}
                  </Typography>
                  <FileUploader classes={classes} setImages={setImages} />
                </Box>
              </Box>
            </Box>

            <Box className={classes.fieldContainer}>
              <Typography className={classes.label}>
                {translate("Notificationsection.textUploadImage")} :
              </Typography>
              <Box
                sx={{
                  ...style.imageUploadMainContainer,
                  justifyContent: image ? "space-between" : "flex-end",
                }}
              >
                {image && (
                  <Box
                    component={"img"}
                    src={URL.createObjectURL(image)}
                    alt="thumbnail"
                    sx={style.imageThumbnail}
                  />
                )}

                <Button
                  component="label"
                  sx={{
                    ...style.uploadButton,
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
          <Box className={classes.buttonsContainer}>
            <CommonButton
              title={translate("Banners.textSaveBanner")}
              styles={style.button}
              onClick={createNewBanner}
            />
            <CommonButton
              title={translate("Banners.textCancel")}
              styles={style.button}
              onClick={clearFields}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Banners;
