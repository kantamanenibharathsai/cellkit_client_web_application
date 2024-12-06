import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL, endpoints } from "../../config/config";
import networkCall from "../../utils/networkCall";
import Storage from "../../utils/Storage";


interface DashBoardData {
    activePlansChangePercentage: number
    expirePlansChangePercentage: number
    previousMonthActivePlans: number
    previousMonthExpirePlans: number
    previousMonthRevenue: number
    previousMonthUsers: number
    revenueChangePercentage: number
    thisMonthActivePlans: number
    thisMonthExpirePlans: number
    thisMonthRevenue: number
    thisMonthUsers: number
    totalActivePlans: number
    totalExpirePlans: number
    totalRevenue: number
    totalUsers: number
    usersChangePercentage: number
}
interface GraphData {
    date?: string
    day?: string
    monthName?: string,
    weekName?: string,
    weekStart?: string,
    weekEnd?: string,
    weekNumber?: number,
    revenue?: number
}


interface DashBoardState {
    loading: boolean
    dashBoardData: DashBoardData,
    dataForGraph: GraphData[]
    salesReport: SalesReport[]
    monthofGraph: string
    monthofSalesReport: string
    graphApiLoading: boolean
    salesAPILoading: boolean
    paginationDashBoard: {
        currentPage: number,
        pageSize: number,
        totalItems: number,
        totalPages: number
    }
}
interface SalesReport {
    createdDate: string;
    customerName: string;
    dateTime: string;
    imeiNumber: string | null;
    planExipiryDate: string;
    planName: string;
    planStatus: string;
    price: number;
    protectionPlan: string;
    updatedDate: string;
    userId: number;
}
const initialState: DashBoardState = {
    loading: false,
    graphApiLoading: false,
    salesAPILoading: false,
    dashBoardData: {
        activePlansChangePercentage: 0,
        expirePlansChangePercentage: 0,
        previousMonthActivePlans: 0,
        previousMonthExpirePlans: 0,
        previousMonthRevenue: 0,
        previousMonthUsers: 0,
        revenueChangePercentage: 0,
        thisMonthActivePlans: 0,
        thisMonthExpirePlans: 0,
        thisMonthRevenue: 0,
        thisMonthUsers: 0,
        totalActivePlans: 0,
        totalExpirePlans: 0,
        totalRevenue: 0,
        totalUsers: 0,
        usersChangePercentage: 0
    },
    dataForGraph: [],
    salesReport: [],
    monthofGraph: "",
    monthofSalesReport: "", paginationDashBoard: {
        currentPage: 0,
        pageSize: 0,
        totalItems: 0,
        totalPages: 0
    }
}


export const getDashBoardData = createAsyncThunk("get DashBoard Data", async (_, { fulfillWithValue, rejectWithValue }) => {
    const token = Storage.get('token');
    const url = endpoints.GET_DASHBOARD;
    const body = null;
    const headers = {
        'accept': "*/*",
        'Authorization': `Bearer ${token}`,
    };
    const { response } = await networkCall(url,
        'GET',
        body,
        headers
    );

    if (response) {
        return fulfillWithValue(response);
    } else {
        return rejectWithValue("Something went wrong!");
    }


})

export const getSalesReport = createAsyncThunk("get sales report ", async ({ month, planType, page }: { month?: string; planType?: string, page?: number }, { fulfillWithValue, rejectWithValue }) => {
    const token = Storage.get('token');
    const url = new URL(`${baseURL}/${endpoints.GET_DASHBOARD_SALESREPORT}`);
    const body = null;
    const headers = {
        'accept': "*/*",
        'Authorization': `Bearer ${token}`,
    };
    if (month) {
        url.searchParams.append("month", month);
    }
    if (planType) {
        url.searchParams.append("planType", planType);
    }
    if (page) {
        url.searchParams.append('page', page.toString())
    }
    const { response } = await networkCall(String(url),
        'GET',
        body,
        headers
    );

    if (response) {
        return fulfillWithValue(response);
    } else {
        return rejectWithValue("Something went wrong!");
    }
})

export const getDashBoardStatistics = createAsyncThunk(
    "getDashBoardStatistics",
    async (
        { month, planType }: { month?: string; planType?: string },
        { fulfillWithValue, rejectWithValue }
    ) => {
        const token = Storage.get("token");
        const myHeaders = new Headers();

        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("year", "2024");

        if (month) {
            myHeaders.append("month", month);
        }

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow" as RequestRedirect,
        };
        const url = new URL(`${baseURL}/${endpoints.GET_DASHBOARD_STATISTICS}`);
        if (planType) {
            url.searchParams.append("planType", planType);
        }

        const data = await fetch(
            url,
            requestOptions
        );
        const response = await data.json();

        if (response.status) {
            return fulfillWithValue(response);
        } else {
            return rejectWithValue("Something went wrong!");
        }
    }
);
export const uploadFileDashboard = createAsyncThunk("uploadFileDashboard", async (data: File, { rejectWithValue, fulfillWithValue }) => {
    const token = Storage.get("token");
    const formData = new FormData();
    formData.append('file', data)
    const { response, error } = await networkCall(
        endpoints.UPLOAD_FILE_DASHBOARD,
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
const DashBoardSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setmonthGraph: (state, action) => {
            state.monthofGraph = action.payload

        },
        setmonthSalesReport: (state, action) => {
            state.monthofSalesReport = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getDashBoardData.pending, (state, actions) => {
            state.loading = true
        }); builder.addCase(getDashBoardData.fulfilled, (state, actions) => {
            state.loading = false
            if (actions.payload.status === true) {
                state.dashBoardData = actions.payload.data
            }
        }); builder.addCase(getDashBoardData.rejected, (state, actions) => {
            state.loading = false
        });
        builder.addCase(getDashBoardStatistics.pending, (state, actions) => {
            state.graphApiLoading = true
        }); builder.addCase(getDashBoardStatistics.fulfilled, (state, actions) => {
            state.graphApiLoading = false

            state.dataForGraph = actions.payload.data ? actions.payload.data : []

        }); builder.addCase(getDashBoardStatistics.rejected, (state, actions) => {
            state.graphApiLoading = false
        }); builder.addCase(getSalesReport.rejected, (state, actions) => {
            state.salesAPILoading = false
        }); builder.addCase(getSalesReport.fulfilled, (state, actions) => {
            state.salesAPILoading = false
            state.salesReport = actions.payload.data ? actions.payload.data.data : []
            state.paginationDashBoard = actions.payload.data ? actions.payload.data.pagination : {
                currentPage: 0,
                pageSize: 0,
                totalItems: 0,
                totalPages: 0
            }
        }); builder.addCase(getSalesReport.pending, (state, actions) => {
            state.salesAPILoading = true
        });
        builder.addCase(uploadFileDashboard.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(uploadFileDashboard.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(uploadFileDashboard.rejected, (state, action) => {
            state.loading = false;
        })
    }
})

export const { setmonthGraph, setmonthSalesReport } = DashBoardSlice.actions;
export default DashBoardSlice.reducer;