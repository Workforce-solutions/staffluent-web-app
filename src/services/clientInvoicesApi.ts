
import { VenueShortCode } from '@/@types/common'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
    getPrepareHeaders,
    staffClientPortalkeyParam,
    vbUrl,
} from '@/hooks/common/common-functions'

export interface Invoice {
    id: number
    number: string
    service_name: string
    date: string
    due_date: string
    amount: number
    status: 'paid' | 'pending' | 'overdue'
}

export interface InvoiceStats {
    due_now: number
    last_payment: number
    total_count: number
}

export interface InvoiceResponse {
    stats: InvoiceStats
    invoices: {
        data: Invoice[]
        current_page: number
        per_page: number
        total: number
        total_pages: number
    }
}

export interface PaymentResponse {
    message: string
    payment: {
        id: number
        amount: number
        status: string
        method: string
        metadata: {
            client_secret?: string
            bank_details?: any
        }
    }
}

export const clientInvoicesApi = createApi({
    reducerPath: 'clientInvoice',
    baseQuery: fetchBaseQuery({
        baseUrl: vbUrl + 'client-portal',
        prepareHeaders: (headers) => getPrepareHeaders({ headers }),
    }),
    tagTypes: ['ClientInvoices'],
    endpoints: (builder) => ({
        getClientInvoices: builder.query<InvoiceResponse, VenueShortCode & { page?: number }>({
            query: ({ venue_short_code, page = 1 }) => ({
                url: getCommonUrl({
                    queryString: '/cp-invoices',
                    query: `&venue_short_code=${venue_short_code}&page=${page}`,
                    params: staffClientPortalkeyParam,
                }),
            }),
            providesTags: ['ClientInvoices'],
        }),
        initiatePayment: builder.mutation<PaymentResponse, VenueShortCode & {
            invoice_id: number
            payment_method: 'card' | 'bank_transfer' | 'cash'
            payment_date?: string
        }>({
            query: ({ venue_short_code, invoice_id, ...data }) => ({
                url: getCommonUrl({
                    queryString: `/cp-invoices/${invoice_id}/pay`,
                    query: `&venue_short_code=${venue_short_code}`,
                    params: staffClientPortalkeyParam,
                }),
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['ClientInvoices'],
        }),
    }),
})

export const {
    useGetClientInvoicesQuery,
    useInitiatePaymentMutation
} = clientInvoicesApi