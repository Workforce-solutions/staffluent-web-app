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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      localStorage.removeItem('adminToken')
      localStorage.removeItem('vbAuth')
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const data = userInfo?.data ?? userInfo

  return (
    <div className='flex items-center space-x-2'>
      <Button
        variant='ghost'
        className='relative h-8 w-8 p-0'
        onClick={redirectToNotifications}
      >
        <Bell className='h-5 w-5' />
      </Button>

      {accountType === AccountType.business ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src='/avatars/01.png' alt='@ggerveni' />
                <AvatarFallback>
                  {getFirstCharacters(data?.user.name)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {userInfo?.data.user.name}
                </p>
                <p className='text-xs leading-none text-muted-foreground'>
                  {userInfo?.data.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigate('/configuration/alerts')}
              >
                Configurations
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
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
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src='/avatars/01.png' alt='@ggerveni' />
                <AvatarFallback>
                  {getFirstCharacters(data?.user.name)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {data?.user.name}
                </p>
                <p className='text-xs leading-none text-muted-foreground'>
                  {data?.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigate('/configuration/alerts')}
              >
                Configurations
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
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
        </DropdownMenu>
      )}
    </div>
  )
}
