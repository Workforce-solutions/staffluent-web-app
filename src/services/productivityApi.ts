// services/productivityApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import { getPrepareHeaders, staffAdminAppkeyParam, vbUrl } from '@/hooks/common/common-functions'

interface ProductivityTrend {
    date: string
    productivity: number
}

interface DepartmentProductivity {
    department: string
    productivity: number
}

interface TopPerformer {
    name: string
    productivity: number
}

interface Insights {
    productivityChange: number
    timeFrame: string
    bestDepartment: DepartmentProductivity | null
    improvementTarget: DepartmentProductivity | null
    topPerformers: TopPerformer[]
}

export interface ProductivityResponse {
    productivityTrend: ProductivityTrend[]
    departmentProductivity: DepartmentProductivity[]
    topPerformers: TopPerformer[]
    insights: Insights
}

export interface ProductivityParams {
    venue_short_code: string
    time_frame?: 'weekly' | 'monthly' | 'quarterly' | 'yearly'
}

export const productivityApi = createApi({
    reducerPath: 'productivity',
    baseQuery: fetchBaseQuery({
        baseUrl: vbUrl + 'vb-apps/staff/admin',
        prepareHeaders: (headers) => getPrepareHeaders({ headers }),
    }),
    tagTypes: ['Productivity'],
    endpoints: (builder) => ({
        getProductivity: builder.query<ProductivityResponse, ProductivityParams>({
            query: ({ venue_short_code, time_frame = 'monthly' }) => ({
                url: getCommonUrl({
                    queryString: '/productivity',
                    query: `&venue_short_code=${venue_short_code}&time_frame=${time_frame}`,
                    params: staffAdminAppkeyParam,
                }),
            }),
            providesTags: ['Productivity'],
        }),
        exportProductivity: builder.mutation<Blob, ProductivityParams>({
            query: ({ venue_short_code, time_frame = 'monthly' }) => ({
                url: getCommonUrl({
                    queryString: '/productivity/export',
                    query: `&venue_short_code=${venue_short_code}&time_frame=${time_frame}`,
                    params: staffAdminAppkeyParam,
                }),
                responseHandler: async (response) => response.blob(),
                cache: 'no-cache',
            }),
        }),
    }),
})

export const {
    useGetProductivityQuery,
    useExportProductivityMutation
} = productivityApi