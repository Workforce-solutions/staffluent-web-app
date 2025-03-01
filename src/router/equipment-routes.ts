export const equipmentRoutes = [
  {
    path: 'equipment',
    children: [
      {
        path: 'tracking',
        lazy: async () => ({
          Component: (await import('@/pages/equipment/tracking')).default,
        }),
      },
      {
        path: 'maintenance',
        lazy: async () => ({
          Component: (await import('@/pages/equipment/maintenance')).default,
        }),
      },
      {
        path: 'monitoring',
        lazy: async () => ({
          Component: (await import('@/pages/equipment/monitoring')).default,
        }),
      },
      {
        path: 'assignment',
        lazy: async () => ({
          Component: (await import('@/pages/equipment/assignment')).default,
        }),
      },
    ],
  },
]
