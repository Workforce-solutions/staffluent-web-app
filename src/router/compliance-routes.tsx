import { RouteObject } from 'react-router-dom'

export const compliancesRoute: RouteObject[] = [
  {
    path: 'compliance',
    lazy: async () => ({
      Component: (await import('../pages/compliance/index.tsx')).default,
    }),
  },
  {
    path: 'compliance/report',
    lazy: async () => ({
      Component: (await import('../pages/compliance/report.tsx')).default,
    }),
  },
]
