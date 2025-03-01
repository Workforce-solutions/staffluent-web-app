import { AuthResponse } from '@/@types/auth'
import { useLazyVerifyMagicLinkQuery } from '@/services/magic-linkApi'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import VerificationStatus from './VerificationStatus'

const MagicLink = () => {
  const [searchParams] = useSearchParams()
  const [data, setData] = useState<AuthResponse>()
  const [hasError, setHasError] = useState(false)

  const [verifyMagicLink, { isFetching }] = useLazyVerifyMagicLinkQuery()

  const token = searchParams.get('token') ?? ''

  useEffect(() => {
    if (token) {
      localStorage.setItem('adminToken', token)
      verifyMagicLink({ token })
        .unwrap()
        .then((res) => {
          setData(res.auth_response)
        })
        .catch(() => {
          setHasError(true)
        })
    } else {
      // Handle case where no token is provided
      setHasError(true)
    }
  }, [token])

  return (
    <VerificationStatus
      data={data}
      redirected={data !== undefined && !isFetching}
      isLoading={isFetching && !hasError}
    />
  )
}

export default MagicLink