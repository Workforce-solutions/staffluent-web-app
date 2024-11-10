import { AuthProps, LoginProps, RefreshProps } from '@/@types/auth'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffAdminAppkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'auth',
    prepareHeaders: (headers) =>
      getPrepareHeaders({ headers, isRefreshToken: true }),
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<{ jwt: string }, LoginProps>({
      query: (body) => ({
        url: '/token?grant_type=password',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    vbLogin: builder.mutation<AuthProps, LoginProps>({
      query: (body) => ({
        url: getCommonUrl({
          queryString: '/login',
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    authRefresh: builder.mutation<AuthProps, RefreshProps>({
      query: ({ venue_short_code }) => ({
        url: getCommonUrl({
          queryString: '/refresh',
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const { useLoginMutation, useAuthRefreshMutation, useVbLoginMutation } =
  authApi
