/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Bell } from 'lucide-react'
import supabase from '@/supabaseClient'
import { useNavigate } from 'react-router-dom'
// @ts-ignore
import { LoginResponse } from '@/@types/auth'
import { getFirstCharacters } from '@/hooks/common/common-functions'
import useLocalStorage, {
  useLocalStorageString,
  useNotificationsView,
} from '@/hooks/use-local-storage'
import { AccountType } from '@/pages/auth/components/user-auth-form'

export function UserNav() {
  const navigate = useNavigate()
  const [userInfo] = useLocalStorage<LoginResponse | undefined>({
    key: 'vbAuth',
    defaultValue: undefined,
  })
  const { redirectToNotifications } = useNotificationsView()
  const accountType = useLocalStorageString('accountType') as AccountType
  const data = userInfo?.data ?? userInfo

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      localStorage.removeItem('adminToken')
      localStorage.removeItem('vbAuth')
      localStorage.removeItem('accountType')
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const getProfilePath = () => {
    switch (accountType) {
      case AccountType.business:
        return '/settings'
      case AccountType.client:
        return '/client-portal/settings'
      case AccountType.business_team_leader:
        return '/team-leader/settings'
      case AccountType.business_operations_managers:
        return '/operations-manager/settings'
      default:
        return '/profile'
    }
  }

  const getConfigPath = () => {
    switch (accountType) {
      case AccountType.business:
        return '/configuration/alerts'
      case AccountType.business_team_leader:
        return '/team-leader/configuration/alerts'
      case AccountType.business_operations_managers:
        return '/operations-manager/configuration'
      default:
        return '/configuration/alerts'
    }
  }

  const renderMenuContent = () => (
    <DropdownMenuContent className='w-56' align='end' forceMount>
      <DropdownMenuLabel className='font-normal'>
        <div className='flex flex-col space-y-1'>
          <p className='text-sm font-medium leading-none'>{data?.user.name}</p>
          <p className='text-xs leading-none truncate text-muted-foreground'>
            {data?.user.email}
          </p>
          <p className='text-xs leading-none capitalize text-muted-foreground'>
            {accountType.replace('business_', '')}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => navigate(getProfilePath())}>
          Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
  
        {accountType !== AccountType.client &&
          accountType !== AccountType.business_operations_managers && (
            <DropdownMenuItem onClick={() => navigate(getConfigPath())}>
              Configurations
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
  
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={redirectToNotifications}
        >
          Notifications
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onSelect={handleLogout}>
        Log out
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  )

  return (
    <div className='flex items-center space-x-2'>
      <Button
        variant='ghost'
        className='relative p-0 w-8 h-8'
        onClick={redirectToNotifications}
      >
        <Bell className='w-5 h-5' />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative w-8 h-8 rounded-full'>
            <Avatar className='w-8 h-8'>
              <AvatarImage src='/avatars/01.png' alt='@user' />
              <AvatarFallback>
                {getFirstCharacters(data?.user.name)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        {renderMenuContent()}
      </DropdownMenu>
    </div>
  )
}
