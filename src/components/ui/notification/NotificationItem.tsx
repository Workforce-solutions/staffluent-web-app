
interface NotificationItemProps {
    title: string
    description: string
    date: string
}

export function NotificationItem({ title, description, date }: NotificationItemProps) {
    return (
        <div className='flex flex-col p-4 border rounded-md shadow-sm bg-white border-gray-200'>
            <h4 className='font-bold'>{title}</h4>
            <p className='text-sm text-gray-600'>{description}</p>
            <span className='text-xs text-gray-400'>{date}</span>
        </div>
    )
}
