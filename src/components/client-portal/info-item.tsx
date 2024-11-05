// components/info-item.tsx
import { cn } from "@/lib/utils"

interface InfoItemProps {
  icon?: React.ReactNode
  label: string
  value?: React.ReactNode
  className?: string
}

export function InfoItem({
  icon,
  label,
  value = 'N/A',
  className
}: InfoItemProps) {
  return (
    <div className={cn("flex items-start space-x-3", className)}>
      {icon && <div className="mt-0.5 text-muted-foreground">{icon}</div>}
      <div className="space-y-0.5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}
