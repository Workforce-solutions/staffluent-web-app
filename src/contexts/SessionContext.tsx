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
  const [loading, setLoading] = useState<boolean>(true)
  const [authRefresh] = useAuthRefreshMutation()

  const venue_short_code = useShortCode()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        const expiresAt = session.expires_at
          ? Number(session.expires_at) * 1000
          : 0
        if (Date.now() > expiresAt) {
          authRefresh({
            venue_short_code,
          })
            .unwrap()
            .then((res) => {
              setSession({
                ...session,
                access_token: res.access_token,
                refresh_token: res.refresh_token,
                expires_at: Math.floor(Date.now() / 1000) + 3600,
              })
              localStorage.setItem('refreshToken', res.refresh_token)
              localStorage.setItem('adminToken', res.access_token ?? res.token)
            })
            .catch(() => {
              supabase.auth.signOut()
              setSession(null)
            })
        } else {
          setSession(session)
        }
      } else {
        setSession(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [authRefresh, venue_short_code])

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
