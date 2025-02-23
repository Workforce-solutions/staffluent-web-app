import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import VerificationStatus from './VerificationStatus'

const MagicLink = () => {
  const { token } = useParams()

  useEffect(() => {
    if (token) {
      localStorage.setItem('adminToken', token)
    }
  }, [token])

  return <VerificationStatus redirected={false} />
}

export default MagicLink
