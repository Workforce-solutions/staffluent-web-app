import { RouteObject } from 'react-router-dom'

export const servicesRoute: RouteObject[] = [
  {
    path: 'admin/services',
    lazy: async () => ({
      Component: (await import('../pages/services/index')).default,
    }),
  },
  {
    path: 'admin/services/categories',
    lazy: async () => ({
      Component: (await import('../pages/services/service-categories')).default,
    }),
  },
  {
    path: 'admin/services/requests',
    lazy: async () => ({
      Component: (await import('../pages/services/service-requests')).default,
    }),
  },
]
