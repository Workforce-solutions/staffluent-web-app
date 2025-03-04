/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthResponse } from '@/@types/auth'
import { SideLink } from '@/data/sidelinks'
import useLocalStorage from '@/hooks/use-local-storage'
import { useLazyVerifyMagicLinkQuery } from '@/services/magic-linkApi'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import VerificationStatus from './VerificationStatus'

const MagicLink = () => {
  const [searchParams] = useSearchParams()
  const [data, setData] = useState<AuthResponse>()
  const [userId, setUserId] = useState<string>()
  const [sidebarLinks, setSidebarLinks] = useState<SideLink[]>([])
  // @ts-expect-error - Variable is used in state management but not directly in rendering
  const [hasError, setHasError] = useState<boolean>(false)
  const [isVerificationComplete, setIsVerificationComplete] = useState(false)

  const [verifyMagicLink, { isFetching }] = useLazyVerifyMagicLinkQuery()
  const [_, setSidebar] = useLocalStorage<SideLink[]>({
    defaultValue: [],
    key: 'sidebarLinks',
  })

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
          setSidebar(res.sidebarLinks ?? [])
          setSidebarLinks(res.sidebarLinks ?? [])
          setUserId(res.userId)
          localStorage.setItem('adminToken', res.userId)

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
  }, [token])

  const showRedirected = data !== undefined && isVerificationComplete

  const showLoading = isFetching || !isVerificationComplete

  return (
    <VerificationStatus
      data={data}
      redirected={showRedirected}
      isLoading={showLoading}
      sidebarLinks={sidebarLinks}
      userId={userId}
    />
  )
}

export default MagicLink
