// reports-analytics-routes.ts
export const analyticsReportsRoutes = [
    {
        path: 'reports',
        children: [
            {
                path: 'quality',
                lazy: async () => ({
                    Component: (await import('@/pages/reports/quality')).default,
                }),
            },
            {
                path: 'equipment',
                lazy: async () => ({
                    Component: (await import('@/pages/reports/equipment')).default,
                }),
            },
            {
                path: 'safety',
                lazy: async () => ({
                    Component: (await import('@/pages/reports/safety')).default,
                }),
            },
            {
                path: 'sites',
                lazy: async () => ({
                    Component: (await import('@/pages/reports/sites')).default,
                }),
            },
        ],
    },
]