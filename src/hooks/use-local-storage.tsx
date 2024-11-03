import { AuthProps } from '@/@types/auth'
import { useEffect, useState } from 'react'

interface LocalStorageProps<T> {
  key: string
  defaultValue: T
}

interface DataAuthProps {
  data: AuthProps
}

export default function useLocalStorage<T>({
  key,
  defaultValue,
}: LocalStorageProps<T>) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue !== null ? (JSON.parse(storedValue) as T) : defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue] as const
}

export const useShortCode = () => {
  const [shortCode, setShortCode] = useState<string>(() => {
    const vbAuth = localStorage.getItem('vbAuth')
    return vbAuth
      ? ((JSON.parse(vbAuth) as DataAuthProps)?.data?.venue?.short_code ?? '')
      : ''
  })

  useEffect(() => {
    const handleStorageChange = () => {
      const vbAuth = localStorage.getItem('vbAuth')
      const newShortCode = vbAuth
        ? ((JSON.parse(vbAuth) as DataAuthProps)?.data?.venue?.short_code ?? '')
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
