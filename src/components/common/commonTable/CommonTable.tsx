import React, { ReactElement, useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Divider,
  Modal,
  Button,
} from "@mui/material";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";

import { useStyles, style } from "./useStyle";
import { profileIcon } from "./assets";
import { IconType } from "react-icons";
import { useLocation } from "react-router-dom";
import { ERouteNames } from "../../../utils/utils";
import { colors } from "../../../config/theme";
import { translate } from "../../../config/i18n";
import { useAppDispatch } from "../../../utils/useRedux";
import { deleteBanner } from "../../../redux/reducers/banners";
import { ToastSuccess } from "../../../utils/Validate";
import { deleteCoupon } from "../../../redux/reducers/couponManagement";
import { deleteNotification } from "../../../redux/reducers/notifications";
import { formatPath } from "../../../utils/formatPath";

export enum ETableNames {
  Trigger = "Trigger",
  ItemCode = "Item/Model Code",
  Item = "Item/Model",
  MRP = "MRP",
  Brand = "Brand",
  Sellingprice = "SELLING PRICE",
  CustomerName = "Customer Name",
  Location = "Location",
  ProductName = "Product Name",
  Description = "Description",
  Category = "Category",
  IMEI = "IMEI",
  DateTime = "Date-Time",
  Price = "Price",
  ProtectionPlan = "Protection Plan",
  PlanStatus = "Plan Status",
  Actions = "Actions",
  ID = "id",
  Image = "image",
  PlanType = "Plan Type",
  Registered = "Registered",
  RegistrationDate = "Registration Date",
  PlanEndDate = "Plan End Date",
  Sold = "Sold",
  CertificatesGenerated = "Certificates Generated",
  UserID = "User ID",
  FullName = "Full Name",
  Email = "Email",
  PhoneNumber = "Phone Number",
  CertificateID = "Certificate ID",
  UserName = "User Name",
  IssueDate = "Issue Date",
  ExpiredDate = "Expired Date",
  GraphicPreview = "Graphic Preview",
  MessagePreview = "Message Preview",
  DisplayPeriod = "Display Period",
  ExpiredPeriod = "Expired Period",
  PlanDetails = "Plan Details",
  ExpirationDate = "Expiration Date",
  Status = "Status",
  TransactionID = "Transaction ID",
  Amount = "Amount",
  PaymentMethod = "Payment Method ",
  MobileName = "Mobile Name",
  PlanName = "Plan Name",
  PlanValue = "Plan value ",
  StartDate = "Start Date",
  BannerImage = "Banner Image",
  EndDate = "End Date",
  Target = "Target",
  TotalPoints = "Total Points",
  CouponCode = "Coupon Code",
  DiscountValue = "Discount Value",
  ValidityPeriod = "Validity Period",
  MaxUsageUser = "Max usage/user",
  Type = "Type",
  Title = "Title",
  Scheduled = "Scheduled",
  Delivery = "Delivery",
  TemplateName = "Template Name",
  NotificationType = "Notification Type",
  CreatedBy = "Created By",
  LastModified = "Last Modified",
}

export type IData = {
  [key in ETableNames]?: string;
};

export type TThreedotsActions = "addNew" | "editProduct" | "delete";

interface IProps {
  titles: Array<ETableNames>;
  data: Array<IData>;
  MenuItems?: ReactElement;
  handleActions?: (action: TThreedotsActions, id: string) => void;
  handleProfile?: (data: any) => void;
  editAProduct?: (data: any) => void;
}

interface IMenuList {
  key: TThreedotsActions;
  value: string;
  Icon?: IconType;
}
const menuList: IMenuList[] = [
  {
    key: "addNew",
    value: "Add New",
  },
  {
    key: "editProduct",
    value: "Edit Product",
  },
  {
    key: "delete",
    value: "Delete",
    Icon: RiDeleteBin5Line,
  },
];

const CommonTable: React.FC<IProps> = ({
  titles,
  data,
  MenuItems,
  handleActions,
  handleProfile,
  editAProduct,
}) => {
  const [anchorEle, setAnchorEle] = useState<null | HTMLButtonElement>(null);
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [ismodalOpen, setModalOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const open = Boolean(anchorEl);
  const handleModal = () => {
    setModalOpen(true);
  };
  const handleCancel = () => {
    setDeleteItemId(null);
    setModalOpen(false);
  };
  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    data: any
  ) => {
    setDeleteItemId(data.ID);
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    switch (formatPath(location.pathname)) {
      case ERouteNames.Banners:
        {
          const response = await dispatch(deleteBanner(deleteItemId!));
          if (response.payload?.status) {
            ToastSuccess(response.payload.message);
          }
        }
        break;
      case ERouteNames.BirthdayOffer:
        {
          const response = await dispatch(deleteCoupon(deleteItemId!));
          if (response.payload?.status) {
            ToastSuccess(response.payload.message);
          }
        }
        break;
      case ERouteNames.CouponManagement:
        {
          const response = await dispatch(deleteCoupon(deleteItemId!));
          if (response.payload?.status) {
            ToastSuccess(response.payload.message);
          }
        }
        break;
      case ERouteNames.TemplateManagement:
        {
          const response = await dispatch(deleteNotification(deleteItemId!));
          if (response.payload?.status) {
            ToastSuccess(response.payload.message);
          }
        }
        break;
      case ERouteNames.AllNotifications:
        {
          const response = await dispatch(deleteNotification(deleteItemId!));
          if (response.payload?.status) {
            ToastSuccess(response.payload.message);
          }
        }
        break;
      case ERouteNames.PostPurchase:
        {
          const response = await dispatch(deleteNotification(deleteItemId!));
          if (response.payload?.status) {
            ToastSuccess(response.payload.message);
          }
        }
        break;
      case ERouteNames.ExpireNotifications:
        {
          const response = await dispatch(deleteNotification(deleteItemId!));
          if (response.payload?.status) {
            ToastSuccess(response.payload.message);
          }
        }
        break;
      case ERouteNames.BirthdayNotifications:
        {
          const response = await dispatch(deleteNotification(deleteItemId!));
          if (response.payload?.status) {
            ToastSuccess(response.payload.message);
          }
        }
        break;
    }
    setAnchorEl(null);
    setDeleteItemId(null);
    setModalOpen(false);
  };
  const handleMenuClose = () => {
    setAnchorEle(null);
  };

  const handleAction = (action: TThreedotsActions, id: string) => () => {
    handleActions && handleActions(action, id);
    handleMenuClose();
  };

  const renderBody = (
    column: ETableNames,
    { id, ...data }: Record<string, string>
  ) => {
    let value: ReactElement;
    switch (column) {
      case ETableNames.CustomerName:
      case ETableNames.UserName:
        value = (
          <TableCell key={column} className="profileCon">
            <Box className="profileSubCon">
              <Avatar src={data.image || profileIcon} />
              <Typography>{data[column]}</Typography>
              <Box></Box>
            </Box>
          </TableCell>
        );
        break;
      case ETableNames.GraphicPreview:
        value = (
          <TableCell key={column} className="profileCon previewCon">
            <Avatar src={data.image || profileIcon} />
          </TableCell>
        );
        break;
      case ETableNames.Actions:
        value = (
          <TableCell key={column}>
            {handleProfile && (
              <IconButton
                className={classes.threeDotsIcon}
                onClick={() => handleProfile(data)}
              >
                <BsThreeDots />
              </IconButton>
            )}
            {editAProduct && (
              <IconButton
                className={classes.threeDotsIcon}
                onClick={(event) => handlePopoverOpen(event, data)}
              >
                <BsThreeDots />
              </IconButton>
            )}
            {handleActions && (
              <IconButton
                className={classes.threeDotsIcon}
                onClick={() => handleActions("addNew", id)}
              >
                <BsThreeDots />
              </IconButton>
            )}
            <Menu
              anchorEl={anchorEle}
              open={Boolean(anchorEle)}
              onClose={handleMenuClose}
              PaperProps={{ sx: style.menuCon }}
            >
              {MenuItems ||
                menuList.map(({ value, key, Icon }) => (
                  <MenuItem
                    key={key}
                    onClick={handleAction(key, id)}
                    className={classes.menuItem}
                  >
                    {Icon && (
                      <IconButton className="iconCon">
                        <Icon className="icon" />
                      </IconButton>
                    )}
                    <Typography>{value}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </TableCell>
        );
        break;
      case ETableNames.PlanStatus:
        const isActive = data[column] === "Active";
        value = (
          <TableCell key={column}>
            {
              <Typography className={`chip ${isActive ? "active" : "expired"}`}>
                {data[column]}
              </Typography>
            }
          </TableCell>
        );
        break;
      case ETableNames.ProtectionPlan:
        let isOneYearPlan = data[column] === "Extended Warranty";
        value = isOneYearPlan ? (
          <TableCell key={column}>
            <Typography>{data[column]}</Typography>
            <Typography className="chip yearPlan">{"1 Year plan"}</Typography>
          </TableCell>
        ) : (
          <TableCell key={column}>{data[column]}</TableCell>
        );
        break;
      case ETableNames.BannerImage:
        value = (
          <TableCell key={column} className="profileCon">
            <Box
              component={"img"}
              src={data.image || profileIcon}
              sx={style.smallImg}
              alt="banner"
            />
          </TableCell>
        );
        break;
      case ETableNames.Status:
        if (
          formatPath(location.pathname) === ERouteNames.PostPurchase ||
          formatPath(location.pathname) === ERouteNames.AllNotifications ||
          formatPath(location.pathname) === ERouteNames.BirthdayNotifications ||
          formatPath(location.pathname) === ERouteNames.ExpireNotifications ||
          formatPath(location.pathname) === ERouteNames.ProtectionPlan ||
          formatPath(location.pathname) === ERouteNames.ExtendedWaranty
        ) {
          const isActive = data[column] === "Active";
          value = (
            <TableCell key={column}>
              {
                <Box className="status">
                  <Typography
                    className={`chip ${isActive ? "active" : "paused"}`}
                  >
                    {data[column]}
                  </Typography>
                </Box>
              }
            </TableCell>
          );
        } else {
          value = <TableCell key={column}>{data[column]}</TableCell>;
        }
        break;
      case ETableNames.TemplateName:
      case ETableNames.Type:
        value = (
          <TableCell key={column}>
            <Typography className="type">
              {data[column].toLowerCase()}
            </Typography>
          </TableCell>
        );
        break;
      default:
        value = <TableCell key={column}>{data[column]}</TableCell>;
    }

    return value;
  };
  return (
    <Box className={classes.container}>
      <Table>
        <TableHead>
          <TableRow className={classes.tableTitleCon}>
            {titles?.map((title) => (
              <TableCell key={title}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow className={classes.tableDataCon} key={`row-${index}`}>
              {titles.map((title) => renderBody(title, row))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={ismodalOpen} className={classes.modalStyles}>
        <Box className={classes.modalContainer}>
          <Typography sx={{ fontSize: "18px" }}>
            {translate("commonTable.textSureDelete")}
          </Typography>
          <Box className={classes.modalButtonsContainer}>
            <Button sx={style.button} onClick={handleCancel}>
              {translate("commonTable.textCancel")}
            </Button>
            <Button sx={style.button} onClick={handleDelete}>
              {translate("commonTable.textDelete")}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={style.popover}
        onClose={handlePopoverClose}
      >
        {formatPath(location.pathname) !== ERouteNames.Banners && (
          <>
            <Typography
              sx={style.editAndDelete}
              onClick={() => editAProduct?.(deleteItemId)}
            >
              Edit
            </Typography>
            <Divider />
          </>
        )}
        <Typography sx={style.editAndDelete} onClick={() => handleModal()}>
          Delete
        </Typography>
      </Popover>
    </Box>
  );
};

export default CommonTable;
