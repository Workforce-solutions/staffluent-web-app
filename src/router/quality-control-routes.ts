export const qualityControlRoutes = [
    {
        path: 'quality-control',
        children: [
            {
                path: 'checklists',
                lazy: async () => ({
                    Component: (await import('@/pages/quality-control/checklists')).default,
                }),
            },
            {
                path: 'metrics',
                lazy: async () => ({
                    Component: (await import('@/pages/quality-control/metrics')).default,
                }),
            },
            {
                path: 'safety-audits',
                lazy: async () => ({
                    Component: (await import('@/pages/quality-control/safety-audits')).default,
                }),
            },
            {
                path: 'compliance',
                lazy: async () => ({
                    Component: (await import('@/pages/quality-control/compliance')).default,
                }),
            },
        ],
    },
]