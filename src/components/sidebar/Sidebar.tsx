import React, { useState } from "react";
import { logo } from "./assets";
import {
  PlanSvgIconActive,
  PlanSvgIconInactive,
  ProductIcon,
  HelpAndSupport,
  AccessoriesIcon,
  TeamIcon,
} from "./assets/Svgs";
import { useStyles } from "./useStyles";
import { translate } from "../../config/i18n";
import { Box, Divider, Typography } from "@mui/material";

import { GoHomeFill } from "react-icons/go";
import { GoHome } from "react-icons/go";
import { MdInsertChartOutlined } from "react-icons/md";
import { MdInsertChart } from "react-icons/md";
import { HiOutlineChartPie } from "react-icons/hi2";
import { HiMiniChartPie } from "react-icons/hi2";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { BsBell } from "react-icons/bs";
import { RiDiscountPercentLine } from "react-icons/ri";
import { BsShop } from "react-icons/bs";
const navigationDataOne = [
  {
    id: 1,
    name: translate("sidebar.dashboardText"),
    Icon: GoHome,
    ActiveIcon: GoHomeFill,
    path: "/",
  },
  {
    id: 2,
    name: translate("sidebar.salesText"),
    Icon: MdInsertChartOutlined,
    ActiveIcon: MdInsertChart,
    path: "/sales",
  },
  {
    id: 3,
    name: translate("sidebar.planText"),
    Icon: PlanSvgIconInactive,
    ActiveIcon: PlanSvgIconActive,
    path: "/plan",
  },
  {
    id: 4,
    name: translate("sidebar.revenueText"),
    Icon: HiOutlineChartPie,
    ActiveIcon: HiMiniChartPie,
    path: "/revenue",
  },
  {
    id: 5,
    name: translate("sidebar.productsText"),
    Icon: ProductIcon,
    ActiveIcon: ProductIcon,
    path: "/products",
  },
];

const navigationDataTwo = [
  {
    id: 1,
    name: translate("sidebar.notificationText"),
    Icon: BsBell,
    ActiveIcon: BsBell,
    path: "/notification",
  },
  {
    id: 2,
    name: translate("sidebar.clamisText"),
    Icon: RiDiscountPercentLine,
    ActiveIcon: RiDiscountPercentLine,
    path: "/claims",
  },
  {
    id: 3,
    name: translate("sidebar.reportsText"),
    Icon: HiOutlineChatBubbleBottomCenterText,
    ActiveIcon: HiOutlineChatBubbleBottomCenterText,
    path: "/reports",
  },
  {
    id: 4,
    name: translate("sidebar.helpAndSupportText"),
    Icon: HelpAndSupport,
    ActiveIcon: HelpAndSupport,
    path: "/help-support",
  },
  {
    id: 5,
    name: translate("sidebar.shopText"),
    Icon: BsShop,
    ActiveIcon: BsShop,
    path: "/invoice",
  },
  {
    id: 6,
    name: translate("sidebar.accessoriesText"),
    Icon: AccessoriesIcon,
    ActiveIcon: AccessoriesIcon,
    path: "/accessories",
  },
  {
    id: 7,
    name: translate("sidebar.teamText"),
    Icon: TeamIcon,
    ActiveIcon: TeamIcon,
    path: "/team",
  },
];

const navigationDataThree = [
  {
    id: 1,
    name: translate("sidebar.settingsText"),
    Icon: MdOutlineSettings,
    ActiveIcon: MdOutlineSettings,
    path: "/settings",
  },
  {
    id: 2,
    name: translate("sidebar.logoutText"),
    Icon: MdOutlinePowerSettingsNew,
    ActiveIcon: MdOutlinePowerSettingsNew,
    path: "/logout",
  },
];

interface IProps {}

const Sidebar: React.FC<IProps> = (props) => {
  const [activePath, setActivePath] = useState<string>("/");

  const classes = useStyles();

  const handleActiePath = (path: string) => {
    setActivePath(path);
  };

  return (
    <Box className={`${classes.container} ${classes.greenBg}`}>
      <Box className={classes.logoCon}>
        <Box component={"img"} src={logo} sx={{ height: "41px" }} />
      </Box>
      <Box component={"ul"} className={classes.naviConOne}>
        {navigationDataOne.map((listItem) => {
          const isActive = activePath === listItem.path;
          return (
            <Box
              className={classes.sideBarCon}
              component={"li"}
              key={listItem.id}
              onClick={handleActiePath.bind(this, listItem.path)}
            >
              <Box className={!isActive ? "activeBar bar" : "activeBar"} />
              <Box className={isActive ? "iconCon activeIconCon" : "iconCon"}>
                {isActive && (
                  <listItem.ActiveIcon
                    className={
                      isActive ? `icon activeIcon` : `icon inActiceIcon`
                    }
                  />
                )}
                {!isActive && (
                  <listItem.Icon
                    className={
                      isActive ? `icon activeIcon ` : `icon inActiceIcon `
                    }
                  />
                )}
                <Typography className="iconName">{listItem.name}</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Divider className={classes.dividerCon} />
      <Box component={"ul"} className={classes.naviConTwo}>
        <Typography className={classes.otherText} variant="body2">
          {translate("sidebar.othersText")}
        </Typography>
        {navigationDataTwo.map((listItem) => {
          const isActive = activePath === listItem.path;
          return (
            <Box
              className={classes.sideBarCon}
              component={"li"}
              key={listItem.id}
              onClick={handleActiePath.bind(this, listItem.path)}
            >
              <Box className={!isActive ? "activeBar bar" : "activeBar"} />
              <Box className={isActive ? "iconCon activeIconCon" : "iconCon"}>
                <listItem.Icon
                  className={isActive ? "icon activeIcon" : "icon inActiceIcon"}
                />
                <Typography className="iconName">{listItem.name}</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Divider className={classes.dividerCon} />
      <Box component={"ul"} className={classes.naviConThree}>
        {navigationDataThree.map((listItem) => {
          const isActive = activePath === listItem.path;
          return (
            <Box
              className={classes.sideBarCon}
              component={"li"}
              key={listItem.id}
              onClick={handleActiePath.bind(this, listItem.path)}
            >
              <Box className={!isActive ? "activeBar bar" : "activeBar"} />
              <Box className={isActive ? "iconCon activeIconCon" : "iconCon"}>
                <listItem.Icon
                  className={isActive ? "icon activeIcon" : "icon inActiceIcon"}
                />
                <Typography className="iconName">{listItem.name}</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Sidebar;
