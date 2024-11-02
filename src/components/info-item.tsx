interface InfoItemProps {
  icon?: React.ReactNode
  label: string
  children: React.ReactNode
}

export const InfoItem = ({ icon, label, children }: InfoItemProps) => {
  return (
    <div className='flex items-center space-x-2'>
      {icon && <span className='text-muted-foreground'>{icon}</span>}
      <span className='font-medium'>{label}:</span>
      <span>{children}</span>
    </div>
  )
}
