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
        path: 'admin/reports/revenue',
        lazy: async () => ({
            // @ts-ignore
            Component: (await import('../pages/reports/revenue')).default,
        }),
    }
]