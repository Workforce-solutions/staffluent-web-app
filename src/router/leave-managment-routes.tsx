import { RouteObject } from 'react-router-dom'

export const leaveManagementRoutes: RouteObject[] = [
  {
    path: 'leave-management/leave-types',
    lazy: async () => ({
      Component: (await import('../pages/leave-management/leave-types'))
        .default,
    }),
  },
  {
    path: 'leave-management/time-off-requests',
    lazy: async () => ({
      Component: (await import('../pages/leave-management/time-off-requests'))
        .default,
    }),
  },
  {
    path: 'leave-management/dashboard',
    lazy: async () => ({
      Component: (
        await import('../pages/leave-management/leave-balance-dashboard')
      ).default,
    }),
  },
]
