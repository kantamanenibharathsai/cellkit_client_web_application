import {
  Box,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { style, useStyles } from "./useStyles";
import { translate } from "../../config/i18n";
import CommonInput from "../common/commonInput/CommonInput";
import { ChangeEvent, useEffect, useState } from "react";
import FileUploader from "./FileUploader";
import CommonButton from "../common/commonButton/CommonButton";
import { useAppDispatch, useAppSelector } from "../../utils/useRedux";
import {
  CategoryApiResponse,
  createNewCategory,
  createNewProduct,
  createProductFiles,
  DataItem,
  getCategory,
} from "../../redux/reducers/products";
import {
  onlyNumbersRegx,
  ToastError,
  ToastSuccess,
  VaidateToastError,
} from "../../utils/Validate";
import { colors } from "../../config/theme";
import { navigation } from "../../utils/navigation";
export interface NewProductData {
  productName: string;
  description: string;
  price: string;
  discountPrice: string;
  category: string;
}

const ProductManagment = () => {
  const dispatch = useAppDispatch();
  const [images, setImages] = useState<File[]>([]);
  const [newProduct, setNewProduct] = useState<NewProductData>({
    productName: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
  });

  const { categories } = useAppSelector((state) => state.Products);

  const classes = useStyles();
  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value,
    });
  };

  const addFiles = async () => {
    if (images.length > 0) {
      const response = await dispatch(createProductFiles(images!));
      const newfiles = response.payload.data.map((each: any) => each.id);
      addProduct(categories, newfiles);
    } else {
      addProduct(categories);
    }
  };
  const addProduct = async (
    data: CategoryApiResponse["data"],
    files?: number[]
  ) => {
    if (data?.length > 0) {
      const index = data.findIndex(
        (element) => element.category === newProduct.category
      );
      if (index === -1) {
        const response = await dispatch(createNewCategory(newProduct.category));
        if (response.payload && response.payload.status) {
          ToastSuccess(translate("ProductManagment.textCrateCategorySuccess"));

          const response = await dispatch(getCategory());
          if (response.payload.status) {
            addProduct(response.payload.data, files);

            return;
          }
        } else {
          ToastError(translate("ProductManagment.textCreateCategoryError"));
        }
      } else {
        const newproduct: {
          productName: string;
          description: string;
          categoryId: string;
          price: string;
          discountPrice: string;
          image?: File;
          files?: number[];
        } = {
          productName: newProduct.productName,
          description: newProduct.description,
          categoryId: String(data[index]?.id),
          price: newProduct.price,
          discountPrice: newProduct.discountPrice,
          files,
        };

        const response = await dispatch(createNewProduct(newproduct));
        if (response.payload?.status) {
          setNewProduct({
            productName: "",
            description: "",
            price: "",
            discountPrice: "",
            category: "",
          });
          setImages([]);
          ToastSuccess(response.payload?.message);
          navigation.navigate("dashboard/products-management");
        } else {
          ToastError(response.payload?.message);
        }
      }
    }
  };

  const validate = () => {
    if (
      newProduct.productName !== "" &&
      newProduct.price !== "" &&
      newProduct.category !== ""
    ) {
      if (
        newProduct.discountPrice !== "" &&
        !onlyNumbersRegx.test(newProduct.discountPrice)
      ) {
        VaidateToastError(translate("ProductManagment.textDiscountError"));
      } else if (!onlyNumbersRegx.test(newProduct.price)) {
        VaidateToastError(translate("ProductManagment.textPriceError"));
      } else {
        addFiles();
      }
    } else {
      VaidateToastError(
        translate("ProductManagment.textFillReqiredFielddsError")
      );
    }
  };

  const cancelUpdate = () => {
    setNewProduct({
      productName: "",
      description: "",
      price: "",
      discountPrice: "",
      category: "",
    });
    setImages([]);
    navigation.navigate("dashboard/products-management");
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setNewProduct({
      ...newProduct,
      category: selectedCategory,
    });
  };

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <Box sx={style.container}>
      <Typography variant="h4" className={classes.mainHeading}>
        {translate("ProductManagment.textTitle")}
      </Typography>
      <Paper sx={style.containerPaper} elevation={0}>
        <Box sx={style.inputsContainer}>
          <Box sx={style.productDescriptionsContainer}>
            <Box className={classes.inputContainer}>
              <CommonInput
                required
                maxWidth={"100%"}
                name={"productName"}
                onChange={handleOnChange}
                value={newProduct.productName}
                placeholder={""}
                label={translate("ProductManagment.textProductName")}
                fullWidth
              />
            </Box>
            <Box className={classes.inputContainer}>
              <Typography className={classes.label}>
                {translate("ProductManagment.textDescription")}
              </Typography>
              <TextField
                name="description"
                multiline
                rows={5}
                value={newProduct.description}
                onChange={handleOnChange}
                variant="outlined"
                fullWidth
                inputProps={{
                  style: {
                    marginTop: 100,
                  },
                }}
                sx={style.multilineInput}
              />
            </Box>

            <Box className={classes.inputContainer}>
              <Typography className={classes.label}>
                {translate("ProductManagment.textCategory")} :{" "}
                <Typography component={"span"} color="error">
                  {" *"}
                </Typography>
              </Typography>
              <Select
                required
                sx={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "#DFEAF2",
                  height: "52px",
                  width: {
                    xs: "100%",
                  },
                  borderRadius: "15px !important",
                  marginTop: "12px",
                  color: colors.tertiaryDark,
                  "& fieldset": { border: "none" },
                  input: { color: colors.primaryGrey },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newProduct.category}
                placeholder="Post-Purchase"
                onChange={(event) => handleCategoryChange(event.target.value)}
              >
                {categories?.map((item: DataItem) => {
                  return (
                    <MenuItem value={item.category}>{item.category}</MenuItem>
                  );
                })}
              </Select>
            </Box>

            <Box className={classes.inputContainer}>
              <CommonInput
                required
                maxWidth={"100%"}
                name={"price"}
                onChange={handleOnChange}
                value={newProduct.price}
                placeholder={""}
                label={translate("ProductManagment.textPrice")}
                fullWidth
              />
            </Box>
            <Box className={classes.inputContainer}>
              <CommonInput
                maxWidth={"100%"}
                name={"discountPrice"}
                onChange={handleOnChange}
                value={newProduct.discountPrice}
                placeholder={""}
                label={translate("ProductManagment.textDiscount")}
                fullWidth
              />
            </Box>
          </Box>
          <Box sx={style.fileUploaderAndButtonsContainer}>
            <Typography className={classes.label}>
              {translate("ProductManagment.textUploadFiles")}
            </Typography>
            <FileUploader classes={classes} setImages={setImages} />
          </Box>
        </Box>
        <Box sx={style.buttonsContainer}>
          <CommonButton
            title={translate("ProductManagment.textSaveButton")}
            styles={style.button}
            onClick={validate}
          />
          <CommonButton
            title={translate("ProductManagment.textCancel")}
            styles={style.button}
            onClick={cancelUpdate}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductManagment;
