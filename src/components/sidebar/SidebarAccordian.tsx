import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logo, logoIcon } from "./assets";
import { NotificationIcon, LogoutIcon, LogoIcon } from "./assets/Svgs";
import { useStyles } from "./useStyles";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  styled,
} from "@mui/material";
import { TRouteNames, ERouteNames } from "../../utils/utils";

import { IoHomeSharp, IoCalendarNumber } from "react-icons/io5";
import { HiRectangleStack } from "react-icons/hi2";
import { BsShieldFillExclamation } from "react-icons/bs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdOutlineSettings } from "react-icons/md";
import { colors, hex2rgba } from "../../config/theme";
import Cookies from "js-cookie";
import { navigation } from "../../utils/navigation";
import { ToastSuccess } from "../../utils/Validate";
import { useAppDispatch } from "../../utils/useRedux";
import { setmonthSalesReport } from "../../redux/reducers/dashBoard";
import { setNotificationTypeReducer } from "../../redux/reducers/notifications";
import { setReportsType } from "../../redux/reducers/reports";
import { formatPath } from "../../utils/formatPath";
interface IRoutes {
  path: ERouteNames;
  value: string;
}

export const accordianRadius = "0.5rem";

export const summaryHeight = "3rem";

export const StyledAccordian = styled(Accordion)(
  ({ expanded }: { expanded?: boolean }) => ({
    boxShadow: "none",
    backgroundColor: expanded ? hex2rgba(colors.white, 0.4) : "transparent",
    color: expanded ? colors.primaryGreen : colors.white,
    marginBottom: "1rem",
    borderRadius: accordianRadius,
    borderBottom: "none",
    padding: "0.25rem 0.5rem ",
    transition: "all .5s ease",
    "&:before": {
      display: "none",
    },
    ":first-of-type": {
      borderRadius: accordianRadius,
    },
    "&:hover": {
      backgroundColor: hex2rgba(colors.white, 0.4),
    },
    "& p": {
      color: expanded ? colors.primaryGreen : `${colors.white} !important`,
      fontWeight: "700 !important",
    },
  })
);

export const StyledAccordianSummary = styled(AccordionSummary)(
  (expanded: { expanded: boolean }) => ({
    padding: 0,
    height: summaryHeight,
    minHeight: summaryHeight,
    "&.Mui-expanded": {
      borderBottom: `1px solid ${colors.tertiaryYellow}`,
      minHeight: summaryHeight,
      height: summaryHeight,
      margin: 0,
      color: colors.primaryGreen,
    },
  })
);

const homeRoutes: IRoutes[] = [
  {
    path: ERouteNames.Dashboard,
    value: "Dashboard",
  },
  {
    path: ERouteNames.ProtectionPlan,
    value: "Protection Plan",
  },
  {
    path: ERouteNames.ExtendedWaranty,
    value: "Extended Warranty",
  },
];

const legalRoutes: IRoutes[] = [
  {
    path: ERouteNames.TermsCondition,
    value: "Terms & Condition ",
  },
];

const notificationsList: IRoutes[] = [
  {
    path: ERouteNames.PostPurchase,
    value: "Post-Purchase ",
  },
  {
    path: ERouteNames.ExpireNotifications,
    value: "Expiry Notifications",
  },
  {
    path: ERouteNames.BirthdayNotifications,
    value: "Birthday Notifications",
  },
  {
    path: ERouteNames.TemplateManagement,
    value: "Template Management",
  },
];

const managementList: IRoutes[] = [
  {
    path: ERouteNames.ProductsManagement,
    value: "Products Management",
  },
  {
    path: ERouteNames.Banners,
    value: "Banners",
  },

  {
    path: ERouteNames.BirthdayOffer,
    value: "Birthday Offer",
  },
  {
    path: ERouteNames.CouponManagement,
    value: "Coupon Management",
  },
];

const reportsList: IRoutes[] = [
  {
    path: ERouteNames.CertificateReport,
    value: "Certificate Report",
  },
  {
    path: ERouteNames.BirthdayReport,
    value: "Birthday Report",
  },
  {
    path: ERouteNames.ExpiryReport,
    value: "Expire Report",
  },
  {
    path: ERouteNames.PaymentReport,
    value: "Payment Report",
  },
  {
    path: ERouteNames.CustomReport,
    value: "Custom Report",
  },
];

const sideBarList = [
  {
    Icon: IoHomeSharp,
    value: "Home",
    list: homeRoutes,
  },
  {
    Icon: HiRectangleStack,
    value: "Reports",
    list: reportsList,
  },
  {
    Icon: IoCalendarNumber,
    value: "Management",
    list: managementList,
  },
  {
    Icon: NotificationIcon,
    value: "Notification",
    list: notificationsList,
  },
  {
    Icon: BsShieldFillExclamation,
    value: "Legal",
    list: legalRoutes,
  },
];

interface IProps {}

const SidebarAccordian: React.FC<IProps> = (props) => {
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState<TRouteNames>(
    ERouteNames.Dashboard
  );
  const [activePathList, setActivePathList] = useState<IRoutes[]>(homeRoutes);
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const paths = [
    "post-purchase",
    "expire-notifications",
    "birthday-notifications",
    "all-notifications",
  ];
  useEffect(() => {
    navigate(activePath === "/dashboard" ? activePath : `${activePath}`);
  }, [activePath]);

  useEffect(() => {
    if (paths.includes(formatPath(location.pathname))) {
      const indx = paths.indexOf(formatPath(location.pathname));
      const pathNames = [
        ERouteNames.PostPurchase,
        ERouteNames.ExpireNotifications,
        ERouteNames.BirthdayNotifications,
        ERouteNames.AllNotifications,
      ];
      const route = formatPath(location.pathname);
      setActivePath(route as TRouteNames);
      setActivePathList(notificationsList);
    } else if (formatPath(location.pathname) === ERouteNames.Settings) {
      setActivePath(ERouteNames.Settings as TRouteNames);
      setActivePathList([]);
    }
  }, [location.pathname]);
  const handleActivePannel =
    (routesList: IRoutes[]) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (
        (isExpanded && activePathList.length !== 0) ||
        isLogoutAndSettingPath(activePath)
      ) {
        setActivePathList(routesList);
        if (
          (routesList.at(0)?.path as TRouteNames) === ERouteNames.PostPurchase
        ) {
          setActivePath(ERouteNames.AllNotifications);
          dispatch(setNotificationTypeReducer("All notifications"));
        } else {
          setActivePath(routesList.at(0)?.path as TRouteNames);
        }
      } else {
        if (
          routesList.findIndex((listItem) => listItem.path === activePath) !==
            -1 &&
          activePathList.length !== 0
        ) {
          setActivePathList([]);
        } else {
          setActivePathList(routesList);
        }
      }
    };

  const isActivePath = (path: TRouteNames) => {
    return path === activePath;
  };

  const handleActivePath = (path: TRouteNames) => () => {
    dispatch(setReportsType(""));
    dispatch(setmonthSalesReport(""));
    setActivePath(path);
    if (
      path === ERouteNames.PostPurchase ||
      path === ERouteNames.ExpireNotifications ||
      path === ERouteNames.BirthdayNotifications
    ) {
      const paths = [
        "all-notifications",
        "post-purchase",
        "expire-notifications",
        "birthday-notifications",
      ];
      const notificationTypes = [
        "All Notifications",
        "Post Purchase",
        "Expiry Notifications",
        "Birthday",
      ];
      const indx = paths.indexOf(path);
      dispatch(setNotificationTypeReducer(notificationTypes[indx]));
    } else if (path === ERouteNames.TemplateManagement) {
      dispatch(setNotificationTypeReducer("All Notifications"));
    }
    if (isLogoutAndSettingPath(path)) {
      setActivePathList([]);
      if (path === "logout") {
        handleLogout();
      }
    }
  };
  const isLogoutAndSettingPath = (path: TRouteNames) => {
    return ["settings", "logout"].includes(path);
  };
  const isExpandedAccordian = (list: IRoutes[]) => {
    return JSON.stringify(activePathList) === JSON.stringify(list);
  };
  const handleLogout = () => {
    Cookies.remove("token");
    setTimeout(() => {
      navigation.navigate("/");
    }, 500);
    ToastSuccess("Logout Successfully");
  };

  return (
    <Box className={`${classes.container} ${classes.responsiveCon}`}>
      <Box className={`${classes.greenBg} ${classes.responsiveConTwo}`}>
        <Box className={classes.logoCon}>
          <Box component={"img"} src={logo} sx={{ height: "41px" }} />
        </Box>
        <Box component={"ul"} className={classes.naviConOne}>
          {sideBarList.map(({ Icon, ...sidebar }) => (
            <StyledAccordian
              key={sidebar.value}
              onChange={handleActivePannel(sidebar.list)}
              expanded={isExpandedAccordian(sidebar.list)}
            >
              <StyledAccordianSummary
                expanded={isExpandedAccordian(sidebar.list)}
                expandIcon={<ExpandMoreIcon className="icon" />}
              >
                <Box className={classes.accoMenuItem}>
                  <Icon className="icon icon-accordian" />
                  <Typography>{sidebar.value}</Typography>
                </Box>
              </StyledAccordianSummary>
              <AccordionDetails>
                {sidebar.list.map((listItem) => (
                  <MenuItem
                    key={listItem.path}
                    onClick={handleActivePath(listItem.path as TRouteNames)}
                    className={
                      isActivePath(listItem.path as TRouteNames)
                        ? classes.accoMenuItem
                        : classes.activeAccMenuItem
                    }
                  >
                    {listItem.value}
                  </MenuItem>
                ))}
              </AccordionDetails>
            </StyledAccordian>
          ))}
          <Box
            className={`${classes.accoMenuItem2} ${classes.settingButton} ${
              isActivePath(ERouteNames.Settings) && classes.yellowBg
            }`}
            onClick={handleActivePath(ERouteNames.Settings)}
          >
            <MdOutlineSettings className="icon icon-accordian" />
            <Typography>{"Settings"}</Typography>
          </Box>
          <Box
            className={`${classes.accoMenuItem2} ${classes.settingButton} ${
              classes.logoutButton
            } ${isActivePath(ERouteNames.Logout) && classes.yellowBg}`}
            onClick={handleActivePath(ERouteNames.Logout)}
          >
            <LogoutIcon className="icon icon-accordian" />
            <Typography>{"Logout"}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarAccordian;
