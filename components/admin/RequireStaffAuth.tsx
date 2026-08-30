'use client'

import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { LoginForm } from '@/components/auth/LoginForm'
import type { EquipeVelkorRow } from '@/lib/types-db'

export function RequireStaffAuth({
  children,
}: {
  children: (session: Session, equipe: EquipeVelkorRow) => React.ReactNode
}) {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const [equipe, setEquipe] = useState<EquipeVelkorRow | null | undefined>(undefined)

  useEffect(() => {
    let cancelado = false

    async function verificar(s: Session | null) {
      if (!s) {
        if (!cancelado) setEquipe(null)
        return
      }
      const { data } = await supabase
        .from('equipe_velkor')
        .select('*')
        .eq('user_id', s.user.id)
        .eq('ativo', true)
        .maybeSingle()
      if (!cancelado) setEquipe(data ?? null)
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      verificar(data.session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      verificar(newSession)
    })

    return () => {
      cancelado = true
      listener.subscription.unsubscribe()
    }
  }, [])

  if (session === undefined || (session && equipe === undefined)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page text-ink-tertiary text-sm">
        Verificando sessão...
      </div>
    )
  }

  if (session === null) {
    return (
      <LoginForm
        titulo="Painel administrativo"
        faixaTitulo="Painel interno da equipe Velkor."
        faixaTexto="Acesso restrito à equipe. Nunca compartilhe o código recebido por e-mail."
        rodape="Este acesso é exclusivo da equipe Velkor. Dados de clientes aqui exibidos são confidenciais e não devem ser compartilhados fora dos canais internos."
      />
    )
  }

  if (!equipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-center px-4">
        <p className="text-ink-primary font-bold">Acesso restrito</p>
        <p className="text-ink-secondary text-sm max-w-sm">
          Esta conta ({session.user.email}) não tem acesso ao painel administrativo. Se você
          acredita que deveria ter acesso, fale com quem administra a equipe Velkor.
        </p>
        <button
          type="button"
          onClick={() => supabase.auth.signOut()}
          className="text-teal-action font-bold text-sm mt-2"
        >
          Sair
        </button>
      </div>
    )
  }

  return <>{children(session, equipe)}</>
}
