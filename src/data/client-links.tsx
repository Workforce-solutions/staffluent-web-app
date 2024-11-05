import {
  IconBuildingStore,
  IconChecklist,
  IconLayoutDashboard,
} from '@tabler/icons-react'
import { MessageSquare, Receipt } from 'lucide-react'
import { SideLink } from './sidelinks'

// eslint-disable-next-line react-refresh/only-export-components
export const clientLinks: SideLink[] = [
  {
    title: 'Client Portal',
    label: '',
    href: '/client-portal',
    icon: <IconBuildingStore size={18} />,
    sub: [
      {
        title: 'Dashboard',
        href: '/client-portal/dashboard',
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: 'My Services',
        href: '/client-portal/services',
        icon: <IconChecklist size={18} />,
      },
      {
        title: 'Invoices',
        href: '/client-portal/invoices',
        icon: <Receipt size={18} />,
      },
      {
        title: 'Support',
        href: '/client-portal/support',
        icon: <MessageSquare size={18} />,
      },
    ],
  },
]
