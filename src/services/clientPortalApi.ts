import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffClientPortalkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'
import {
  AvailableService,
  ClientService,
  ServiceRequest,
  SupportTicket,
} from '@/@types/clientPortal' // Adjust the import path as necessary
import { PaginatedResponse } from '@/@types/common'

export const clientPortalApi = createApi({
  reducerPath: 'clientPortal',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'client-portal',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['Services', 'ServiceRequests', 'SupportTickets'],
  endpoints: (builder) => ({
    // Fetch all services
    getClientServices: builder.query<ClientService[], void>({
      query: () => ({
        url: getCommonUrl({
          queryString: '/cp-services',
          params: staffClientPortalkeyParam,
        }),
      }),
      providesTags: ['Services'],
    }),

    // Get specific service details by ID
    getServiceDetails: builder.query<ClientService, string | undefined>({
      query: (id) => ({
        url: getCommonUrl({
          queryString: `/cp-services/${id}`,
          params: staffClientPortalkeyParam,
        }),
      }),
      providesTags: (_result, _error, id) => [{ type: 'Services', id }],
    }),

    // Create a new service request
    requestService: builder.mutation<void, ServiceRequest>({
      query: (data) => ({
        url: getCommonUrl({
          queryString: '/cp-service-requests/request',
          params: staffClientPortalkeyParam,
        }),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ServiceRequests'],
    }),

    // Fetch user's service requests
    listMyRequests: builder.query<PaginatedResponse<ServiceRequest>, void>({
      query: () => ({
        url: getCommonUrl({
          queryString: '/cp-service-requests/my-requests',
          params: staffClientPortalkeyParam,
        }),
      }),
      providesTags: ['ServiceRequests'],
    }),

    // Get details of a specific service request by ID
    getRequestDetails: builder.query<ServiceRequest, string>({
      query: (id) => ({
        url: getCommonUrl({
          queryString: `/cp-service-requests/my-requests/${id}`,
          params: staffClientPortalkeyParam,
        }),
      }),
      providesTags: (_result, _error, id) => [{ type: 'ServiceRequests', id }],
    }),

    createSupportTicket: builder.mutation<
      SupportTicket,
      Partial<SupportTicket>
    >({
      query: (data) => ({
        url: getCommonUrl({
          queryString: '/cp-support-tickets',
          params: staffClientPortalkeyParam,
        }),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['SupportTickets'],
    }),

    // Add this new endpoint for getting available services
    getAvailableServices: builder.query<AvailableService[], void>({
      query: () => ({
        url: getCommonUrl({
          queryString: '/cp-services/available',
          params: staffClientPortalkeyParam,
        }),
      }),
      providesTags: ['Services'],
    }),
  }),
})

export const {
  useGetClientServicesQuery,
  useGetServiceDetailsQuery,
  useRequestServiceMutation,
  useListMyRequestsQuery,
  useGetRequestDetailsQuery,
  useGetAvailableServicesQuery,
  useCreateSupportTicketMutation,
} = clientPortalApi
