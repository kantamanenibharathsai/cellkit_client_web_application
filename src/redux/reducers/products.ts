import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL, endpoints } from "../../config/config";
import networkCall from "../../utils/networkCall";
import Storage from "../../utils/Storage";
import { displayAlert } from "../../utils/toastMessage";

export interface Product {
  id: number;
  brand: string;
  productName: string;
  modelCode: string;
  itemModel: string;
  mrp: number;
  sellingPrice: number;
  active: boolean;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

}
export interface ProductsReducer {
  allProducts?: Product[];
  products?: {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image?: string;
  }[];
  loading: boolean;
  categories: CategoryApiResponse["data"];
  paginationDataProducts: {
    currentPage: number,
    pageSize: number,
    totalItems: number,
    totalPages: number
  }
}

const initialState: ProductsReducer = {
  allProducts: [],
  loading: false,
  categories: [],
  paginationDataProducts: {
    currentPage: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0
  },
};
export interface CategoryApiResponse {
  status: boolean;
  statusCode: string;
  message: string;
  data: DataItem[];
}

export interface DataItem {
  id: number;
  category: string;
  active: boolean;
  createdDate: string;
  updatedDate: string;
}

export const getProducts = createAsyncThunk(
  "getProducts",
  async ({ page }: { page?: number, }, { rejectWithValue, fulfillWithValue }) => {
    const token = Storage.get("token");
    const headers = {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    };
    const url = new URL(
      `${baseURL}/${endpoints.GET_PRODUCTS}`)
    if (page) {
      url.searchParams.append('page', page.toString())
    }
    const { response } = await networkCall(
      url.toString(),
      "GET",
      null,
      headers
    );

    if (response) {
      return fulfillWithValue(response.data);
    } else {
      return rejectWithValue("Something went wrong!");
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "getSingleProduct",
  async (productId: number, { rejectWithValue, fulfillWithValue }) => {
    const { response } = await networkCall({
      url: endpoints.SINGLE_PRODUCTS,
      params: {
        productId,
      },
    });
    if (response) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue("Something went wrong!");
    }
  }
);
export const createProductFiles = createAsyncThunk("create files", async (data: File[], { rejectWithValue, fulfillWithValue }) => {
  const token = Storage.get("token");
  const formData = new FormData();
  const url = endpoints.CREATE_PRODUCT_FILES;
  const headers = {
    "Content-Type": `null`,
    accept: "*/*",
    Authorization: `Bearer ${token}`,
  };
  for (let i = 0; i < data.length; i++) {
    formData.append('files', data[i], data[i].name)
  }
  try {
    const { response, error } = await networkCall(
      url,
      "POST",
      formData,
      headers
    );

    if (response.status) {
      return fulfillWithValue(response);
    }
    return rejectWithValue(error);
  } catch (error) {
    rejectWithValue(error);
  }
})



export const getCategory = createAsyncThunk(
  "getCategories",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    const token = Storage.get("token");
    const url = endpoints.GET_CATEGORIES;
    const body = null;
    const headers = {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    };

    try {
      const { response, error } = await networkCall(url, "GET", body, headers);

      if (response.status) {
        return fulfillWithValue(response);
      }
      return rejectWithValue(error);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const createNewCategory = createAsyncThunk(
  "createnewCategory",
  async (cattegory: string, { rejectWithValue, fulfillWithValue }) => {
    const token = Storage.get("token");
    const formData = new FormData();

    formData.append("category", cattegory);
    const headers = {
      "Content-Type": `null`,
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    };
    try {
      const { response, error } = await networkCall(
        endpoints.CREATE_CATEGORY,
        "POST",
        formData,
        headers
      );

      if (response.status) {
        return fulfillWithValue(response);
      }
      return rejectWithValue(error);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const createNewProduct = createAsyncThunk(
  "createnewproduct",
  async (
    data: {
      productName: string;
      description: string;
      categoryId: string;
      price: string;
      discountPrice: string;
      image?: File;
      files?: number[]
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    const token = Storage.get("token");
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key as keyof typeof data];
        if (value !== undefined && value !== "") {
          if (key === "image") {
            formData.append(key, value as File);
          } else if (key === "files" && Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
              formData.append("files", `${value[i]}`)
            }
          } else {
            formData.append(key, value as string);
          }
        }
      }
    }

    try {
      const { response, error } = await networkCall(
        endpoints.CREATE_PRODUCT,
        "POST",
        formData,
        {
          "Content-Type": `null`,
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        }
      );
      if (response) {

        return fulfillWithValue(response);
      } else {
        return rejectWithValue(error);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const createNewProductUploadFile = createAsyncThunk("createNewProductUploadFile", async (data: File, { rejectWithValue, fulfillWithValue }) => {
  const token = Storage.get("token");
  const formData = new FormData();
  formData.append('file', data)
  const { response, error } = await networkCall(
    endpoints.CREATE_PRODUCT,
    "POST",
    formData,
    {
      "Content-Type": `null`,
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    })
  if (response) {

    return fulfillWithValue(response);
  } else {
    return rejectWithValue(error);
  }

})

export const ProductSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload?.data ? action.payload.data : [];
      state.loading = false;
      state.paginationDataProducts = action.payload?.pagination ? action.payload?.pagination : {}
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload?.data ? action.payload.data : [];
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.loading = false;
      displayAlert("someError");
    });
    builder.addCase(createNewProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createNewProduct.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createNewProduct.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createNewCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createNewCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload.data;
      displayAlert(action?.payload?.message);
      getCategory();
    });
    builder.addCase(createNewCategory.rejected, (state, action) => {
      state.loading = false;
    }); builder.addCase(createProductFiles.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProductFiles.fulfilled, (state, action) => {
      state.loading = false;
    })
    builder.addCase(createProductFiles.rejected, (state, action) => {
      state.loading = false;
    })
    builder.addCase(createNewProductUploadFile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createNewProductUploadFile.fulfilled, (state, action) => {
      state.loading = false;
    })
    builder.addCase(createNewProductUploadFile.rejected, (state, action) => {
      state.loading = false;
    })
  },
});

export default ProductSlice.reducer;
