/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthResponse } from '@/@types/auth'
import { useLazyVerifyMagicLinkQuery } from '@/services/magic-linkApi'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import VerificationStatus from './VerificationStatus'

const MagicLink = () => {
  const [searchParams] = useSearchParams()
  const [data, setData] = useState<AuthResponse>()
  // @ts-expect-error - Variable is used in state management but not directly in rendering
  const [hasError, setHasError] = useState<boolean>(false)
  const [isVerificationComplete, setIsVerificationComplete] = useState(false)

  const [verifyMagicLink, { isFetching }] = useLazyVerifyMagicLinkQuery()

  const token = searchParams.get('token') ?? ''

  useEffect(() => {
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
      setHasError(true)
      setIsVerificationComplete(true)
    }
  }, [token, verifyMagicLink])

  const showRedirected = data !== undefined && isVerificationComplete

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
