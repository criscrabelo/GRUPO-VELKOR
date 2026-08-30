'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LogOut, FileStack, Clock, ListChecks, User as UserIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { VelkorLogo } from '@/components/landing/VelkorLogo'
import {
  tagOperacao,
  TAG_LABEL,
  type OperacaoRow,
  type PendenciaRow,
  type VencimentoRow,
} from '@/lib/types-db'

interface OperacaoComRelacionados extends OperacaoRow {
  pendencias: PendenciaRow[]
}

export function VisaoGeral({ userId, email }: { userId: string; email: string }) {
  const [operacoes, setOperacoes] = useState<OperacaoComRelacionados[] | null>(null)
  const [totalDocumentos, setTotalDocumentos] = useState<number | null>(null)
  const [proximoVencimento, setProximoVencimento] = useState<VencimentoRow | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false

    async function carregar() {
      const [opsRes, docsRes, vencRes] = await Promise.all([
        supabase
          .from('operacoes')
          .select('*, pendencias(*)')
          .eq('cliente_user_id', userId)
          .order('atualizado_em', { ascending: false }),
        supabase
          .from('documentos')
          .select('id', { count: 'exact', head: true })
          .eq('cliente_user_id', userId),
        supabase
          .from('vencimentos')
          .select('*')
          .eq('cliente_user_id', userId)
          .order('vence_em', { ascending: true })
          .limit(1),
      ])

      if (cancelado) return

      if (opsRes.error || docsRes.error || vencRes.error) {
        setErro('Não foi possível carregar seus dados agora. Tente novamente em instantes.')
        return
      }

      setOperacoes((opsRes.data as OperacaoComRelacionados[]) ?? [])
      setTotalDocumentos(docsRes.count ?? 0)
      setProximoVencimento(vencRes.data?.[0] ?? null)
    }

    carregar()
    return () => {
      cancelado = true
    }
  }, [userId])

  const ativas = operacoes?.filter((o) => tagOperacao(o.pendencias) !== 'concluida').length ?? 0
  const comVoce =
    operacoes?.filter((o) => tagOperacao(o.pendencias) === 'aguardando_voce').length ?? 0

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

      <main className="container mx-auto px-4 py-10 max-w-4xl">
        <p className="section-label text-teal-action mb-2">Área do cliente</p>
        <h1 className="heading-serif text-2xl font-bold text-ink-primary mb-1 flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-ink-tertiary" /> {email}
        </h1>
        {comVoce > 0 && (
          <p className="text-attention-text text-sm font-medium mb-6" aria-live="polite">
            Você tem {comVoce} {comVoce === 1 ? 'pendência aguardando' : 'pendências aguardando'} sua
            ação.
          </p>
        )}

        {erro && (
          <div className="rounded-card border border-red-200 bg-red-50 text-red-700 text-sm p-4 mb-6">
            {erro}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="rounded-card border border-border bg-surface p-4">
            <ListChecks className="w-5 h-5 text-cyan-brand mb-2" />
            <span className="block heading-serif text-2xl font-bold text-ink-primary">
              {operacoes === null ? '—' : ativas}
            </span>
            <span className="text-xs text-ink-tertiary">Operações ativas</span>
          </div>
          <div className="rounded-card border border-border bg-surface p-4">
            <Clock className="w-5 h-5 text-attention-text mb-2" />
            <span className="block heading-serif text-2xl font-bold text-ink-primary">
              {operacoes === null ? '—' : comVoce}
            </span>
            <span className="text-xs text-ink-tertiary">Com você</span>
          </div>
          <div className="rounded-card border border-border bg-surface p-4">
            <Clock className="w-5 h-5 text-teal-action mb-2" />
            <span className="block heading-serif text-lg font-bold text-ink-primary">
              {proximoVencimento?.vence_em
                ? new Date(proximoVencimento.vence_em).toLocaleDateString('pt-BR')
                : '—'}
            </span>
            <span className="text-xs text-ink-tertiary">Próximo vencimento</span>
          </div>
          <div className="rounded-card border border-border bg-surface p-4">
            <FileStack className="w-5 h-5 text-cyan-brand mb-2" />
            <span className="block heading-serif text-2xl font-bold text-ink-primary">
              {totalDocumentos ?? '—'}
            </span>
            <span className="text-xs text-ink-tertiary">Documentos no dossiê</span>
          </div>
        </div>

        <h2 className="font-bold text-sm uppercase tracking-wider text-ink-tertiary mb-4">
          Suas operações
        </h2>

        {operacoes === null ? (
          <p className="text-ink-tertiary text-sm">Carregando...</p>
        ) : operacoes.length === 0 ? (
          <div className="rounded-card border border-dashed border-border bg-surface p-8 text-center">
            <p className="text-ink-secondary font-medium mb-1">
              Nenhuma operação por aqui ainda.
            </p>
            <p className="text-sm text-ink-tertiary mb-4">
              Quando você contratar um serviço, a operação aparece aqui automaticamente.
            </p>
            <Link
              href="/#solucoes"
              className="inline-flex rounded-button bg-cyan-brand text-teal-institutional font-bold text-sm px-5 py-3 hover:bg-cyan-brand/90 transition-colors min-h-[44px] items-center"
            >
              Ver soluções
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {operacoes.map((op) => {
              const tag = tagOperacao(op.pendencias)
              return (
                <li key={op.id}>
                  <Link
                    href={`/cliente/operacoes/${op.id}`}
                    className="block rounded-card border border-border bg-surface p-5 hover:border-cyan-brand transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="font-bold text-ink-primary">{op.nome}</span>
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          tag === 'concluida'
                            ? 'bg-success/10 text-success'
                            : tag === 'aguardando_voce'
                              ? 'bg-attention-bg text-attention-text'
                              : 'bg-cyan-light/30 text-teal-action'
                        }`}
                      >
                        {TAG_LABEL[tag]}
                      </span>
                    </div>
                    <p className="text-sm text-ink-secondary mb-3">
                      {op.servicos.join(' · ') || op.familia}
                    </p>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full bg-cyan-brand"
                        style={{ width: `${op.progresso_pct}%` }}
                      />
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </main>
    </div>
  )
}
