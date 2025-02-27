import {
  IconBuildingStore,
  IconList,
  IconReceipt2,
  IconMessageCircle2,
  IconLayoutDashboard,
  IconClipboardCheck,
  IconFileCheck,
  IconAlertTriangle,
  IconProgress,
} from '@tabler/icons-react'
import {FileText, MessageSquare, Shield, Clock, Image, FileCheck} from 'lucide-react'
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
        title: 'Services List',
        href: '/client-portal/services',
        icon: <IconList size={18} />,
      },
      {
        title: 'Service History',
        href: '/client-portal/services/history',
        icon: <Clock size={18} />,
      },
      {
        title: 'Service Requests',
        href: '/client-portal/service-requests',
        icon: <FileText size={18} />,
      },
      {
        title: 'Weather Alerts',
        href: '/client-portal/services/weather-alerts',
        icon: <IconAlertTriangle size={18} />,
      }
    ],
  },
  {
    title: 'Quality & Inspections',
    href: '/client-portal',
    icon: <IconClipboardCheck size={18} />,
    sub: [
      {
        title: 'Inspection Sign-offs',
        href: '/client-portal/quality/inspections',
        icon: <IconFileCheck size={18} />,
      },
      {
        title: 'Quality Reports',
        href: '/client-portal/quality/reports',
        icon: <IconProgress size={18} />,
      },
      {
        title: 'Site Progress',
        href: '/client-portal/quality/site-progress',
        icon: <Image size={18} />,
      },
    ],
  },
  {
    title: 'Documents',
    href: '/client-portal',
    icon: <FileText size={18} />,
    sub: [
      {
        title: 'Service Records',  // Service history, approvals, quality inspections
        href: '/client-portal/service-records',
        icon: <FileCheck size={18} />,
      },
      {
        title: 'Compliance',     // Required compliance documentation for their services
        href: '/client-portal/compliance',
        icon: <Shield size={18} />,
      }
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