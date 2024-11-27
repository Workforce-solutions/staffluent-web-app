import {
  IconLayoutDashboard,
  IconClipboardList,
  IconBriefcase,
  IconClock,
  IconReportAnalytics,
  IconCalendarTime,
  IconClipboardCheck,
  IconBell
} from '@tabler/icons-react'
import { SideLink } from './sidelinks'

export const teamLeaderLinks: SideLink[] = [
  {
    title: 'Dashboard',
    href: '/team-leader/dashboard',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Projects',
    href: '/team-leader',
    icon: <IconBriefcase size={18} />,
    sub: [
      {
        title: 'Manage',
        href: '/team-leader/projects',
        icon: <IconBriefcase size={18} />,
      }
    ]
  },
  {
    title: 'Tasks',
    href: '/team-leader',
    icon: <IconClipboardList size={18} />,
    sub: [
      {
        title: 'Manage',
        href: '/team-leader/tasks',
        icon: <IconClipboardList size={18} />,
      }
    ]
  },
  {
    title: 'Time Tracking',
    href: '/team-leader',
    icon: <IconClock size={18} />,
    sub: [
      {
        title: 'Manage',
        href: '/team-leader/time-tracking',
        icon: <IconClock size={18} />,
      }
    ]
  },
  {
    title: 'Team Schedule',
    href: '/team-leader/team-schedule',
    icon: <IconCalendarTime size={18} />,
  },
  {
    title: 'Quality Inspections',
    href: '/team-leader/quality-inspections',
    icon: <IconClipboardCheck size={18} />,
  },
  {
    title: 'Reports',
    href: '/team-leader/reports',
    icon: <IconReportAnalytics size={18} />,
  },
  {
    title: 'Notifications',
    href: '/team-leader/notifications',
    icon: <IconBell size={18} />,
  }
]