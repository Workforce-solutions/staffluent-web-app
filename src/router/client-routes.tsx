import GeneralError from '@/pages/errors/general-error.tsx'
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
        path: 'service-requests',
        lazy: async () => ({
          Component: (
            await import('../pages/client-portal/services/service-requests.tsx')
          ).default,
        }),
      },
      {
        path: 'service-requests/:id',
        lazy: async () => ({
          Component: (await import('../pages/client-portal/services/service-request-details.tsx')).default,
        }),
      },
      {
        path: 'services/history',
        lazy: async () => ({
          Component: (await import('../pages/client-portal/services/history/index.tsx')).default,
        }),
      },
      {
        path: 'services/weather-alerts',
        lazy: async () => ({
          Component: (await import('../pages/client-portal/services/weather-alerts/index.tsx')).default,
        }),
      },
      // Quality & Inspections Section
      {
        path: 'quality/inspections',
        lazy: async () => ({
          Component: (await import('../pages/client-portal/quality/inspections/index.tsx')).default,
        }),
      },
      {
        path: 'quality/reports',
        lazy: async () => ({
          Component: (await import('../pages/client-portal/quality/reports/index.tsx')).default,
        }),
      },
      {
        path: 'quality/progress',
        lazy: async () => ({
          Component: (await import('../pages/client-portal/quality/progress/index.tsx')).default,
        }),
      },
      // Documentation Section
      {
        path: 'service-records',
        lazy: async () => ({
          Component: (await import('../pages/client-portal/documentation/service-records/index.tsx')).default,
        }),
      },
      {
        path: 'compliance',
        lazy: async () => ({
          Component: (await import('../pages/client-portal/documentation/compliance/index.tsx')).default,
        }),
      },
      // Invoices Section
      {
        path: 'invoices',
        lazy: async () => ({
          Component: (await import('../pages/client-portal/invoices/index.tsx'))
            .default,
        }),
      },
      {
        path: 'invoices/confirmation',
        lazy: async () => ({
          Component: (
            await import('../pages/client-portal/invoices/confirmation')
          ).default,
        }),
      },
      {
        path: 'invoices/fail',
        lazy: async () => ({
          Component: (await import('../pages/client-portal/invoices/fail.tsx'))
            .default,
        }),
      },
      {
        path: 'invoices/success',
        lazy: async () => ({
          Component: (await import('../pages/client-portal/invoices/success'))
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
      {
        path: 'support/tickets/:id',
        lazy: async () => ({
          Component: (
            await import('../pages/client-portal/support/details.tsx')
          ).default,
        }),
      },
      // Other Pages
      {
        path: 'notifications',
        lazy: async () => ({
          Component: (
            await import('../pages/client-portal/notifications/index.tsx')
          ).default,
        }),
      },
      {
        path: 'settings',
        lazy: async () => ({
          Component: (await import('../pages/settings/index.tsx')).default,
        }),
        errorElement: <GeneralError />,
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
  {
    path: 'admin/clients/client-sign-off',
    lazy: async () => ({
      Component: (await import('../pages/clients/client-sign-off.tsx')).default,
    }),
  },
]