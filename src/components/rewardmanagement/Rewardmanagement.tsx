import { Box, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { style, useStyles } from "./useStyles";
import { translate } from "../../config/i18n";
import { colors } from "../../config/theme";
import CommonButton from "../common/commonButton/CommonButton";

const Notificationsection = () => {
  const classes = useStyles();

  return (
    <Box p="22px">
      <Typography variant="h4" sx={{ fontWeight: "800" }}>
        {translate("Rewardmanagement.textAddNewReward")}
      </Typography>
      <Paper
        elevation={0}
        className={classes.paper}
      >
        <Box className={classes.fieldContainer}>
          <Typography className={classes.label} mt={0}>
            {translate("Rewardmanagement.textUserName")}
          </Typography>
          <Select
            sx={style.selectBar}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={"Ben"}
            placeholder="Post-Purchase"
            onChange={() => { }}
          >
            <MenuItem value={"Ben"}>Ben</MenuItem>
          </Select>
        </Box>
        <Box className={classes.fieldContainer}>
          <Typography className={classes.label}>
            {translate("Rewardmanagement.textRewardPoints")} :
          </Typography>
          <TextField
            type="text"
            sx={style.selectBar}
            value={''}
            placeholder="Post-Purchase"
            onChange={() => { }}
          />
        </Box>
        <Box className={classes.fieldContainer}>
          <Typography className={classes.label}>
            {translate("Rewardmanagement.textExpirationDate")} :
          </Typography>
          <TextField
            type="date"
            sx={style.selectDate}
          />
        </Box>
        <Box className={classes.fieldContainer}>
          <Typography className={classes.label}>
            {translate("Rewardmanagement.textDescription")} :
          </Typography>
          <TextField
            type="text"
            sx={style.selectBar}
            value={''}
            placeholder="Post-Purchase"
            onChange={() => { }}
          />
        </Box>
        <Box className={classes.bottomBtnsContainer}>
          <CommonButton title={translate("Rewardmanagement.textSaveReward")} styles={style.button} />
          <CommonButton title={translate("Rewardmanagement.textCancel")} styles={style.button} />
        </Box>
      </Paper>
    </Box>
  );
};

export default Notificationsection;
