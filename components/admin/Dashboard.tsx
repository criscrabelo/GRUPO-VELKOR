'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { LogOut, ListChecks, Clock, AlertTriangle, DollarSign } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { VelkorLogo } from '@/components/landing/VelkorLogo'
import { tagOperacaoAdmin, type OperacaoRow, type PendenciaRow, type EquipeVelkorRow } from '@/lib/types-db'
import { OperacoesTab, type OperacaoComTag } from './tabs/OperacoesTab'
import { ClientesTab } from './tabs/ClientesTab'
import { FunilTab } from './tabs/FunilTab'

interface OperacaoComPendencias extends OperacaoRow {
  pendencias: PendenciaRow[]
}

type Aba = 'operacoes' | 'clientes' | 'funil'

const ABAS: { key: Aba; label: string }[] = [
  { key: 'operacoes', label: 'Operações' },
  { key: 'clientes', label: 'Clientes' },
  { key: 'funil', label: 'Funil e resultado' },
]

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function Dashboard({ equipe }: { equipe: EquipeVelkorRow }) {
  const [operacoes, setOperacoes] = useState<OperacaoComPendencias[] | null>(null)
  const [aba, setAba] = useState<Aba>('operacoes')
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

  const operacoesComTag: OperacaoComTag[] | null = useMemo(
    () => (operacoes === null ? null : operacoes.map((op) => ({ ...op, tag: tagOperacaoAdmin(op.pendencias) }))),
    [operacoes],
  )

  const kpis = useMemo(() => {
    const lista = operacoesComTag ?? []
    const ativas = lista.filter((o) => o.tag !== 'concluida').length
    const conferencia = lista.filter((o) => o.tag === 'conferir_envio').length
    const travadas = lista.filter((o) => o.tag === 'travada_cliente').length
    const inicioMes = new Date()
    inicioMes.setDate(1)
    inicioMes.setHours(0, 0, 0, 0)
    const receitaMes = lista
      .filter((o) => new Date(o.criado_em) >= inicioMes)
      .reduce((acc, o) => acc + (o.valor ?? 0), 0)
    return { ativas, conferencia, travadas, receitaMes }
  }, [operacoesComTag])

  async function aprovar(pendenciaId: string, nome: string, operacaoId: string) {
    await supabase
      .from('pendencias')
      .update({ status: 'resolvida', atualizado_em: new Date().toISOString() })
      .eq('id', pendenciaId)
    await supabase.from('historico_eventos').insert({
      operacao_id: operacaoId,
      cliente_user_id: operacoesComTag?.find((o) => o.id === operacaoId)?.cliente_user_id,
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
      cliente_user_id: operacoesComTag?.find((o) => o.id === operacaoId)?.cliente_user_id,
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

        <div className="flex gap-1 border-b border-border mb-6" role="tablist" aria-label="Seções do painel">
          {ABAS.map((a) => (
            <button
              key={a.key}
              type="button"
              role="tab"
              aria-selected={aba === a.key}
              aria-current={aba === a.key ? 'page' : undefined}
              onClick={() => setAba(a.key)}
              className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
                aba === a.key
                  ? 'border-teal-institutional text-teal-institutional'
                  : 'border-transparent text-ink-tertiary hover:text-ink-secondary'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>

        {aba === 'operacoes' && (
          <OperacoesTab operacoes={operacoesComTag} onAprovar={aprovar} onDevolver={devolver} />
        )}
        {aba === 'clientes' && <ClientesTab operacoes={operacoesComTag} />}
        {aba === 'funil' && <FunilTab operacoes={operacoesComTag} />}
      </main>
    </div>
  )
}
