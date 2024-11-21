import { RouteObject } from 'react-router-dom'

export const supportRoutes: RouteObject[] = [
    {
        path: 'admin/support/tickets',
        lazy: async () => ({
            Component: (await import('../pages/support/index')).default,
        }),
    }, {
        path: 'admin/support/tickets/:id',
        lazy: async () => ({
          Component: (await import('../pages/support/details')).default,
        }),
      },
]