import { NotificationItem } from './NotificationItem'

interface NotificationListProps {
    notifications: { id: number; title: string; description: string; date: string }[]
}

export function NotificationList({ notifications }: NotificationListProps) {
    return (
        <div className='space-y-2'>
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    title={notification.title}
                    description={notification.description}
                    date={notification.date}
                />
            ))}
        </div>
    )
}
