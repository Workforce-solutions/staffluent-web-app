import { NavLinkProps } from '@/data/sidelinks'
import useCheckActiveNav from '@/hooks/use-check-active-nav'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

export function NavLink(props: NavLinkProps) {
  const { title, icon, label, href, closeNav, subLink = false } = props
  const { checkActiveNav } = useCheckActiveNav()
  const isActive = checkActiveNav(props)

  return (
    <Link
      to={href}
      onClick={closeNav}
      className={cn(
        'group flex h-10 items-center rounded-md px-3 text-sm font-medium',
        isActive
          ? 'bg-teal-50 text-teal-600' // Use teal for active items to match the image
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800',
        subLink && 'ml-6 text-xs'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon && (
        <span
          className={cn(
            'mr-3 flex h-5 w-5 items-center justify-center',
            isActive ? 'text-teal-600' : 'text-slate-500'
          )}
        >
          {icon}
        </span>
      )}
      <span>{title}</span>
      {label && (
        <span className='ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600'>
          {label}
        </span>
      )}
    </Link>
  )
}
