export const projectAdditionalRoutes = [
    {
        path: 'projects',
        children: [
            {
                path: 'milestones',
                lazy: async () => ({
                    Component: (await import('@/pages/projects/milestones')).default,
                }),
            },
            {
                path: 'workflows',
                lazy: async () => ({
                    Component: (await import('@/pages/projects/workflows')).default,
                }),
            },
            {
                path: 'materials',
                lazy: async () => ({
                    Component: (await import('@/pages/projects/materials')).default,
                }),
            },
            {
                path: 'weather',
                lazy: async () => ({
                    Component: (await import('@/pages/projects/weather')).default,
                }),
            },
        ],
    },
]