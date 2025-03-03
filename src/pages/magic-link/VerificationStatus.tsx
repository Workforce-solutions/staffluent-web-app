/* eslint-disable react-hooks/exhaustive-deps */
import { AuthResponse } from '@/@types/auth'
import { CheckCircle, Loader2, ArrowLeft, RefreshCw } from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountType } from '../auth/components/user-auth-form'
import staffLogo from '/images/logo.png'
import { SideLink } from '@/data/sidelinks'
import { getRedirectPath } from '@/hooks/common/common-functions'

interface VerificationStatusProps {
  redirected?: boolean
  isLoading?: boolean
  data?: AuthResponse
  sidebarLinks: SideLink[]
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({
  redirected = false,
  isLoading: initialLoading = true,
  data,
  sidebarLinks = [],
}) => {
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>(
    'loading'
  )
  const [isLoading, setIsLoading] = useState(initialLoading)

  const newExpiresAt = Math.floor(Date.now() / 1000) + 60 * 60
  const accountType = data?.account_type ?? AccountType.business
  const token = data?.token ?? data?.access_token ?? ''
  const refreshToken = data?.refresh_token ?? ''

  useEffect(() => {
    if (redirected && !isLoading && data) {
      setStatus('success')

      localStorage.setItem('adminToken', token)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('accountType', accountType)
      localStorage.setItem('expires_at', String(newExpiresAt))
      localStorage.setItem('vbAuth', JSON.stringify(data))

      const timeout = setTimeout(() => {
        if (accountType) {
          navigate(
            sidebarLinks[0].sub?.[0]?.href ??
              sidebarLinks[0].href ??
              getRedirectPath(accountType)
          )
        } else {
          navigate('/')
        }
      }, 3000)

      return () => clearTimeout(timeout)
    } else if (!isLoading && !data) {
      setStatus('failed')
    }
  }, [redirected, isLoading, data, sidebarLinks])

  // Simulate verification process for better UX
  useEffect(() => {
    if (status === 'loading' && redirected) {
      const timeout = setTimeout(() => {
        setIsLoading(false)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [status, redirected])

  return (
    <div className='flex min-h-screen flex-col justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img className='mx-auto h-10 w-auto' src={staffLogo} alt='Staffluent' />

        {status === 'loading' && (
          <>
            <h2 className='mt-6 text-center text-3xl font-semibold text-[#0A0A0A]'>
              Verifying Magic Link
            </h2>
            <p className='mx-auto mt-2 max-w-lg text-center text-sm text-gray-600'>
              Please wait while we verify your login link...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <h2 className='mt-6 text-center text-3xl font-semibold text-[#0A0A0A]'>
              Magic Link Verified
            </h2>
            <p className='mx-auto mt-2 max-w-lg text-center text-sm text-gray-600'>
              You've been successfully authenticated. Redirecting to
              dashboard...
            </p>
          </>
        )}

        {status === 'failed' && (
          <>
            <h2 className='mt-6 text-center text-3xl font-semibold text-[#0A0A0A]'>
              Verification Failed
            </h2>
            <p className='mx-auto mt-2 max-w-lg text-center text-sm text-gray-600'>
              We couldn't verify your magic link. It might be expired or
              invalid.
            </p>
          </>
        )}
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex flex-col items-center bg-white px-4 py-6 shadow sm:rounded-lg sm:px-10'>
          {status === 'loading' && (
            <div className='flex flex-col items-center space-y-4'>
              <Loader2 className='h-12 w-12 animate-spin text-[#0A0A0A]' />
              <p className='text-sm text-gray-600'>
                Verifying your credentials...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className='flex flex-col items-center space-y-4'>
              <div className='rounded-full bg-green-50 p-3'>
                <CheckCircle className='h-12 w-12 text-green-600' />
              </div>
              <p className='animate-pulse text-sm text-gray-600'>
                Redirecting to dashboard...
              </p>
            </div>
          )}

          {status === 'failed' && (
            <div className='flex w-full flex-col items-center space-y-4'>
              <p className='text-center text-sm text-gray-600'>
                Try requesting a new magic link or contact support if you
                continue to experience issues.
              </p>
              <div className='mt-4 flex w-full flex-col gap-3 sm:flex-row'>
                <a
                  href='/login'
                  className='flex w-full items-center justify-center gap-2 rounded-md bg-[#0A0A0A] px-4 py-2 text-white transition-colors duration-200 hover:bg-[#171717]'
                >
                  <RefreshCw className='h-4 w-4' />
                  <span>New Link</span>
                </a>
                <a
                  href='https://staffluent.co/contact-us'
                  className='flex w-full items-center justify-center gap-2 rounded-md border border-[#0A0A0A] px-4 py-2 text-[#0A0A0A] transition-colors duration-200 hover:bg-gray-50'
                >
                  <span>Contact Support</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {status !== 'failed' ? (
          <div className='mt-4 text-center text-sm'>
            <a
              href='/login'
              className='inline-flex items-center gap-1 rounded-md px-3 py-1 font-medium text-[#0A0A0A] transition-colors duration-200 hover:bg-gray-100 hover:text-[#171717]'
            >
              <ArrowLeft className='h-4 w-4' />
              Back to login
            </a>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default VerificationStatus
