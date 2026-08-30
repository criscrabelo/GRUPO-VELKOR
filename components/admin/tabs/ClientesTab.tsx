'use client'

import { useMemo } from 'react'
import type { OperacaoComTag } from './OperacoesTab'

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function ClientesTab({ operacoes }: { operacoes: OperacaoComTag[] | null }) {
  const clientes = useMemo(() => {
    const porCliente = new Map<
      string,
      {
        userId: string
        email: string
        operacoes: number
        total: number
        pendenciasAbertas: number
        ultimaAtualizacao: string
      }
    >()

    for (const op of operacoes ?? []) {
      const chave = op.cliente_user_id
      const atual = porCliente.get(chave)
      const pendenciasAbertas = op.pendencias.filter((p) => p.status !== 'resolvida').length

      if (!atual) {
        porCliente.set(chave, {
          userId: chave,
          email: op.cliente_email ?? 'Sem e-mail registrado',
          operacoes: 1,
          total: op.valor ?? 0,
          pendenciasAbertas,
          ultimaAtualizacao: op.atualizado_em,
        })
      } else {
        atual.operacoes += 1
        atual.total += op.valor ?? 0
        atual.pendenciasAbertas += pendenciasAbertas
        if (new Date(op.atualizado_em) > new Date(atual.ultimaAtualizacao)) {
          atual.ultimaAtualizacao = op.atualizado_em
        }
      }
    }

    return Array.from(porCliente.values()).sort((a, b) => b.total - a.total)
  }, [operacoes])

  if (operacoes === null) {
    return <p className="text-ink-tertiary text-sm">Carregando...</p>
  }

  if (clientes.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-border bg-surface p-8 text-center text-ink-secondary">
        Nenhum cliente com operação registrada ainda.
      </div>
    )
  }

  return (
    <div className="rounded-card border border-border bg-surface overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-page text-left text-xs font-bold uppercase tracking-wider text-ink-tertiary">
            <tr>
              <th className="px-5 py-3">Cliente</th>
              <th className="px-5 py-3">Operações</th>
              <th className="px-5 py-3">Total contratado</th>
              <th className="px-5 py-3">Pendências abertas</th>
              <th className="px-5 py-3">Última atualização</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {clientes.map((c) => (
              <tr key={c.userId}>
                <td className="px-5 py-4 font-medium text-ink-primary">{c.email}</td>
                <td className="px-5 py-4 text-ink-secondary">{c.operacoes}</td>
                <td className="px-5 py-4 text-ink-secondary">{formatBRL(c.total)}</td>
                <td className="px-5 py-4">
                  {c.pendenciasAbertas > 0 ? (
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-attention-bg text-attention-text">
                      {c.pendenciasAbertas}
                    </span>
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-success/10 text-success">
                      0
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-ink-tertiary">
                  {new Date(c.ultimaAtualizacao).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
