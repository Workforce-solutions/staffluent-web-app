// work-orders-routes.ts
export const workOrdersRoutes = [
    {
        path: 'work-orders',
        children: [
            {
                path: '',
                lazy: async () => ({
                    Component: (await import('@/pages/work-orders/index')).default,
                }),
            },
            {
                path: ':id',
                lazy: async () => ({
                    Component: (await import('@/pages/work-orders/details')).default,
                }),
            },
            {
                path: 'reports',
                lazy: async () => ({
                    Component: (await import('@/pages/work-orders/reports')).default,
                }),
            },
            {
                path: 'settings',
                lazy: async () => ({
                    Component: (await import('@/pages/work-orders/settings')).default,
                }),
            },
            // {
            //     path: 'weather-monitoring',
            //     lazy: async () => ({
            //         Component: (await import('@/pages/services/weather-monitoring')).default,
            //     }),
            // },
        ],
    },
]