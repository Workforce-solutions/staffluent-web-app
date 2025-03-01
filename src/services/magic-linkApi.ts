import { AuthResponse } from '@/@types/auth'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import { BASE_URL, getPrepareHeaders } from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const magicLinkApi = createApi({
  reducerPath: 'magicLink',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) =>
      getPrepareHeaders({ headers, isClientApiKey: true }),
  }),
  tagTypes: ['MagicLink'],
  endpoints: (builder) => ({
    verifyMagicLink: builder.query<AuthResponse, { token: string }>({
      query: ({ token }) => ({
        url: getCommonUrl({
          queryString: `/magic-link/verify?token=${token}`,
        }),
      }),
      providesTags: ['MagicLink'],
    }),
    magicLink: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: getCommonUrl({
          queryString: '/magic-link/send',
        }),
        method: 'POST',
        body,
      }),
      invalidatesTags: ['MagicLink'],
    }),
  }),
})

export const { useLazyVerifyMagicLinkQuery, useMagicLinkMutation } =
  magicLinkApi
