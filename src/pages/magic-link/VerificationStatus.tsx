/* eslint-disable react-hooks/exhaustive-deps */
import { AuthResponse } from '@/@types/auth'
import { CheckCircle, Loader2, ArrowLeft, RefreshCw } from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountType } from '../auth/components/user-auth-form'
import staffLogo from '/images/logo.png'

interface VerificationStatusProps {
  redirected?: boolean
  isLoading?: boolean
  data?: AuthResponse
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({
  redirected = false,
  isLoading: initialLoading = true,
  data,
}) => {
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [isLoading, setIsLoading] = useState(initialLoading)

  const newExpiresAt = Math.floor(Date.now() / 1000) + 60 * 60
  const accountType = data?.account_type ?? AccountType.business
  const token = data?.token ?? ''
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
        navigate('/')
      }, 3000)

      return () => clearTimeout(timeout)
    } else if (!isLoading && !data) {
      setStatus('failed')
    }
  }, [redirected, isLoading, data])

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
    <div className='flex flex-col justify-center px-4 py-12 min-h-screen bg-gray-50 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img
          className='mx-auto w-auto h-10'
          src={staffLogo}
          alt='Staffluent'
        />
        
        {status === 'loading' && (
          <>
            <h2 className='mt-6 text-center text-3xl font-semibold text-[#0A0A0A]'>
              Verifying Magic Link
            </h2>
            <p className='mx-auto mt-2 max-w-lg text-sm text-center text-gray-600'>
              Please wait while we verify your login link...
            </p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <h2 className='mt-6 text-center text-3xl font-semibold text-[#0A0A0A]'>
              Magic Link Verified
            </h2>
            <p className='mx-auto mt-2 max-w-lg text-sm text-center text-gray-600'>
              You've been successfully authenticated. Redirecting to dashboard...
            </p>
          </>
        )}
        
        {status === 'failed' && (
          <>
            <h2 className='mt-6 text-center text-3xl font-semibold text-[#0A0A0A]'>
              Verification Failed
            </h2>
            <p className='mx-auto mt-2 max-w-lg text-sm text-center text-gray-600'>
              We couldn't verify your magic link. It might be expired or invalid.
            </p>
          </>
        )}
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex flex-col items-center px-4 py-6 bg-white shadow sm:rounded-lg sm:px-10'>
          {status === 'loading' && (
            <div className='flex flex-col items-center space-y-4'>
              <Loader2 className='h-12 w-12 text-[#0A0A0A] animate-spin' />
              <p className='text-sm text-gray-600'>Verifying your credentials...</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className='flex flex-col items-center space-y-4'>
              <div className='p-3 bg-green-50 rounded-full'>
                <CheckCircle className='w-12 h-12 text-green-600' />
              </div>
              <p className='text-sm text-gray-600 animate-pulse'>Redirecting to dashboard...</p>
            </div>
          )}
          
          {status === 'failed' && (
            <div className='flex flex-col items-center space-y-4 w-full'>
              <p className='text-sm text-center text-gray-600'>
                Try requesting a new magic link or contact support if you continue to experience issues.
              </p>
              <div className='flex flex-col gap-3 mt-4 w-full sm:flex-row'>
                <a
                  href='/login'
                  className='flex justify-center items-center gap-2 px-4 py-2 bg-[#0A0A0A] text-white rounded-md hover:bg-[#171717] transition-colors duration-200 w-full'
                >
                  <RefreshCw className='w-4 h-4' />
                  <span>New Link</span>
                </a>
                <a
                  href='https://staffluent.co/contact-us'
                  className='flex justify-center items-center gap-2 px-4 py-2 border border-[#0A0A0A] text-[#0A0A0A] rounded-md hover:bg-gray-50 transition-colors duration-200 w-full'
                >
                  <span>Contact Support</span>
                </a>
              </div>
            </div>
          )}
        </div>
        
        {status !== 'failed' ? (
          <div className='mt-4 text-sm text-center'>
            <a 
              href='/login' 
              className='inline-flex items-center gap-1 px-3 py-1 font-medium text-[#0A0A0A] hover:text-[#171717] rounded-md hover:bg-gray-100 transition-colors duration-200'
            >
              <ArrowLeft className='w-4 h-4' />
              Back to login
            </a>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default VerificationStatus