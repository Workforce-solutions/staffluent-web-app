import {
  IconAlignBoxCenterTop,
  IconApps,
  IconBuilding,
  IconCalendarEvent,
  IconCertificate,
  IconChartHistogram,
  IconChecklist,
  IconClock,
  IconClockPause,
  IconDeviceDesktopAnalytics,
  IconExclamationCircle,
  IconFileSpreadsheet,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconMessages,
  IconReportAnalytics,
  IconSettings,
  IconTruck,
  IconUser,
  IconUserShield,
  IconUsers,
} from '@tabler/icons-react'
import {
  Activity, // Added for time-off requests
  BarChart2,
  BarChart3,
  Boxes,
  Briefcase,
  Building,
  Building2,
  Calendar,
  CalendarDays, // Added for leave types
  CalendarOff,
  ClipboardCheck,
  ClipboardList, // Added for leave dashboard
  Clock,
  // CalendarCheck,
  DollarSign,
  Factory,
  FileBarChart,
  FileCheck,
  FilePlus,
  FileSpreadsheet,
  FileText,
  FolderTree,
  HardDrive,
  HardHat,
  Landmark,
  LifeBuoyIcon,
  MapPin,
  MessageSquare,
  Package,
  PenTool,
  Receipt,
  Ruler,
  Settings,
  Shield, // Added for overtime list
  Signature,
  ThermometerSun,
  Tickets, // Added for overtime base icon
  Timer,
  Truck,
  User2Icon,
  Users,
  WalletCards,
  Warehouse,
  Wind,
  Workflow,
  Wrench,
} from 'lucide-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: <Building2 size={18} />,
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
      {
        title: 'Quality Verification',
        href: '/services/verification',
        icon: <FileCheck size={18} />,
      },
      {
        title: 'Weather Monitoring',
        href: '/services/weather-monitoring',
        icon: <Wind size={18} />,
      },
    ],
  },
  {
    title: 'Work Orders',
    icon: <PenTool size={18} />,
    href: 'work-orders',
    sub: [
      {
        title: 'Orders',
        href: '/work-orders',
        icon: <ClipboardList size={18} />, // Better represents a list of orders
      },
      {
        title: 'Settings',
        href: '/work-orders/settings',
        icon: <Settings size={18} />, // More appropriate for settings than FolderTree
      },
      {
        title: 'Reports',
        href: '/work-orders/reports',
        icon: <FileBarChart size={18} />, // Better represents reports than ClipboardList
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
      {
        title: 'Client Sign-offs',
        href: '/admin/clients/client-sign-off',
        icon: <Signature size={18} />,
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
    icon: <Calendar size={18} />, // Changed from AlarmClock
    sub: [
      {
        title: 'Leave Types',
        label: '',
        href: '/leave-management/leave-types',
        icon: <CalendarDays size={18} />, // Changed from AlarmClock
      },
      {
        title: 'Time-Off Requests',
        label: '',
        href: '/leave-management/time-off-requests',
        icon: <CalendarOff size={18} />, // Changed from AlarmClock
      },
      {
        title: 'Leave Dashboard',
        label: '',
        href: '/leave-management/dashboard',
        icon: <BarChart2 size={18} />, // Changed from AlarmClock
      },
    ],
  },
  {
    title: 'Overtime',
    href: '/overtime',
    icon: <Clock size={18} />, // Changed from AlarmClock
    sub: [
      {
        title: 'List',
        label: '',
        href: '/overtime/list',
        icon: <Timer size={18} />, // Changed from AlarmClock
      },
      {
        title: 'Overtime dashboard',
        label: '',
        href: '/overtime/dashboard',
        icon: <Activity size={18} />, // Changed from AlarmClock
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
    title: 'Quality Control',
    href: '/quality-control',
    icon: <ClipboardCheck size={18} />,
    sub: [
      {
        title: 'Compliance',
        label: '',
        href: '/compliance',
        icon: <IconCertificate size={18} />,
      },
      {
        title: 'Inspection Checklists',
        href: '/quality-control/checklists',
        icon: <Workflow size={18} />,
      },
      {
        title: 'Quality Metrics',
        href: '/quality-control/metrics',
        icon: <BarChart3 size={18} />,
      },
      {
        title: 'Safety Audits',
        href: '/quality-control/safety-audits',
        icon: <HardHat size={18} />,
      },
      {
        title: 'Code Compliance',
        href: '/quality-control/compliance',
        icon: <Shield size={18} />,
      },
    ],
  },
  {
    title: 'Equipment Management',
    href: '/equipment',
    icon: <HardDrive size={18} />,
    sub: [
      {
        title: 'Asset Tracking',
        href: '/equipment/tracking',
        icon: <Boxes size={18} />,
      },
      {
        title: 'Maintenance Schedule',
        href: '/equipment/maintenance',
        icon: <Calendar size={18} />,
      },
      {
        title: 'Usage Monitoring',
        href: '/equipment/monitoring',
        icon: <Activity size={18} />,
      },
      {
        title: 'Equipment Assignment',
        href: '/equipment/assignment',
        icon: <Users size={18} />,
      },
    ],
  },
  {
    title: 'Field Operations',
    href: '/field-ops',
    icon: <Truck size={18} />,
    sub: [
      {
        title: 'Team Location',
        href: '/field-ops/location',
        icon: <MapPin size={18} />,
      },
      {
        title: 'Route Planning',
        href: '/field-ops/routes',
        icon: <MapPin size={18} />,
      },
      {
        title: 'Service Areas',
        href: '/field-ops/service-areas',
        icon: <MapPin size={18} />,
      },
    ],
  },
  {
    title: 'Site Management',
    href: '/sites',
    icon: <Building size={18} />,
    sub: [
      {
        title: 'Sites Overview',
        href: '/sites/overview',
        icon: <Landmark size={18} />,
      },
      {
        title: 'Site Configuration',
        href: '/sites/configuration',
        icon: <Workflow size={18} />,
      },
      {
        title: 'Resource Allocation',
        href: '/sites/resources',
        icon: <Boxes size={18} />,
      },
      {
        title: 'Site Monitoring',
        href: '/sites/monitoring',
        icon: <Activity size={18} />,
      },
      {
        title: 'Site Documentation',
        href: '/sites/documents',
        icon: <FileSpreadsheet size={18} />,
      },
      {
        title: 'Site Access Control',
        href: '/sites/access',
        icon: <Shield size={18} />,
      },
    ],
  },
  {
    title: 'Project Management',
    href: '/projects',
    icon: <Warehouse size={18} />,
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
      {
        title: 'Construction Milestones',
        href: '/projects/milestones',
        icon: <Factory size={18} />,
      },
      {
        title: 'Site Workflows',
        href: '/projects/workflows',
        icon: <Workflow size={18} />,
      },
      {
        title: 'Material Tracking',
        href: '/projects/materials',
        icon: <Ruler size={18} />,
      },
      {
        title: 'Weather Monitoring',
        href: '/projects/weather',
        icon: <ThermometerSun size={18} />,
      },
    ],
  },
  {
    title: 'Supply Management',
    href: '/supply-management',
    icon: <Package size={18} />,
    sub: [
      {
        title: 'Inventory',
        href: '/supply-management/inventory',
        icon: <Boxes size={18} />,
      },
      {
        title: 'Equipment Allocation',
        href: '/supply-management/allocation',
        icon: <Settings size={18} />,
      },
      {
        title: 'Usage Monitoring',
        href: '/supply-management/usage',
        icon: <Activity size={18} />,
      },
      {
        title: 'Cost Tracking',
        href: '/supply-management/costs',
        icon: <DollarSign size={18} />,
      },
      {
        title: 'Suppliers',
        href: '/supply-management/suppliers',
        icon: <Users size={18} />,
      },
    ],
  },
  {
    title: 'Safety Management',
    href: '/safety',
    icon: <Shield size={18} />,
    sub: [
      {
        title: 'Barrier Management',
        href: '/safety/barriers',
        icon: <Warehouse size={18} />,
      },
      {
        title: 'OSHA Compliance',
        href: '/safety/osha',
        icon: <ClipboardCheck size={18} />,
      },
      {
        title: 'ADA Compliance',
        href: '/safety/ada',
        icon: <Shield size={18} />,
      },
      {
        title: 'Site Safety Maps',
        href: '/safety/maps',
        icon: <MapPin size={18} />,
      },
    ],
  },

  {
    title: 'Analytics & Reports',
    href: '/reports',
    icon: <BarChart3 size={18} />,
    sub: [
      {
        title: 'Quality Metrics',
        href: '/reports/quality',
        icon: <FileSpreadsheet size={18} />,
      },
      {
        title: 'Equipment Usage',
        href: '/reports/equipment',
        icon: <HardDrive size={18} />,
      },
      {
        title: 'Safety Compliance',
        href: '/reports/safety',
        icon: <Shield size={18} />,
      },
      {
        title: 'Site Performance',
        href: '/reports/sites',
        icon: <BarChart3 size={18} />,
      },
    ],
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
