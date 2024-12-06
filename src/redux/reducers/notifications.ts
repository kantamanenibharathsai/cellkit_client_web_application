import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL, endpoints } from "../../config/config";
import networkCall from "../../utils/networkCall";
import Storage from "../../utils/Storage";
import { CreateNotificationState } from "../../components/notificationsection/Notificationsection";

interface NotificaionsState {
    loading: boolean;
    notificationsData: NotificationData[];
    allNotifications: NotificationData[];
    currentNotification: NotificationData
    paginationDataNotifications: {
        currentPage: number,
        pageSize: number,
        totalItems: number,
        totalPages: number
    }
    notificationType: string
    isEditingNotification: boolean
}
export interface NotificationData {
    active: boolean;
    image: string
    content: string;
    createdAt: string;
    createdBy: number;
    deliveryMethod: string;
    id: number;
    notificationType: string;
    status: boolean;
    trigger: string;
    updatedAt: string;
    updatedBy: number | null;
    title: string
}
const initialState: NotificaionsState = {
    isEditingNotification: false,
    currentNotification: {
        title: '',
        active: false,
        content: "",
        createdAt: "",
        createdBy: 0,
        deliveryMethod: '',
        id: 0,
        notificationType: "",
        image: "",
        status: false,
        trigger: "",
        updatedAt: "",
        updatedBy: null
    },
    loading: false,
    notificationsData: [],
    allNotifications: [],
    paginationDataNotifications: {
        currentPage: 0,
        pageSize: 0,
        totalItems: 0,
        totalPages: 0
    },
    notificationType: ""
};
export const createNotifications = createAsyncThunk("createNotifications", async ({ data, image }: { data: CreateNotificationState, image?: File }, { fulfillWithValue, rejectWithValue }) => {

    const url = new URL(
        `${baseURL}/${endpoints.GET_NOTIFICATIONS}`
    );
    const token = Storage.get("token");

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "null",
    };
    url.searchParams.append("content", data.content);
    url.searchParams.append("deliveryMethod", data.deliveryMethod)
    url.searchParams.append('title', data.title)
    url.searchParams.append('trigger', data.trigger)
    const formData = new FormData();
    if (image) {
        formData.append('image', image)
    }
    const { response, error } = await networkCall(
        url.toString(),
        "POST",
        formData,
        headers
    );

    if (response.status) {
        return fulfillWithValue(response);
    } else {
        return rejectWithValue(response);
    }
})
export const UpdateNotifications = createAsyncThunk("UpdateNotifications", async ({ data, image, status, id }: { id: string, data: CreateNotificationState, image?: File, status?: string }, { fulfillWithValue, rejectWithValue }) => {

    const url = new URL(
        `${baseURL}/${endpoints.GET_NOTIFICATIONS}/${id}`
    );
    const token = Storage.get("token");

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "null",
    };
    url.searchParams.append("content", data.content);
    url.searchParams.append("deliveryMethod", data.deliveryMethod)
    url.searchParams.append('title', data.title)
    url.searchParams.append('trigger', data.trigger)
    if (status) {
        url.searchParams.append('status', status)
    }
    const formData = new FormData();
    if (image) {
        formData.append('image', image)
    }
    const { response, error } = await networkCall(
        url.toString(),
        "PUT",
        formData,
        headers
    );

    if (response.status) {
        return fulfillWithValue(response);
    } else {
        return rejectWithValue("Something went wrong!");
    }
})
export const getNotifications = createAsyncThunk(
    "getNotifications",
    async ({ type, page }: { type?: string, page?: number }, { fulfillWithValue, rejectWithValue }) => {
        const token = Storage.get("token");
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow" as RequestRedirect,
        };
        const url = new URL(
            `${baseURL}/${endpoints.GET_NOTIFICATIONS}`
        );
        if (type) {
            url.searchParams.append("notificationType", type);
        }
        if (page) {
            url.searchParams.append("page", page.toString());
        }
        url.searchParams.append("size", "10");
        url.searchParams.append("sort", "created_at,asc");

        const data = await fetch(url.toString(), requestOptions);
        const response = await data.json();
        if (response.status) {
            return fulfillWithValue(response);
        } else {
            return rejectWithValue(response);
        }
    }
);
export const deleteNotification = createAsyncThunk(
    "deleteNotification", async (id: string, { rejectWithValue, fulfillWithValue }) => {
        const token = Storage.get("token");
        const url = `${endpoints.GET_NOTIFICATIONS}/${id}`
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
export const getAllNotifications = createAsyncThunk(
    "getAllNotifications",
    async ({ page }: { page?: string }, { fulfillWithValue, rejectWithValue }) => {
        const token = Storage.get("token");
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow" as RequestRedirect,
        };

        const url = new URL(
            `${baseURL}/${endpoints.GET_NOTIFICATIONS}`
        );
        if (page) {
            url.searchParams.append("page", page);
        }
        url.searchParams.append("size", "10");
        url.searchParams.append("sort", "created_at,asc");

        const data = await fetch(url.toString(), requestOptions);
        const response = await data.json();

        if (response.status) {
            return fulfillWithValue(response);
        } else {
            return rejectWithValue("Something went wrong!");
        }
    }
);
export const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setNotificationTypeReducer: (state, action) => {
            state.notificationType = action.payload

        },
        setEditNotification: (state, action) => {
            state.isEditingNotification = action.payload
        },
        setCurrentNotifications: (state, action) => {
            const notificationA = state.allNotifications.filter((each) => each.id.toString() === action.payload)
            const notificationB = state.notificationsData.filter((each) => each.id.toString() === action.payload)
            if (notificationA.length > 0) {
                state.currentNotification = notificationA[0]
            } else if (notificationB.length > 0) {
                state.currentNotification = notificationB[0]
            } else {
                state.currentNotification = {
                    title: "",
                    active: false,
                    content: "",
                    createdAt: "",
                    createdBy: 0,
                    deliveryMethod: '',
                    id: 0,
                    notificationType: "",
                    image: "",
                    status: false,
                    trigger: "",
                    updatedAt: "",
                    updatedBy: null
                }
            }
        }


    },
    extraReducers: (builder) => {
        builder.addCase(getNotifications.pending, (state, actions) => {
            state.loading = true;
        });
        builder.addCase(getNotifications.fulfilled, (state, actions) => {
            state.loading = false;
            state.notificationsData = actions.payload.data ? actions.payload.data.data : []
            state.paginationDataNotifications = actions.payload.data ? actions.payload.data.pagination : {
                currentPage: 0,
                pageSize: 0,
                totalItems: 0,
                totalPages: 0
            }

        });
        builder.addCase(getNotifications.rejected, (state, actions) => {
            state.notificationsData = []
            state.paginationDataNotifications = {
                currentPage: 0,
                pageSize: 0,
                totalItems: 0,
                totalPages: 0
            }
            state.loading = false;
        });
        builder.addCase(getAllNotifications.pending, (state, actions) => {
            state.loading = true;
        });
        builder.addCase(getAllNotifications.fulfilled, (state, actions) => {
            state.loading = false;
            state.allNotifications = actions.payload.data ? actions.payload.data.data : []
            state.paginationDataNotifications = actions.payload.data ? actions.payload.data.pagination : {
                currentPage: 0,
                pageSize: 0,
                totalItems: 0,
                totalPages: 0
            }

        });
        builder.addCase(getAllNotifications.rejected, (state, actions) => {
            state.allNotifications = []
            state.paginationDataNotifications = {
                currentPage: 0,
                pageSize: 0,
                totalItems: 0,
                totalPages: 0
            }
            state.loading = false;
        });
        builder.addCase(createNotifications.rejected, (state, actions) => {
            state.loading = false;
        });
        builder.addCase(createNotifications.pending, (state, actions) => {
            state.loading = true;
        });
        builder.addCase(createNotifications.fulfilled, (state, actions) => {
            state.loading = false;
        });
        builder.addCase(UpdateNotifications.pending, (state, action) => {
            state.loading = true;
        }); builder.addCase(UpdateNotifications.fulfilled, (state, action) => {
            state.loading = false;
        }); builder.addCase(UpdateNotifications.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(deleteNotification.pending, (state, actions) => {
            state.loading = true
        });
        builder.addCase(deleteNotification.fulfilled, (state, actions) => {

            state.loading = false
        });
        builder.addCase(deleteNotification.rejected, (state, actions) => {
            state.loading = false
        });
    },
});
export const { setNotificationTypeReducer, setCurrentNotifications, setEditNotification } = notificationsSlice.actions
export default notificationsSlice.reducer;
