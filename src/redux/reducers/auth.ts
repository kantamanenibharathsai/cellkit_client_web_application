import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "../../config/config";
import networkCall from "../../utils/networkCall";
import { displayAlert } from "../../utils/toastMessage";
import Storage from "../../utils/Storage";

export interface AuthDataType {
  openDrawer: boolean;
  message: string | null;
  loading: boolean;
  token: string | null;
  loginLoading: boolean;
  userData: {
    id: number;
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    roleId: number;
    createdAt: string;
    updatedAt: string;
    active: boolean;
    countryCode: string | null;
    image: string;
    twoStepVerificationEnabled: boolean;
    dob: string | null;
    status: string | null;
    isDeleted: boolean;
    gender: "MALE" | "FEMALE" | "OTHER";
    address: string | null;
    latitude: number | null;
    longitude: number | null;
    userStatus: "ACCEPTED" | "PENDING" | "REJECTED";
  } | null;
}

interface UpdateProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  dateOfBirth?: string;
  presentAddress?: string;
  permantAddress?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  userId: number;
  token: string;
  image?: File | string;
}
const initialState: AuthDataType = {
  message: null,
  loginLoading: false,
  loading: false,
  token: Storage.get("token") || null,
  userData: Storage.get("user") || null,
  openDrawer: false,
};

export const loginAction = createAsyncThunk(
  "loginAction",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue, fulfillWithValue }
  ) => {
    const data = {
      email,
      password,
      admin: true
    };
    const { response } = await networkCall(
      endpoints.LOGIN,
      "POST",
      JSON.stringify(data)
    );

    if (response && response.status) {
      Storage.set("token", response.token);
      Storage.set("user", response.data);
      return fulfillWithValue(response);
    } else {
      return response.message && rejectWithValue(response.message);
    }
  }
);

export const editProfile = createAsyncThunk(
  "updateProfile",
  async (data: UpdateProfile, { rejectWithValue, fulfillWithValue }) => {
    const formData = new FormData();

    const fields: {
      [key: string]:
      | string
      | undefined
      | { file: File | string; filename: string };
    } = {
      userId: String(data.userId),
      email: data.email,
      dob: data.dateOfBirth?.toString(),
      address: data.presentAddress,
      password: data.password?.toString(),
      name:
        data.firstName || data.lastName
          ? `${data.firstName}  ${data.lastName}`
          : undefined,
      image: data.image
        ? { file: data.image, filename: "profilePic.jpeg" }
        : undefined,
    };

    for (const [key, value] of Object.entries(fields)) {
      if (value) {
        if (key === "image" && typeof value !== "string") {
          formData.append(key, value.file as Blob, value.filename);
        } else if (typeof value === "string") {
          formData.append(key, value);
        }
      }
    }

    try {
      const { response, error } = await networkCall(
        endpoints.UPDATE_PROFILE,
        "PUT",
        formData,
        {
          "Content-Type": `null`,
          Authorization: `Bearer ${data.token}`,
        }
      );
      if (response) {
        Storage.set("user", response.data);
        return fulfillWithValue(response);
      } else {
        return rejectWithValue(error);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const AuthSlice = createSlice({
  name: "authlice",
  initialState,
  reducers: {
    actionLogout: (state) => {
      state.token = null;
    },
    handleOpenDrawer: (state) => {
      state.openDrawer = !state.openDrawer;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      state.loginLoading = true;
      state.message = null;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loginLoading = false;
      Storage.set("token", action?.payload?.token)
      state.token = action?.payload?.token;
      state.message = action?.payload?.message;
      state.userData = action.payload?.data;
      displayAlert(action?.payload?.message);
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loginLoading = false;
      state.message = action.payload as string;
    });
    builder.addCase(editProfile.pending, (state, action) => {
      state.loading = true;
      state.message = null;
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.userData = action.payload.data;
      }

      state.loading = false;
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { actionLogout, handleOpenDrawer } = AuthSlice.actions;

export default AuthSlice.reducer;
