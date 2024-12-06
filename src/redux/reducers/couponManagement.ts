import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL, endpoints } from "../../config/config";
import networkCall from "../../utils/networkCall";
import Storage from "../../utils/Storage";
import { NewCoupon } from "../../components/couponmanagement/Couponmanagement";

export interface CouponData {
  id: number;
  couponType: number;
  code: string;
  description: string;
  discountType: number;
  minCartValue: number;
  discountPercentage: number;
  flatDiscount: number;
  startDate: string;
  expiryDate: string;
  status: boolean;
  active: boolean;
  perUser: number;
  overallLimit: number;
  createdBy: number;
  updatedBy: number | null;
  createdAt: string;
  updatedAt: string;
  deleteProducts: number[];
  deleteCategories: number[];
}

interface InitialState {
  coupons: CouponData[];
  birthDayCoupons: CouponData[];
  loading: boolean;
  isEditingCoupon: boolean,
  editingProduct: CouponData
  paginationDataCoupons: {
    currentPage: number,
    pageSize: number,
    totalItems: number,
    totalPages: number
  }
}

const initialState: InitialState = {
  coupons: [],
  birthDayCoupons: [],
  editingProduct: {
    id: 0,
    couponType: 0,
    code: "",
    description: "",
    discountType: 0,
    minCartValue: 0,
    discountPercentage: 0,
    flatDiscount: 0,
    startDate: "",
    expiryDate: "",
    status: false,
    active: false,
    perUser: 0,
    overallLimit: 0,
    createdBy: 0,
    updatedBy: null,
    createdAt: "",
    updatedAt: "",
    deleteProducts: [],
    deleteCategories: []
  },
  isEditingCoupon: false,
  loading: false,
  paginationDataCoupons: {
    currentPage: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0
  },
}

export const getCoupons = createAsyncThunk("getting the existing coupons", async ({ type, page }: { type: string, page?: number }, { rejectWithValue, fulfillWithValue }) => {
  const token = Storage.get('token');


  const headers = {
    'accept': "*/*",
    'Authorization': `Bearer ${token}`,
  };

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: 'follow' as RequestRedirect
  };
  const url = new URL(`${baseURL}/${endpoints.GET_COUPON}`);
  url.searchParams.append("couponType", type);
  if (page) {
    url.searchParams.append("page", page.toString())
  }

  try {
    const data = await fetch(url, requestOptions);
    const response = await data.json()

    if (response.status) {
      return fulfillWithValue(response)
    }
    return rejectWithValue('error something went wrong');

  } catch (error) {
    rejectWithValue(error)
  }

})
export const getCouponWithId = createAsyncThunk("getCouponWithId", async ({ id }: { id: string }, { rejectWithValue, fulfillWithValue }) => {
  const token = Storage.get('token');


  const headers = {
    'accept': "*/*",
    'Authorization': `Bearer ${token}`,
  };
  const url = `${baseURL}/${endpoints.GET_COUPON}/${id}`;

  try {

    const { response, error } = await networkCall(url, "GET", null, headers);
    if (response.status) {
      return fulfillWithValue(response)

    }
    return rejectWithValue('error something went wrong');

  } catch (error) {
    rejectWithValue(error)
  }

})

export const createNewCoupons = createAsyncThunk(
  "createNewCoupons",
  async (data: NewCoupon, { rejectWithValue, fulfillWithValue }) => {
    const token = Storage.get("token");

    const url = endpoints.CREATE_COUPON;
    const bodyJson = {
      couponCode: data.couponCode,
      autoGenerate: data.couponCode === "" ? true : false,
      description: data.description,
      minCartValue: data.minCartValue,
      discountType: data.discountType,
      discountPercentage:
        data.discountType === "Percentage" ? data.discountValue : null,
      flatDiscount: data.discountType === "Fixed" ? data.discountValue : null,
      startDate: data.startDate,
      expiryDate: data.expiryDate,
      perUser: data.perUser,
      overAllLimit: data.overAllLimit,
      products: data.products,
      categories: data.categories,
      couponType: data.couponType,
      deleteProducts: data.deleteProducts,
      deleteCategories: data.deleteCategories,
    };

    const body = JSON.stringify(bodyJson);

    const headers = {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const { response, error } = await networkCall(url, "POST", body, headers);
      if (response.status) {
        return fulfillWithValue(response);
      }
      return rejectWithValue(error);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const deleteCoupon = createAsyncThunk(
  "deleteCoupon", async (id: string, { rejectWithValue, fulfillWithValue }) => {
    const token = Storage.get("token");
    const url = `${endpoints.CREATE_COUPON}/${id}`
    const headers = {
      Authorization: `Bearer ${token}`,
      accept: "*/*",
    };
    try {
      const { response, error } = await networkCall(
        url,
        "DELETE",
        null,
        headers
      );
      if (response.status) {
        return fulfillWithValue(response);
      } else {

        return rejectWithValue(error);
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }

)
export const EditCoupons = createAsyncThunk(
  "EditCoupons",
  async ({ data, id }: { data: NewCoupon, id: number }, { rejectWithValue, fulfillWithValue }) => {
    const token = Storage.get("token");
    const url = `${endpoints.CREATE_COUPON}/${id}`;
    const bodyJson = {
      couponCode: data.couponCode,
      autoGenerate: true,
      description: data.description,
      minCartValue: data.minCartValue,
      discountType: data.discountType,
      discountPercentage:
        data.discountType === "Percentage" || data.discountType === "" ? data.discountValue : null,
      flatDiscount: data.discountType === "Fixed" ? data.discountValue : null,
      startDate: data.startDate,
      expiryDate: data.expiryDate,
      perUser: data.perUser,
      overAllLimit: data.overAllLimit,
      products: data.products.length > 0 ? data.products : [0],
      categories: data.categories.length > 0 ? data.categories : [0],
      couponType: data.couponType,
      deleteProducts: data.deleteProducts.length > 0 ? data.deleteProducts : [0],
      deleteCategories: data.deleteCategories.length > 0 ? data.deleteCategories : [0],
    };

    const body = JSON.stringify(bodyJson);

    const headers = {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const { response, error } = await networkCall(url, "PUT", body, headers);
      if (response.status) {
        return fulfillWithValue(response);
      }
      return rejectWithValue(error);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);


export const CouponSlice = createSlice({
  name: "CouponSlice",
  initialState,
  reducers: {
    setIsEdit: (state, action) => {
      state.isEditingCoupon = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCoupons.pending, (state, actions) => {
      state.loading = true
    });
    builder.addCase(getCoupons.fulfilled, (state, actions) => {
      state.loading = false
      state.coupons = actions.payload && actions.payload.data ? actions.payload!.data.data[0].couponType === 1 ? actions.payload.data.data : [] : []
      state.birthDayCoupons = actions.payload && actions.payload.data ? actions.payload!.data.data[0].couponType === 2 ? actions.payload.data.data : [] : []
      state.paginationDataCoupons = actions.payload?.data ? actions.payload?.data?.pagination : {}
    });
    builder.addCase(getCoupons.rejected, (state, actions) => {
      state.loading = false
    });
    builder.addCase(getCouponWithId.pending, (state, actions) => {
      state.loading = true
    });
    builder.addCase(getCouponWithId.fulfilled, (state, actions) => {
      state.loading = false
      state.editingProduct = actions.payload.data
    });
    builder.addCase(getCouponWithId.rejected, (state, actions) => {
      state.loading = false
    });
    builder.addCase(EditCoupons.pending, (state, actions) => {
      state.loading = true
    });
    builder.addCase(EditCoupons.fulfilled, (state, actions) => {
      state.loading = false
    });
    builder.addCase(EditCoupons.rejected, (state, actions) => {
      state.loading = false
    });

    builder.addCase(createNewCoupons.pending, (state, actions) => {
      state.loading = true
    });
    builder.addCase(createNewCoupons.fulfilled, (state, actions) => {

      state.loading = false
    });
    builder.addCase(createNewCoupons.rejected, (state, actions) => {
      state.loading = false
    });
    builder.addCase(deleteCoupon.pending, (state, actions) => {
      state.loading = true
    });
    builder.addCase(deleteCoupon.fulfilled, (state, actions) => {

      state.loading = false
    });
    builder.addCase(deleteCoupon.rejected, (state, actions) => {
      state.loading = false
    });

  }
})


export const { setIsEdit, } = CouponSlice.actions
export default CouponSlice.reducer;
