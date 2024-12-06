import React, { useState } from "react";
import { personIcon, logoutIcon, imgUrl } from "./assets";
import { style, useStyles } from "./useStyles";
import { translate } from "../../config/i18n";
import MenuIcon from "@mui/icons-material/Menu";
import { IoIosSearch } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { FaCalendarDays } from "react-icons/fa6";
import { BsFillPersonFill } from "react-icons/bs";
import { BsPersonGear } from "react-icons/bs";
import { IoKeyOutline } from "react-icons/io5";
import { TiArrowSyncOutline } from "react-icons/ti";
import Storage from "../../utils/Storage";
import {
  Badge,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Modal,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { handleOpenDrawer } from "../../redux/reducers/auth";
import { useAppSelector } from "../../utils/useRedux";
import {
  ActivityIcon,
  KeyIcon,
  LogoutIcon,
  NotificationIcon,
  ProfileIcon,
} from "./assets/Svgs";
import Cookies from "js-cookie";
import { navigation } from "../../utils/navigation";
import { ToastSuccess } from "../../utils/Validate";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {}

const Header: React.FC<IProps> = (props) => {
  const [notificationAnchor, setNotificationAnchor] =
    useState<null | HTMLButtonElement>(null);
  const [accountAnchor, setAccountAnchor] = useState<null | HTMLButtonElement>(
    null
  );
  const { userData } = useAppSelector((state) => state.Auth);

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [ismodalOpen, setModalOpen] = useState<boolean>(false);
  const handleNotificationAnchor = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotifactionAnchorClose = () => {
    setNotificationAnchor(null);
  };

  const handleAccountAnchor = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAccountAnchor(event.currentTarget);
  };

  const handleAccountAnchorClose = () => {
    setAccountAnchor(null);
  };

  const handleMenuOpening = async () => {
    await dispatch(handleOpenDrawer());
  };
  const handlenotificationsDropdown = (option: string) => {
    handleAccountAnchorClose();
    handleNotifactionAnchorClose();
    switch (option) {
      case "settings":
        if (location.pathname === "/dashboard/settings") {
          return;
        }
        navigate("/dashboard/settings");

        break;
      case "postPurchase":
        if (location.pathname === "/dashboard/post-purchase") {
          return;
        }
        navigate("/dashboard/post-purchase");
        break;
      case "expiry":
        if (location.pathname === "/dashboard/expire-notifications") {
          return;
        }
        navigate("/dashboard/expire-notifications");
        break;
      case "birthday":
        if (location.pathname === "/dashboard/birthday-notifications") {
          return;
        }
        navigate("/dashboard/birthday-notifications");
        break;
    }
  };
  const handleLogout = () => {
    setModalOpen(false);
    Cookies.remove("token");
    setTimeout(() => {
      navigation.navigate("/");
    }, 100);
    ToastSuccess("Logout Successfully");
  };
  const handleModal = () => {
    handleAccountAnchorClose();
    setModalOpen(true);
  };
  const handleCancel = () => {
    setModalOpen(false);
  };
  const token = Storage.get("token");
  return (
    <Box component={"nav"} className={classes.backgroundCon}>
      <IconButton sx={style.menuIcon} onClick={handleMenuOpening}>
        <MenuIcon />
      </IconButton>
      <Box className={classes.inputCon}>
        <IoIosSearch />
        <Box component={"input"} placeholder={translate("header.search")} />
      </Box>
      <Box className={classes.userCon}>
        <IconButton onClick={handleNotificationAnchor}>
          <Badge badgeContent={4} color="error" className={classes.badgeCon}>
            <NotificationIcon />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={notificationAnchor}
          onClose={handleNotifactionAnchorClose}
          open={Boolean(notificationAnchor)}
          PaperProps={{
            sx: { ...style.notifyMenu, ...style.accountMenu },
          }}
        >
          <MenuItem>{translate("header.notificationText")}</MenuItem>
          <Divider />
          <MenuItem onClick={() => handlenotificationsDropdown("settings")}>
            <IconButton>
              <Box className={classes.notificationIconCon}>
                <IoMdSettings className={classes.notifiyIcon} />
              </Box>
            </IconButton>
            <Box>
              <Typography>{translate("header.settingsText")}</Typography>
              <Typography variant="body2">
                {translate("header.updateDashboardText")}
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={() => handlenotificationsDropdown("postPurchase")}>
            <IconButton>
              <Box className={classes.notificationIconCon}>
                <FaCalendarDays className={classes.notifiyIcon} />
              </Box>
            </IconButton>
            <Box>
              <Typography>{translate("header.postPurchaseText")}</Typography>
              <Typography variant="body2">
                {translate("header.eventUpdateText")}
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={() => handlenotificationsDropdown("expiry")}>
            <IconButton>
              <Box className={classes.notificationIconCon}>
                <BsFillPersonFill className={classes.notifiyIcon} />
              </Box>
            </IconButton>
            <Box>
              <Typography>{translate("header.expiryText")}</Typography>
              <Typography variant="body2">
                {translate("header.planExpireText")}
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={() => handlenotificationsDropdown("birthday")}>
            <IconButton>
              <Box className={classes.notificationIconCon}>
                <Box component={"img"} src={personIcon} />
              </Box>
            </IconButton>
            <Box>
              <Typography>
                {translate("header.birthNotificationText")}
              </Typography>
              <Typography variant="body2">
                {translate("header.nameText")}
              </Typography>
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem sx={style.seeAllNotificationText}>
            {translate("header.seeAllNotificationText")}
          </MenuItem>
        </Menu>
        <Box className="userDetailsCon">
          <Box
            component={"img"}
            src={userData?.image ? `${userData?.image}/${token}` : imgUrl}
            className={classes.girlIcon}
          />
          <Box className="userNameAndRole">
            <Typography>{userData?.fullName}</Typography>
            <Typography variant="body2">
              {translate("header.userRole")}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={handleAccountAnchor}>
          <RiArrowDownSLine className="downArrow" />
        </IconButton>
        <Menu
          open={Boolean(accountAnchor)}
          anchorEl={accountAnchor}
          onClose={handleAccountAnchorClose}
          anchorOrigin={{
            horizontal: "center",
            vertical: "bottom",
          }}
          PaperProps={{
            sx: style.accountMenu,
          }}
        >
          <MenuItem
            sx={style.myAccountTextCon}
            onClick={() => handlenotificationsDropdown("settings")}
          >
            <ProfileIcon />
            <Typography>{translate("header.manageAccText")}</Typography>
          </MenuItem>
          <Divider className={classes.removeDividerPadding} />
          <MenuItem
            sx={style.myAccountTextCon}
            onClick={() => handlenotificationsDropdown("settings")}
          >
            <KeyIcon />
            <Typography>{translate("header.changePasswordText")}</Typography>
          </MenuItem>
          <Divider className={classes.removeDividerPadding} />
          <MenuItem sx={style.myAccountTextCon}>
            <ActivityIcon />
            <Typography>{translate("header.activityLogText")}</Typography>
          </MenuItem>
          <Divider className={classes.removeDividerPadding} />
          <MenuItem sx={style.myAccountTextCon} onClick={handleModal}>
            <LogoutIcon />
            <Typography>{translate("header.logoutText")}</Typography>
          </MenuItem>
        </Menu>
        <Modal open={ismodalOpen} className={classes.modalStyles}>
          <Box className={classes.modalContainer}>
            <Typography sx={{ fontSize: "18px" }}>
              {translate("header.textLogoutConfirmation")}
            </Typography>
            <Box className={classes.modalButtonsContainer}>
              <Button sx={style.button} onClick={handleCancel}>
                {translate("header.textCancel")}
              </Button>
              <Button sx={style.button} onClick={handleLogout}>
                {translate("header.logoutText")}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Header;
