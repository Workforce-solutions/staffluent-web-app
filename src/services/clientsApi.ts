import {
  ClientResponse,
  ClientsType,
  CreateClientPayload,
  UpdateClientPayload,
} from '@/@types/clients'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffAdminAppkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const clientsApi = createApi({
  reducerPath: 'clients',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/admin',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['Clients'],
  endpoints: (builder) => ({
    getClients: builder.query<ClientsType, string>({
      query: (venue_short_code) => ({
        url: getCommonUrl({
          queryString: '/app-clients',
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['Clients'],
    }),

    getClientById: builder.query<
      ClientResponse,
      { id: number; short_code: string }
    >({
      query: ({ id, short_code }) => ({
        url: getCommonUrl({
          queryString: `/app-clients/${id}`,
          query: `&venue_short_code=${short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['Clients'],
    }),

    createClient: builder.mutation<ClientResponse, CreateClientPayload>({
      query: (payload) => ({
        url: getCommonUrl({
          queryString: '/app-clients',
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${payload.short_code}`,
        }),
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Clients'],
    }),

    updateClient: builder.mutation<ClientResponse, UpdateClientPayload>({
      query: (payload) => ({
        url: getCommonUrl({
          queryString: `/app-clients/${payload.id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${payload.short_code}`,
        }),
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Clients'],
    }),

    deleteClient: builder.mutation<void, { id: number; short_code: string }>({
      query: ({ id, short_code }) => ({
        url: getCommonUrl({
          queryString: `/app-clients/${id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${short_code}`,
        }),
        method: 'DELETE',
      }),
      invalidatesTags: ['Clients'],
    }),
  }),
})

export const {
  useGetClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientsApi
