import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Bell,
    CheckCircle2,
    // Clock,
    Users,
    AlertCircle,
    ClipboardList,
    Briefcase,
    Settings,
} from 'lucide-react'
import { useState } from 'react'
import { format } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TeamNotification {
    id: number
    title: string
    message: string
    type: 'task' | 'team' | 'project' | 'system'
    status: 'unread' | 'read'
    priority: 'high' | 'normal' | 'low'
    created_at: Date
    action_url?: string
}

export default function TeamLeaderNotifications() {
    const [notifications] = useState<TeamNotification[]>([
        {
            id: 1,
            title: "Task Deadline Approaching",
            message: "3 tasks are due within the next 24 hours",
            type: "task",
            status: "unread",
            priority: "high",
            created_at: new Date()
        },
        {
            id: 2,
            title: "Team Member Update",
            message: "John Smith has completed their assigned tasks for Project A",
            type: "team",
            status: "unread",
            priority: "normal",
            created_at: new Date('2024-01-19T15:30:00')
        },
        {
            id: 3,
            title: "Project Milestone",
            message: "Project X has reached 75% completion",
            type: "project",
            status: "read",
            priority: "normal",
            created_at: new Date('2024-01-18T09:15:00')
        },
        {
            id: 4,
            title: "Team Performance Alert",
            message: "Team productivity is above target this week",
            type: "team",
            status: "read",
            priority: "normal",
            created_at: new Date('2024-01-17T14:20:00')
        }
    ])

    const getIcon = (type: string) => {
        switch (type) {
            case 'task':
                return <ClipboardList className="h-4 w-4" />
            case 'team':
                return <Users className="h-4 w-4" />
            case 'project':
                return <Briefcase className="h-4 w-4" />
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
                            <h2 className="text-lg font-medium">Team Notifications</h2>
                            <p className="text-sm text-muted-foreground">
                                Stay updated with your team's activities and tasks
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
                            <CardTitle className="text-sm font-medium">Task Updates</CardTitle>
                            <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {notifications.filter(n => n.type === 'task').length}
                            </div>
                            <p className="text-xs text-muted-foreground">Task related</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Team Updates</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {notifications.filter(n => n.type === 'team').length}
                            </div>
                            <p className="text-xs text-muted-foreground">Team related</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Project Updates</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {notifications.filter(n => n.type === 'project').length}
                            </div>
                            <p className="text-xs text-muted-foreground">Project updates</p>
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
                                    Your team's latest updates and alerts
                                </p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="all" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="unread">Unread</TabsTrigger>
                                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                                <TabsTrigger value="team">Team</TabsTrigger>
                                <TabsTrigger value="projects">Projects</TabsTrigger>
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
                                                            notification.priority === 'high' ? 'destructive' :
                                                                notification.status === 'unread' ? 'default' : 'secondary'
                                                        }>
                                                            {notification.priority === 'high' ? 'Urgent' : notification.status}
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

                            {/* Other tabs would follow the same pattern */}
                        </Tabs>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}