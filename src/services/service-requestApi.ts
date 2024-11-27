import { VenueShortCode } from '@/@types/common'
import { ServiceRequestProps, ServiceRequestResponse } from '@/@types/services'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffAdminAppkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const serviceRequestApi = createApi({
  reducerPath: 'serviceRequests',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/admin',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['ServiceRequests', 'Projects'],
  endpoints: (builder) => ({
    getServiceRequests: builder.query<ServiceRequestResponse, VenueShortCode>({
      query: ({ venue_short_code }) => ({
        url: getCommonUrl({
          queryString: '/service-requests',
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['ServiceRequests'],
    }),
    getServiceRequestDetails: builder.query<
      ServiceRequestProps,
      VenueShortCode & { id: number }
    >({
      query: ({ venue_short_code, id }) => ({
        url: getCommonUrl({
          queryString: `/service-requests/${id}`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: (_, __, { id }) => [{ type: 'ServiceRequests', id }],
    }),
    approveServiceRequest: builder.mutation<
      void,
      VenueShortCode & { id: number; scheduled_date: string }
    >({
      query: ({ venue_short_code, id, scheduled_date }) => ({
        url: getCommonUrl({
          queryString: `/service-requests/${id}/approve`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: { scheduled_date },
      }),
      invalidatesTags: ['ServiceRequests'],
    }),
    declineServiceRequest: builder.mutation<
      void,
      VenueShortCode & { id: number; reason: string }
    >({
      query: ({ venue_short_code, id, reason }) => ({
        url: getCommonUrl({
          queryString: `/service-requests/${id}/decline`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: { reason },
      }),
      invalidatesTags: ['ServiceRequests'],
    }),
    connectServiceRequestWithProject: builder.mutation<
      void,
      VenueShortCode & { id: number; project_id: number }
    >({
      query: ({ venue_short_code, id, project_id }) => ({
        url: getCommonUrl({
          queryString: `/service-requests/${id}/connect-project`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: { project_id },
      }),
      invalidatesTags: ['ServiceRequests', 'Projects'],
    }),
  }),
})

export const {
  useGetServiceRequestsQuery,
  useGetServiceRequestDetailsQuery,
  useApproveServiceRequestMutation,
  useDeclineServiceRequestMutation,
  useConnectServiceRequestWithProjectMutation,
} = serviceRequestApi
