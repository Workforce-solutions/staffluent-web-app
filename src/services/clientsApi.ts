import {
  ClientProjectsResponse,
  ClientResponse,
  ClientsType,
  CreateClientPayload,
  CreateUser,
  UpdateClientPayload,
} from '@/@types/clients'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffAdminAppkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {VenueShortCode} from "../@types/common";

// Combined API
export const clientsApi = createApi({
  reducerPath: 'clients',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/admin',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['Clients'],
  endpoints: (builder) => ({
    // Client endpoints
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

    createUser: builder.mutation<ClientResponse, CreateUser>({
      query: (payload) => ({
        url: getCommonUrl({
          queryString: '/app-clients/create-user',
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

    // Client Projects endpoints
    getClientProjects: builder.query<
        ClientProjectsResponse,
        VenueShortCode & {
      search?: string
      status?: string
      page?: number
      per_page?: number
      sort_by?: string
      sort_order?: 'asc' | 'desc'
    }
    >({
      query: ({ venue_short_code, search, status, page, per_page, sort_by, sort_order }) => ({
        url: getCommonUrl({
          queryString: '/client-projects',
          query: `&venue_short_code=${venue_short_code}${search ? `&search=${search}` : ''}${status ? `&status=${status}` : ''}${page ? `&page=${page}` : ''}${per_page ? `&per_page=${per_page}` : ''}${sort_by ? `&sort_by=${sort_by}` : ''}${sort_order ? `&sort_order=${sort_order}` : ''}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['Clients'],
    }),
  }),
})

export const {
  useGetClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useCreateUserMutation,
  useGetClientProjectsQuery,
} = clientsApi
