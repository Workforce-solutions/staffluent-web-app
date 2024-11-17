// services/feedbackApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { VenueShortCode } from '@/@types/common'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffAdminAppkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'

interface FeedbackStats {
  average_rating: number
  rating_change: number
  total_reviews: number
  satisfaction_rate: number
  response_rate: number
}

export interface Feedback {
  id: number
  client_name: string
  project_name?: string
  type: string
  rating: number
  comment: string
  admin_response?: string
  created_at: string
  responded_at?: string
}

interface FeedbackResponse {
  data: Feedback[]
  meta: {
    current_page: number
    per_page: number
    total: number
    total_pages: number
  }
}

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/admin',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['Feedback'],
  endpoints: (builder) => ({
    getFeedbackStats: builder.query<FeedbackStats, VenueShortCode>({
      query: ({ venue_short_code }) => ({
        url: getCommonUrl({
          queryString: '/feedback/stats',
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['Feedback'],
    }),

    getFeedbackList: builder.query<
      FeedbackResponse,
      VenueShortCode & {
        search?: string
        rating?: string
        page?: number
        per_page?: number
      }
    >({
      query: ({ venue_short_code, search, rating, page, per_page }) => ({
        url: getCommonUrl({
          queryString: '/feedback',
          query: `&venue_short_code=${venue_short_code}&search=${search || ''}&rating=${
    rating || ''
}&page=${page || 1}&per_page=${per_page || 10}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['Feedback'],
    }),

    respondToFeedback: builder.mutation<
      void,
      VenueShortCode & { id: number; response: string }
    >({
      query: ({ venue_short_code, id, response }) => ({
        url: getCommonUrl({
          queryString: `/feedback/${id}/respond`,
query: `&venue_short_code=${venue_short_code}`,
    params: staffAdminAppkeyParam,
}),
method: 'POST',
    body: { response },
}),
invalidatesTags: ['Feedback'],
}),
}),
})

export const {
    useGetFeedbackStatsQuery,
    useGetFeedbackListQuery,
    useRespondToFeedbackMutation,
} = feedbackApi
