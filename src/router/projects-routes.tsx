import { RouteObject } from 'react-router-dom'

export const projectsRoute: RouteObject[] = [
  {
    path: 'projects/list',
    lazy: async () => ({
      Component: (await import('../pages/projects/list.tsx')).default,
    }),
  },
  {
    path: 'projects/details/:id',
    lazy: async () => ({
      Component: (await import('../pages/projects/project-details/details.tsx'))
        .default,
    }),
  },
  {
    path: 'projects/details/:id/gallery',
    lazy: async () => ({
      Component: (
        await import('../pages/projects/project-details/project-galleries.tsx')
      ).default,
    }),
  },
  {
    path: 'projects/details/:id/manage-team',
    lazy: async () => ({
      Component: (await import('../pages/projects/team/manage-team.tsx'))
        .default,
    }),
  },
  {
    path: 'projects/tasks',
    lazy: async () => ({
      Component: (await import('../pages/projects/tasks/index.tsx')).default,
    }),
  },
  {
    path: 'admin/clients',
    lazy: async () => ({
      Component: (await import('../pages/projects/clients/index.tsx')).default,
    }),
  },
  {
    path: 'projects/clients/:id',
    lazy: async () => ({
      Component: (await import('../pages/projects/clients/client-details.tsx'))
        .default,
    }),
  },
]
