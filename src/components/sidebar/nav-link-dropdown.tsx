import { NavLinkProps } from '@/data/sidelinks'
import useCheckActiveNav from '@/hooks/use-check-active-nav'
import { cn } from '@/lib/utils'
import { IconChevronRight } from '@tabler/icons-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible'
import { NavLink } from './nav-link'

export function NavLinkDropdown(props: NavLinkProps) {
  const { title, icon, label, closeNav, sub } = props

  const { checkActiveNav } = useCheckActiveNav()
  const isChildActive = checkActiveNav(props)

  return (
    <Collapsible defaultOpen={isChildActive}>
      <CollapsibleTrigger
        className={cn(
          'group flex h-10 w-full items-center rounded-md px-3 text-sm font-medium',
          isChildActive
            ? 'text-teal-600'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
        )}
      >
        {icon && (
          <span className='mr-3 flex h-5 w-5 items-center justify-center text-slate-500'>
            {icon}
          </span>
        )}
        <span>{title}</span>
        {label && (
          <span className='ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600'>
            {label}
          </span>
        )}
        <IconChevronRight
          size={16}
          className={cn(
            'ml-auto text-slate-400 transition-transform',
            'group-data-[state="open"]:rotate-90'
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className='pt-1'>
        {sub!.map((sublink) => (
          <NavLink
            key={`${sublink.title}-${sublink.href}`}
            {...sublink}
            subLink
            closeNav={closeNav}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
