import { NavLinkProps, NavProps, SideLink } from '@/data/sidelinks'
import useCheckActiveNav from '@/hooks/use-check-active-nav'
import { cn } from '@/lib/utils'
import { IconChevronRight } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { Button } from './custom/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export default function Nav({
  links = [],
  isCollapsed,
  className,
  closeNav,
}: NavProps) {
  const categorizedLinks = links.reduce(
    (acc, link) => {
      const category = link?.category || 'MAIN MENU'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(link)
      return acc
    },
    {} as Record<string, SideLink[]>
  )

  const renderLink = ({ sub, ...rest }: SideLink) => {
    const key = `${rest.title}-${rest.href}`
    if (isCollapsed && sub)
      return (
        <NavLinkIconDropdown
          {...rest}
          sub={sub}
          key={key}
          closeNav={closeNav}
        />
      )

    if (isCollapsed)
      return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />

    if (sub)
      return (
        <NavLinkDropdown {...rest} sub={sub} key={key} closeNav={closeNav} />
      )

    return <NavLink {...rest} key={key} closeNav={closeNav} />
  }

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        'scrollbar-hide group overflow-auto transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2',
        className
      )}
    >
      <TooltipProvider delayDuration={0}>
        <nav className='flex flex-col space-y-1'>
          {Object.entries(categorizedLinks).map(
            ([category, categoryLinks], index) => (
              <div key={index} className='mb-4'>
                {!isCollapsed && (
                  <div className='mb-2 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground'>
                    {category}
                  </div>
                )}
                <div className='space-y-1 px-2'>
                  {categoryLinks.map(renderLink)}
                </div>
              </div>
            )
          )}
        </nav>
      </TooltipProvider>
    </div>
  )
}

function NavLink(props: NavLinkProps) {
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
            'mr-3 flex h-5 w-5 items-center justify-center', // Fixed width/height for icons
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

function NavLinkDropdown(props: NavLinkProps) {
  const { title, icon, label, sub, closeNav } = props
  const { checkActiveNav } = useCheckActiveNav()
  const isChildActive = !!sub?.find(() => checkActiveNav(props))

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

function NavLinkIcon(props: NavLinkProps) {
  const { title, icon, label, href, closeNav } = props
  const { checkActiveNav } = useCheckActiveNav()
  const isActive = checkActiveNav(props)

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

function NavLinkIconDropdown(props: NavLinkProps) {
  const { title, icon, label, sub, closeNav } = props
  const { checkActiveNav } = useCheckActiveNav()

  /* Open collapsible by default
   * if one of child element is active */
  const isChildActive = !!sub?.find(() => checkActiveNav(props))

  return (
    <DropdownMenu>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className={cn(
                'h-10 w-10 rounded-md p-0',
                isChildActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted/30'
              )}
            >
              {icon}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side='right' className='flex items-center gap-4'>
          {title}{' '}
          {label && (
            <span className='ml-auto text-muted-foreground'>{label}</span>
          )}
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent side='right' align='start' sideOffset={4}>
        <DropdownMenuLabel>
          {title} {label ? `(${label})` : ''}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sub!.map(({ title, icon, label, href }) => (
          <DropdownMenuItem key={`${title}-${href}`} asChild>
            <Link
              to={href}
              onClick={closeNav}
              className={cn(
                'flex items-center',
                checkActiveNav(props) ? 'bg-primary/10 text-primary' : ''
              )}
            >
              {icon} <span className='ml-2 max-w-52 text-wrap'>{title}</span>
              {label && <span className='ml-auto text-xs'>{label}</span>}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
