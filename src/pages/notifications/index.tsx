import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Bell,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  MessageSquare,
  Receipt,
  Settings,
} from 'lucide-react'
import { useState } from 'react'
import { format } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Notification {
  id: number
  title: string
  message: string
  type: 'service' | 'payment' | 'support' | 'system'
  status: 'unread' | 'read'
  priority: 'high' | 'normal' | 'low'
  created_at: Date
  action_url?: string
}

export default function Notifications() {
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Service Scheduled",
      message: "Your maintenance service has been scheduled for tomorrow at 10:00 AM",
      type: "service",
      status: "unread",
      priority: "high",
      created_at: new Date('2024-01-20T10:00:00')
    },
    {
      id: 2,
      title: "Payment Received",
      message: "Payment for Invoice #INV-2024001 has been processed successfully",
      type: "payment",
      status: "unread",
      priority: "normal",
      created_at: new Date('2024-01-19T15:30:00')
    },
    {
      id: 3,
      title: "Support Ticket Update",
      message: "New response on ticket #TK-2024003",
      type: "support",
      status: "read",
      priority: "normal",
      created_at: new Date('2024-01-18T09:15:00')
    },
    {
      id: 4,
      title: "Service Request Confirmation",
      message: "Your service request #SR-2024005 has been received",
      type: "service",
      status: "read",
      priority: "normal",
      created_at: new Date('2024-01-17T14:20:00')
    }
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case 'service':
        return <Calendar className="h-4 w-4" />
      case 'payment':
        return <Receipt className="h-4 w-4" />
      case 'support':
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <Layout>
      <Layout.Header className="min-h-fit border-b">
        <div className="flex w-full flex-col">
          <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">Notifications</h2>
              <p className="text-sm text-muted-foreground">
                Stay updated with your service activities
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark all as read
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6 p-6'>
        {/* Notification Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {notifications.filter(n => n.status === 'unread').length}
              </div>
              <p className="text-xs text-muted-foreground">New notifications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {notifications.filter(n => n.priority === 'high').length}
              </div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Service Updates</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {notifications.filter(n => n.type === 'service').length}
              </div>
              <p className="text-xs text-muted-foreground">Service related</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Support Updates</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {notifications.filter(n => n.type === 'support').length}
              </div>
              <p className="text-xs text-muted-foreground">Support tickets</p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Recent Notifications</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Your latest updates and alerts
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="service">Services</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {notifications.map((notification) => (
                  <Card key={notification.id} className={notification.status === 'unread' ? 'bg-muted/50' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{notification.title}</p>
                            <Badge variant={
                              notification.status === 'unread' ? 'default' : 'secondary'
                            }>
                              {notification.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(notification.created_at, 'MMM dd, yyyy HH:mm')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Similar structure for other tabs */}
            </Tabs>
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
