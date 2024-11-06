import {
  IconBuildingStore,
  IconList,
  IconReceipt2,
  IconMessageCircle2,
  IconLayoutDashboard,
} from '@tabler/icons-react'
import { FileText, MessageSquare } from 'lucide-react'
import { SideLink } from './sidelinks'

// eslint-disable-next-line react-refresh/only-export-components
export const clientLinks: SideLink[] = [
  {
    title: 'Dashboard',
    href: '/client-portal/dashboard',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'My Services',
    href: '/client-portal',
    icon: <IconBuildingStore size={18} />,
    sub: [
      {
        title: 'List',
        href: '/client-portal/services',
        icon: <IconList size={18} />,
      },
      {
        title: 'Requests',
        href: '/client-portal/service-requests',
        icon: <FileText size={18} />,
      },
    ],
  },
  {
    title: 'Invoices',
    href: '/client-portal',
    icon: <IconReceipt2 size={18} />,
    sub: [
      {
        title: 'List',
        href: '/client-portal/invoices',
        icon: <IconReceipt2 size={18} />,
      },
    ],
  },
  {
    title: 'Support',
    href: '/client-portal',
    icon: <IconMessageCircle2 size={18} />,
    sub: [
      {
        title: 'Tickets',
        href: '/client-portal/support',
        icon: <MessageSquare size={18} />,
      },
    ],
  },
]
