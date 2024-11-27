import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  MessageCircle,
  Image,
  CheckSquare,
  PlayCircle,
  AlertCircle,
  Plus,
  FileText,
  ShieldCheck,
  ChevronRight,
  Clock,
  Coffee,
  ClipboardList,
  MessageSquare,
  TicketCheck,
} from 'lucide-react'

interface ShortcutItem {
  icon: React.ReactNode
  title: string
  description: string
  path: string
  counter?: string | number
}

export default function ProjectShortcuts() {
  const { id } = useParams()

  const projectShortcuts: ShortcutItem[] = [
    {
      icon: <MessageCircle className='h-5 w-5 text-muted-foreground' />,
      title: 'Comments',
      description: 'Manage project comments',
      path: `/projects/details/${id}/comments`,
      counter: '2',
    },
    {
      icon: <Image className='h-5 w-5 text-muted-foreground' />,
      title: 'Gallery',
      description: 'Upload images and videos',
      path: `/projects/details/${id}/gallery`,
    },
    {
      icon: <CheckSquare className='h-5 w-5 text-muted-foreground' />,
      title: 'Checklist',
      description: 'Manage your checklist items',
      path: `/projects/details/${id}/checklist`,
      counter: '2/5',
    },
    {
      icon: <PlayCircle className='h-5 w-5 text-muted-foreground' />,
      title: 'Chat',
      description: 'Send messages regarding the project',
      path: `/projects/details/${id}/chat`,
      counter: '2',
    },
    {
      icon: <AlertCircle className='h-5 w-5 text-muted-foreground' />,
      title: 'Report issues',
      description: 'Report any facing issue',
      path: `/projects/details/${id}/issues`,
    },
    {
      icon: <Plus className='h-5 w-5 text-muted-foreground' />,
      title: 'Request supplies',
      description: 'Request supplies regarding the job',
      path: `/projects/details/${id}/supplies`,
    },
    {
      icon: <FileText className='h-5 w-5 text-muted-foreground' />,
      title: 'Work Orders',
      description: 'Create work orders regarding the job',
      path: `/projects/details/${id}/work-orders`,
    },
    {
      icon: <ShieldCheck className='h-5 w-5 text-muted-foreground' />,
      title: 'Quality Inspections',
      description: 'Conduct quality inspections',
      path: `/projects/details/${id}/inspections`,
    },
  ]

  const timeAndClientShortcuts: ShortcutItem[] = [
    {
      icon: <Clock className='h-5 w-5 text-muted-foreground' />,
      title: 'Clock Records',
      description: 'View clock-in and clock-out records',
      path: `/projects/details/${id}/clock-records`,
    },
    {
      icon: <Coffee className='h-5 w-5 text-muted-foreground' />,
      title: 'Breaks',
      description: 'Manage break times',
      path: `/projects/details/${id}/breaks`,
    },
    {
      icon: <ClipboardList className='h-5 w-5 text-muted-foreground' />,
      title: 'Timesheets',
      description: 'View and manage timesheets',
      path: `/projects/details/${id}/timesheets`,
    },
    {
      icon: <MessageSquare className='h-5 w-5 text-muted-foreground' />,
      title: 'Client Feedback',
      description: 'View client feedback and ratings',
      path: `/projects/details/${id}/feedback`,
    },
    {
      icon: <TicketCheck className='h-5 w-5 text-muted-foreground' />,
      title: 'Support Tickets',
      description: 'Manage client support tickets',
      path: `/projects/details/${id}/support-tickets`,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Shortcuts</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='project' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='project'>Project Management</TabsTrigger>
            <TabsTrigger value='time'>Time & Client</TabsTrigger>
          </TabsList>

          <TabsContent value='project' className='grid gap-2'>
            {projectShortcuts.map((shortcut) => (
              <Link
                key={shortcut.path}
                to={shortcut.path}
                className='flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted'
              >
                <div className='flex items-center gap-4'>
                  {shortcut.icon}
                  <div>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>{shortcut.title}</span>
                      {shortcut.counter && (
                        <span className='rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary'>
                          {shortcut.counter}
                        </span>
                      )}
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {shortcut.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className='h-5 w-5 text-muted-foreground' />
              </Link>
            ))}
          </TabsContent>

          <TabsContent value='time' className='grid gap-2'>
            {timeAndClientShortcuts.map((shortcut) => (
              <Link
                key={shortcut.path}
                to={shortcut.path}
                className='flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted'
              >
                <div className='flex items-center gap-4'>
                  {shortcut.icon}
                  <div>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>{shortcut.title}</span>
                      {shortcut.counter && (
                        <span className='rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary'>
                          {shortcut.counter}
                        </span>
                      )}
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {shortcut.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className='h-5 w-5 text-muted-foreground' />
              </Link>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
