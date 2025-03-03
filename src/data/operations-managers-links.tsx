import {
  IconLayoutDashboard,
  IconClipboardList,
  IconBriefcase,
  IconClock,
  IconReportAnalytics,
  IconCalendarTime,
  IconClipboardCheck,
  IconBell,
  IconUsers,
  IconFileText,
  IconChartBar,
  IconShieldCheck,
} from '@tabler/icons-react'
import { SideLink } from './sidelinks'

export const operationsManagersLinks: SideLink[] = [
  {
    title: 'Dashboard',
    href: '/operations-manager/dashboard',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Projects',
    href: '/operations-manager',
    icon: <IconBriefcase size={18} />,
    sub: [
      {
        title: 'Manage',
        href: '/operations-manager/projects',
        icon: <IconBriefcase size={18} />,
      },
    ],
  },
  {
    title: 'Tasks',
    href: '/operations-manager',
    icon: <IconClipboardList size={18} />,
    sub: [
      {
        title: 'Manage',
        href: '/operations-manager/tasks',
        icon: <IconClipboardList size={18} />,
      },
    ],
  },
  {
    title: 'Time Tracking',
    href: '/operations-manager',
    icon: <IconClock size={18} />,
    sub: [
      {
        title: 'Manage',
        href: '/operations-manager/time-tracking',
        icon: <IconClock size={18} />,
      },
    ],
  },
  {
    title: 'Team Schedule',
    href: '/operations-manager/team-schedule',
    icon: <IconCalendarTime size={18} />,
  },
  {
    title: 'Quality Inspections',
    href: '/operations-manager/quality-inspections',
    icon: <IconClipboardCheck size={18} />,
  },
  {
    title: 'Work Orders',
    href: '/operations-manager/work-orders',
    icon: <IconFileText size={18} />,
  },
  {
    title: 'Client Management',
    href: '/operations-manager',
    icon: <IconUsers size={18} />,
    sub: [
      {
        title: 'Clients',
        href: '/operations-manager/clients',
        icon: <IconUsers size={18} />,
      },
      {
        title: 'Requests',
        href: '/operations-manager/client-requests',
        icon: <IconClipboardList size={18} />,
      },
    ],
  },
  {
    title: 'Operations',
    href: '/operations-manager',
    icon: <IconChartBar size={18} />,
    sub: [
      {
        title: 'Analytics',
        href: '/operations-manager/analytics',
        icon: <IconChartBar size={18} />,
      },
      {
        title: 'Compliance',
        href: '/operations-manager/compliance',
        icon: <IconShieldCheck size={18} />,
      },
    ],
  },
  {
    title: 'Reports',
    href: '/operations-manager/reports',
    icon: <IconReportAnalytics size={18} />,
  },
  {
    title: 'Notifications',
    href: '/operations-manager/notifications',
    icon: <IconBell size={18} />,
  },
]
