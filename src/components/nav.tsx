import { NavProps, SideLink } from '@/data/sidelinks'
import { cn } from '@/lib/utils'
import { TooltipProvider } from './ui/tooltip'
import { NavLinkIconDropdown } from './sidebar/nav-link-icon-dropdown'
import { NavLinkIcon } from './sidebar/nav-link-icon'
import { NavLinkDropdown } from './sidebar/nav-link-dropdown'
import { NavLink } from './sidebar/nav-link'

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
