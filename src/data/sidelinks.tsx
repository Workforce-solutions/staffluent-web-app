import {
  IconApps,
  IconBuilding,
  IconChartHistogram,
  IconChecklist,
  IconComponents,
  IconExclamationCircle,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconLayoutDashboard,
  IconMessages,
  IconSettings,
  IconTruck,
  IconUser,
  IconUserShield,
  IconUsers,
  IconBuildingStore,
} from '@tabler/icons-react'
import { User2Icon, Users, MessageSquare, Receipt } from 'lucide-react';

// Navigation Link Interfaces
export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

// Sidebar Links
// eslint-disable-next-line react-refresh/only-export-components
export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Projects',
    label: '',
    href: '/projects',
    icon: <IconChecklist size={18} />,
    sub: [
      {
        title: 'Projects',
        label: '',
        href: '/projects/list',
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: 'Tasks',
        label: '',
        href: '/projects/tasks',
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: 'Clients',
        label: '',
        href: '/projects/clients',
        icon: <IconBuildingStore size={18} />,
      },
    ],
  },
  {
    title: 'Real-Time Activity',
    label: '',
    href: '/real-time-activity',
    icon: <IconMessages size={18} />,
  },
  {
    title: 'Staff Management',
    label: '',
    href: '/staff-management',
    icon: <IconUsers size={18} />,
    sub: [
      {
        title: 'Departments',
        label: '',
        href: '/departments',
        icon: <IconBuilding size={18} />,
      },
      {
        title: 'Employees',
        label: '',
        href: '/employees',
        icon: <IconUser size={18} />,
      },
      {
        title: 'Teams',
        href: '/teams',
        icon: <Users size={18} />,
      },
    ],
  },
  {
    title: 'Performance Metrics',
    label: '',
    href: '/performance-metrics',
    icon: <IconChartHistogram size={18} />,
  },
  {
    title: 'Reports',
    label: '',
    href: '/reports',
    icon: <IconApps size={18} />,
    sub: [
      {
        title: 'Productivity Reports',
        label: '',
        href: '/reports/productivity',
        icon: <IconHexagonNumber3 size={18} />,
      },
      {
        title: 'Attendance Reports',
        label: '',
        href: '/reports/attendance',
        icon: <IconHexagonNumber4 size={18} />,
      },
    ],
  },
  {
    title: 'Schedule',
    label: '',
    href: '/schedule',
    icon: <IconTruck size={18} />,
  },
  {
    title: 'Configuration',
    label: '',
    href: '/configuration',
    icon: <IconSettings size={18} />,
    sub: [
      {
        title: 'Alerts',
        label: '',
        href: '/configuration/alerts',
        icon: <IconExclamationCircle size={18} />,
      },
      {
        title: 'Messages',
        label: '',
        href: '/configuration/messages',
        icon: <IconMessages size={18} />,
      },
      {
        title: 'Roles',
        label: '',
        href: '/configuration/roles',
        icon: <User2Icon size={18} />,
      },
    ],
  },
  {
    title: 'Integrations',
    label: '',
    href: '/integrations',
    icon: <IconComponents size={18} />,
  },
  {
    title: 'Audit Logs',
    label: '',
    href: '/audit-logs',
    icon: <IconUserShield size={18} />,
  },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
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
      }
    ]
  },
]

// Example Sidebar Component
const Sidebar = () => {
  return (
    <nav className='sidebar'>
      <ul>
        {sidelinks.map((link) => (
          <li key={link.title}>
            <a href={link.href}>
              {link.icon}
              <span>{link.title}</span>
              {link.label && <span className='badge'>{link.label}</span>}
            </a>
            {link.sub && (
              <ul>
                {link.sub.map((subLink) => (
                  <li key={subLink.title}>
                    <a href={subLink.href}>
                      {subLink.icon}
                      <span>{subLink.title}</span>
                      {subLink.label && (
                        <span className='badge'>{subLink.label}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar
