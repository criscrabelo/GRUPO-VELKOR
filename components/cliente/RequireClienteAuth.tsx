'use client'

import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { LoginForm } from './LoginForm'

export function RequireClienteAuth({
  children,
}: {
  children: (session: Session) => React.ReactNode
}) {
  const [session, setSession] = useState<Session | null | undefined>(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page text-ink-tertiary text-sm">
        Verificando sessão...
      </div>
    )
  }

  if (session === null) {
    return <LoginForm />
  }

  return <>{children(session)}</>
}
