/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    VenueShortCode,
} from '@/@types/common'
import { ComplianceReportsResponse, ComplianceStatusResponse } from '@/@types/compliance'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
    getPrepareHeaders,
    staffAdminAppkeyParam,
    vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const complianceApi = createApi({
    reducerPath: 'compliance',
    baseQuery: fetchBaseQuery({
        baseUrl: vbUrl + 'vb-apps/staff/admin',
        prepareHeaders: (headers) => getPrepareHeaders({ headers }),
    }),
    tagTypes: ['Compliance'],
    endpoints: (builder) => ({
        getComplianceStatus: builder.query<ComplianceStatusResponse, VenueShortCode>({
            query: ({ venue_short_code }) => ({
                url: getCommonUrl({
                    queryString: '/compliance/status',
                    query: `&venue_short_code=${venue_short_code}`,
                    params: staffAdminAppkeyParam,
                }),
            }),
            providesTags: ['Compliance'],
        }),
        getComplianceReports: builder.query<ComplianceReportsResponse, { venue_short_code: VenueShortCode, start_date: any, end_date: any, department_id: string | null }>({
            query: ({ venue_short_code, start_date, end_date, department_id }) => ({
                url: getCommonUrl({
                    queryString: `/compliance/report`,
                    query: `&start_date=${start_date}&end_date=${end_date}&department_id=${department_id}&venue_short_code=${venue_short_code}`,
                    params: staffAdminAppkeyParam,
                }),
            }),
            providesTags: ['Compliance'],
        }),
    }),
})

export const {
    useGetComplianceStatusQuery,
    useGetComplianceReportsQuery,
} = complianceApi
