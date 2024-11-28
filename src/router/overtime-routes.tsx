import { RouteObject } from 'react-router-dom'

export const overtimeRoutes: RouteObject[] = [
  {
    path: 'overtime/list',
    lazy: async () => ({
      Component: (await import('../pages/overtime/list')).default,
    }),
  },

  {
    path: 'overtime/dashboard',
    lazy: async () => ({
      Component: (await import('../pages/overtime/dashboard')).default,
    }),
  },
]
