/* eslint-disable react-hooks/exhaustive-deps */
import { AuthResponse } from '@/@types/auth'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CheckCircle, Loader, XCircle } from 'lucide-react'
import type React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountType } from '../auth/components/user-auth-form'

interface VerificationStatusProps {
  redirected?: boolean
  isLoading?: boolean
  data?: AuthResponse
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({
  redirected = false,
  isLoading = true,
  data,
}) => {
  const navigate = useNavigate()

  const newExpiresAt = Math.floor(Date.now() / 1000) + 60 * 60
  const accountType = data?.account_type ?? AccountType.business
  const token = data?.token ?? ''
  const refreshToken = data?.refresh_token ?? ''

  useEffect(() => {
    if (redirected && !isLoading && data) {
      localStorage.setItem('adminToken', token)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('accountType', accountType)
      localStorage.setItem('expires_at', String(newExpiresAt))
      localStorage.setItem('vbAuth', JSON.stringify(data))

      const timeout = setTimeout(() => {
        navigate('/')
      }, 300000)

      return () => clearTimeout(timeout)
    }
  }, [redirected, isLoading, data])

  return (
    <div className='flex min-h-screen items-center justify-center border bg-background p-4'>
      <Card className='w-full max-w-md'>
        <CardContent className='flex flex-col items-center space-y-4 p-6 text-center'>
          {isLoading ? (
            <div className='flex flex-col items-center space-y-4'>
              <Loader className='h-12 w-12 animate-spin text-primary' />
              <h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>
                Redirecting...
              </h1>
              <p className='text-base text-gray-600'>Please wait a moment</p>
            </div>
          ) : redirected || isLoading ? (
            <>
              <div className='rounded-full bg-green-50 p-3'>
                <CheckCircle className='h-12 w-12 text-green-600' />
              </div>
              <h1 className='text-2xl font-semibold text-green-900'>
                Verification Successful
              </h1>
              <p className={cn('text-base text-green-600', 'animate-pulse')}>
                Redirecting to the dashboard...
              </p>
            </>
          ) : (
            <>
              <div className='rounded-full bg-red-50 p-3'>
                <XCircle className='h-12 w-12 text-red-600' />
              </div>
              <h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>
                Verification Failed
              </h1>
              <p className='text-base text-gray-600'>
                We couldn't verify your email. The link might be expired or
                invalid.
              </p>
              <a
                href='/support'
                className={cn(
                  'mt-2 text-primary underline underline-offset-4',
                  'transition-colors duration-200',
                  'hover:text-primary/90'
                )}
              >
                Contact Support
              </a>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default VerificationStatus
