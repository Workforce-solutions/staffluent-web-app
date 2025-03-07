import { NavLinkProps } from '@/data/sidelinks'
import useCheckActiveNav from '@/hooks/use-check-active-nav'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export function NavLinkIcon({
  title,
  icon,
  label,
  href,
  closeNav,
}: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav()
  const isActive = checkActiveNav(href)

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          to={href}
          onClick={closeNav}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-md',
            isActive
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
          )}
        >
          {icon}
          <span className='sr-only'>{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side='right' className='flex items-center gap-4'>
        {title}
        {label && (
          <span className='ml-auto text-muted-foreground'>{label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  )
}
