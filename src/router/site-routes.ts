// site-routes.ts
export const siteRoutes = [
    {
        path: 'sites',
        children: [
            {
                path: 'overview',
                lazy: async () => ({
                    Component: (await import('@/pages/sites/overview')).default,
                }),
            },
            {
                path: 'configuration',
                lazy: async () => ({
                    Component: (await import('@/pages/sites/configuration')).default,
                }),
            },
            {
                path: 'resources',
                lazy: async () => ({
                    Component: (await import('@/pages/sites/resources')).default,
                }),
            },
            {
                path: 'monitoring',
                lazy: async () => ({
                    Component: (await import('@/pages/sites/monitoring')).default,
                }),
            },
            {
                path: 'documents',
                lazy: async () => ({
                    Component: (await import('@/pages/sites/documents')).default,
                }),
            },
            {
                path: 'access',
                lazy: async () => ({
                    Component: (await import('@/pages/sites/access')).default,
                }),
            }
        ],
    },
]