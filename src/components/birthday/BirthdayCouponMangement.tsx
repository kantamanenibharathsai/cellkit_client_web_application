import { ChangeEvent, useEffect, useState } from "react";
import { translate } from "../../config/i18n";
import CommonButton from "../common/commonButton/CommonButton";
import { style, useStyles } from "./useStyles";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useAppDispatch, useAppSelector } from "../../utils/useRedux";
import {
  createNewCoupons,
  EditCoupons,
  setIsEdit,
} from "../../redux/reducers/couponManagement";
import { displayAlert, parseResponseError } from "../../utils/toastMessage";
import { navigation } from "../../utils/navigation";
import { ToastSuccess } from "../../utils/Validate";
import { RiArrowDownSLine } from "react-icons/ri";

export interface NewCoupon {
  id?: number | null;
  couponCode: string;
  description: string;
  discountValue: string;
  discountPercentage: string;
  discountType: string;
  startDate: string;
  expiryDate: string;
  perUser: string;
  overAllLimit: string;
  products: (string | number)[];
  categories: (string | number)[];
  couponType: string;
  minCartValue: string;
  deleteProducts: number[];
  deleteCategories: number[];
}
function BirthdayCouponMangement() {
  const classes = useStyles();
  const [newCoupon, setNewCoupon] = useState<NewCoupon>({
    id: null,
    couponCode: "",
    description: "",
    discountValue: "",
    discountPercentage: "",
    discountType: "",
    startDate: "",
    expiryDate: "",
    perUser: "",
    overAllLimit: "",
    products: [],
    categories: [],
    couponType: "birthdaycoupon",
    minCartValue: "1000",
    deleteProducts: [0],
    deleteCategories: [0],
  });

  const dispatch = useAppDispatch();
  const { isEditingCoupon, editingProduct } = useAppSelector(
    (state) => state.Coupons
  );

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const {
      target: { value, name },
    } = event;

    setNewCoupon((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelect = (
    event: SelectChangeEvent<typeof newCoupon.discountValue>
  ) => {
    setNewCoupon({
      ...newCoupon,
      discountType: event.target.value,
    });
  };

  const createCoupon = async () => {
    const response = await dispatch(createNewCoupons(newCoupon));
    if (response.payload.status) {
      displayAlert(response.payload.message);
      navigation.navigate("dashboard/birthday-offer");
    } else {
      parseResponseError("error");
    }
    setNewCoupon({
      id: null,
      couponCode: "",
      description: "",
      discountValue: "",
      discountPercentage: "",
      discountType: "",
      startDate: "",
      expiryDate: "",
      perUser: "",
      overAllLimit: "",
      products: [],
      categories: [],
      couponType: "birthdaycoupon",
      minCartValue: "1000",
      deleteProducts: [0],
      deleteCategories: [0],
    });
  };
  const discardCoupon = () => {
    setNewCoupon({
      id: null,
      couponCode: "",
      description: "",
      discountValue: "",
      discountPercentage: "",
      discountType: "",
      startDate: "",
      expiryDate: "",
      perUser: "",
      overAllLimit: "",
      products: [],
      categories: [],
      couponType: "birthdaycoupon",
      minCartValue: "1000",
      deleteProducts: [0],
      deleteCategories: [0],
    });
  };
  const updateCoupon = async () => {
    const response = await dispatch(
      EditCoupons({ id: newCoupon.id!, data: newCoupon })
    );
    if (response.payload) {
      ToastSuccess(response.payload.message);
    }
    navigation.navigate("dashboard/birthday-offer");
    setNewCoupon({
      id: null,
      couponCode: "",
      description: "",
      discountValue: "",
      discountPercentage: "",
      discountType: "",
      startDate: "",
      expiryDate: "",
      perUser: "",
      overAllLimit: "",
      products: [],
      categories: [],
      couponType: "birthdaycoupon",
      minCartValue: "1000",
      deleteProducts: [0],
      deleteCategories: [0],
    });
  };
  useEffect(() => {
    if (editingProduct) {
      setNewCoupon({
        id: editingProduct.id,
        couponCode: editingProduct.code,
        description: editingProduct.description,
        discountValue: String(editingProduct.discountPercentage ?? ""),
        discountPercentage: String(editingProduct.discountPercentage ?? ""),
        discountType: editingProduct.discountType.toString(),
        startDate: editingProduct.startDate,
        expiryDate: editingProduct.expiryDate,
        perUser: editingProduct.perUser.toString(),
        overAllLimit: editingProduct.overallLimit.toString(),
        products: [],
        categories: [],
        couponType: "birthdaycoupon",
        minCartValue: editingProduct.minCartValue.toString(),
        deleteCategories: [0],
        deleteProducts: [0],
      });
    }
  }, [editingProduct]);
  useEffect(() => {
    return () => {
      dispatch(setIsEdit(false));
    };
  }, []);
  const handleReturn = () => {
    navigation.navigate("dashboard/birthday-offer");
  };
  return (
    <Box className={classes.container} p="22px">
      <Box className={classes.backIconAndTitleContainer}>
        <IconButton onClick={handleReturn}>
          <RiArrowDownSLine className={classes.leftArrow} />
        </IconButton>
        <Typography variant="h4" className={classes.mainHeading}>
          {isEditingCoupon
            ? translate("BirthdayCoupon.textEditCoupon")
            : translate("BirthdayCoupon.textAddNewCoupon")}
        </Typography>
      </Box>
      <Grid container spacing={2} className={classes.paper}>
        <Grid size={{ xl: 6, md: 12, xs: 12 }}>
          <Box className={classes.fieldContainer}>
            <Typography className={classes.label} mt={0}>
              {translate("BirthdayCoupon.textCouponCode")} :
            </Typography>
            <TextField
              type="text"
              sx={style.overallLimitAndSelect}
              className={classes.textInputfield}
              name="couponCode"
              value={newCoupon.couponCode}
              placeholder="Auto-generate"
              onChange={handleChange}
            />
          </Box>
          <Box className={classes.fieldContainer}>
            <Typography className={classes.label}>
              {translate("BirthdayCoupon.textDescription")} :
            </Typography>
            <TextField
              type="text"
              name="description"
              sx={style.commonTextInput}
              value={newCoupon.description}
              placeholder="Description"
              onChange={handleChange}
            />
          </Box>
          <Box className={classes.fieldContainer}>
            <Typography className={classes.label}>
              {translate("BirthdayCoupon.textDiscountValue")} :
            </Typography>
            <TextField
              type="text"
              name="discountValue"
              value={newCoupon.discountValue}
              sx={style.commonTextInput}
              placeholder="30%"
              onChange={handleChange}
            />
          </Box>
          <Box className={classes.fieldContainer}>
            <Typography className={classes.label}>
              {translate("BirthdayCoupon.textDiscountType")} :
            </Typography>
            <Select
              sx={style.commonTextInput}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newCoupon.discountType}
              placeholder="Post-Purchase"
              onChange={handleSelect}
            >
              <MenuItem value={"Percentage"}>Percentage</MenuItem>
            </Select>
          </Box>
          <Box className={classes.fieldContainer}>
            <Typography className={classes.label} mt={0}>
              {translate("BirthdayCoupon.textValidityPeriod")} :
            </Typography>
            <TextField
              type="date"
              name="startDate"
              value={newCoupon.startDate}
              classes={{ root: classes.InputRoot }}
              className={classes.textfield}
              sx={style.commonDateInput}
              onChange={handleChange}
            />
          </Box>
          <TextField
            type="date"
            name="expiryDate"
            value={newCoupon.expiryDate}
            classes={{ root: classes.InputRoot }}
            className={classes.textfield}
            sx={style.commonDateInput}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xl: 6, md: 12, xs: 12 }}>
          <Box className={classes.fieldContainer}>
            <Typography className={classes.label}>
              {translate("BirthdayCoupon.textPerUser")} :
            </Typography>
            <TextField
              type="text"
              className={classes.textInputfield}
              name="perUser"
              value={newCoupon.perUser}
              placeholder={translate("BirthdayCoupon.textPerUser")}
              onChange={handleChange}
            />
          </Box>
          <Box className={classes.fieldContainer}>
            <Typography className={classes.label}>
              {translate("BirthdayCoupon.textOverallLimit")} :
            </Typography>
            <TextField
              type="text"
              sx={style.overallLimitAndSelect}
              value={newCoupon.overAllLimit}
              className={classes.textInputfield}
              name="overAllLimit"
              placeholder={translate("BirthdayCoupon.textOverallLimit")}
              onChange={handleChange}
            />
          </Box>
        </Grid>
        <Grid size={12}>
          <Box className={classes.bottomBtnsContainer}>
            <CommonButton
              title={
                isEditingCoupon
                  ? translate("BirthdayCoupon.textUpdateCoupon")
                  : translate("BirthdayCoupon.textSaveCoupon")
              }
              styles={style.button}
              onClick={isEditingCoupon ? updateCoupon : createCoupon}
            />
            <CommonButton
              title={translate("BirthdayCoupon.textCancel")}
              styles={style.button}
              onClick={discardCoupon}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BirthdayCouponMangement;
