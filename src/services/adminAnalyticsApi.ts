// adminAnalyticsApi.ts
import {
  ClientAnalytics,
  DateRange,
  RevenueAnalytics,
  ServiceAnalytics,
} from '@/@types/admin-analytics'
import { VenueShortCode } from '@/@types/common'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffAdminAppkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface ExportParams extends VenueShortCode, DateRange {
  period?: string
}

export const adminAnalyticsApi = createApi({
  reducerPath: 'adminAnalytics',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/admin',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  endpoints: (builder) => ({
    getServiceAnalytics: builder.query<
      ServiceAnalytics,
      VenueShortCode & DateRange
    >({
      query: ({ venue_short_code, date_from, date_to }) => ({
        url: getCommonUrl({
          queryString: '/analytics/services',
          query: `&venue_short_code=${venue_short_code}${
            date_from ? `&date_from=${date_from}` : ''
          }${date_to ? `&date_to=${date_to}` : ''}`,
          params: staffAdminAppkeyParam,
        }),
      }),
    }),
    getClientAnalytics: builder.query<
      ClientAnalytics,
      VenueShortCode & DateRange
    >({
      query: ({ venue_short_code, date_from, date_to }) => ({
        url: getCommonUrl({
          queryString: '/analytics/clients',
          query: `&venue_short_code=${venue_short_code}${
            date_from ? `&date_from=${date_from}` : ''
          }${date_to ? `&date_to=${date_to}` : ''}`,
          params: staffAdminAppkeyParam,
        }),
      }),
    }),
    getRevenueAnalytics: builder.query<
      RevenueAnalytics,
      VenueShortCode & DateRange
    >({
      query: ({ venue_short_code, date_from, date_to }) => ({
        url: getCommonUrl({
          queryString: '/analytics/revenue',
          query: `&venue_short_code=${venue_short_code}${
            date_from ? `&date_from=${date_from}` : ''
          }${date_to ? `&date_to=${date_to}` : ''}`,
          params: staffAdminAppkeyParam,
        }),
      }),
    }),
    exportServiceAnalytics: builder.mutation<Blob, ExportParams>({
      query: ({ venue_short_code, date_from, date_to, period }) => ({
        url: getCommonUrl({
          queryString: '/analytics/services/export',
          query: `&venue_short_code=${venue_short_code}${
            date_from ? `&date_from=${date_from}` : ''
          }${date_to ? `&date_to=${date_to}` : ''}${
            period ? `&period=${period}` : ''
          }`,
          params: staffAdminAppkeyParam,
        }),
      }),
    }),
    exportClientAnalytics: builder.mutation<Blob, ExportParams>({
      query: ({ venue_short_code, date_from, date_to, period }) => ({
        url: getCommonUrl({
          queryString: '/analytics/clients/export',
          query: `&venue_short_code=${venue_short_code}${
            date_from ? `&date_from=${date_from}` : ''
          }${date_to ? `&date_to=${date_to}` : ''}${
            period ? `&period=${period}` : ''
          }`,
          params: staffAdminAppkeyParam,
        }),
      }),
    }),
    exportRevenueAnalytics: builder.mutation<Blob, ExportParams>({
      query: ({ venue_short_code, date_from, date_to, period }) => ({
        url: getCommonUrl({
          queryString: '/analytics/revenue/export',
          query: `&venue_short_code=${venue_short_code}${
            date_from ? `&date_from=${date_from}` : ''
          }${date_to ? `&date_to=${date_to}` : ''}${
            period ? `&period=${period}` : ''
          }`,
          params: staffAdminAppkeyParam,
        }),
      }),
    }),
  }),
})

export const {
  useGetServiceAnalyticsQuery,
  useGetClientAnalyticsQuery,
  useGetRevenueAnalyticsQuery,
  useExportServiceAnalyticsMutation,
  useExportClientAnalyticsMutation,
  useExportRevenueAnalyticsMutation,
} = adminAnalyticsApi
