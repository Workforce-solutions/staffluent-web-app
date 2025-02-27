/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthProps, DataAuthProps, LocalStorageProps } from '@/@types/auth'
import { AccountType } from '@/pages/auth/components/user-auth-form'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useLocalStorage<T>({
  key,
  defaultValue,
}: LocalStorageProps<T>) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue !== null ? (JSON?.parse(storedValue) as T) : defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue] as const
}

export const useShortCode = () => {
  const [shortCode, setShortCode] = useState<string>(() => {
    const vbAuth = localStorage.getItem('vbAuth')
    return vbAuth && vbAuth !== 'undefined'
      ? ((JSON?.parse(vbAuth) as DataAuthProps)?.data?.venue?.short_code ??
          (JSON?.parse(vbAuth)?.venue?.short_code as AuthProps) ??
          '')
      : ''
  })

  useEffect(() => {
    const handleStorageChange = () => {
      const vbAuth = localStorage.getItem('vbAuth')
      const newShortCode = vbAuth
        ? ((JSON?.parse(vbAuth) as DataAuthProps)?.data?.venue?.short_code ??
          '')
        : ''
      setShortCode(newShortCode)
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return shortCode
}

export const useLocalStorageString = (key: string) => {
  const [value, setValue] = useState<string>(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue ?? ''
  })

  useEffect(() => {
    const handleStorageChange = () => {
      const newValue = localStorage.getItem(key)
      setValue(newValue ?? '')
    }

    window.addEventListener('storage', handleStorageChange)

    window.addEventListener('local-storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('local-storage', handleStorageChange)
    }
  }, [key])

  return value
}

const originalSetItem = localStorage.setItem
localStorage.setItem = function (key, value) {
  const event = new Event('local-storage')
  originalSetItem.apply(this, [key, value])
  window.dispatchEvent(event)
}

export const useNotificationsView = () => {
  const navigate = useNavigate()
  const accountType = useLocalStorageString('accountType') as AccountType

  const redirectToNotifications = () => {
    switch (accountType) {
      case AccountType.business:
        navigate('/notifications')
        break
      case AccountType.client:
        navigate('/client-portal/notifications')
        break
      case AccountType.business_team_leader:
        navigate('/team-leader/notifications')
        break
      case AccountType.business_operations_managers:
        navigate('/operations-manager/notifications')
        break
      default:
        navigate('/notifications')
    }
  }

  return { redirectToNotifications }
}
