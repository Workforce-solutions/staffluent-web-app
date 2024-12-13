// routes/supply-routes.tsx
import { RouteObject } from 'react-router-dom'

export const supplyRoutes: RouteObject[] = [
    {
        path: 'supply-management',
        children: [
            {
                path: 'inventory',
                lazy: async () => ({
                    Component: (await import('../pages/supply-management/inventory/index')).default,
                }),
            },
            {
                path: 'allocation',
                lazy: async () => ({
                    Component: (await import('../pages/supply-management/allocation/index')).default,
                }),
            },
            {
                path: 'usage',
                lazy: async () => ({
                    Component: (await import('../pages/supply-management/usage/index')).default,
                }),
            },
            {
                path: 'costs',
                lazy: async () => ({
                    Component: (await import('../pages/supply-management/costs/index')).default,
                }),
            },
            {
                path: 'suppliers',
                lazy: async () => ({
                    Component: (await import('../pages/supply-management/suppliers/index')).default,
                }),
            }
        ],
    },
    // Equipment Details Routes
    {
        path: 'supply-management/inventory/:id',
        lazy: async () => ({
            Component: (await import('../pages/supply-management/inventory/inventory-details')).default,
        }),
    },
    {
        path: 'supply-management/inventory/activity/:id',
        lazy: async () => ({
            Component: (await import('../pages/supply-management/inventory/inventory-activity')).default,
        }),
    },
    {
        path: 'supply-management/allocation/:id',
        lazy: async () => ({
            Component: (await import('../pages/supply-management/allocation/allocation-details')).default,
        }),
    },
    {
        path: 'supply-management/suppliers/:id',
        lazy: async () => ({
            Component: (await import('../pages/supply-management/suppliers/supplier-details')).default,
        }),
    }
]