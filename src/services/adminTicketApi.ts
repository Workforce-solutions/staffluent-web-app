// src/services/adminTicketApi.ts
import { VenueShortCode } from '@/@types/common'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffAdminAppkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Ticket, TicketMessage } from './clientTicketApi'

export interface AdminTicket extends Ticket {
  client: {
    id: number
    name: string
    email: string
  }
  messages: TicketMessage[]
  assigned_to: AssignedTo
}

export interface AssignedTo {
  id: number
  name: string
}

export interface AdminTicketStats {
  open_tickets: number
  avg_response_time: string
  resolution_rate: string
  active_agents: number
}

export interface AdminTicketsResponse {
  tickets: {
    data: AdminTicket[]
    current_page: number
    per_page: number
    total: number
    total_pages: number
  }
  stats: AdminTicketStats
}

export const adminTicketApi = createApi({
  reducerPath: 'adminTickets',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/admin',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['AdminTickets'],
  endpoints: (builder) => ({
    getAdminTickets: builder.query<
      AdminTicketsResponse,
      VenueShortCode & {
        page?: number
        status?: string
        priority?: string
        search?: string
      }
    >({
      query: ({ venue_short_code, page = 1, ...params }) => ({
        url: getCommonUrl({
          queryString: '/tickets',
          query: `&venue_short_code=${venue_short_code}&page=${page}${Object.entries(
            params
          )
            .filter(([_, value]) => value)
            .map(([key, value]) => `&${key}=${value}`)
            .join('')}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['AdminTickets'],
    }),
    getTicketDetails: builder.query<
      { ticket: AdminTicket },
      VenueShortCode & { id: number }
    >({
      query: ({ venue_short_code, id }) => ({
        url: getCommonUrl({
          queryString: `/tickets/${id}`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: (_, __, { id }) => [{ type: 'AdminTickets', id }],
    }),
    replyToTicket: builder.mutation<
      { ticket_message: TicketMessage },
      VenueShortCode & {
        ticket_id: number
        message: string
        attachments?: string[]
      }
    >({
      query: ({ venue_short_code, ticket_id, ...data }) => ({
        url: getCommonUrl({
          queryString: `/tickets/${ticket_id}/reply`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_, __, { ticket_id }) => [
        { type: 'AdminTickets', id: ticket_id },
      ],
    }),
    assignTicket: builder.mutation<
      void,
      VenueShortCode & {
        ticket_id: number
        employee_id: number
      }
    >({
      query: ({ venue_short_code, ticket_id, employee_id }) => ({
        url: getCommonUrl({
          queryString: `/tickets/${ticket_id}/assign`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: { employee_id },
      }),
      invalidatesTags: (_, __, { ticket_id }) => [
        { type: 'AdminTickets', id: ticket_id },
      ],
    }),
    updateTicketStatus: builder.mutation<
      void,
      VenueShortCode & {
        ticket_id: number
        status: string
      }
    >({
      query: ({ venue_short_code, ticket_id, status }) => ({
        url: getCommonUrl({
          queryString: `/tickets/${ticket_id}/status`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: { status },
      }),
      invalidatesTags: (_, __, { ticket_id }) => [
        { type: 'AdminTickets', id: ticket_id },
      ],
    }),
    updateTicketPriority: builder.mutation<
      void,
      VenueShortCode & {
        ticket_id: number
        priority: string
      }
    >({
      query: ({ venue_short_code, ticket_id, priority }) => ({
        url: getCommonUrl({
          queryString: `/tickets/${ticket_id}/priority`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: { priority },
      }),
      invalidatesTags: (_, __, { ticket_id }) => [
        { type: 'AdminTickets', id: ticket_id },
      ],
    }),
  }),
})

export const {
  useGetAdminTicketsQuery,
  useGetTicketDetailsQuery,
  useReplyToTicketMutation,
  useAssignTicketMutation,
  useUpdateTicketStatusMutation,
  useUpdateTicketPriorityMutation,
} = adminTicketApi
