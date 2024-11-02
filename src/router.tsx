import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { ProtectedRoute } from './components/ProtectedRoute'
import AppShell from './components/app-shell'
// import Login from "./pages/auth/login";

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('./pages/auth/login')).default,
    }),
  },
  // {
  //   path: '/sign-in-2',
  //   lazy: async () => ({
  //     Component: (await import('./pages/auth/sign-in-2')).default,
  //   }),
  // },
  // {
  //   path: '/sign-up',
  //   lazy: async () => ({
  //     Component: (await import('./pages/auth/sign-up')).default,
  //   }),
  // },
  // {
  //   path: '/forgot-password',
  //   lazy: async () => ({
  //     Component: (await import('./pages/auth/forgot-password')).default,
  //   }),
  // },
  // // {
  //   path: '/otp',
  //   lazy: async () => ({
  //     Component: (await import('./pages/auth/otp')).default,
  //   }),
  // },

  // Main routes
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ), // Explicitly wrap AppShell with ProtectedRoute here
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/dashboard')).default,
        }),
      },
      {
        path: 'tasks',
        lazy: async () => ({
          Component: (await import('@/pages/tasks')).default,
        }),
      },
      {
        path: 'chats',
        lazy: async () => ({
          Component: (await import('@/pages/chats')).default,
        }),
      },
      {
        path: 'apps',
        lazy: async () => ({
          Component: (await import('@/pages/apps')).default,
        }),
      },
      {
        path: 'users',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },
      {
        path: 'analysis',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },
      {
        path: 'extra-components',
        lazy: async () => ({
          Component: (await import('@/pages/extra-components')).default,
        }),
      },
      {
        path: 'settings',
        lazy: async () => ({
          Component: (await import('./pages/settings')).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('./pages/settings/profile')).default,
            }),
          },
          {
            path: 'account',
            lazy: async () => ({
              Component: (await import('./pages/settings/account')).default,
            }),
          },
          {
            path: 'appearance',
            lazy: async () => ({
              Component: (await import('./pages/settings/appearance')).default,
            }),
          },
          {
            path: 'notifications',
            lazy: async () => ({
              Component: (await import('./pages/settings/notifications'))
                .default,
            }),
          },
          {
            path: 'display',
            lazy: async () => ({
              Component: (await import('./pages/settings/display')).default,
            }),
          },
          {
            path: 'error-example',
            lazy: async () => ({
              Component: (await import('./pages/settings/error-example'))
                .default,
            }),
            errorElement: <GeneralError className='h-[50svh]' minimal />,
          },
        ],
      },
      {
        path: 'projects/list',
        lazy: async () => ({
          Component: (await import('./pages/projects/list')).default,
        }),
      },
      {
        path: 'projects/tasks',
        lazy: async () => ({
          Component: (await import('./pages/projects/tasks')).default,
        }),
      },
      {
        path: 'projects/clients',
        lazy: async () => ({
          Component: (await import('./pages/projects/clients')).default,
        }),
      },

      {
        path: 'projects/clients/:id',
        lazy: async () => ({
          Component: (
            await import('./pages/projects/clients/client-details.tsx')
          ).default,
        }),
      },
      {
        path: 'real-time-activity',
        lazy: async () => ({
          Component: (await import('./pages/real-time-activity')).default,
        }),
      },
      // Staff Overview route
      {
        path: 'teams',
        lazy: async () => ({
          Component: (await import('./pages/staff/teams/index.tsx')).default,
        }),
      },
      {
        path: 'teams/:id/members',
        lazy: async () => ({
          Component: (
            await import(
              './pages/staff/teams/team-employees/team-employees.tsx'
            )
          ).default,
        }),
      },
      {
        path: 'teams/:id/departments-by-team',
        lazy: async () => ({
          Component: (
              await import(
                  './pages/staff/teams/departments-by-team.tsx'
                  )
          ).default,
        }),
      },
      {
        path: 'teams/:id',
        lazy: async () => ({
          Component: (
              await import(
                  './pages/staff/teams/team-details.tsx'
                  )
          ).default,
        }),
      },
      {
        path: 'departments',
        lazy: async () => ({
          Component: (await import('./pages/staff/department/index.tsx'))
            .default,
        }),
      },
      {
        path: 'employees',
        lazy: async () => ({
          Component: (await import('./pages/staff/employee/index.tsx')).default,
        }),
      },
      // Staff Details route
      {
        path: 'staff-management/:id',
        lazy: async () => ({
          Component: (await import('./pages/staff/employee/details.tsx'))
            .default,
        }),
      },
      {
        path: 'performance-metrics',
        lazy: async () => ({
          Component: (await import('./pages/performance-metrics')).default,
        }),
      },
      {
        path: 'reports/productivity',
        lazy: async () => ({
          Component: (await import('./pages/reports/productivity')).default,
        }),
      },
      {
        path: 'reports/attendance',
        lazy: async () => ({
          Component: (await import('./pages/reports/attendance')).default,
        }),
      },
      {
        path: 'schedule',
        lazy: async () => ({
          Component: (await import('./pages/schedule')).default,
        }),
      },
      {
        path: 'configuration/alerts',
        lazy: async () => ({
          Component: (await import('./pages/configuration/alerts')).default,
        }),
      },
      {
        path: 'configuration/messages',
        lazy: async () => ({
          Component: (await import('./pages/configuration/messages')).default,
        }),
      },
      {
        path: 'configuration/roles',
        lazy: async () => ({
          Component: (await import('./pages/configuration/roles')).default,
        }),
      },
      {
        path: 'configuration/roles/custom',
        lazy: async () => ({
          Component: (
            await import('./pages/configuration/roles/custom-roles.tsx')
          ).default,
        }),
      },
      {
        path: 'integrations',
        lazy: async () => ({
          Component: (await import('./pages/integrations')).default,
        }),
      },
      {
        path: 'audit-logs',
        lazy: async () => ({
          Component: (await import('./pages/audit-logs')).default,
        }),
      },
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
