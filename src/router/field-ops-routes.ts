export const fieldOpsRoutes = [
    {
        path: 'field-ops',
        children: [
            {
                path: 'location',
                lazy: async () => ({
                    Component: (await import('@/pages/field-ops/location')).default,
                }),
            },
            {
                path: 'routes',
                lazy: async () => ({
                    Component: (await import('@/pages/field-ops/routes')).default,
                }),
            },
            {
                path: 'service-areas',
                lazy: async () => ({
                    Component: (await import('@/pages/field-ops/service-areas')).default,
                }),
            },
        ],
    },
]
