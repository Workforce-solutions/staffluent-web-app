// src/services/clientTicketApi.ts
import { VenueShortCode } from '@/@types/common'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffClientPortalkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'

export interface Ticket {
  id: number | string
  number: string
  subject: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  created_at: string
  updated_at: string
  last_reply_at: string
  assigned_to?: {
    id: number
    name: string
  }
  related_to: {
    project?: { id: number; name: string }
    service?: { id: number; name: string }
    service_request?: { id: number; reference: string }
  }
  messages: TicketMessage[]

}

export interface TicketMessage {
  id: number
  message: string
  sender_type: 'client' | 'employee'
  sender: {
    id: number
    name: string
  }
  attachments: string[]
  created_at: string
}

export interface TicketStats {
  active_count: number
  resolved_count: number
  avg_response_time: string
}

export interface TicketsResponse {
  tickets: {
    data: Ticket[]
    current_page: number
    per_page: number
    total: number
    total_pages: number
  }
  stats: TicketStats
}

export const clientTicketApi = createApi({
  reducerPath: 'clientTickets',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'client-portal',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['ClientTickets'],
  endpoints: (builder) => ({
    getClientTickets: builder.query<TicketsResponse, {
      page?: number;
      status?: string;
      priority?: string;
      search?: string;
      per_page?: number;
    }>({
      query: (params) => {
        return {
          url: getCommonUrl({
            queryString: '/cp-tickets',
            query: `&page=${params.page || 1}
                &status=${params.status || ''}
                &priority=${params.priority || ''}
                &search=${params.search || ''}
                &per_page=${params.per_page || 10}`,
            params: staffClientPortalkeyParam,
          }),
        };
      },
      providesTags: ['ClientTickets'],
    }),
    getTicketDetails: builder.query<{ ticket: Ticket }, number>({
      query: (id) => ({
        url: getCommonUrl({
          queryString: `/cp-tickets/${id}`,
          params: staffClientPortalkeyParam,
        }),
      }),
      providesTags: (_, __, id) => [{ type: 'ClientTickets', id }],
    }),
    createTicket: builder.mutation<{ ticket: Ticket }, VenueShortCode & {
      subject: string
      description: string
      priority: string
    }>({
      query: ({ venue_short_code, ...data }) => ({
        url: getCommonUrl({
          queryString: '/cp-tickets',
          query: ``,
          params: staffClientPortalkeyParam,
        }),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ClientTickets'],
    }),
    replyToTicket: builder.mutation<{ ticket_message: TicketMessage }, VenueShortCode & {
      ticket_id: number
      message: string
      attachments?: string[]
    }>({
      query: ({ venue_short_code, ticket_id, ...data }) => ({
        url: getCommonUrl({
          queryString: `/cp-tickets/${ticket_id}/reply`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffClientPortalkeyParam,
        }),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_, __, { ticket_id }) => [
        { type: 'ClientTickets', id: ticket_id }
      ],
    }),
  }),
})

export const {
  useGetClientTicketsQuery,
  useGetTicketDetailsQuery,
  useCreateTicketMutation,
  useReplyToTicketMutation,
} = clientTicketApi