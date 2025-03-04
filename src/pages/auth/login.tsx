/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useBusinessByAdminMutation } from '@/services/magic-linkApi'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AccountType, UserAuthForm } from './components/user-auth-form'
import staffLogo from '/images/logo.png'
import { Loader2 } from 'lucide-react'

export default function Login() {
  const [authMethod, setAuthMethod] = useState('password')
  const [authToken, setAuthToken] = useState<string | null>(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const token = searchParams.get('token')
  const userId = searchParams.get('userId')

  console.log(userId, 'userIduserId')

  const [registerAdmin, { isLoading }] = useBusinessByAdminMutation()

  useEffect(() => {
    if (token) {
      localStorage.setItem('adminToken', token)
      setAuthToken(token)
    }
  }, [token])

  useEffect(() => {
    const registerAdminUser = async () => {
      if (userId && authToken) {
        await new Promise((resolve) => setTimeout(resolve, 0))

        try {
          const res = await registerAdmin({ userId }).unwrap()
          if (res) {
            const accountType = res?.account_type ?? AccountType.business
            const newExpiresAt = Math.floor(Date.now() / 1000) + 60 * 60
            const sidebarLinks = res.sidebarLinks ?? []
            localStorage.setItem(
              'adminToken',
              res.access_token ?? res.token ?? ''
            )

            localStorage.setItem('refreshToken', res?.refresh_token ?? '')
            localStorage.setItem('accountType', accountType)
            localStorage.setItem('expires_at', String(newExpiresAt))
            if (sidebarLinks) {
              localStorage.setItem('sidebarLinks', JSON.stringify(sidebarLinks))
            }
            localStorage.setItem(
              'vbAuth',
              JSON.stringify({ ...res.auth_response, expires_at: newExpiresAt })
            )
            navigate('/')
          }
        } catch (error) {
          console.error('Registration failed:', error)
        }
      }
    }

    registerAdminUser()
  }, [userId, authToken])

  const className =
    'data-[state=active]:bg-gray-100 data-[state=active]:text-black data-[state=active]:shadow'

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    )
  }

  return (
    <div className='flex min-h-screen flex-col justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img className='mx-auto h-10 w-auto' src={staffLogo} alt='Staffluent' />
        <h2 className='mt-6 text-center text-3xl font-semibold text-[#0A0A0A]'>
          Welcome to Staffluent
        </h2>
        <p className='mx-auto mt-2 max-w-lg text-center text-sm text-gray-600'>
          Access your workforce management platform and streamline your team
          operations, scheduling, and project tracking all in one place
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
          <Tabs value={authMethod} onValueChange={setAuthMethod}>
            <TabsList className='mb-4 grid h-full w-full grid-cols-2 rounded-md border border-gray-200 bg-transparent pb-1'>
              <TabsTrigger
                className={`text-gray-600 ${className}`}
                value='password'
              >
                Password
              </TabsTrigger>
              <TabsTrigger
                className={`text-gray-600 ${className}`}
                value='magic-link'
              >
                Magic Link
              </TabsTrigger>
            </TabsList>

            <TabsContent value='password'>
              <UserAuthForm authMethod='password' buttonText='Login' />
            </TabsContent>

            <TabsContent value='magic-link'>
              <UserAuthForm
                authMethod='magic-link'
                buttonText='Send Magic Link'
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
