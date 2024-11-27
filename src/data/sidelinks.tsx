import {
  IconApps,
  IconBuilding,
  IconChartHistogram,
  IconChecklist,
  // IconComponents,
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
  IconReportAnalytics,
  IconDeviceDesktopAnalytics,
  IconAlignBoxCenterTop,
  IconCalendarEvent,
  IconClock,
  IconFileSpreadsheet,
  IconClockPause,
  IconCertificate
} from '@tabler/icons-react'
import {
  Briefcase,
  Building,
  ClipboardList,
  FolderTree,
  MessageSquare,
  User2Icon,
  Users,
  Wrench,
  Receipt,
  FileText,
  FilePlus,
  WalletCards,
  LifeBuoyIcon,
  Tickets,
  Calendar,  // Added for leave management
  CalendarDays,  // Added for leave types
  CalendarOff,  // Added for time-off requests
  BarChart2,  // Added for leave dashboard
  Clock,  // Added for overtime base icon
  Timer,  // Added for overtime list
  Activity,  // Added for overtime dashboard
} from 'lucide-react'

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
        title: 'Time Entries',
        label: '',
        href: '/projects/time-entries',
        icon: <IconChecklist size={18} />,
      },
    ],
  },
  {
    title: 'Service Management',
    icon: <Wrench size={18} />,
    href: 'services',
    sub: [
      {
        title: 'Services',
        href: '/admin/services',
        icon: <Wrench size={18} />,
      },
      {
        title: 'Categories',
        href: '/admin/services/categories',
        icon: <FolderTree size={18} />,
      },
      {
        title: 'Service Requests',
        href: '/admin/services/requests',
        icon: <ClipboardList size={18} />,
      },
    ],
  },
  {
    title: 'Client Management',
    icon: <Users size={18} />,
    href: 'clients',
    sub: [
      {
        title: 'Client List',
        href: '/admin/clients',
        icon: <Building size={18} />,
      },
      {
        title: 'Client Projects',
        href: '/admin/clients/projects',
        icon: <Briefcase size={18} />,
      },
      {
        title: 'Client Feedback',
        href: '/admin/clients/feedback',
        icon: <MessageSquare size={18} />,
      },
    ],
  },
  {
    title: 'Invoice Management',
    icon: <Receipt size={18} />,
    href: 'invoices',
    sub: [
      {
        title: 'All Invoices',
        href: '/admin/invoices',
        icon: <FileText size={18} />,
      },
      {
        title: 'Generate Invoice',
        href: '/admin/invoices/create',
        icon: <FilePlus size={18} />,
      },
      {
        title: 'Payment History',
        href: '/admin/invoices/payments',
        icon: <WalletCards size={18} />,
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
      {
        title: 'Shifts',
        label: '',
        href: '/shifts/list',
        icon: <IconCalendarEvent size={18} />,
      },
      {
        title: 'Attendance records',
        label: '',
        href: '/shifts/attendance-record',
        icon: <IconClock size={18} />,
      },
      {
        title: 'Time Sheets',
        label: '',
        href: '/shifts/time-sheets',
        icon: <IconFileSpreadsheet size={18} />,
      },
      {
        title: 'Breaks',
        label: '',
        href: '/shifts/breaks',
        icon: <IconClockPause size={18} />,
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
    title: 'Compliance',
    label: '',
    href: '/compliance',
    icon: <IconCertificate size={18} />,
  },
  {
    title: 'Support',
    href: '/support',
    icon: <LifeBuoyIcon size={18} />,
    sub: [
      {
        title: 'Tickets',
        label: '',
        href: '/admin/support/tickets',
        icon: <Tickets size={18} />,
      },
    ],
  },
  {
    title: 'Leave Management',
    href: '/leave-management',
    icon: <Calendar size={18} />,  // Changed from AlarmClock
    sub: [
      {
        title: 'Leave Types',
        label: '',
        href: '/leave-management/leave-types',
        icon: <CalendarDays size={18} />,  // Changed from AlarmClock
      },
      {
        title: 'Time-Off Requests',
        label: '',
        href: '/leave-management/time-off-requests',
        icon: <CalendarOff size={18} />,  // Changed from AlarmClock
      },
      {
        title: 'Leave Dashboard',
        label: '',
        href: '/leave-management/dashboard',
        icon: <BarChart2 size={18} />,  // Changed from AlarmClock
      },
    ],
  },
  {
    title: 'Overtime',
    href: '/overtime',
    icon: <Clock size={18} />,  // Changed from AlarmClock
    sub: [
      {
        title: 'List',
        label: '',
        href: '/overtime/list',
        icon: <Timer size={18} />,  // Changed from AlarmClock
      },
      {
        title: 'Overtime dashboard',
        label: '',
        href: '/overtime/dashboard',
        icon: <Activity size={18} />,  // Changed from AlarmClock
      },
    ],
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
      {
        title: 'Service Analytics',
        label: '',
        href: '/admin/reports/services',
        icon: <IconReportAnalytics size={18} />,
      },
      {
        title: 'Client Analytics',
        label: '',
        href: '/admin/reports/clients',
        icon: <IconDeviceDesktopAnalytics size={18} />,
      },
      {
        title: 'Revenue Reports',
        label: '',
        href: '/admin/reports/revenue',
        icon: <IconAlignBoxCenterTop size={18} />,
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
  // {
  //   title: 'Integrations',
  //   label: '',
  //   href: '/integrations',
  //   icon: <IconComponents size={18} />,
  // },
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
]
