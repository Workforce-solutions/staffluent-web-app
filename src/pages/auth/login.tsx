/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { UserAuthForm } from './components/user-auth-form'
import staffLogo from '/images/logo.png'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function Login() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [authMethod, setAuthMethod] = useState('password')

  useEffect(() => {
    const token = searchParams.get('token')
    const refreshToken = searchParams.get('refreshToken')
    const accountType = searchParams.get('accountType')
    const expiresAt = searchParams.get('expires_at')
    const vbAuth = searchParams.get('vbAuth')

    if (token && refreshToken && accountType && expiresAt && vbAuth) {
      localStorage.setItem('adminToken', token)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('accountType', accountType)
      localStorage.setItem('expires_at', expiresAt)
      localStorage.setItem('vbAuth', vbAuth)

      navigate('/')
    }
  }, [searchParams])

  const className =
    'data-[state=active]:bg-gray-100 data-[state=active]:text-black data-[state=active]:shadow'

  return (
    <div className='flex flex-col justify-center px-4 py-12 min-h-screen bg-gray-50 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img className='mx-auto w-auto h-10' src={staffLogo} alt='Staffluent' />
        <h2 className='mt-6 text-center text-3xl font-semibold text-[#0A0A0A]'>
          Welcome to Staffluent
        </h2>
        <p className='mx-auto mt-2 max-w-lg text-sm text-center text-gray-600'>
          Access your workforce management platform and streamline your team
          operations, scheduling, and project tracking all in one place
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
          <Tabs value={authMethod} onValueChange={setAuthMethod}>
            <TabsList className='grid grid-cols-2 pb-1 mb-4 w-full h-full bg-transparent rounded-md border border-gray-200'>
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
