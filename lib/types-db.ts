// Tipos das tabelas do painel do cliente (schema public, Supabase).
// Mantido manualmente em vez de gerado, pelo tamanho ainda pequeno do schema.

export interface OperacaoRow {
  id: string
  cliente_user_id: string
  nome: string
  familia: string | null
  servicos: string[]
  progresso_pct: number
  responsavel_nome: string | null
  criado_em: string
  atualizado_em: string
}

export interface PendenciaRow {
  id: string
  operacao_id: string
  cliente_user_id: string
  nome: string
  nota: string | null
  responsavel: 'cliente' | 'velkor'
  status: 'aberta' | 'em_conferencia' | 'resolvida' | 'devolvida'
  criado_em: string
  atualizado_em: string
}

export interface DocumentoRow {
  id: string
  operacao_id: string
  cliente_user_id: string
  nome: string
  origem: 'velkor' | 'cliente'
  status: 'conferido' | 'aguarda_pagamento' | 'disponivel' | 'arquivado' | 'em_conferencia'
  storage_path: string | null
  criado_em: string
}

export interface HistoricoEventoRow {
  id: string
  operacao_id: string
  cliente_user_id: string
  titulo: string
  autor: string
  criado_em: string
}

export interface VencimentoRow {
  id: string
  operacao_id: string
  cliente_user_id: string
  nome: string
  responsavel: 'cliente' | 'velkor'
  vence_em: string | null
  urgente: boolean
  criado_em: string
}

export type OperacaoTag = 'em_andamento' | 'concluida' | 'aguardando_voce'

/**
 * A etiqueta da operação é sempre derivada das pendências, nunca um campo
 * próprio — mesma regra do painel administrativo do protótipo.
 */
export function tagOperacao(pendencias: PendenciaRow[]): OperacaoTag {
  const abertas = pendencias.filter((p) => p.status === 'aberta' || p.status === 'devolvida')
  if (abertas.length === 0) return 'concluida'
  if (abertas.some((p) => p.responsavel === 'cliente')) return 'aguardando_voce'
  return 'em_andamento'
}

export const TAG_LABEL: Record<OperacaoTag, string> = {
  em_andamento: 'Em andamento',
  concluida: 'Concluída',
  aguardando_voce: 'Aguardando você',
}
