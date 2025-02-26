/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { UserAuthForm } from './components/user-auth-form'
import staffLogo from '/images/logo.png'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Login() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = searchParams.get('token')
    const refreshToken = searchParams.get('refreshToken')
    const accountType = searchParams.get('accountType')
    const expiresAt = searchParams.get('expires_at')

    if (token && refreshToken && accountType && expiresAt) {
      localStorage.setItem('adminToken', token)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('accountType', accountType)
      localStorage.setItem('expires_at', expiresAt)

      navigate('/')
    }
  }, [searchParams])

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
          <UserAuthForm />
        </div>
      </div>
    </div>
  )
}
