import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL, endpoints } from "../../config/config";
import networkCall from "../../utils/networkCall";
import Storage from "../../utils/Storage";


export interface IPostLegalTexts {
    roleId: number | string,
    type: string,
    content: string,
    isPrivacyPolicy: boolean,
}
interface CustomReport {
    mobileName: number | string;
    mobileNumber: number;
    planEndDate: string;
    planName: string;
    planStartDate: string;
    planValue: number;
    celektUserId: string
    userId: number
}
interface BirthDayReport {
    planName: string;
    planValue: number;
    storeLocation: string;
    userName: string;
    userId: string
    celektUserId: string
}
interface UserReportData {
    email: string;
    fullName: string;
    location: string;
    mobileNumber: string;
    planValue: number;
    protectionPlan: string;
    registrationDate: string;
    userId: number;
}
interface ExpiryReportDataObj {

    celektUserId: string;
    planExpiryDate: string;
    planName: string;
    status: string;
    userId: number;
    userName: string;
}
export interface ReportReducer {
    products: {
        id: number;
        title: string;
        price: string;
        category: string;
        description: string;
        image: string;
    }[];
    expiryReportData: ExpiryReportDataObj[]
    loading: boolean;
    plans: string[],
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
    },
    certificateData: {
        certificateId: number,
        userId: number,
        userName: string,
        createdAt: string,
        expiryDate: string
        celektUserId: string
        planName: string
    }[],
    paginationData: {
        "currentPage": number,
        "pageSize": number,
        "totalItems": number,
        "totalPages": number
    }
    profileData: any;
    customReportData: CustomReport[];
    BirthdayReportData: BirthDayReport[];
    userReportData: UserReportData[];
    reportType: string
    date_range: string[]
    pieChartData: { paymentMethod: string; totalAmount: number }[];
    paymentReportData: {
        paymentAmount: number;
        paymentDate: string;
        paymentMethod: string | null;
        planName: string;
        transactionId: string;
        transactionStatus: string;
        userId: number;
        userName: string;
        celektUserId
        : string
    }[];
}
export interface IPostLegalTexts {
    roleId: number | string,
    type: string,
    content: string,
    isPrivacyPolicy: boolean,

}

const initialState: ReportReducer = {
    products: [],
    loading: false,
    reportType: "month",
    date_range: [],
    plans: [],
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
    },
    expiryReportData: [],
    certificateData: [],
    paginationData: {
        "currentPage": 0,
        "pageSize": 0,
        "totalItems": 0,
        "totalPages": 0
    },
    profileData: {},
    BirthdayReportData: [],
    userReportData: [],
    pieChartData: [],
    paymentReportData: [],
    customReportData: [],
};
export const getPlans = createAsyncThunk("getPlans", async (_, { rejectWithValue, fulfillWithValue, }) => {
    const token = Storage.get('token');
    const body = null;
    let url = endpoints.GET_PLAN
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
})
export const getCerticateReport = createAsyncThunk(
    "getCerticateReport",
    async ({ pages, size, direction = 'ASC', planType: planName }: { pages: number, size: number, direction: string, planType?: string },
        { rejectWithValue, fulfillWithValue, }) => {
        const token = Storage.get('token');
        const url = new URL(`${baseURL}/${endpoints.GET_USER_CERTIFICATE_REPORT}?size=${size}&page=${pages}&orderColumn=created_at&orderDirection=${direction}`);
        if (planName) {
            url.searchParams.append('planName', planName)
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


export const getProfileData = createAsyncThunk(
    "getProfileData",
    async ({ id }: { id: number },
        { rejectWithValue, fulfillWithValue, }) => {
        const token = Storage.get('token');
        const url = `${endpoints.GET_USER}?id=${id}`;
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

export const getPaymentReport = createAsyncThunk(
    "payment Report",
    async ({ page, planType }: { page?: number, planType?: string }, { fulfillWithValue, rejectWithValue }) => {

        const token = Storage.get("token");
        const url = new URL(`${baseURL}/${endpoints.GET_PAYMENT_REPORT}`);
        url.searchParams.append('dateFilter', 'week')
        if (page) {
            url.searchParams.append('page', page.toString())
        }
        if (planType) {
            url.searchParams.append('planType', planType)
        }

        const headers = {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
        };

        const data = await fetch(url, { method: 'GET', headers, redirect: "follow" as RequestRedirect, })
        const response = await data.json();

        if (response) {
            return fulfillWithValue(response);
        } else {
            return rejectWithValue("Something went wrong!");
        }
    }
);

export const getBirthdayReport = createAsyncThunk(
    "birthdadayReport",
    async ({ type, dateRange, page }: { type: string, dateRange?: string[], page?: number }, { fulfillWithValue, rejectWithValue }) => {
        const token = Storage.get("token");
        let url = new URL(`${baseURL}/${endpoints.GET_BIRTHDAY_REPORT}`)
        url.searchParams.append('filterType', type)


        if (type === 'date_range') {
            url.searchParams.append("startDate", dateRange![0])
            url.searchParams.append("endDate", dateRange![1])
        }
        if (page) {
            url.searchParams.append('page', page.toString())
        }
        const headers = {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
        };

        const { response } = await networkCall(url.toString(), "GET", null, headers);

        if (response) {
            return fulfillWithValue(response);
        } else {
            return rejectWithValue("Something went wrong!");
        }
    }
);
export const exportReportBirthdayExpiry = createAsyncThunk("exportReportBirthdayExpiry", async (reportType: string, { fulfillWithValue, rejectWithValue }) => {
    const token = Storage.get("token");
    const headers = {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
    };
    let url = new URL(`${baseURL}/${endpoints.GET_BIRTHDAY_EXPIRY_REPORT}`)
    url.searchParams.append('reportType', reportType)
    const { response } = await networkCall(url.toString(), "GET", null, headers);

    if (response) {
        return fulfillWithValue(response);
    } else {
        return rejectWithValue("Something went wrong!");
    }
})
export const couponExportReport = createAsyncThunk('couponExportReport', async (couponType: string, { fulfillWithValue, rejectWithValue }) => {
    const token = Storage.get("token");
    const headers = {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
    };
    let url = new URL(`${baseURL}/${endpoints.GET_EXPORT_COUPONS_DATA}`)
    url.searchParams.append('couponType', couponType)
    const { response } = await networkCall(url.toString(), "GET", null, headers);

    if (response) {
        return fulfillWithValue(response);
    } else {
        return rejectWithValue("Something went wrong!");
    }
})
export const exportExcelReport = createAsyncThunk('exportExcelReport', async (reportType: string, { fulfillWithValue, rejectWithValue }) => {
    const token = Storage.get("token");
    const headers = {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
    };
    let url = new URL(`${baseURL}/${endpoints.GET_EXPORT_REPORTS}`)
    url.searchParams.append('reportType', reportType)
    const { response } = await networkCall(url.toString(), "GET", null, headers);

    if (response) {
        return fulfillWithValue(response);
    } else {
        return rejectWithValue("Something went wrong!");
    }

})

export const exportCustomReport = createAsyncThunk('exportCustomReport', async (_, { fulfillWithValue, rejectWithValue }) => {
    const token = Storage.get("token");
    const headers = {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
    };
    let url = new URL(`${baseURL}/${endpoints.GET_CUSTOM_REPORT_EXPORT}`)

    const { response } = await networkCall(url.toString(), "GET", null, headers);

    if (response) {
        return fulfillWithValue(response);
    } else {
        return rejectWithValue("Something went wrong!");
    }


})
export const getExpiryReport = createAsyncThunk(
    "expiry report",
    async ({ type, dateRange, page }: { type: string, dateRange?: string[], page?: number }, { fulfillWithValue, rejectWithValue }) => {
        const token = Storage.get("token");
        const formData = new FormData();
        formData.append("dateFilter", "month");
        formData.append("limit", "10");
        formData.append("offset", "0");
        formData.append("orderDirection", "ASC");
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow" as RequestRedirect,
        };

        const url = new URL(
            `${baseURL}/${endpoints.GET_EXPIRY_REPORT}`
        );
        url.searchParams.append("dateFilter", type);
        url.searchParams.append("orderDirection", "ASC");
        if (type === 'date_range') {
            url.searchParams.append("startDate", dateRange![0])
            url.searchParams.append("endDate", dateRange![1])
        }
        if (page) {
            url.searchParams.append("page", page.toString())
        }

        const data = await fetch(url.toString(), requestOptions);
        const response = await data.json();


        if (response) {
            return fulfillWithValue(response);
        } else {
            return rejectWithValue("Something went wrong!");
        }
    }
);

export const getCustomReport = createAsyncThunk(
    "custom report",
    async ({ page, planType }: { page?: number, planType?: string }, { fulfillWithValue, rejectWithValue }) => {
        const token = Storage.get("token");


        const formData = new FormData();
        formData.append("dateFilter", "month");
        formData.append("limit", "10");
        formData.append("offset", "0");
        formData.append("orderDirection", "ASC");

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow" as RequestRedirect,
        };

        const url = new URL(
            `${baseURL}/${endpoints.GET_CUSTOM_REPORT}`
        );
        if (planType) {
            url.searchParams.append("planType", planType);
        }
        url.searchParams.append("limit", "10");
        url.searchParams.append("offset", page ? page.toString() : "1");
        url.searchParams.append("orderColumn", "created_at");
        url.searchParams.append("orderDirection", "ASC");
        const data = await fetch(url.toString(), requestOptions);
        const response = await data.json();
        if (response) {
            return fulfillWithValue(response);
        } else {
            return rejectWithValue("Something went wrong!");
        }
    }
);

export const getPieChartData = createAsyncThunk(
    "payment Report Pie Data",
    async (_, { fulfillWithValue, rejectWithValue }) => {
        const token = Storage.get("token");
        const url = endpoints.GET_GRAPH_DATA;
        const headers = {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
        };

        const { response } = await networkCall(url, "GET", null, headers);

        if (response) {
            return fulfillWithValue(response);
        } else {
            return rejectWithValue("Something went wrong!");
        }
    }
);
export const userReport = createAsyncThunk(
    "",
    async (_, { fulfillWithValue, rejectWithValue }) => {
        const token = Storage.get("token");
        const url = `${endpoints.GET_USER_REPORT}?sort=created_at&sort=asc`;
        const headers = {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
        };
        const { response } = await networkCall(url, "GET", null, headers);

        if (response) {
            return fulfillWithValue(response);
        } else {
            return rejectWithValue("Something went wrong!");
        }
    }
);
export const getCerficateExportReport = createAsyncThunk(
    "getCerficateExportReport",
    async ({ size, page, ASC }: { size: number, page: number, ASC: string }, { rejectWithValue, fulfillWithValue }) => {
        const token = Storage.get('token');
        const url = `${endpoints.GET_CERTIFICATE_EXPORT_REPORT}?size=${size}&page=${page}&orderColumn=id&orderDirection=${ASC}`;
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


export const ResportSlice = createSlice({
    name: "ResportSlice",
    initialState,
    reducers: {
        setReportsType: (state, actions) => {
            state.reportType = actions.payload
        },
        setDateRange: (state, actions) => {
            state.date_range = actions.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCerticateReport.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getCerticateReport.fulfilled, (state, action) => {
            state.loading = false;
            state.certificateData = action.payload.data
                ? action.payload.data.data
                : [];
            state.paginationData = action.payload.data
                ? action.payload.data.pagination
                : {
                    "currentPage": 0,
                    "pageSize": 0,
                    "totalItems": 0,
                    "totalPages": 0
                };
        })
        builder.addCase(getCerticateReport.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(getProfileData.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getProfileData.fulfilled, (state, action) => {
            state.loading = false;
            state.profileData = action.payload.data

        })
        builder.addCase(getProfileData.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(userReport.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(userReport.fulfilled, (state, action) => {
            state.userReportData = action.payload.data
                ? action.payload.data.data
                : [];
            state.loading = false;
            state.paginationData = action.payload.data
                ? action.payload.data.pagination
                : {
                    "currentPage": 0,
                    "pageSize": 0,
                    "totalItems": 0,
                    "totalPages": 0
                }
        });
        builder.addCase(userReport.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(getBirthdayReport.pending, (state, actions) => {
            state.loading = true;
        });
        builder.addCase(getBirthdayReport.fulfilled, (state, actions) => {
            state.loading = false;
            if (!actions.payload.status) {
                state.BirthdayReportData = [];
            } else {
                state.BirthdayReportData = actions.payload.data.data;
            }
            state.paginationData = actions.payload.data
                ? actions.payload.data.pagination
                : {
                    "currentPage": 0,
                    "pageSize": 0,
                    "totalItems": 0,
                    "totalPages": 0
                }
        });
        builder.addCase(getBirthdayReport.rejected, (state, actions) => {
            state.loading = false;
        });
        builder.addCase(getPaymentReport.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getPaymentReport.fulfilled, (state, action) => {
            state.loading = false;
            state.paymentReportData = action.payload.data
                ? action.payload.data.data
                : [];
            state.paginationData = action.payload.data
                ? action.payload.data.pagination
                : {
                    "currentPage": 0,
                    "pageSize": 0,
                    "totalItems": 0,
                    "totalPages": 0
                }
        });
        builder.addCase(getPaymentReport.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(getPieChartData.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getPieChartData.fulfilled, (state, action) => {
            state.pieChartData = action.payload.data;
            state.loading = false;
        });
        builder.addCase(getPieChartData.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(getExpiryReport.pending, (state, action) => {
            state.loading = true;

        });
        builder.addCase(getExpiryReport.fulfilled, (state, action) => {
            state.loading = false;
            state.expiryReportData = action.payload?.data?.data ?? [];
            state.paginationData = action.payload.data
                ? action.payload.data.pagination
                : {
                    "currentPage": 0,
                    "pageSize": 0,
                    "totalItems": 0,
                    "totalPages": 0
                }
        });
        builder.addCase(getExpiryReport.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(getCustomReport.pending, (state, actions) => {
            state.loading = true;
        });
        builder.addCase(getCustomReport.fulfilled, (state, actions) => {
            state.loading = false;
            state.customReportData = actions.payload.data
                ? actions.payload.data.data
                : [];
            state.paginationData = actions.payload.data
                ? actions.payload.data.pagination
                : {
                    "currentPage": 0,
                    "pageSize": 0,
                    "totalItems": 0,
                    "totalPages": 0
                }
        });
        builder.addCase(getCustomReport.rejected, (state, actions) => {
            state.loading = false;
        });

        builder.addCase(getCerficateExportReport.pending, (state, actions) => {
            state.loading = true;
        });
        builder.addCase(getCerficateExportReport.fulfilled, (state, actions) => {
            state.loading = false;


        });
        builder.addCase(getCerficateExportReport.rejected, (state, actions) => {
            state.loading = false;
        });

        builder.addCase(getPlans.pending, (state, actions) => {
            state.loading = true;
        })

        builder.addCase(getPlans.fulfilled, (state, actions) => {
            state.loading = false;
            state.plans = actions.payload.data ? actions.payload.data.map((each: { planName: string; }) => each.planName) : []

        })
        builder.addCase(getPlans.rejected, (state, actions) => {
            state.loading = false;
        })
        builder.addCase(exportReportBirthdayExpiry.pending, (state, actions) => {

        })
        builder.addCase(exportReportBirthdayExpiry.fulfilled, (state, actions) => {

        })
        builder.addCase(exportReportBirthdayExpiry.rejected, (state, actions) => {

        })
        builder.addCase(exportExcelReport.pending, (state, action) => {

        }); builder.addCase(exportExcelReport.fulfilled, (state, action) => {

        }); builder.addCase(exportExcelReport.rejected, (state, action) => {

        });
        builder.addCase(exportCustomReport.pending, (state, action) => { });
        builder.addCase(exportCustomReport.fulfilled, (state, action) => { });
        builder.addCase(exportCustomReport.rejected, (state, action) => { });
    },
});
export const { setReportsType, setDateRange } = ResportSlice.actions
export default ResportSlice.reducer;
