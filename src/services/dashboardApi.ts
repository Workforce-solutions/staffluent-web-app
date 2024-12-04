import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  getPrepareHeaders,
  staffAdminAppkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import { DashboardParams, DashboardResponse } from '@/@types/dashboard'

export const dashboardApi = createApi({
  reducerPath: 'dashboard',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/admin',
    prepareHeaders: (headers) => getPrepareHeaders({ headers, apikey: true }),
  }),
  tagTypes: ['Dashboard'],
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, DashboardParams>({
      query: ({ venue_short_code, time_frame = 'monthly' }) => ({
        url: getCommonUrl({
          queryString: '/dashboard',
          query: `&venue_short_code=${venue_short_code}&time_frame=${time_frame}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['Dashboard'],
    }),
    exportDashboard: builder.mutation<Blob, DashboardParams>({
      query: ({ venue_short_code, time_frame = 'monthly' }) => ({
        url: getCommonUrl({
          queryString: '/dashboard/export',
          query: `&venue_short_code=${venue_short_code}&time_frame=${time_frame}`,
          params: staffAdminAppkeyParam,
        }),
        responseHandler: async (response) => response.blob(),
        cache: 'no-cache',
      }),
    }),
  }),
})

export const { useGetDashboardQuery, useExportDashboardMutation } = dashboardApi