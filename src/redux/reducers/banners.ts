import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL, endpoints } from "../../config/config";
import networkCall from "../../utils/networkCall";
import Storage from "../../utils/Storage";
import { displayAlert } from "../../utils/toastMessage";

export interface BannerData {
    id: number;
    image: string;
    startDate: string;
    endDate: string;
    targetUrl: string;
    createdAt: string;
    updatedAt: string;
    active: boolean;
    status: string;
}

interface InitialState {
    banners: BannerData[];
    loading: boolean;
    paginationDataBanners: {
        currentPage: number,
        pageSize: number,
        totalItems: number,
        totalPages: number
    }
}

const initialState: InitialState = {
    banners: [],
    loading: false,
    paginationDataBanners: {
        currentPage: 0,
        pageSize: 0,
        totalItems: 0,
        totalPages: 0
    },
};

export const getBaners = createAsyncThunk(
    "getBaners",
    async ({ page }: { page?: number }, { rejectWithValue, fulfillWithValue }) => {
        const token = Storage.get("token");
        const url = new URL(
            `${baseURL}/${endpoints.GET_BANNER}`);
        const body = null;
        const headers = {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
        };
        if (page) {
            url.searchParams.append("page", page.toString())
        }
        try {
            const { response, error } = await networkCall(url.toString(), "GET", body, headers);
            if (response.status) {
                return fulfillWithValue(response);
            }
            return rejectWithValue(error);
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

export const createNewBaners = createAsyncThunk(
    "createNewBaners",
    async (
        data: {
            startDate: string;
            endDate: string;
            targetUrl: string;
            image?: File | null;
        },
        { rejectWithValue, fulfillWithValue }
    ) => {
        const token = Storage.get("token");
        const url = endpoints.GET_BANNER;
        const formData = new FormData();
        formData.append("startDate", data.startDate);
        formData.append("endDate", data.endDate);
        formData.append("targetUrl", data.targetUrl);
        if (data.image) {
            formData.append("image", data.image);
        }
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "null",
        };
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
    }
);
export const deleteBanner = createAsyncThunk(
    "deleteBanner", async (id: string, { rejectWithValue, fulfillWithValue }) => {
        const token = Storage.get("token");
        const url = `${endpoints.GET_BANNER}/${id}`
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
export const BannerSlice = createSlice({
    name: "BannerSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBaners.pending, (state, actions) => {
            state.loading = true;
        });
        builder.addCase(getBaners.fulfilled, (state, actions) => {
            state.loading = false;
            state.banners = actions.payload.data ? actions.payload.data.data : [];
            state.paginationDataBanners = actions.payload.data ? actions.payload.data.pagination
                : {};
        });
        builder.addCase(getBaners.rejected, (state, actions) => {
            state.loading = false;
        });
        builder.addCase(createNewBaners.pending, (state, actions) => {
            state.loading = true;
        });
        builder.addCase(createNewBaners.fulfilled, (state, actions) => {
            state.loading = false;
        });
        builder.addCase(createNewBaners.rejected, (state, actions) => {
            displayAlert("some error");
            state.loading = false;
        });
        builder.addCase(deleteBanner.pending, (state, action) => {
            state.loading = true;
        }); builder.addCase(deleteBanner.fulfilled, (state, action) => {
            state.loading = false;
        }); builder.addCase(deleteBanner.rejected, (state, action) => {
            state.loading = false;
        })
    },
});

export default BannerSlice.reducer;
