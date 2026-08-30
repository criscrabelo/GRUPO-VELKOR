'use client'

import { LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { VelkorLogo } from '@/components/landing/VelkorLogo'

export function PainelPlaceholder({ email }: { email: string }) {
  return (
    <div className="min-h-screen bg-page">
      <header className="bg-teal-institutional text-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <VelkorLogo heightClassName="h-8 brightness-0 invert" />
          </Link>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-white/90 hover:text-white min-h-[44px] px-2"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <p className="section-label text-teal-action mb-3">Sessão autenticada</p>
        <h1 className="heading-serif text-2xl font-bold text-ink-primary mb-2">
          Olá, {email}
        </h1>
        <p className="text-ink-secondary mb-6">
          Seu login é real (Supabase Auth, sessão válida) — mas a área do cliente em si
          (operações, pendências, documentos, dossiê digital) ainda está em construção. Assim que
          estiver pronta, você vai acompanhar tudo aqui, sem precisar entrar novamente.
        </p>
        <div className="rounded-card border border-attention-border bg-attention-bg p-5 text-sm text-attention-text">
          Nenhuma operação real está vinculada à sua conta ainda. Esta tela existe apenas para
          confirmar que o login funciona de ponta a ponta.
        </div>
      </main>
    </div>
  )
}
