import React, { useEffect } from "react";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../header/Header";
import SidebarAccordian from "../../sidebar/SidebarAccordian";
import { useStyles } from "./useStyle";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenDrawer } from "../../../redux/reducers/auth";
import { RootState } from "../../../redux/store";
import { theme } from "../../../config/theme";

interface IProps {}

const HeaderSideBarOutlet: React.FC<IProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.Auth.openDrawer);
  const handleClose = () => {
    dispatch(handleOpenDrawer());
  };
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      <Box className={classes.container}>
        {isLargeScreen && <SidebarAccordian />}
        <Drawer open={open && !isLargeScreen} onClose={handleClose}>
          <SidebarAccordian />
        </Drawer>
        <Box className={classes.outletHeaderCon}>
          <Header />
          <Box className={classes.overflowCon}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HeaderSideBarOutlet;
