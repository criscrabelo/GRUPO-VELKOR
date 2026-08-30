import { describe, expect, it } from 'vitest'
import { tagOperacao, tagOperacaoAdmin, type PendenciaRow } from '@/lib/types-db'

function pendencia(overrides: Partial<PendenciaRow>): PendenciaRow {
  return {
    id: 'p1',
    operacao_id: 'op1',
    cliente_user_id: 'user1',
    nome: 'Pendência de teste',
    nota: null,
    responsavel: 'velkor',
    status: 'aberta',
    criado_em: '2026-01-01T00:00:00Z',
    atualizado_em: '2026-01-01T00:00:00Z',
    ...overrides,
  }
}

describe('tagOperacao (visão do cliente)', () => {
  it('sem nenhuma pendência, a operação está concluída', () => {
    expect(tagOperacao([])).toBe('concluida')
  })

  it('todas as pendências resolvidas, a operação está concluída', () => {
    const pendencias = [
      pendencia({ status: 'resolvida' }),
      pendencia({ id: 'p2', status: 'resolvida' }),
    ]
    expect(tagOperacao(pendencias)).toBe('concluida')
  })

  it('pendência aberta com o cliente marca "aguardando você"', () => {
    const pendencias = [pendencia({ responsavel: 'cliente', status: 'aberta' })]
    expect(tagOperacao(pendencias)).toBe('aguardando_voce')
  })

  it('pendência devolvida ao cliente também marca "aguardando você"', () => {
    const pendencias = [pendencia({ responsavel: 'cliente', status: 'devolvida' })]
    expect(tagOperacao(pendencias)).toBe('aguardando_voce')
  })

  it('pendência em conferência (enviada pelo cliente) não é "aguardando você" — já foi enviada', () => {
    const pendencias = [pendencia({ responsavel: 'cliente', status: 'em_conferencia' })]
    expect(tagOperacao(pendencias)).toBe('em_andamento')
  })

  it('só pendência aberta com a Velkor: "em andamento", não "aguardando você"', () => {
    const pendencias = [pendencia({ responsavel: 'velkor', status: 'aberta' })]
    expect(tagOperacao(pendencias)).toBe('em_andamento')
  })

  it('pendência do cliente tem prioridade sobre pendência da Velkor', () => {
    const pendencias = [
      pendencia({ id: 'p1', responsavel: 'velkor', status: 'aberta' }),
      pendencia({ id: 'p2', responsavel: 'cliente', status: 'aberta' }),
    ]
    expect(tagOperacao(pendencias)).toBe('aguardando_voce')
  })
})

describe('tagOperacaoAdmin (visão da equipe)', () => {
  it('sem pendências, ou todas resolvidas: concluída', () => {
    expect(tagOperacaoAdmin([])).toBe('concluida')
    expect(tagOperacaoAdmin([pendencia({ status: 'resolvida' })])).toBe('concluida')
  })

  it('existe pendência em conferência: "conferir envio"', () => {
    const pendencias = [pendencia({ status: 'em_conferencia' })]
    expect(tagOperacaoAdmin(pendencias)).toBe('conferir_envio')
  })

  it('existe pendência aberta ou devolvida com o cliente, sem nada em conferência: "travada com o cliente"', () => {
    expect(tagOperacaoAdmin([pendencia({ responsavel: 'cliente', status: 'aberta' })])).toBe(
      'travada_cliente',
    )
    expect(tagOperacaoAdmin([pendencia({ responsavel: 'cliente', status: 'devolvida' })])).toBe(
      'travada_cliente',
    )
  })

  it('"conferir envio" tem prioridade sobre "travada com o cliente"', () => {
    const pendencias = [
      pendencia({ id: 'p1', responsavel: 'cliente', status: 'aberta' }),
      pendencia({ id: 'p2', responsavel: 'cliente', status: 'em_conferencia' }),
    ]
    expect(tagOperacaoAdmin(pendencias)).toBe('conferir_envio')
  })

  it('só pendência aberta com a Velkor (não com o cliente): "em andamento"', () => {
    const pendencias = [pendencia({ responsavel: 'velkor', status: 'aberta' })]
    expect(tagOperacaoAdmin(pendencias)).toBe('em_andamento')
  })
})
