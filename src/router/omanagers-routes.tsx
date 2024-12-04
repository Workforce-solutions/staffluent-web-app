import GeneralError from '@/pages/errors/general-error.tsx'
import { RouteObject } from 'react-router-dom'

export const omanagersRoutes: RouteObject[] = [
  {
    path: 'operations-manager',
    children: [
      {
        path: 'dashboard',
        lazy: async () => ({
          Component: (
            await import('../pages/operations-manager/dashboard/index.tsx')
          ).default,
        }),
      },
      {
        path: 'projects',
        lazy: async () => ({
          Component: (
            await import('../pages/operations-manager/projects/index.tsx')
          ).default,
        }),
      },
      {
        path: 'tasks',
        lazy: async () => ({
          Component: (
            await import('../pages/operations-manager/tasks/index.tsx')
          ).default,
        }),
      },
      {
        path: 'time-tracking',
        lazy: async () => ({
          Component: (
            await import('../pages/operations-manager/time-tracking/index.tsx')
          ).default,
        }),
      },
      {
        path: 'team-schedule',
        lazy: async () => ({
          Component: (
            await import('../pages/operations-manager/team-schedule/index.tsx')
          ).default,
        }),
      },
      {
        path: 'quality-inspections',
        lazy: async () => ({
          Component: (
            await import(
              '../pages/operations-manager/quality-inspections/index.tsx'
            )
          ).default,
        }),
      },
      {
        path: 'work-orders',
        lazy: async () => ({
          Component: (
            await import('../pages/operations-manager/work-orders/index.tsx')
          ).default,
        }),
      },
      {
        path: 'clients',
        lazy: async () => ({
          Component: (
            await import('../pages/operations-manager/clients/index.tsx')
          ).default,
        }),
      },
      {
        path: 'client-requests',
        lazy: async () => ({
          Component: (
            await import(
              '../pages/operations-manager/client-requests/index.tsx'
            )
          ).default,
        }),
      },
      {
        path: 'analytics',
        lazy: async () => ({
          Component: (
            await import('../pages/operations-manager/analytics/index.tsx')
          ).default,
        }),
      },
      {
        path: 'compliance',
        lazy: async () => ({
          Component: (
            await import('../pages/operations-manager/compliance/index.tsx')
          ).default,
        }),
      },
      {
        path: 'reports',
        lazy: async () => ({
          Component: (
            await import('../pages/operations-manager/reports/index.tsx')
          ).default,
        }),
      },
      {
        path: 'notifications',
        lazy: async () => ({
          Component: (
            await import('../pages/operations-manager/notifications/index.tsx')
          ).default,
        }),
      },
      {
        path: 'settings',
        lazy: async () => ({
          Component: (await import('../pages/settings/index.tsx')).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('../pages/settings/profile/index.tsx'))
                .default,
            }),
          },
          {
            path: 'account',
            lazy: async () => ({
              Component: (await import('../pages/settings/account/index.tsx'))
                .default,
            }),
          },
          {
            path: 'appearance',
            lazy: async () => ({
              Component: (
                await import('../pages/settings/appearance/index.tsx')
              ).default,
            }),
          },
          {
            path: 'notifications',
            lazy: async () => ({
              Component: (
                await import('../pages/settings/notifications/index.tsx')
              ).default,
            }),
          },
          {
            path: 'display',
            lazy: async () => ({
              Component: (await import('../pages/settings/display/index.tsx'))
                .default,
            }),
          },
          {
            path: 'error-example',
            lazy: async () => ({
              Component: (
                await import('../pages/settings/error-example/index.tsx')
              ).default,
            }),
            errorElement: <GeneralError className='h-[50svh]' minimal />,
          },
        ],
      },
    ],
  },
]
