import { RouteObject } from 'react-router-dom'

export const invoicesRoute: RouteObject[] = [
  {
    path: 'admin/invoices',
    lazy: async () => ({
      Component: (await import('../pages/invoices/index')).default,
    }),
  },
  {
    path: 'admin/invoices/create',
    lazy: async () => ({
      Component: (await import('../pages/invoices/create')).default,
    }),
  },
  {
    path: 'admin/invoices/payments',
    lazy: async () => ({
      Component: (await import('../pages/invoices/payment-history')).default,
    }),
  },
  {
    path: 'admin/invoices/:id',
    lazy: async () => ({
      Component: (await import('../pages/invoices/invoice-details')).default,
    }),
  },
]
