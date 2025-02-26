import { createBrowserRouter } from 'react-router-dom'
import GeneralError from '../pages/errors/general-error.tsx'
import NotFoundError from '../pages/errors/not-found-error.tsx'
import MaintenanceError from '../pages/errors/maintenance-error.tsx'
import UnauthorisedError from '../pages/errors/unauthorised-error.tsx'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { ProtectedRoute } from '../components/ProtectedRoute.jsx'
import AppShell from '../components/app-shell.tsx'
import { servicesRoute } from './services-routes.tsx'
import { invoicesRoute } from './invoices-routes.tsx'
import { clientsRoute } from './client-routes.tsx'
import { teamLeaderRoute } from './tleader-routes.tsx'
import { omanagersRoutes } from './omanagers-routes.tsx'
import { serviceAnalyticsRoute } from './services-analytics-routes'
import { supportRoutes } from './support-routes.tsx'
import { projectsRoute } from './projects-routes.tsx'
import { shiftsRoute } from './shifts-routes.tsx'
import { compliancesRoute } from './compliance-routes.tsx'
import { leaveManagementRoutes } from './leave-managment-routes.tsx'
import { overtimeRoutes } from './overtime-routes.tsx'
import { qualityControlRoutes } from './quality-control-routes'
import { equipmentRoutes } from './equipment-routes'
import { fieldOpsRoutes } from './field-ops-routes'
import { safetyRoutes } from './safetyRoutes'
import { siteRoutes } from './site-routes'
import { analyticsReportsRoutes } from './analyticsReportsRoutes'
import { projectAdditionalRoutes } from './projectAdditionalRoutes'
import { serviceManagementRoutes } from './serviceManagementRoutes'
import { supplyRoutes } from './supply-routes'
import { workOrdersRoutes } from './workorder-routes'
// import Login from "./pages/auth/login";

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('../pages/auth/login.tsx')).default,
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
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('../pages/auth/forgot-password')).default,
    }),
  },
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
      ...servicesRoute,
      ...clientsRoute,
      ...teamLeaderRoute,
      ...omanagersRoutes,
      ...invoicesRoute,
      ...supportRoutes,
      ...serviceAnalyticsRoute,
      ...projectsRoute,
      ...shiftsRoute,
      ...compliancesRoute,
      ...leaveManagementRoutes,
      ...overtimeRoutes,
      // New routes spread
      ...qualityControlRoutes,
      ...supplyRoutes,
      ...fieldOpsRoutes,
      ...safetyRoutes,
      ...siteRoutes,
      ...analyticsReportsRoutes,
      ...projectAdditionalRoutes,
      ...serviceManagementRoutes,
      ...workOrdersRoutes,
      ...equipmentRoutes,
      {
        index: true,
        lazy: async () => ({
          Component: (await import('../pages/dashboard/index.tsx')).default,
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

      {
        path: 'real-time-activity',
        lazy: async () => ({
          Component: (await import('../pages/real-time-activity/index.tsx'))
            .default,
        }),
      },
      {
        path: 'notifications',
        lazy: async () => ({
          Component: (await import('../pages/notifications/index.tsx')).default,
        }),
      },
      // Staff Overview route
      {
        path: 'teams',
        lazy: async () => ({
          Component: (await import('../pages/staff/teams/index.tsx')).default,
        }),
      },
      {
        path: 'teams/:id/members',
        lazy: async () => ({
          Component: (
            await import(
              '../pages/staff/teams/team-employees/team-employees.tsx'
            )
          ).default,
        }),
      },
      {
        path: 'teams/:id/departments-by-team',
        lazy: async () => ({
          Component: (
            await import('../pages/staff/teams/departments-by-team.tsx')
          ).default,
        }),
      },
      {
        path: 'teams/:id',
        lazy: async () => ({
          Component: (await import('../pages/staff/teams/team-details.tsx'))
            .default,
        }),
      },
      {
        path: 'departments',
        lazy: async () => ({
          Component: (await import('../pages/staff/department/index.tsx'))
            .default,
        }),
      },
      {
        path: 'employees',
        lazy: async () => ({
          Component: (await import('../pages/staff/employee/index.tsx'))
            .default,
        }),
      },
      {
        path: 'employees/team-leaders',
        lazy: async () => ({
          Component: (await import('../pages/staff/employee/team-leaders.tsx'))
            .default,
        }),
      },
      {
        path: 'employees/operations-managers',
        lazy: async () => ({
          Component: (
            await import('../pages/staff/employee/operations-managers.tsx')
          ).default,
        }),
      },
      // Staff Details route
      {
        path: 'employees/:id',
        lazy: async () => ({
          Component: (await import('../pages/staff/employee/details.tsx'))
            .default,
        }),
      },
      {
        path: 'performance-metrics',
        lazy: async () => ({
          Component: (await import('../pages/performance-metrics/index.tsx'))
            .default,
        }),
      },
      {
        path: 'reports/productivity',
        lazy: async () => ({
          Component: (await import('../pages/reports/productivity/index.tsx'))
            .default,
        }),
      },
      {
        path: 'reports/attendance',
        lazy: async () => ({
          Component: (await import('../pages/reports/attendance/index.tsx'))
            .default,
        }),
      },
      {
        path: 'schedule',
        lazy: async () => ({
          Component: (await import('../pages/schedule/index.tsx')).default,
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
        path: 'configuration/messages',
        lazy: async () => ({
          Component: (await import('../pages/configuration/chat/index.tsx'))
            .default,
        }),
      },
      {
        path: 'configuration/roles',
        lazy: async () => ({
          Component: (await import('../pages/configuration/roles/index.tsx'))
            .default,
        }),
      },
      {
        path: 'configuration/roles/custom',
        lazy: async () => ({
          Component: (
            await import('../pages/configuration/roles/custom-roles.tsx')
          ).default,
        }),
      },
      {
        path: 'integrations',
        lazy: async () => ({
          Component: (await import('../pages/integrations/index.tsx')).default,
        }),
      },
      {
        path: 'audit-logs',
        lazy: async () => ({
          Component: (await import('../pages/audit-logs/index.tsx')).default,
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
