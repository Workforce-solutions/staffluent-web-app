import { RouteObject } from 'react-router-dom'


export const serviceAnalyticsRoute: RouteObject[] = [
    {
        path: 'admin/reports/services',
        lazy: async () => ({
            // @ts-ignore
            Component: (await import('../pages/reports/services')).default,
        }),
    },
    {
        path: 'admin/reports/clients',
        lazy: async () => ({
            // @ts-ignore
            Component: (await import('../pages/reports/clients')).default,
        }),
    },
    {
        path: 'admin/invoices/revenue',
        lazy: async () => ({
            // @ts-ignore
            Component: (await import('../pages/reports/revenue')).default,
        }),
    },
    {
        path: 'admin/invoices/:id',
        lazy: async () => ({
            Component: (await import('../pages/invoices/invoice-details')).default,
        }),
    }
]