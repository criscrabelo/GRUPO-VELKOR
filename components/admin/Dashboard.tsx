'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { LogOut, ListChecks, Clock, AlertTriangle, DollarSign, ChevronDown, Check, Undo2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { VelkorLogo } from '@/components/landing/VelkorLogo'
import {
  tagOperacaoAdmin,
  TAG_ADMIN_LABEL,
  type OperacaoRow,
  type PendenciaRow,
  type EquipeVelkorRow,
  type OperacaoTagAdmin,
} from '@/lib/types-db'

interface OperacaoComPendencias extends OperacaoRow {
  pendencias: PendenciaRow[]
}

type Filtro = 'todas' | OperacaoTagAdmin

const FILTROS: { key: Filtro; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'travada_cliente', label: 'Travadas com o cliente' },
  { key: 'conferir_envio', label: 'Aguardando conferência' },
  { key: 'concluida', label: 'Concluídas' },
]

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function Dashboard({ equipe }: { equipe: EquipeVelkorRow }) {
  const [operacoes, setOperacoes] = useState<OperacaoComPendencias[] | null>(null)
  const [filtro, setFiltro] = useState<Filtro>('todas')
  const [expandida, setExpandida] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  const carregar = useCallback(async () => {
    const { data, error } = await supabase
      .from('operacoes')
      .select('*, pendencias(*)')
      .order('atualizado_em', { ascending: false })

    if (error) {
      setErro('Não foi possível carregar as operações agora.')
      return
    }
    setErro(null)
    setOperacoes((data as OperacaoComPendencias[]) ?? [])
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

  const operacoesComTag = useMemo(
    () => (operacoes ?? []).map((op) => ({ ...op, tag: tagOperacaoAdmin(op.pendencias) })),
    [operacoes],
  )

  const kpis = useMemo(() => {
    const ativas = operacoesComTag.filter((o) => o.tag !== 'concluida').length
    const conferencia = operacoesComTag.filter((o) => o.tag === 'conferir_envio').length
    const travadas = operacoesComTag.filter((o) => o.tag === 'travada_cliente').length
    const inicioMes = new Date()
    inicioMes.setDate(1)
    inicioMes.setHours(0, 0, 0, 0)
    const receitaMes = operacoesComTag
      .filter((o) => new Date(o.criado_em) >= inicioMes)
      .reduce((acc, o) => acc + (o.valor ?? 0), 0)
    return { ativas, conferencia, travadas, receitaMes }
  }, [operacoesComTag])

  const filtradas = operacoesComTag.filter((o) => filtro === 'todas' || o.tag === filtro)

  async function aprovar(pendenciaId: string, nome: string, operacaoId: string) {
    await supabase
      .from('pendencias')
      .update({ status: 'resolvida', atualizado_em: new Date().toISOString() })
      .eq('id', pendenciaId)
    await supabase.from('historico_eventos').insert({
      operacao_id: operacaoId,
      cliente_user_id: operacoesComTag.find((o) => o.id === operacaoId)?.cliente_user_id,
      titulo: `Pendência aprovada: ${nome}`,
      autor: `${equipe.nome} · Velkor`,
    })
    carregar()
  }

  async function devolver(pendenciaId: string, nome: string, operacaoId: string) {
    await supabase
      .from('pendencias')
      .update({
        status: 'devolvida',
        nota: 'Devolvido ao cliente para novo envio',
        atualizado_em: new Date().toISOString(),
      })
      .eq('id', pendenciaId)
    await supabase.from('historico_eventos').insert({
      operacao_id: operacaoId,
      cliente_user_id: operacoesComTag.find((o) => o.id === operacaoId)?.cliente_user_id,
      titulo: `Pendência devolvida ao cliente: ${nome}`,
      autor: `${equipe.nome} · Velkor`,
    })
    carregar()
  }

  return (
    <div className="min-h-screen bg-page">
      <header className="bg-teal-institutional text-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <VelkorLogo heightClassName="h-8 brightness-0 invert" />
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/70">
              {equipe.nome} · {equipe.papel}
            </span>
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-white/90 hover:text-white min-h-[44px] px-2"
            >
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <p className="section-label text-teal-action mb-2">Painel administrativo</p>
        <h1 className="heading-serif text-2xl font-bold text-ink-primary mb-6">Operações</h1>

        {erro && (
          <div className="rounded-card border border-red-200 bg-red-50 text-red-700 text-sm p-4 mb-6">
            {erro}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="rounded-card border border-border bg-surface p-4">
            <ListChecks className="w-5 h-5 text-cyan-brand mb-2" />
            <span className="block heading-serif text-2xl font-bold text-ink-primary">
              {operacoes === null ? '—' : kpis.ativas}
            </span>
            <span className="text-xs text-ink-tertiary">Operações ativas</span>
          </div>
          <div className="rounded-card border border-border bg-surface p-4">
            <Clock className="w-5 h-5 text-teal-action mb-2" />
            <span className="block heading-serif text-2xl font-bold text-ink-primary">
              {operacoes === null ? '—' : kpis.conferencia}
            </span>
            <span className="text-xs text-ink-tertiary">Aguardando conferência</span>
          </div>
          <div className="rounded-card border border-border bg-surface p-4">
            <AlertTriangle className="w-5 h-5 text-attention-text mb-2" />
            <span className="block heading-serif text-2xl font-bold text-ink-primary">
              {operacoes === null ? '—' : kpis.travadas}
            </span>
            <span className="text-xs text-ink-tertiary">Travadas com o cliente</span>
          </div>
          <div className="rounded-card border border-border bg-surface p-4">
            <DollarSign className="w-5 h-5 text-success mb-2" />
            <span className="block heading-serif text-lg font-bold text-ink-primary">
              {operacoes === null ? '—' : formatBRL(kpis.receitaMes)}
            </span>
            <span className="text-xs text-ink-tertiary">Receita contratada no mês</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filtrar operações">
          {FILTROS.map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={filtro === f.key}
              onClick={() => setFiltro(f.key)}
              className={`rounded-full px-4 py-2 text-sm font-bold border transition-colors ${
                filtro === f.key
                  ? 'bg-teal-institutional text-white border-teal-institutional'
                  : 'bg-surface text-ink-secondary border-border hover:border-teal-action/40'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="rounded-full px-4 py-2 text-sm font-medium text-ink-tertiary border border-dashed border-border cursor-not-allowed">
            Fora do prazo (requer SLA por serviço, ainda não implementado)
          </span>
        </div>

        {operacoes === null ? (
          <p className="text-ink-tertiary text-sm">Carregando...</p>
        ) : filtradas.length === 0 ? (
          <div className="rounded-card border border-dashed border-border bg-surface p-8 text-center text-ink-secondary">
            Nenhuma operação encontrada para este filtro.
          </div>
        ) : (
          <ul className="space-y-3">
            {filtradas.map((op) => {
              const aberta = expandida === op.id
              const comVelkor = op.pendencias.filter((p) => p.responsavel === 'velkor' && p.status !== 'resolvida')
              const comCliente = op.pendencias.filter(
                (p) => p.responsavel === 'cliente' && (p.status === 'aberta' || p.status === 'devolvida'),
              )
              const conferir = op.pendencias.filter((p) => p.status === 'em_conferencia')

              return (
                <li key={op.id} className="rounded-card border border-border bg-surface overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setExpandida(aberta ? null : op.id)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  >
                    <div>
                      <p className="font-bold text-ink-primary">{op.nome}</p>
                      <p className="text-sm text-ink-tertiary">
                        {op.cliente_email ?? 'Cliente sem e-mail registrado'} · {op.progresso_pct}%
                        {op.valor !== null && ` · ${formatBRL(op.valor)}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          op.tag === 'concluida'
                            ? 'bg-success/10 text-success'
                            : op.tag === 'travada_cliente'
                              ? 'bg-attention-bg text-attention-text'
                              : op.tag === 'conferir_envio'
                                ? 'bg-cyan-light/30 text-teal-action'
                                : 'bg-page text-ink-tertiary'
                        }`}
                      >
                        {TAG_ADMIN_LABEL[op.tag]}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-ink-tertiary transition-transform ${aberta ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {aberta && (
                    <div className="border-t border-border p-5 grid sm:grid-cols-3 gap-5 bg-page">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-ink-tertiary mb-3">
                          Com a Velkor
                        </h4>
                        {comVelkor.length === 0 ? (
                          <p className="text-xs text-ink-tertiary">Nenhuma</p>
                        ) : (
                          <ul className="space-y-2">
                            {comVelkor.map((p) => (
                              <li key={p.id} className="text-sm bg-surface rounded-button p-3 border border-border">
                                {p.nome}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-ink-tertiary mb-3">
                          Com o cliente
                        </h4>
                        {comCliente.length === 0 ? (
                          <p className="text-xs text-ink-tertiary">Nenhuma</p>
                        ) : (
                          <ul className="space-y-2">
                            {comCliente.map((p) => (
                              <li
                                key={p.id}
                                className="text-sm bg-attention-bg text-attention-text rounded-button p-3 border border-attention-border"
                              >
                                {p.nome}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-ink-tertiary mb-3">
                          Conferir envio
                        </h4>
                        {conferir.length === 0 ? (
                          <p className="text-xs text-ink-tertiary">Nenhuma</p>
                        ) : (
                          <ul className="space-y-2">
                            {conferir.map((p) => (
                              <li key={p.id} className="text-sm bg-surface rounded-button p-3 border border-cyan-brand/40">
                                <p className="mb-2">{p.nome}</p>
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => aprovar(p.id, p.nome, op.id)}
                                    className="flex-1 inline-flex items-center justify-center gap-1 rounded-button bg-success text-white text-xs font-bold py-2 hover:bg-success/90"
                                  >
                                    <Check className="w-3.5 h-3.5" /> Aprovar
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => devolver(p.id, p.nome, op.id)}
                                    className="flex-1 inline-flex items-center justify-center gap-1 rounded-button border border-attention-border text-attention-text text-xs font-bold py-2 hover:bg-attention-bg"
                                  >
                                    <Undo2 className="w-3.5 h-3.5" /> Devolver
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </main>
    </div>
  )
}
