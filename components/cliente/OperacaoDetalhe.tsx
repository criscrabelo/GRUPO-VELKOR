'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, LogOut, AlertTriangle, CheckCircle2, Upload } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { VelkorLogo } from '@/components/landing/VelkorLogo'
import { EnviarDocumentoModal } from './EnviarDocumentoModal'
import {
  tagOperacao,
  TAG_LABEL,
  type OperacaoRow,
  type PendenciaRow,
  type HistoricoEventoRow,
  type VencimentoRow,
} from '@/lib/types-db'

const STATUS_PENDENCIA_LABEL: Record<PendenciaRow['status'], string> = {
  aberta: 'Aguardando envio',
  em_conferencia: 'Em conferência pela Velkor',
  resolvida: 'Resolvida',
  devolvida: 'Devolvida — novo envio necessário',
}

export function OperacaoDetalhe({ userId, operacaoId }: { userId: string; operacaoId: string }) {
  const [operacao, setOperacao] = useState<OperacaoRow | null | undefined>(undefined)
  const [pendencias, setPendencias] = useState<PendenciaRow[]>([])
  const [historico, setHistorico] = useState<HistoricoEventoRow[]>([])
  const [vencimentos, setVencimentos] = useState<VencimentoRow[]>([])
  const [pendenciaParaEnvio, setPendenciaParaEnvio] = useState<PendenciaRow | null>(null)

  const carregar = useCallback(async () => {
    const [opRes, pendRes, histRes, vencRes] = await Promise.all([
      supabase.from('operacoes').select('*').eq('id', operacaoId).eq('cliente_user_id', userId).maybeSingle(),
      supabase.from('pendencias').select('*').eq('operacao_id', operacaoId).order('criado_em'),
      supabase
        .from('historico_eventos')
        .select('*')
        .eq('operacao_id', operacaoId)
        .order('criado_em', { ascending: false }),
      supabase.from('vencimentos').select('*').eq('operacao_id', operacaoId).order('vence_em'),
    ])

    setOperacao(opRes.data ?? null)
    setPendencias(pendRes.data ?? [])
    setHistorico(histRes.data ?? [])
    setVencimentos(vencRes.data ?? [])
  }, [userId, operacaoId])

  useEffect(() => {
    carregar()
  }, [carregar])

  if (operacao === undefined) {
    return <div className="min-h-screen flex items-center justify-center text-ink-tertiary text-sm">Carregando...</div>
  }

  if (operacao === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-ink-secondary">Operação não encontrada, ou você não tem acesso a ela.</p>
        <Link href="/cliente" className="text-teal-action font-bold">
          Voltar para o painel
        </Link>
      </div>
    )
  }

  const tag = tagOperacao(pendencias)
  const pendenciasCliente = pendencias.filter((p) => p.responsavel === 'cliente')
  const pendenciasVelkor = pendencias.filter((p) => p.responsavel === 'velkor')

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
        <Link
          href="/cliente"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-secondary hover:text-teal-action mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        <div className="flex items-center justify-between gap-3 mb-2">
          <h1 className="heading-serif text-2xl font-bold text-ink-primary">{operacao.nome}</h1>
          <span
            className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 ${
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
        {operacao.responsavel_nome && (
          <p className="text-sm text-ink-tertiary mb-8">
            Responsável Velkor: {operacao.responsavel_nome}
          </p>
        )}

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-ink-secondary font-medium">Progresso documental</span>
            <span className="font-bold text-ink-primary">{operacao.progresso_pct}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={operacao.progresso_pct}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-2 rounded-full bg-border overflow-hidden"
          >
            <div className="h-full bg-cyan-brand" style={{ width: `${operacao.progresso_pct}%` }} />
          </div>
        </div>

        <div className="grid nav:grid-cols-3 gap-8 mt-10">
          <div className="nav:col-span-2 space-y-8">
            <section>
              <h2 className="font-bold text-sm uppercase tracking-wider text-ink-tertiary mb-4">
                Pendências com você
              </h2>
              {pendenciasCliente.length === 0 ? (
                <p className="text-sm text-ink-tertiary">Nenhuma pendência com você no momento.</p>
              ) : (
                <ul className="space-y-3">
                  {pendenciasCliente.map((p) => {
                    const podeEnviar = p.status === 'aberta' || p.status === 'devolvida'
                    return (
                      <li
                        key={p.id}
                        className="rounded-card border border-attention-border bg-attention-bg p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-bold text-attention-text mb-1">{p.nome}</p>
                            {p.nota && <p className="text-sm text-attention-text/80 mb-1">{p.nota}</p>}
                            <p className="text-xs text-attention-text/70 font-medium">
                              {STATUS_PENDENCIA_LABEL[p.status]}
                            </p>
                          </div>
                          {podeEnviar && (
                            <button
                              type="button"
                              onClick={() => setPendenciaParaEnvio(p)}
                              className="shrink-0 inline-flex items-center gap-1.5 rounded-button bg-teal-institutional text-white text-sm font-bold px-3.5 py-2 hover:bg-teal-institutional/90 transition-colors min-h-[40px]"
                            >
                              <Upload className="w-3.5 h-3.5" /> Enviar
                            </button>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>

            <section>
              <h2 className="font-bold text-sm uppercase tracking-wider text-ink-tertiary mb-4">
                Com a Velkor
              </h2>
              {pendenciasVelkor.length === 0 ? (
                <p className="text-sm text-ink-tertiary">Nenhuma pendência com a Velkor no momento.</p>
              ) : (
                <ul className="space-y-3">
                  {pendenciasVelkor.map((p) => (
                    <li key={p.id} className="rounded-card border border-border bg-surface p-4">
                      <p className="font-bold text-ink-primary mb-1">{p.nome}</p>
                      {p.nota && <p className="text-sm text-ink-secondary">{p.nota}</p>}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section>
              <h2 className="font-bold text-sm uppercase tracking-wider text-ink-tertiary mb-4">
                Histórico
              </h2>
              {historico.length === 0 ? (
                <p className="text-sm text-ink-tertiary">Nenhum evento registrado ainda.</p>
              ) : (
                <ul className="space-y-4">
                  {historico.map((h) => (
                    <li key={h.id} className="flex gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-brand shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-ink-primary font-medium">{h.titulo}</p>
                        <p className="text-xs text-ink-tertiary">
                          {new Date(h.criado_em).toLocaleDateString('pt-BR')} · {h.autor}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          <aside className="space-y-4">
            <div className="rounded-card border border-border bg-surface p-5">
              <h3 className="font-bold text-sm uppercase tracking-wider text-ink-tertiary mb-4">
                Próximos vencimentos
              </h3>
              {vencimentos.length === 0 ? (
                <p className="text-sm text-ink-tertiary">Nenhum vencimento cadastrado.</p>
              ) : (
                <ul className="space-y-3">
                  {vencimentos.map((v) => (
                    <li key={v.id} className="text-sm">
                      <p className={`font-bold ${v.urgente ? 'text-attention-text' : 'text-ink-primary'}`}>
                        {v.nome}
                      </p>
                      <p className="text-xs text-ink-tertiary">
                        {v.responsavel === 'cliente' ? 'Pagamento pelo cliente' : 'Etapa Velkor'}
                        {v.vence_em && ` · ${new Date(v.vence_em).toLocaleDateString('pt-BR')}`}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-start gap-2 rounded-card border border-attention-border bg-attention-bg p-4 text-xs text-attention-text">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              Etapas que dependem de cartórios, prefeituras ou bancos seguem o tempo desses órgãos
              e podem variar.
            </div>
          </aside>
        </div>
      </main>

      {pendenciaParaEnvio && (
        <EnviarDocumentoModal
          userId={userId}
          operacaoId={operacaoId}
          pendenciaId={pendenciaParaEnvio.id}
          onFechar={() => setPendenciaParaEnvio(null)}
          onEnviado={() => {
            setPendenciaParaEnvio(null)
            carregar()
          }}
        />
      )}
    </div>
  )
}
