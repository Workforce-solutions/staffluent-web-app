import GeneralError from '@/pages/errors/general-error.tsx'
import { RouteObject } from 'react-router-dom'

export const teamLeaderRoute: RouteObject[] = [
  {
    path: 'team-leader',
    children: [
      {
        path: 'dashboard',
        lazy: async () => ({
          Component: (await import('../pages/team-leader/dashboard/index.tsx'))
            .default,
        }),
      },
      {
        path: 'projects',
        lazy: async () => ({
          Component: (await import('../pages/team-leader/projects/index.tsx'))
            .default,
        }),
      },
      {
        path: 'tasks',
        lazy: async () => ({
          Component: (await import('../pages/team-leader/tasks/index.tsx'))
            .default,
        }),
      },
      {
        path: 'time-tracking',
        lazy: async () => ({
          Component: (
            await import('../pages/team-leader/time-tracking/index.tsx')
          ).default,
        }),
      },
      {
        path: 'configuration/alerts',
        lazy: async () => ({
          Component: (await import('../pages/configuration/alerts/index.tsx'))
            .default,
        }),
      },
      {
        path: 'reports',
        lazy: async () => ({
          Component: (await import('../pages/team-leader/reports/index.tsx'))
            .default,
        }),
      },
      {
        path: 'team-schedule',
        lazy: async () => ({
          Component: (
            await import('../pages/team-leader/team-schedule/index.tsx')
          ).default,
        }),
      },
      {
        path: 'quality-inspections',
        lazy: async () => ({
          Component: (
            await import('../pages/team-leader/quality-inspections/index.tsx')
          ).default,
        }),
      },
      {
        path: 'notifications',
        lazy: async () => ({
          Component: (
            await import('../pages/team-leader/notifications/index.tsx')
          ).default,
        }),
      },
      {
        path: 'configuration/alerts',
        lazy: async () => ({
          Component: (await import('../pages/configuration/alerts/index.tsx'))
            .default,
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
