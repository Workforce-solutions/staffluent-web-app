import { Role, RolesResponse } from '@/@types/auth'
import { PaginatedResponse } from '@/@types/common'
import {
  CreateAttachRoleProps,
  CreateCustomRoleProps,
  CustomRolesProps,
  DeleteRoleProps,
  RolesProps,
} from '@/@types/role'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffAdminAppkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const roleApi = createApi({
  reducerPath: 'role',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/admin',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['Roles'],
  endpoints: (builder) => ({
    getRoles: builder.query<RolesResponse, RolesProps>({
      query: ({ venue_short_code }) => ({
        url: getCommonUrl({
          queryString: '/roles',
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['Roles'],
    }),
    getCustomRoles: builder.query<PaginatedResponse<Role>, CustomRolesProps>({
      query: ({ venue_short_code, page, size }) => ({
        url: getCommonUrl({
          queryString: '/roles/custom',
          query: `&venue_short_code=${venue_short_code}&page=${page}&per_page=${size}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['Roles'],
    }),
    createCustomRole: builder.mutation<void, CreateCustomRoleProps>({
      query: ({ venue_short_code, name, description }) => ({
        url: getCommonUrl({
          queryString: '/roles/custom',
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${venue_short_code}`,
        }),
        method: 'POST',
        body: { name, description },
      }),
      invalidatesTags: ['Roles'],
    }),
    createAttachedRole: builder.mutation<void, CreateAttachRoleProps>({
      query: ({ venue_short_code, is_custom, role_id }) => ({
        url: getCommonUrl({
          queryString: '/roles/attach',
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${venue_short_code}`,
        }),
        method: 'POST',
        body: { is_custom, role_id },
      }),
      invalidatesTags: ['Roles'],
    }),
    deleteRole: builder.mutation<void, DeleteRoleProps>({
      query: ({ id, short_code }) => ({
        url: getCommonUrl({
          queryString: `/role/${id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${short_code}`,
        }),
        method: 'DELETE',
      }),
      invalidatesTags: ['Roles'],
    }),
    deleteCustomRole: builder.mutation<void, DeleteRoleProps>({
      query: ({ id, short_code }) => ({
        url: getCommonUrl({
          queryString: `/roles/custom/${id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${short_code}`,
        }),
        method: 'DELETE',
      }),
      invalidatesTags: ['Roles'],
    }),
  }),
})

export const {
  useGetRolesQuery,
  useGetCustomRolesQuery,
  useDeleteRoleMutation,
  useCreateCustomRoleMutation,
  useDeleteCustomRoleMutation,
  useCreateAttachedRoleMutation,
} = roleApi
