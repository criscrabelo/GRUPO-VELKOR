// Tipos das tabelas do painel do cliente (schema public, Supabase).
// Mantido manualmente em vez de gerado, pelo tamanho ainda pequeno do schema.

export interface OperacaoRow {
  id: string
  cliente_user_id: string
  cliente_email: string | null
  nome: string
  familia: string | null
  servicos: string[]
  progresso_pct: number
  responsavel_nome: string | null
  valor: number | null
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
  const naoResolvidas = pendencias.filter((p) => p.status !== 'resolvida')
  if (naoResolvidas.length === 0) return 'concluida'
  const aguardandoCliente = naoResolvidas.some(
    (p) => p.responsavel === 'cliente' && (p.status === 'aberta' || p.status === 'devolvida'),
  )
  if (aguardandoCliente) return 'aguardando_voce'
  return 'em_andamento'
}

export const TAG_LABEL: Record<OperacaoTag, string> = {
  em_andamento: 'Em andamento',
  concluida: 'Concluída',
  aguardando_voce: 'Aguardando você',
}

export interface EquipeVelkorRow {
  user_id: string
  nome: string
  papel: 'admin' | 'operador' | 'leitura'
  ativo: boolean
  criado_em: string
}

export type OperacaoTagAdmin = 'concluida' | 'conferir_envio' | 'travada_cliente' | 'em_andamento'

/**
 * Situação da operação no painel admin — sempre derivada das pendências,
 * nunca um campo próprio. "Fora do prazo" depende de um SLA por serviço
 * que ainda não existe no schema (gap conhecido, documentado no relatório
 * de auditoria); por isso não aparece aqui ainda.
 */
export function tagOperacaoAdmin(pendencias: PendenciaRow[]): OperacaoTagAdmin {
  const naoResolvidas = pendencias.filter((p) => p.status !== 'resolvida')
  if (naoResolvidas.length === 0) return 'concluida'
  if (naoResolvidas.some((p) => p.status === 'em_conferencia')) return 'conferir_envio'
  if (
    naoResolvidas.some(
      (p) => p.responsavel === 'cliente' && (p.status === 'aberta' || p.status === 'devolvida'),
    )
  )
    return 'travada_cliente'
  return 'em_andamento'
}

export const TAG_ADMIN_LABEL: Record<OperacaoTagAdmin, string> = {
  concluida: 'Concluída',
  conferir_envio: 'Conferir envio',
  travada_cliente: 'Travada com o cliente',
  em_andamento: 'Em andamento',
}
