import { AuditReportListResponse, OshaComplianceResponse } from '@/@types/safety'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffAdminAppkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const safetyApi = createApi({
  reducerPath: 'safety',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/admin',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['Osha', 'Safety'],
  endpoints: (builder) => ({
    addOsha: builder.mutation<void, {shortCode: string, complianceData: any}>({
      query: ({ shortCode, complianceData }) => ({
        url: getCommonUrl({
          queryString: '/osha-compliance', 
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'POST',
        body: complianceData,
      }),
      invalidatesTags: ['Osha'],
    }),
    getOshaCompliance: builder.query<OshaComplianceResponse, {shortCode: string}>({
      query: ({ shortCode }) => ({  
        url: getCommonUrl({
          queryString: '/osha-compliance', 
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
      }),
    }),
    getAuditReportList: builder.query<AuditReportListResponse, {shortCode: string}>({
      query: ({ shortCode }) => ({
        url: getCommonUrl({
          queryString: '/safety-audit',
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
      }),
    }),

  }),
})

export const {
  useAddOshaMutation,
  useGetOshaComplianceQuery,
  useGetAuditReportListQuery,
} = safetyApi