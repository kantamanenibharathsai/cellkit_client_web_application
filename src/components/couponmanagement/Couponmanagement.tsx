import {
  Box,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { style, useStyles } from "./useStyles";
import { translate } from "../../config/i18n";
import CommonButton from "../common/commonButton/CommonButton";
import Grid from "@mui/material/Grid2";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/useRedux";
import { getCategory, getProducts } from "../../redux/reducers/products";
import {
  createNewCoupons,
  EditCoupons,
  setIsEdit,
} from "../../redux/reducers/couponManagement";
import {
  onlyNumbersRegx,
  ToastError,
  ToastSuccess,
} from "../../utils/Validate";
import { navigation } from "../../utils/navigation";
import { colors } from "../../config/theme";
import { RiArrowDownSLine } from "react-icons/ri";
export interface NewCoupon {
  id?: number | null;
  description: string;
  couponCode?: string;
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

interface IState {
  newCoupon: NewCoupon;
  errors: {
    descriptionError?: string;
    discountValueError?: string;
    startDateError?: string;
    expiryDateError?: string;
    perUserError?: string;
    overAllLimitError?: string;
    productsError?: string;
    categoriesError?: string;
    minCartValueError?: string;
  };
}

const discountTypesArr = ["Percentage", "Fixed"];

const Couponmanagement = () => {
  const classes = useStyles();
  const [newCoupon, setNewCoupon] = useState<IState["newCoupon"]>({
    id: null,
    description: "",
    couponCode: "",
    discountValue: "",
    discountPercentage: "",
    discountType: "",
    startDate: "",
    expiryDate: "",
    perUser: "",
    overAllLimit: "",
    products: [],
    categories: [],
    couponType: "coupon",
    minCartValue: "",
    deleteProducts: [0],
    deleteCategories: [0],
  });
  const [errors, setErrors] = useState<IState["errors"]>({
    descriptionError: "",
    discountValueError: "",
    startDateError: "",
    expiryDateError: "",
    perUserError: "",
    overAllLimitError: "",
    productsError: "",
    categoriesError: "",
    minCartValueError: "",
  });

  const dispatch = useAppDispatch();
  const { allProducts, categories } = useAppSelector((state) => state.Products);
  const { isEditingCoupon, editingProduct } = useAppSelector(
    (state) => state.Coupons
  );

  const handleProductChange = (
    event: SelectChangeEvent<typeof newCoupon.products>
  ) => {
    const {
      target: { value },
    } = event;

    setNewCoupon((prev) => ({
      ...prev,
      products: typeof value === "string" ? value.split(",") : value,
    }));
  };
  const handleCategoriesChange = (
    event: SelectChangeEvent<typeof newCoupon.categories>
  ) => {
    const {
      target: { value },
    } = event;

    setNewCoupon((prev) => ({
      ...prev,
      categories: typeof value === "string" ? value.split(",") : value,
    }));
  };

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

  const validateForm = () => {
    let warningsArr: {
      descriptionError?: string;
      discountValueError?: string;
      startDateError?: string;
      expiryDateError?: string;
      perUserError?: string;
      overAllLimitError?: string;
      productsError?: string;
      categoriesError?: string;
      minCartValueError?: string;
    } = { ...errors };
    if (!newCoupon.description!) {
      warningsArr.descriptionError = "Description is required";
    } else {
      delete warningsArr?.descriptionError;
    }
    if (!newCoupon.discountValue!) {
      warningsArr.discountValueError = "Discount Value is required";
    } else {
      delete warningsArr.discountValueError;
    }
    if (!newCoupon.startDate) {
      warningsArr.startDateError = "Start Date is required";
    } else {
      delete warningsArr.startDateError;
    }
    if (!newCoupon.expiryDate) {
      warningsArr.expiryDateError = "End Date is required";
    } else {
      delete warningsArr.expiryDateError;
    }
    if (!newCoupon.perUser) {
      warningsArr.perUserError = "Per user is required";
    } else if (!onlyNumbersRegx.test(newCoupon.perUser)) {
      warningsArr.perUserError = "Per user should be a valid number";
    } else {
      delete warningsArr.perUserError;
    }

    if (!newCoupon.overAllLimit) {
      warningsArr.overAllLimitError = "Over all limit is required";
    } else if (!onlyNumbersRegx.test(newCoupon.overAllLimit)) {
      warningsArr.overAllLimitError = "Over All Limit should be a valid number";
    } else {
      delete warningsArr.overAllLimitError;
    }

    if (newCoupon.products.length === 0) {
      warningsArr.productsError = "At least one product is required";
    } else {
      delete warningsArr.productsError;
    }
    if (newCoupon.categories.length === 0) {
      warningsArr.categoriesError = "At least one category should be selected";
    } else {
      delete warningsArr.categoriesError;
    }
    if (!newCoupon.minCartValue) {
      warningsArr.minCartValueError = "Min Cart Value is required";
    } else if (!onlyNumbersRegx.test(newCoupon.minCartValue)) {
      warningsArr.minCartValueError = "Min Cart Value should be a valid number";
    } else {
      delete warningsArr.minCartValueError;
    }
    setErrors(warningsArr);
    return Object.keys(warningsArr).length === 0;
  };

  const createCoupon = async () => {
    if (validateForm()) {
      const response = await dispatch(createNewCoupons(newCoupon));
      if (response.payload?.status) {
        ToastSuccess(translate("Couponmanagement.textCouponAddedSuccessfully"));
        navigation.navigate("dashboard/coupon-management");
        setTimeout(() => {
          discardCoupon();
        }, 800);
      } else {
        ToastError(translate("Couponmanagement.textSomethingWentWrong"));
      }
    }
  };

  const discardCoupon = () => {
    navigation.navigate("dashboard/coupon-management");

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
      couponType: "coupon",
      minCartValue: "",
      deleteCategories: [0],
      deleteProducts: [0],
    });
  };

  const handleDiscountValue = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    if (value === "" || onlyNumbersRegx.test(value)) {
      setNewCoupon({
        ...newCoupon,
        [name]: value,
      });
    }
  };
  const editCoupon = async () => {
    const response = await dispatch(
      EditCoupons({ id: newCoupon.id!, data: newCoupon })
    );
    if (response.payload?.status) {
      ToastSuccess(response.payload.message);
    } else {
      ToastError(translate("Couponmanagement.textSomethingWentWrong"));
    }
    navigation.navigate("dashboard/coupon-management");
    dispatch(setIsEdit(false));
  };
  useEffect(() => {
    if (isEditingCoupon) {
      setNewCoupon({
        id: editingProduct.id,
        couponCode: editingProduct.code,
        description: editingProduct.description,
        discountValue: String(editingProduct.discountPercentage ?? ""),
        discountPercentage: String(editingProduct.discountPercentage ?? ""),
        discountType:
          editingProduct.discountType === 1 ? "Percentage" : "Fixed",
        startDate: editingProduct.startDate,
        expiryDate: editingProduct.expiryDate,
        perUser: editingProduct.perUser.toString(),
        overAllLimit: editingProduct.overallLimit.toString(),
        products: [0],
        categories: [0],
        couponType: "coupon",
        minCartValue: editingProduct.minCartValue.toString(),
        deleteCategories: [0],
        deleteProducts: [0],
      });
    }
  }, [editingProduct]);

  useEffect(() => {
    dispatch(getProducts({}));
    dispatch(getCategory());
    return () => {
      dispatch(setIsEdit(false));
    };
  }, []);
  const handleReturn = () => {
    navigation.navigate("dashboard/coupon-management");
  };
  return (
    <Box className={classes.container} p="22px">
      <Box className={classes.backIconAndTitleContainer}>
        <IconButton onClick={handleReturn}>
          <RiArrowDownSLine className={classes.leftArrow} />
        </IconButton>
        <Typography variant="h4" className={classes.mainHeading}>
          {isEditingCoupon
            ? translate("Couponmanagement.textEditCoupon")
            : translate("Couponmanagement.textAddNewCoupon")}
        </Typography>
      </Box>
      <Grid container spacing={1} className={classes.paper}>
        <Grid size={{ xl: 6, md: 12, sm: 6, xs: 12 }}>
          <Box className={classes.fieldContainer}>
            <Typography className={classes.label} mt={0}>
              {translate("Couponmanagement.textCouponCode")} :
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
              {translate("Couponmanagement.textDescription")} :
            </Typography>
            <TextField
              type="text"
              name="description"
              className={classes.textInputfield}
              value={newCoupon.description}
              placeholder="Description"
              onChange={handleChange}
              sx={style.overallLimitAndSelect}
              helperText={
                <Typography className={classes.errorNote} color={colors.error}>
                  {errors.descriptionError}
                </Typography>
              }
            />
          </Box>
          <Box className={classes.fieldContainer}>
            <Typography className={classes.label}>
              {translate("Couponmanagement.textDiscountValue")} :
            </Typography>
            <TextField
              type="text"
              name="discountValue"
              sx={style.overallLimitAndSelect}
              className={classes.textInputfield}
              value={newCoupon.discountValue}
              placeholder="10%"
              onChange={handleDiscountValue}
              helperText={
                <Typography className={classes.errorNote} color={colors.error}>
                  {errors.discountValueError}
                </Typography>
              }
            />
          </Box>
          <Box className={classes.fieldContainer}>
            <Typography className={classes.label}>
              {translate("Couponmanagement.textDiscountType")} :
            </Typography>
            <Select
              sx={style.overallLimitAndSelect}
              className={classes.selectInputfield}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newCoupon.discountType}
              placeholder="Post-Purchase"
              onChange={handleSelect}
            >
              {discountTypesArr.map((item) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </Box>
          <Box className={classes.fieldContainer}>
            <Typography className={classes.label}>
              {translate("Couponmanagement.textApplicableProducts")} :
            </Typography>
            <Select
              sx={style.overallLimitAndSelect}
              className={classes.selectInputfield}
              labelId="Select-Products"
              id="products"
              multiple
              value={newCoupon.products}
              placeholder="Select Products"
              onChange={handleProductChange}
            >
              {allProducts && allProducts!.length > 0 ? (
                allProducts?.map((each) => (
                  <MenuItem value={each.id}>{each.productName}</MenuItem>
                ))
              ) : (
                <MenuItem value={10}>Ten</MenuItem>
              )}
            </Select>
            <Typography
              className={classes.selectErrorNote}
              color={colors.error}
            >
              {errors.productsError}
            </Typography>
          </Box>
          <Box className={classes.fieldContainer}>
            <Typography className={classes.label}>
              {translate("Couponmanagement.textApplicableCategories")} :
            </Typography>
            <Select
              sx={style.overallLimitAndSelect}
              className={classes.selectInputfield}
              labelId="select-categories"
              id="categories"
              value={newCoupon.categories}
              multiple
              placeholder="select categories"
              onChange={handleCategoriesChange}
            >
              {categories && categories!.length > 0 ? (
                categories?.map((each) => (
                  <MenuItem value={each.id}>{each.category}</MenuItem>
                ))
              ) : (
                <MenuItem value={10}>Ten</MenuItem>
              )}
            </Select>
            <Typography
              className={classes.selectErrorNote}
              color={colors.error}
            >
              {errors.categoriesError}
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xl: 6, md: 6, sm: 6, xs: 12 }} mt={{ md: 0 }}>
          <Typography className={classes.label} mt={0}>
            {translate("Couponmanagement.textValidityPeriodStart")} :
          </Typography>
          <TextField
            type="date"
            name="startDate"
            classes={{ root: classes.textInputfield }}
            value={newCoupon.startDate}
            className={classes.textfield}
            sx={style.commonDateInput}
            onChange={handleChange}
            helperText={
              <Typography className={classes.errorNote} color={colors.error}>
                {errors.startDateError}
              </Typography>
            }
          />
          <Typography className={classes.label} mt={0}>
            {translate("Couponmanagement.textValidityPeriodEnd")} :
          </Typography>
          <TextField
            type="date"
            name="expiryDate"
            classes={{ root: classes.textInputfield }}
            value={newCoupon.expiryDate}
            className={classes.textfield}
            sx={style.commonDateInput}
            onChange={handleChange}
            helperText={
              <Typography className={classes.errorNote} color={colors.error}>
                {errors.expiryDateError}
              </Typography>
            }
          />

          <Box className={classes.fieldContainer}>
            <Typography className={classes.label}>
              {translate("Couponmanagement.textPerUser")} :
            </Typography>
            <TextField
              type="text"
              className={classes.textInputfield}
              name="perUser"
              value={newCoupon.perUser}
              placeholder="Per User"
              onChange={handleChange}
              helperText={
                <Typography className={classes.errorNote} color={colors.error}>
                  {errors.perUserError}
                </Typography>
              }
            />
          </Box>
          <Box className={classes.fieldContainer}>
            <Typography className={classes.label}>
              {translate("Couponmanagement.textOverallLimit")} :
            </Typography>
            <TextField
              type="text"
              sx={style.overallLimitAndSelect}
              className={classes.textInputfield}
              name="overAllLimit"
              value={newCoupon.overAllLimit}
              placeholder="Overall limit"
              onChange={handleChange}
              helperText={
                <Typography className={classes.errorNote} color={colors.error}>
                  {errors.overAllLimitError}
                </Typography>
              }
            />
          </Box>
          <Box className={classes.fieldContainer}>
            <Typography className={classes.label}>
              {translate("Couponmanagement.textMinCartValue")} :
            </Typography>
            <TextField
              type="text"
              sx={style.overallLimitAndSelect}
              className={classes.textInputfield}
              name="minCartValue"
              value={newCoupon.minCartValue}
              placeholder="Min Cart Value"
              onChange={handleChange}
              helperText={
                <Typography className={classes.errorNote} color={colors.error}>
                  {errors.minCartValueError}
                </Typography>
              }
            />
          </Box>
        </Grid>
        <Grid size={12}>
          <Box className={classes.bottomBtnsContainer}>
            <CommonButton
              title={
                isEditingCoupon
                  ? translate("Couponmanagement.textUpdateCoupon")
                  : translate("Couponmanagement.textSaveCoupon")
              }
              styles={style.button}
              onClick={isEditingCoupon ? editCoupon : createCoupon}
            />
            <CommonButton
              title={translate("Couponmanagement.textCancel")}
              styles={style.button}
              onClick={discardCoupon}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Couponmanagement;
