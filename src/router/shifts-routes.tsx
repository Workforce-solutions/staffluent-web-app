import { RouteObject } from 'react-router-dom'

export const shiftsRoute: RouteObject[] = [
  {
    path: 'shifts/list',
    lazy: async () => ({
      Component: (await import('../pages/shifts/index.tsx')).default,
    }),
  },
  {
    path: 'shifts/attendance-record',
    lazy: async () => ({
      Component: (await import('../pages/shifts/attendence-report/index.tsx')).default,
    }),
  },
  {
    path: 'shifts/time-sheets',
    lazy: async () => ({
      Component: (await import('../pages/shifts/time-sheeets/index.tsx')).default,
    }),
  },
  {
    path: 'shifts/breaks',
    lazy: async () => ({
      Component: (await import('../pages/shifts/breaks/index.tsx')).default,
    }),
  },
]
