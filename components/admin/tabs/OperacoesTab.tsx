'use client'

import { useState } from 'react'
import { ChevronDown, Check, Undo2 } from 'lucide-react'
import { TAG_ADMIN_LABEL, type OperacaoRow, type PendenciaRow, type OperacaoTagAdmin } from '@/lib/types-db'

export interface OperacaoComTag extends OperacaoRow {
  pendencias: PendenciaRow[]
  tag: OperacaoTagAdmin
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

export function OperacoesTab({
  operacoes,
  podeEditar,
  onAprovar,
  onDevolver,
}: {
  operacoes: OperacaoComTag[] | null
  /** false para papel 'leitura': RLS já bloqueia a escrita no banco; aqui só evitamos oferecer uma ação que vai falhar. */
  podeEditar: boolean
  onAprovar: (pendenciaId: string, nome: string, operacaoId: string) => void
  onDevolver: (pendenciaId: string, nome: string, operacaoId: string) => void
}) {
  const [filtro, setFiltro] = useState<Filtro>('todas')
  const [expandida, setExpandida] = useState<string | null>(null)

  const filtradas = (operacoes ?? []).filter((o) => filtro === 'todas' || o.tag === filtro)

  return (
    <div>
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
                              {podeEditar ? (
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => onAprovar(p.id, p.nome, op.id)}
                                    className="flex-1 inline-flex items-center justify-center gap-1 rounded-button bg-success text-white text-xs font-bold py-2 hover:bg-success/90"
                                  >
                                    <Check className="w-3.5 h-3.5" /> Aprovar
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => onDevolver(p.id, p.nome, op.id)}
                                    className="flex-1 inline-flex items-center justify-center gap-1 rounded-button border border-attention-border text-attention-text text-xs font-bold py-2 hover:bg-attention-bg"
                                  >
                                    <Undo2 className="w-3.5 h-3.5" /> Devolver
                                  </button>
                                </div>
                              ) : (
                                <p className="text-xs text-ink-tertiary italic">
                                  Seu papel (leitura) permite apenas visualizar.
                                </p>
                              )}
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
    </div>
  )
}
