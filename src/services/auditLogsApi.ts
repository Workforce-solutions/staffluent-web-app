import { VenueShortCode } from '@/@types/common'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {getCommonUrl} from "../hooks/common/common-api-url";
import {getPrepareHeaders, staffAdminAppkeyParam, vbUrl} from "../hooks/common/common-functions";

export interface AuditLog {
    id: string
    action: string
    user: string
    timestamp: string
    details: string
    severity: 'High' | 'Medium' | 'Low'
    type: 'staff' | 'login'
}

export interface AuditLogResponse {
    logs: AuditLog[]
    summary: {
        total_logs: number
        unique_users: number
        actions_today: number
        critical_events: number
    }
    pagination: {
        current_page: number
        per_page: number
        total: number
        total_pages: number
    }
    filters: {
        actions: string[]
    }
}


export const auditLogsApi = createApi({
    reducerPath: 'auditLogs',
    baseQuery: fetchBaseQuery({
        baseUrl: vbUrl + 'vb-apps/staff/admin',
        prepareHeaders: (headers) => getPrepareHeaders({ headers }),
    }),
    tagTypes: ['AuditLogs'],
    endpoints: (builder) => ({
        getAuditLogs: builder.query<AuditLogResponse, VenueShortCode & {
            page?: number
            search?: string
            action?: string
            date?: string
        }>({
            query: ({ venue_short_code, page = 1, search, action, date }) => ({
                url: getCommonUrl({
                    queryString: '/logs/audit',
                    query: `&venue_short_code=${venue_short_code}&page=${page}&per_page=10${
                        search ? `&search=${search}` : ''
                    }${action ? `&action=${action}` : ''}${
                        date ? `&date=${date}` : ''
                    }`,
                    params: staffAdminAppkeyParam,
                }),
            }),
            transformResponse: (response: any): AuditLogResponse => ({
                logs: response.logs.data.map((log: any) => ({
                    id: log.id,
                    action: log.action,
                    user: log.user || '-',
                    timestamp: log.timestamp,
                    details: log.details,
                    severity: log.severity,
                    type: log.type
                })),
                summary: {
                    total_logs: Number(response.summary.total_logs),
                    unique_users: Number(response.summary.unique_users),
                    actions_today: Number(response.summary.actions_today),
                    critical_events: Number(response.summary.critical_events)
                },
                pagination: {
                    current_page: Number(response.pagination.current_page),
                    per_page: Number(response.pagination.per_page),
                    total: Number(response.pagination.total),
                    total_pages: Number(response.pagination.total_pages)
                },
                filters: {
                    actions: response.filters.actions
                }
            }),
            providesTags: ['AuditLogs'],
        }),
        exportAuditLogs: builder.mutation<Blob, VenueShortCode & {
            format: 'csv'
            search?: string
            action?: string
            date?: string
        }>({
            query: ({ venue_short_code, search, action, date }) => ({
                url: getCommonUrl({
                    queryString: '/logs/audit/export',
                    query: `&venue_short_code=${venue_short_code}${
                        search ? `&search=${search}` : ''
                    }${action ? `&action=${action}` : ''}${
                        date ? `&date=${date}` : ''
                    }`,
                    params: staffAdminAppkeyParam,
                }),
                responseHandler: (response) => response.blob(),
            }),
        }),
    }),
})

export const {
    useGetAuditLogsQuery,
    useExportAuditLogsMutation
} = auditLogsApi