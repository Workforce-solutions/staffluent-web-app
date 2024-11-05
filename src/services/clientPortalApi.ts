import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import { getPrepareHeaders, staffAdminAppkeyParam, vbUrl } from '@/hooks/common/common-functions'
import { ClientService, Invoice, SupportTicket, ServiceRequest, FeedbackSubmission } from '@/@types/clientPortal'  // Adjust the import path as necessary

class NewTicket {
}

export const clientPortalApi = createApi({
    reducerPath: 'clientPortal',
    baseQuery: fetchBaseQuery({
        baseUrl: vbUrl + 'vb-apps/client-portal',
        prepareHeaders: (headers) => getPrepareHeaders({ headers }),
    }),
    tagTypes: ['Services', 'Invoices', 'Support'],
    endpoints: (builder) => ({
        getClientServices: builder.query<
            { active: ClientService[]; pending: ClientService[]; completed: ClientService[] },
            void
        >({
            query: () => ({
                url: getCommonUrl({
                    queryString: '/services',
                    params: staffAdminAppkeyParam,
                }),
            }),
            providesTags: ['Services'],
        }),

        getServiceDetails: builder.query<ClientService, string>({
            query: (id) => ({
                url: getCommonUrl({
                    queryString: `/services/${id}`,
                    params: staffAdminAppkeyParam,
                }),
            }),
            providesTags: (_result, _error, id) => [{ type: 'Services', id }],
        }),

        requestService: builder.mutation<void, ServiceRequest>({
            query: (data) => ({
                url: getCommonUrl({
                    queryString: '/services/request',
                    params: staffAdminAppkeyParam,
                }),
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Services'],
        }),

        submitFeedback: builder.mutation<void, FeedbackSubmission>({
            query: ({ serviceId, ...data }) => ({
                url: getCommonUrl({
                    queryString: `/services/${serviceId}/feedback`,
                    params: staffAdminAppkeyParam,
                }),
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (_result, _error, { serviceId }) => [{ type: 'Services', id: serviceId }],
        }),

        getClientInvoices: builder.query<
            { invoices: Invoice[]; total_count: number; pending_amount: number; paid_this_month: number },
            void
        >({
            query: () => ({
                url: getCommonUrl({
                    queryString: '/invoices',
                    params: staffAdminAppkeyParam,
                }),
            }),
            providesTags: ['Invoices'],
        }),

        getSupportTickets: builder.query<
            {
                active_tickets: SupportTicket[];
                resolved_tickets: SupportTicket[];
                all_tickets: SupportTicket[];
                active_count: number;
                resolved_count: number;
                avg_response_time: string;
            },
            void
        >({
            query: () => ({
                url: getCommonUrl({
                    queryString: '/support/tickets',
                    params: staffAdminAppkeyParam,
                }),
            }),
            providesTags: ['Support'],
        }),

        createSupportTicket: builder.mutation<void, NewTicket>({
            query: (data) => ({
                url: getCommonUrl({
                    queryString: '/support/tickets',
                    params: staffAdminAppkeyParam,
                }),
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Support'],
        }),
    }),
})

export const {
    useGetClientServicesQuery,
    useGetServiceDetailsQuery,
    useRequestServiceMutation,
    useSubmitFeedbackMutation,
    useGetClientInvoicesQuery,
    useGetSupportTicketsQuery,
    useCreateSupportTicketMutation,
} = clientPortalApi
