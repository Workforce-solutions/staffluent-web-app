// components/staff/activity-feed.tsx
import { Card } from '@/components/ui/card'
import { format } from 'date-fns'
import { Activity, AlertCircle, Clock, Eye, FileText, Image, Package, Upload } from 'lucide-react'

interface ActivityItem {
    id: number
    type: string
    timestamp: string
    description: string
    icon: string
    metadata: {
        project_name: string | null
        duration: string | null
        rating: string | null
        priority: string | null
        media_type: string | null
        location: {
            clock_in?: { latitude: number; longitude: number }
            clock_out?: { latitude: number; longitude: number }
        } | null
    }
    priority_class: string
}

interface ActivityFeedProps {
    data: {
        activities: ActivityItem[]
        summary: {
            total_activities: number
            activity_types: Array<{ type: string; count: number }>
            most_active_time: { hour: number; count: number }
        }
        pagination: {
            current_page: number
            total: number
            per_page: number
            total_pages: number
        }
    }
    isLoading: boolean
}

const getIcon = (iconType: string) => {
    switch (iconType) {
        case 'image':
            return <Image className="h-5 w-5 text-blue-500" />
        case 'package':
            return <Package className="h-5 w-5 text-amber-500" />
        case 'upload':
            return <Upload className="h-5 w-5 text-green-500" />
        case 'file-text':
            return <FileText className="h-5 w-5 text-purple-500" />
        case 'eye':
            return <Eye className="h-5 w-5 text-cyan-500" />
        case 'clock':
            return <Clock className="h-5 w-5 text-orange-500" />
        case 'alert-circle':
            return <AlertCircle className="h-5 w-5 text-red-500" />
        default:
            return <Activity className="h-5 w-5 text-gray-500" />
    }
}

export function ActivityFeed({ data, isLoading }: ActivityFeedProps) {
    if (isLoading) {
        return (
            <Card className="p-4">
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center space-x-4">
                            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                            <div className="space-y-2 flex-1">
                                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                                <div className="h-3 bg-muted rounded animate-pulse w-1/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                    <div className="text-sm text-muted-foreground">Total Activities</div>
                    <div className="text-2xl font-bold">{data.summary.total_activities}</div>
                </Card>
                <Card className="p-4">
                    <div className="text-sm text-muted-foreground">Most Active Hour</div>
                    <div className="text-2xl font-bold">
                        {data.summary.most_active_time?.hour ?? '00'}:00 ({data.summary.most_active_time?.count ?? 0} activities)
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="text-sm text-muted-foreground">Activity Types</div>
                    <div className="text-sm mt-2">
                        {data.summary.activity_types.map((type) => (
                            <div key={type.type} className="flex justify-between items-center">
                                <span>{type.type}</span>
                                <span className="font-medium">{type.count}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Activity List */}
            <Card className="p-4">
                <div className="space-y-4">
                    {data.activities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4 border-b pb-4 last:border-0">
                            <div className="mt-1">
                                {getIcon(activity.icon)}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm">{activity.description}</p>
                                <p className="text-xs text-muted-foreground">
                                    {format(new Date(activity.timestamp), 'MMM dd, yyyy HH:mm')}
                                </p>
                                {activity.metadata.duration && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Duration: {activity.metadata.duration} hours
                                    </p>
                                )}
                                {activity.metadata.location && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Location recorded
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}