"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface Session {
  id: string
  email: string
}

interface SessionContextType {
  session: Session | null
  loading: boolean
  checkSession: () => Promise<void>
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  loading: true,
  checkSession: async () => { },
})

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const checkSession = async () => {
    try {
      const res = await fetch("/api/admin/session")
      if (res.ok) {
        const data = await res.json()
        setSession(data.session)
      } else {
        setSession(null)
      }
    } catch (error) {
      console.error("Session check failed:", error)
      setSession(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkSession()
  }, [])

  return (
    <SessionContext.Provider value={{ session, loading, checkSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  return useContext(SessionContext)
}
