import { RouteObject } from 'react-router-dom'

export const clientsRoute: RouteObject[] = [
  {
    path: 'client-portal',
    children: [
      {
        path: 'dashboard',
        lazy: async () => ({
          Component: (
            await import('../pages/client-portal/dashboard/index.tsx')
          ).default,
        }),
      },
      {
        path: 'services',
        lazy: async () => ({
          Component: (await import('../pages/client-portal/services/index.tsx'))
            .default,
        }),
      },
      {
        path: 'services/:id',
        lazy: async () => ({
          Component: (
            await import('../pages/client-portal/services/service-details.tsx')
          ).default,
        }),
      },
      {
        path: 'invoices',
        lazy: async () => ({
          Component: (await import('../pages/client-portal/invoices/index.tsx'))
            .default,
        }),
      },
      {
        path: 'support',
        lazy: async () => ({
          Component: (await import('../pages/client-portal/support/index.tsx'))
            .default,
        }),
      },
    ],
  },
  {
    path: 'admin/clients/projects',
    lazy: async () => ({
      Component: (await import('../pages/clients/client-projects.tsx')).default,
    }),
  },
  {
    path: 'admin/clients/feedback',
    lazy: async () => ({
      Component: (await import('../pages/clients/client-feedback.tsx')).default,
    }),
  },
]
