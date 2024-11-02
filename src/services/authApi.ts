import { LoginProps } from '@/@types/auth'
import { getPrepareHeaders, supabaseUrl } from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: supabaseUrl + '/auth/v1',
    prepareHeaders: (headers) => getPrepareHeaders({ headers, apikey: true }),
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
  }),
})

export const { useLoginMutation } = authApi
