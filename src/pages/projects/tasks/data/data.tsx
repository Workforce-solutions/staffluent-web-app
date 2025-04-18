import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: CircleIcon,
  },
  {
    value: 'in_progress',
    label: 'In Progress',
    icon: StopwatchIcon,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircledIcon,
  },
  {
    value: 'cancelled',
    label: 'Canceled',
    icon: CrossCircledIcon,
  },
  {
    value:'pending',
    label:'Pending',
    icon: CircleIcon,
  },
  {
    value: 'completed',
    label: 'Completed',
    icon: CheckCircledIcon,
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
]


export const projectStatuses = [
 { value: 'cancelled', label: 'Cancelled', icon: CrossCircledIcon, },
  { value: 'completed', label: 'Completed', icon: CheckCircledIcon, },
  { value: 'in_progress', label: 'In Progress', icon: StopwatchIcon, },
  { value: 'on_hold', label: 'On Hold', icon: CircleIcon, },
  { value: 'planning', label: 'Planning', icon: QuestionMarkCircledIcon, },
  { value: 'archived', label: 'Archived', icon: CircleIcon, },
]
// Add this to your mock data generation
export const projects = [
  { value: 'project-1', label: 'Project Alpha' },
  { value: 'project-2', label: 'Project Beta' },
  { value: 'project-3', label: 'Project Gamma' },
]

export const assignees = [
  { value: 'user-1', label: 'John Doe' },
  { value: 'user-2', label: 'Jane Smith' },
  { value: 'user-3', label: 'Bob Johnson' },
]
