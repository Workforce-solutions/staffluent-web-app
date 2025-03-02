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

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key])

  return value
}

// Hook to access has_changed_password
export const useHasChangedPassword = () => {
  const [hasChangedPassword, setHasChangedPassword] = useState<boolean>(() => {
    // Check osAuth first
    const osAuth = localStorage.getItem('osAuth')
    if (osAuth) {
      return JSON.parse(osAuth).has_changed_password || false
    }
    
    // Fallback to vbAuth
    const vbAuth = localStorage.getItem('vbAuth')
    if (vbAuth) {
      const parsed = JSON.parse(vbAuth)
      return parsed.has_changed_password || parsed.metadata?.has_changed_password || false
    }
    
    return false
  })

  useEffect(() => {
    const handleStorageChange = () => {
      // Check osAuth first
      const osAuth = localStorage.getItem('osAuth')
      if (osAuth) {
        setHasChangedPassword(JSON.parse(osAuth).has_changed_password || false)
        return
      }
      
      // Fallback to vbAuth
      const vbAuth = localStorage.getItem('vbAuth')
      if (vbAuth) {
        const parsed = JSON.parse(vbAuth)
        setHasChangedPassword(parsed.has_changed_password || parsed.metadata?.has_changed_password || false)
      } else {
        setHasChangedPassword(false)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return hasChangedPassword
}

// Hook to access features
export const useFeatures = () => {
  const [features, setFeatures] = useState<string[]>(() => {
    // Check osAuth first
    const osAuth = localStorage.getItem('osAuth')
    if (osAuth) {
      return JSON.parse(osAuth).features || []
    }
    
    // Fallback to vbAuth
    const vbAuth = localStorage.getItem('vbAuth')
    if (vbAuth) {
      const parsed = JSON.parse(vbAuth)
      return parsed.features || []
    }
    
    return []
  })

  useEffect(() => {
    const handleStorageChange = () => {
      // Check osAuth first
      const osAuth = localStorage.getItem('osAuth')
      if (osAuth) {
        setFeatures(JSON.parse(osAuth).features || [])
        return
      }
      
      // Fallback to vbAuth
      const vbAuth = localStorage.getItem('vbAuth')
      if (vbAuth) {
        const parsed = JSON.parse(vbAuth)
        setFeatures(parsed.features || [])
      } else {
        setFeatures([])
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return features
}

// Hook to access sidebar links
export const useSidebarLinks = () => {
  const [sidebarLinks, setSidebarLinks] = useState<any[]>(() => {
    // Check osAuth first
    const osAuth = localStorage.getItem('osAuth')
    if (osAuth) {
      return JSON.parse(osAuth).sidebarLinks || []
    }
    
    // No fallback for vbAuth as it doesn't contain sidebarLinks
    return []
  })

  useEffect(() => {
    const handleStorageChange = () => {
      // Check osAuth first
      const osAuth = localStorage.getItem('osAuth')
      if (osAuth) {
        setSidebarLinks(JSON.parse(osAuth).sidebarLinks || [])
      } else {
        setSidebarLinks([])
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return sidebarLinks
}

// Hook to access subscription data
export const useSubscription = () => {
  const [subscription, setSubscription] = useState<any>(() => {
    // Check osAuth first
    const osAuth = localStorage.getItem('osAuth')
    if (osAuth) {
      return JSON.parse(osAuth).subscription || {}
    }
    
    // Fallback to vbAuth
    const vbAuth = localStorage.getItem('vbAuth')
    if (vbAuth) {
      const parsed = JSON.parse(vbAuth)
      return parsed.subscription || {}
    }
    
    return {}
  })

  useEffect(() => {
    const handleStorageChange = () => {
      // Check osAuth first
      const osAuth = localStorage.getItem('osAuth')
      if (osAuth) {
        setSubscription(JSON.parse(osAuth).subscription || {})
        return
      }
      
      // Fallback to vbAuth
      const vbAuth = localStorage.getItem('vbAuth')
      if (vbAuth) {
        const parsed = JSON.parse(vbAuth)
        setSubscription(parsed.subscription || {})
      } else {
        setSubscription({})
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return subscription
}

// Hook to access business data
export const useBusinessData = () => {
  const [business, setBusiness] = useState<any>(() => {
    // Check osAuth first
    const osAuth = localStorage.getItem('osAuth')
    if (osAuth) {
      return JSON.parse(osAuth).business || {}
    }
    
    // Fallback to vbAuth
    const vbAuth = localStorage.getItem('vbAuth')
    if (vbAuth) {
      const parsed = JSON.parse(vbAuth)
      return parsed.business || {}
    }
    
    return {}
  })

  useEffect(() => {
    const handleStorageChange = () => {
      // Check osAuth first
      const osAuth = localStorage.getItem('osAuth')
      if (osAuth) {
        setBusiness(JSON.parse(osAuth).business || {})
        return
      }
      
      // Fallback to vbAuth
      const vbAuth = localStorage.getItem('vbAuth')
      if (vbAuth) {
        const parsed = JSON.parse(vbAuth)
        setBusiness(parsed.business || {})
      } else {
        setBusiness({})
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return business
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
