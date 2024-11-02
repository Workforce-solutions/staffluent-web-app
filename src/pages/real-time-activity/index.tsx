import React from 'react'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Clock,
    UserPlus,
    UserMinus,
    AlertCircle,
    AlertTriangle,
    Eye,
    Image,
    Upload,
    Trash2,
    Package,
    PackagePlus,
    ClipboardCheck,
    ClipboardList,
    FileText,
    FilePlus,
    MessageCircle,
    MessageSquarePlus,
    MessageSquareX,
    SearchSlash,
    Plus,
    Edit
} from 'lucide-react'
import { useGetActivitiesQuery } from '@/services/adminActivityApi'
import {useShortCode} from "../../hooks/use-local-storage";

interface Activity {
    id: number;
    type: string;
    user: string;
    department: string;
    team: string;
    timestamp: string;
    task?: string;
    metadata: Record<string, any>;
}

interface Department {
    id: number
    name: string
}

interface Team {
    id: number
    name: string
}

interface Activity {
    id: number
    type: string
    user: string
    department: string
    team: string
    timestamp: string
    task?: string
    metadata: Record<string, any>
}

interface FilterState {
    department: string
    team: string
    search: string
    page: number
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

export default function RealTimeActivityFeed() {
    const short_code = useShortCode()
    const [filter, setFilter] = React.useState<FilterState>({
        department: 'All',
        team: 'All',
        search: '',
        page: 1
    })


    const { data, isLoading, isFetching } = useGetActivitiesQuery({
        venue_short_code: short_code!,
        department: filter.department !== 'All' ? parseInt(filter.department) : undefined,
        team: filter.team !== 'All' ? parseInt(filter.team) : undefined,  // Parse team ID as integer
        search: filter.search || undefined,
        page: filter.page,
        per_page: 50
    }, {
        pollingInterval: 15000
    })

    const getActivityIcon = (type: string) => {
        switch(type) {
            // Timesheet
            case 'timesheet-clock-in': return <UserPlus className="h-4 w-4 text-green-500" />
            case 'timesheet-clock-out': return <UserMinus className="h-4 w-4 text-red-500" />
            case 'timesheet-break-start': return <Clock className="h-4 w-4 text-yellow-500" />
            case 'timesheet-break-end': return <Clock className="h-4 w-4 text-green-500" />
            case 'timesheet-view': return <Eye className="h-4 w-4 text-blue-500" />

            // Media
            case 'media-view': return <Image className="h-4 w-4 text-blue-500" />
            case 'media-upload': return <Upload className="h-4 w-4 text-green-500" />
            case 'media-delete': return <Trash2 className="h-4 w-4 text-red-500" />

            // Supplies
            case 'supplies-view': return <Package className="h-4 w-4 text-blue-500" />
            case 'supplies-create': return <PackagePlus className="h-4 w-4 text-green-500" />

            // Quality
            case 'quality-view': return <ClipboardCheck className="h-4 w-4 text-blue-500" />
            case 'quality-create': return <ClipboardList className="h-4 w-4 text-green-500" />

            // Work Orders
            case 'work-order-view': return <FileText className="h-4 w-4 text-blue-500" />
            case 'work-order-create': return <FilePlus className="h-4 w-4 text-green-500" />

            // Issues
            case 'issue-view': return <AlertTriangle className="h-4 w-4 text-blue-500" />
            case 'issue-create': return <AlertCircle className="h-4 w-4 text-yellow-500" />

            // Comments
            case 'comment-view': return <MessageCircle className="h-4 w-4 text-blue-500" />
            case 'comment-create': return <MessageSquarePlus className="h-4 w-4 text-green-500" />
            case 'comment-delete': return <MessageSquareX className="h-4 w-4 text-red-500" />

            // General
            case 'search': return <SearchSlash className="h-4 w-4 text-blue-500" />
            case 'view': return <Eye className="h-4 w-4 text-blue-500" />
            case 'create': return <Plus className="h-4 w-4 text-green-500" />
            case 'update': return <Edit className="h-4 w-4 text-yellow-500" />
            case 'delete': return <Trash2 className="h-4 w-4 text-red-500" />

            default: return <AlertCircle className="h-4 w-4 text-gray-500" />
        }
    }

    const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => (
        <div className="flex items-center space-x-4 py-2 hover:bg-gray-100 rounded-md px-2 cursor-pointer">
            <Avatar>
                <AvatarImage src={`https://api.dicebear.com/5.x/initials/svg?seed=${activity.user}`} />
                <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <p className="text-sm font-medium">{activity.user}</p>
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
            </div>
            <Badge variant="secondary" className="ml-auto">
                {getActivityIcon(activity.type)}
                <span className="ml-1">{activity.type.replace('-', ' ')}</span>
            </Badge>
        </div>
    )

    const getActivityBreakdown = () => {
        if (!data?.summary.activity_breakdown) return []
        return data.summary.activity_breakdown.map((item: { type: string; count: any }) => ({
            name: item.type.replace('-', ' '),
            value: item.count
        }))
    }

    const getTeamPerformance = () => {
        if (!data?.summary.team_performance) return []
        return data.summary.team_performance
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Layout>
            <Layout.Header>
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className='space-y-8'>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight'> Activity Feed Summary {isFetching &&<span className="text-sm text-gray-500">(Updating...)</span>} </h2>
                    <p className='text-muted-foreground'>
                        Track and monitor real-time staff activities and performance metrics
                    </p>
                </div>

                <Card>
                    <CardContent className='pt-6'>
                        <div className="flex justify-between items-center mb-6">
                            <Tabs defaultValue="feed" className="w-full">
                                <div className="flex justify-between items-center mb-6">
                                    <TabsList>
                                        <TabsTrigger value="feed">Activity Feed</TabsTrigger>
                                        <TabsTrigger value="summary">Summary</TabsTrigger>
                                    </TabsList>

                                    <div className="flex space-x-4">
                                        <Select
                                            value={filter.department}
                                            onValueChange={(value) => setFilter({...filter, department: value, page: 1})}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select department"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All">All Departments</SelectItem>
                                                {data?.filters.departments.map((dept: Department) => (
                                                    <SelectItem key={dept.id} value={dept.id.toString()}>
                                                        {dept.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <Select
                                            value={filter.team}
                                            onValueChange={(value) => setFilter({...filter, team: value, page: 1})}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select team"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All">All Teams</SelectItem>
                                                {data?.filters.teams.map((team: Team) => (
                                                    <SelectItem key={team.id} value={team.id.toString()}>
                                                        {team.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <TabsContent value="feed">
                                    <div className="h-[600px] w-full rounded-md border p-4 overflow-y-auto">
                                        {data?.activities.map(activity => (
                                            <ActivityItem key={activity.id} activity={activity}/>
                                        ))}
                                        {data?.pagination.total === 0 && (
                                            <div className="text-center text-gray-500 mt-4">
                                                No activities found
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="summary">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Activity Breakdown</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ResponsiveContainer width="100%" height={300}>
                                                    <PieChart>
                                                        <Pie
                                                            data={getActivityBreakdown()}
                                                            cx="50%"
                                                            cy="50%"
                                                            labelLine={false}
                                                            outerRadius={80}
                                                            fill="#8884d8"
                                                            dataKey="value"
                                                            label={({ name, percent }) =>
                                                                `${name} ${(percent * 100).toFixed(0)}%`}
                                                        >
                                                            {getActivityBreakdown().map((_entry, index) => (
                                                                <Cell
                                                                    key={`cell-${index}`}
                                                                    fill={COLORS[index % COLORS.length]}
                                                                />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip/>
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Team Performance</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ResponsiveContainer width="100%" height={300}>
                                                    <BarChart data={getTeamPerformance()}>
                                                        <CartesianGrid strokeDasharray="3 3"/>
                                                        <XAxis dataKey="name"/>
                                                        <YAxis/>
                                                        <Tooltip/>
                                                        <Legend/>
                                                        <Bar dataKey="value" fill="#8884d8" name="Tasks Completed"/>
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}