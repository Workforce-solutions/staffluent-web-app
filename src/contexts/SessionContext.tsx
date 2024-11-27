/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useShortCode } from '@/hooks/use-local-storage.js'
import { useAuthRefreshMutation } from '@/services/authApi.js'
import { Session } from '@supabase/supabase-js'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import supabase from '../supabaseClient.js'

interface SessionContextType {
  session: Session | null
  loading: boolean
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

interface SessionProviderProps {
  children: ReactNode
}

interface SessionProviderProps {
  children: ReactNode
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [authRefresh] = useAuthRefreshMutation()

  const venue_short_code = useShortCode()
  const expires_at = localStorage.getItem('expires_at')
  const newExpiresAt = expires_at ? Number(expires_at) : 0

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      localStorage.removeItem('adminToken')
      localStorage.removeItem('vbAuth')
      localStorage.removeItem('accountType')
      localStorage.removeItem('refreshToken')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession({ ...session, expires_at: newExpiresAt })
      }
      setLoading(false)
    })

    if (newExpiresAt > 0) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session) {
          const currentTime = Math.floor(Date.now() / 1000)
          const bufferTime = 300

          if (currentTime >= newExpiresAt - bufferTime) {
            const newExpiresAt = Math.floor(Date.now() / 1000) + 60 * 60

            try {
              const res = await authRefresh({
                venue_short_code,
              }).unwrap()

              setSession({
                ...session,
                access_token: res.access_token,
                refresh_token: res.refresh_token,
                expires_at: newExpiresAt,
              })

              localStorage.setItem('refreshToken', res.refresh_token)
              localStorage.setItem('adminToken', res.access_token ?? res.token)
              localStorage.setItem('expires_at', String(newExpiresAt))
            } catch {
              supabase.auth.signOut()
              setSession(null)
            }
          } else {
            setSession({ ...session, expires_at: newExpiresAt })
          }
        } else {
          setSession(null)
        }
      })

      return () => subscription.unsubscribe()
    } else {
      handleLogout()
    }
  }, [authRefresh, venue_short_code, newExpiresAt])

  return (
    <SessionContext.Provider value={{ session, loading }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}
