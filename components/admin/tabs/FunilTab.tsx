'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { OperacaoComTag } from './OperacoesTab'

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const ETAPAS = [
  { tipo: 'visita', label: 'Visitantes do site' },
  { tipo: 'diagnostico_iniciado', label: 'Diagnóstico iniciado' },
  { tipo: 'diagnostico_concluido', label: 'Diagnóstico concluído' },
  { tipo: 'pacote_montado', label: 'Pacote montado' },
  { tipo: 'operacao_contratada', label: 'Operação contratada' },
] as const

export function FunilTab({ operacoes }: { operacoes: OperacaoComTag[] | null }) {
  const [contagens, setContagens] = useState<Record<string, number> | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    async function carregar() {
      const tipos = ['visita', 'diagnostico_iniciado', 'diagnostico_concluido', 'pacote_montado'] as const
      const resultados = await Promise.all(
        tipos.map((tipo) =>
          supabase.from('eventos_funil').select('id', { count: 'exact', head: true }).eq('tipo', tipo),
        ),
      )

      if (resultados.some((r) => r.error)) {
        setErro('Não foi possível carregar os eventos de funil agora.')
        return
      }

      const mapa: Record<string, number> = {}
      tipos.forEach((tipo, i) => {
        mapa[tipo] = resultados[i].count ?? 0
      })
      setContagens(mapa)
    }
    carregar()
  }, [])

  const receitaPorFamilia = useMemo(() => {
    const mapa = new Map<string, number>()
    for (const op of operacoes ?? []) {
      const familia = op.familia ?? 'Sem família definida'
      mapa.set(familia, (mapa.get(familia) ?? 0) + (op.valor ?? 0))
    }
    return Array.from(mapa.entries())
      .map(([familia, valor]) => ({ familia, valor }))
      .sort((a, b) => b.valor - a.valor)
  }, [operacoes])

  const valores: Record<string, number> | null = contagens
    ? { ...contagens, operacao_contratada: operacoes?.length ?? 0 }
    : null

  const maiorValor = valores ? Math.max(1, ...Object.values(valores)) : 1

  return (
    <div className="space-y-8">
      {erro && (
        <div className="rounded-card border border-red-200 bg-red-50 text-red-700 text-sm p-4">{erro}</div>
      )}

      <div>
        <h3 className="font-bold text-sm uppercase tracking-wider text-ink-tertiary mb-1">
          Funil do período
        </h3>
        <p className="text-xs text-ink-tertiary mb-4">
          Contagem real, desde a criação deste painel — sem dado estimado ou histórico anterior.
        </p>

        {valores === null ? (
          <p className="text-ink-tertiary text-sm">Carregando...</p>
        ) : (
          <div className="space-y-3">
            {ETAPAS.map((etapa, i) => {
              const valor = valores[etapa.tipo] ?? 0
              const anterior = i > 0 ? valores[ETAPAS[i - 1].tipo] : null
              const conversao = anterior && anterior > 0 ? Math.round((valor / anterior) * 100) : null
              return (
                <div key={etapa.tipo} className="rounded-card border border-border bg-surface p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-ink-primary">{etapa.label}</span>
                    <span className="text-sm font-bold text-ink-primary">
                      {valor}
                      {conversao !== null && (
                        <span className="text-xs font-normal text-ink-tertiary ml-2">
                          {conversao}% da etapa anterior
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-page overflow-hidden">
                    <div
                      className="h-full bg-cyan-brand"
                      style={{ width: `${Math.max(2, (valor / maiorValor) * 100)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-bold text-sm uppercase tracking-wider text-ink-tertiary mb-1">
          Receita por família de serviço
        </h3>
        <p className="text-xs text-ink-tertiary mb-4">
          Soma do campo &quot;valor&quot; das operações reais registradas — R$ 0,00 enquanto não houver
          operações com valor definido.
        </p>
        {operacoes === null ? (
          <p className="text-ink-tertiary text-sm">Carregando...</p>
        ) : receitaPorFamilia.length === 0 ? (
          <p className="text-ink-tertiary text-sm">Nenhuma operação registrada ainda.</p>
        ) : (
          <div className="space-y-2">
            {receitaPorFamilia.map((r) => (
              <div key={r.familia} className="flex items-center justify-between rounded-button border border-border bg-surface px-4 py-3">
                <span className="text-sm text-ink-primary">{r.familia}</span>
                <span className="text-sm font-bold text-ink-primary">{formatBRL(r.valor)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-card border border-attention-border bg-attention-bg p-4 text-xs text-attention-text">
        Indicadores de impacto (horas economizadas por operação, prazos perdidos, antecedência
        média do alerta, serviços por pacote) exigem marcos de início/conclusão por operação, que
        ainda não são coletados — não exibidos aqui para não estimar um número sem base real.
      </div>
    </div>
  )
}
