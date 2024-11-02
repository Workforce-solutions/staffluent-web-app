import { AuthProps, LoginData } from '@/@types/auth'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import { getPrepareHeaders, vbUrl } from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const vbAuthApi = createApi({
  reducerPath: 'vbAuth',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl,
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['vbUser'],
  endpoints: (builder) => ({
    checkConnection: builder.mutation<AuthProps, LoginData>({
      query: (body) => ({
        url: getCommonUrl({ queryString: '/vb-apps/verify-supabase' }),
        method: 'POST',
        body,
      }),
      invalidatesTags: ['vbUser'],
    }),
  }),
})

export const { useCheckConnectionMutation } = vbAuthApi
