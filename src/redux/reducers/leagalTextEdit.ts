import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL, endpoints } from "../../config/config";
import networkCall from "../../utils/networkCall";
import Storage from "../../utils/Storage";

interface ProtectionPlan {
  active: boolean;
  buyBackPercentage: number;
  claimLimit: number;
  createdAt: string;
  createdBy: number;
  displayName: string;
  features: string[];
  id: number;
  planName: string;
  planType: string;
  pricingTiers: any[];
  updatedAt: string;
  updatedBy: number;
  validityMonths: number;
}
export interface ProductsReducer {
  products: {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
  }[];
  btnArr: ProtectionPlan[]
  protectionPlan: string
  loading: boolean;
  selectedItemId: number
  data: {
    id: null,
    termsAndConditions: "",
    type: "",
    language: '',
    planId: 1,
    active: true,
    createdBy: '',
    updatedBy: '',
    createdAt: '',
    updatedAt: ''
  }
}
export interface IPostLegalTexts {
  roleId: number | string,
  type: string,
  content: string,
  isPrivacyPolicy: boolean,
}

const initialState: ProductsReducer = {
  btnArr: [],
  protectionPlan: '',
  selectedItemId: 0,
  products: [],
  loading: false,
  data: {
    id: null,
    termsAndConditions: "",
    type: "",
    language: '',
    planId: 1,
    active: true,
    createdBy: '',
    updatedBy: '',
    createdAt: '',
    updatedAt: ''
  }
};

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

export const postLegalTextsSlice = createAsyncThunk(
  "postLegalTextsSlice",
  async (
    { roleId, type, content, isPrivacyPolicy }: IPostLegalTexts,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const token = Storage.get('token');
      const formData = new FormData();
      formData.append("roleId", roleId.toString());
      formData.append("termsAndConditions", content);
      const { response, error } = await networkCall(
        endpoints.PRIVACY_POLICY,
        "POST",
        formData,
        {
          "Content-Type": `${isPrivacyPolicy ? 'null' : 'application/json'}`,
          "Authorization": `Bearer ${token}`
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
export const putLegalTextsSlice = createAsyncThunk(
  "putLegalTextsSlice",
  async (
    { id,
      planId,
      termsAndConditions, type }: {
        id: number,
        planId?: string,
        termsAndConditions: string, type?: string
      },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const token = Storage.get('token');
      const { response, error } = await networkCall(
        `${endpoints.TERMS_CONDITIONS}/${id}`,
        "PUT",
        JSON.stringify({
          type: type,
          language: "ENG",
          termsAndConditions,
          ...(planId !== null && { planId: planId })
        }),
        {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${token}`
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
export const getPlansLegal = createAsyncThunk(
  "getPlansLegal",
  async ({ pages, size, planTypeName }: { pages: number, size?: number, planTypeName?: string }, { rejectWithValue, fulfillWithValue, dispatch }) => {
    const token = Storage.get('token');
    const url = new URL(`${baseURL}/${endpoints.GET_PLAN}?page=${pages}`);
    if (planTypeName) {
      url.searchParams.append('planTypeName', planTypeName)
    }
    if (size) {
      url.searchParams.append('size', size.toString())
    }
    const body = null;
    const headers = {
      'accept': "*/*",
      'Authorization': `Bearer ${token}`,
    };
    const { response } = await networkCall(
      url.toString(),
      "GET",
      body,
      headers
    );
    if (response) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue("Something went wrong!");
    }
  }
);
export const getTermsAndConditionMaster = createAsyncThunk(
  "getTermsAndConditionMaster",
  async ({ type }: { type: string }, { rejectWithValue, fulfillWithValue }) => {
    const token = Storage.get('token');
    const url = `${endpoints.GET_TERMS_AND_CONDITIONS_TYPE}?type=${type}`;
    const body = null;
    const headers = {
      'accept': "*/*",
      'Authorization': `Bearer ${token}`,
    };
    const { response } = await networkCall(
      url,
      "GET",
      body,
      headers
    );
    if (response) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue("Something went wrong!");
    }
  }
);
export const getTermsAndCondition = createAsyncThunk(
  "getTermsAndCondition",
  async (planId: number, { rejectWithValue, fulfillWithValue }) => {
    const token = Storage.get('token');
    const url = `${endpoints.GET_TERMS_AND_CONDITIONS_PLAN}?planId=${planId}`;
    const body = null;
    const headers = {
      'accept': "*/*",
      'Authorization': `Bearer ${token}`,
    };
    const { response } = await networkCall(
      url,
      "GET",
      body,
      headers
    );
    if (response) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue("Something went wrong!");
    }
  }
);
export const getPrivacyPolicyById = createAsyncThunk(
  "getPrivacyPolicyById",
  async (roleId: number, { rejectWithValue, fulfillWithValue }) => {
    const token = Storage.get('token');
    const url = `${endpoints.PRIVACY_POLICY}?roleId=${roleId}`;
    const body = null;
    const headers = {
      'accept': "*/*",
      'Authorization': `Bearer ${token}`,
    };
    const { response } = await networkCall(
      url,
      "GET",
      body,
      headers
    );
    if (response) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue("Something went wrong!");
    }
  }
);

export const legalTextEditSlice = createSlice({
  name: "legalTextEditSlice",
  initialState,
  reducers: {
    setProtectionPlan: (state, action) => {
      state.protectionPlan = action.payload
    },
    setSelectedItemId: (state, action) => {
      state.selectedItemId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postLegalTextsSlice.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(postLegalTextsSlice.fulfilled, (state, action) => {
      state.loading = false;
    })
    builder.addCase(postLegalTextsSlice.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getPlansLegal.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(getPlansLegal.fulfilled, (state, action) => {
      state.loading = false;
      state.btnArr = action.payload?.data ? action.payload.data : []
    })
    builder.addCase(getPlansLegal.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getTermsAndCondition.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(getTermsAndCondition.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action?.payload?.data ? action?.payload?.data : []
    })
    builder.addCase(getTermsAndCondition.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(putLegalTextsSlice.pending, (state, action) => {
    })
    builder.addCase(putLegalTextsSlice.fulfilled, (state, action) => {
    })
    builder.addCase(putLegalTextsSlice.rejected, (state, action) => {
    });
    builder.addCase(getTermsAndConditionMaster.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(getTermsAndConditionMaster.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data ? action?.payload?.data : []
    })
    builder.addCase(getTermsAndConditionMaster.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { setProtectionPlan, setSelectedItemId } = legalTextEditSlice.actions
export default legalTextEditSlice.reducer;
