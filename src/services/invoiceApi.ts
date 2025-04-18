import { VenueShortCode } from '@/@types/common'
import {
  GetInvoicetResponse,
  IdShortCodeProps,
  InvoiceListResponse,
  InvoiceResponse,
} from '@/@types/invoice'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffAdminAppkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface InvoiceParams extends VenueShortCode {
  query: string
}

export const invoiceApi = createApi({
  reducerPath: 'invoice',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/admin',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['Invoice'],
  endpoints: (builder) => ({
    getInvoiceList: builder.query<InvoiceListResponse, InvoiceParams>({
      query: ({ venue_short_code, query }) => ({
        url: getCommonUrl({
          queryString: '/invoices',
          query: `&venue_short_code=${venue_short_code}${query}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['Invoice'],
    }),

    createInvoice: builder.mutation<
      InvoiceResponse,
      VenueShortCode & { data: Record<string, string> }
    >({
      query: ({ venue_short_code, data }) => ({
        url: getCommonUrl({
          queryString: '/invoices/generate',
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${venue_short_code}`,
        }),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Invoice'],
    }),

    getInvoiceById: builder.query<
      GetInvoicetResponse,
      VenueShortCode & IdShortCodeProps
    >({
      query: ({ venue_short_code, id }) => ({
        url: getCommonUrl({
          queryString: `/invoices/${id}`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['Invoice'],
    }),

    markInvoiceAsPaid: builder.mutation<
      InvoiceResponse,
      VenueShortCode & IdShortCodeProps & { data: Record<string, string> }
    >({
      query: ({ venue_short_code, id, data }) => ({
        url: getCommonUrl({
          queryString: `/invoices/${id}/mark-as-paid`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Invoice'],
    }),

    downloadInvoicePdf: builder.query<Blob, VenueShortCode & IdShortCodeProps>({
      query: ({ venue_short_code, id }) => ({
        url: getCommonUrl({
          queryString: `/invoices/${id}/download`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
    }),
  }),
})

export const {
  useGetInvoiceListQuery,
  useCreateInvoiceMutation,
  useGetInvoiceByIdQuery,
  useMarkInvoiceAsPaidMutation,
  useLazyDownloadInvoicePdfQuery,
} = invoiceApi
