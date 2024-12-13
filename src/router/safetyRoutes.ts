export const safetyRoutes = [
    {
        path: 'safety',
        children: [
            {
                path: 'barriers',
                lazy: async () => ({
                    Component: (await import('@/pages/safety/barriers')).default,
                }),
            },
            {
                path: 'osha',
                lazy: async () => ({
                    Component: (await import('@/pages/safety/osha')).default,
                }),
            },
            {
                path: 'ada',
                lazy: async () => ({
                    Component: (await import('@/pages/safety/ada')).default,
                }),
            },
            {
                path: 'maps',
                lazy: async () => ({
                    Component: (await import('@/pages/safety/maps')).default,
                }),
            },
        ],
    },
]