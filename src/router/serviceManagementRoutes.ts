// service-management-routes.ts
export const serviceManagementRoutes = [
    {
        path: 'services',
        children: [
            {
                path: 'verification',
                lazy: async () => ({
                    Component: (await import('@/pages/services/verification')).default,
                }),
            },
            {
                path: 'weather-monitoring',
                lazy: async () => ({
                    Component: (await import('@/pages/services/weather-monitoring')).default,
                }),
            },
        ],
    },
]