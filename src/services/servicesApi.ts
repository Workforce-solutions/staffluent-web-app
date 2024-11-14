import { ServiceCategoriesResponse } from '@/@types/clientPortal'
import { PaginationProps, VenueShortCode } from '@/@types/common'
import {
  CreateServicePayload,
  ServiceRequestsParams,
  ServiceRequestsResponse,
  ServicesReponse,
} from '@/@types/services'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffAdminAppkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const servicesApi = createApi({
  reducerPath: 'services',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/admin',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['AdminServices', 'AdminCategories'],
  endpoints: (builder) => ({
    getServiceRequests: builder.query<
      ServiceRequestsResponse,
      ServiceRequestsParams
    >({
      query: ({ venue_short_code, page, size, status }) => {
        let queryText = `&venue_short_code=${venue_short_code}&page=${page}&per_page=${size}`
        if (status) {
          queryText += `&status=${status}`
        }
        return {
          url: getCommonUrl({
            queryString: '/service-requests',
            query: queryText,
            params: staffAdminAppkeyParam,
          }),
        }
      },
      providesTags: ['AdminServices'],
    }),
    getServiceCategories: builder.query<
      ServiceCategoriesResponse,
      VenueShortCode & PaginationProps
    >({
      query: ({ venue_short_code, page, size }) => ({
        url: getCommonUrl({
          queryString: '/service-categories',
          query: `&venue_short_code=${venue_short_code}&page=${page}&per_page=${size}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['AdminCategories'],
    }),
    updateServiceCategorie: builder.mutation<
      ServiceCategoriesResponse,
      VenueShortCode & { id: number; data: Record<string, string> }
    >({
      query: ({ venue_short_code, id, data }) => ({
        url: getCommonUrl({
          queryString: `/service-categories/${id}`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['AdminCategories'],
    }),
    createServiceCategorie: builder.mutation<
      ServiceCategoriesResponse,
      VenueShortCode & { data: Record<string, string> }
    >({
      query: ({ venue_short_code, data }) => ({
        url: getCommonUrl({
          queryString: `/service-categories`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['AdminCategories'],
    }),
    deleteServiceCategorie: builder.mutation<
      void,
      VenueShortCode & { id: number }
    >({
      query: ({ venue_short_code, id }) => ({
        url: getCommonUrl({
          queryString: `/service-categories/${id}`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'DELETE',
      }),
      invalidatesTags: ['AdminCategories'],
    }),
    approveServiceRequest: builder.mutation<
      void,
      { id: number; venue_short_code: string }
    >({
      query: ({ id, venue_short_code }) => ({
        url: getCommonUrl({
          queryString: `/service-requests/${id}/approve`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
      }),
      invalidatesTags: ['AdminServices'],
    }),
    declineServiceRequest: builder.mutation<
      void,
      { id: number; venue_short_code: string; reason: string }
    >({
      query: ({ id, venue_short_code, reason }) => ({
        url: getCommonUrl({
          queryString: `/service-requests/${id}/decline`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: { reason },
      }),
      invalidatesTags: ['AdminServices'],
    }),

    // Services

    getServices: builder.query<
      ServicesReponse,
      VenueShortCode & PaginationProps
    >({
      query: ({ venue_short_code, page, size }) => ({
        url: getCommonUrl({
          queryString: '/services',
          query: `&venue_short_code=${venue_short_code}&page=${page}&per_page=${size}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['AdminCategories'],
    }),
    createService: builder.mutation<
      CreateServicePayload,
      VenueShortCode & { data: CreateServicePayload }
    >({
      query: ({ venue_short_code, data }) => ({
        url: getCommonUrl({
          queryString: `/services`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['AdminCategories'],
    }),
    updateService: builder.mutation<
      CreateServicePayload,
      VenueShortCode & { data: CreateServicePayload; id: number }
    >({
      query: ({ venue_short_code, data, id }) => ({
        url: getCommonUrl({
          queryString: `/services/${id}`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['AdminCategories'],
    }),

    deleteService: builder.mutation<void, VenueShortCode & { id: number }>({
      query: ({ venue_short_code, id }) => ({
        url: getCommonUrl({
          queryString: `/services/${id}`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'DELETE',
      }),
      invalidatesTags: ['AdminCategories'],
    }),
  }),
})

export const {
  useGetServiceRequestsQuery,
  useGetServiceCategoriesQuery,
  useGetServicesQuery,
  useUpdateServiceCategorieMutation,
  useCreateServiceCategorieMutation,
  useDeleteServiceCategorieMutation,
  useApproveServiceRequestMutation,
  useDeclineServiceRequestMutation,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi
