import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  vbParams,
  vbUrl,
} from '@/hooks/common/common-functions'
import { VenueShortCode } from '@/@types/common'
import { WorkOrderResponse } from '@/@types/oprationManager'
import { GetProjectsResponse } from '@/@types/project'

type IdInterface = { id: number | string } & VenueShortCode

export const operationManagerApi = createApi({
  reducerPath: 'operationManager',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/employee',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['WorkOrders', 'Projects'],
  endpoints: (builder) => ({
    getWorkOrdersList: builder.query<WorkOrderResponse, IdInterface>({
      query: ({ venue_short_code, id }) => ({
        url: getCommonUrl({
          queryString: `/projects/${id}/work-orders`,
          query: `&venue_short_code=${venue_short_code}`,
          params: vbParams,
        }),
      }),
      providesTags: ['WorkOrders'],
    }),
    createWorkOrder: builder.mutation<
      WorkOrderResponse,
      VenueShortCode & { data: Record<string, string>, id: number }
    >({
      query: ({ venue_short_code, data, id }) => ({
        url: getCommonUrl({
          queryString: `/projects/${id}/work-orders`,
          params: vbParams,
          query: `&venue_short_code=${venue_short_code}`,
        }),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['WorkOrders'],
    }),
    getProjectsList: builder.query<GetProjectsResponse, VenueShortCode>({
      query: ({ venue_short_code }) => ({
        url: getCommonUrl({
          queryString: '/projects',
          query: `&venue_short_code=${venue_short_code}`,
          params: vbParams,
        }),
      }),
      providesTags: ['Projects'],
    }),
  }),
})

export const {
  useGetWorkOrdersListQuery,
  useCreateWorkOrderMutation,
  useGetProjectsListQuery,
} = operationManagerApi
