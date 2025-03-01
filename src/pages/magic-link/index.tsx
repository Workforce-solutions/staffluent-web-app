import { AuthResponse } from '@/@types/auth'
import { useLazyVerifyMagicLinkQuery } from '@/services/magic-linkApi'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import VerificationStatus from './VerificationStatus'

const MagicLink = () => {
  const [searchParams] = useSearchParams()
  const [data, setData] = useState<AuthResponse>()
  const [hasError, setHasError] = useState(false)
  const [isVerificationComplete, setIsVerificationComplete] = useState(false)

  const [verifyMagicLink, { isFetching }] = useLazyVerifyMagicLinkQuery()

  const token = searchParams.get('token') ?? ''

  useEffect(() => {
    // Reset state when token changes
    setData(undefined)
    setHasError(false)
    setIsVerificationComplete(false)
    
    if (token) {
      localStorage.setItem('adminToken', token)
      verifyMagicLink({ token })
        .unwrap()
        .then((res) => {
          if (res.auth_response) {
            setData(res.auth_response)
          } else {
            setHasError(true)
          }
          setIsVerificationComplete(true)
        })
        .catch(() => {
          setHasError(true)
          setIsVerificationComplete(true)
        })
    } else {
      // Handle case where no token is provided
      setHasError(true)
      setIsVerificationComplete(true)
    }
  }, [token, verifyMagicLink])

  // Only show the verification status when we've either succeeded or
  // completed verification process
  const showRedirected = data !== undefined && isVerificationComplete
  
  // Keep showing loading until verification is complete
  const showLoading = isFetching || !isVerificationComplete
  
  return (
    <VerificationStatus
      data={data}
      redirected={showRedirected}
      isLoading={showLoading}
    />
  )
}

export default MagicLink