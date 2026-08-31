import { describe, expect, it } from 'vitest'
import {
  SERVICOS,
  FILTROS,
  FAIXAS,
  pctDesconto,
  brl,
  precoLabel,
  isElegivelParaDesconto,
  filterServicos,
  getServicoById,
  type CatalogService,
} from '@/lib/catalog'

// Códigos sob consulta segundo o briefing oficial: VLK06, 08, 16, 19, 20, 22.
const CODIGOS_SOB_CONSULTA = ['VLK06', 'VLK08', 'VLK16', 'VLK19', 'VLK20', 'VLK22']

describe('catálogo oficial VLK01-VLK22', () => {
  it('tem exatamente 22 serviços', () => {
    expect(SERVICOS).toHaveLength(22)
  })

  it('tem os códigos VLK01 a VLK22, em ordem, sem ausência nem duplicidade', () => {
    const esperado = Array.from({ length: 22 }, (_, i) => `VLK${String(i + 1).padStart(2, '0')}`)
    expect(SERVICOS.map((s) => s.code)).toEqual(esperado)
  })

  it('não tem ids (slugs) duplicados', () => {
    const ids = SERVICOS.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('VLK01 é gratuito e não é elegível para o simulador de desconto', () => {
    const vlk01 = SERVICOS.find((s) => s.code === 'VLK01') as CatalogService
    expect(vlk01.gratuito).toBe(true)
    expect(vlk01.preco).toBeUndefined()
    expect(vlk01.consulta).toBeFalsy()
    expect(isElegivelParaDesconto(vlk01)).toBe(false)
  })

  it('exatamente os 6 serviços oficiais estão marcados como sob consulta', () => {
    const marcados = SERVICOS.filter((s) => s.consulta).map((s) => s.code).sort()
    expect(marcados).toEqual([...CODIGOS_SOB_CONSULTA].sort())
  })

  it('nenhum serviço sob consulta ou gratuito é elegível para desconto', () => {
    for (const s of SERVICOS) {
      if (s.consulta || s.gratuito) {
        expect(isElegivelParaDesconto(s)).toBe(false)
      }
    }
  })

  it('todo serviço com preço fixo (não gratuito, não sob consulta) é elegível para desconto', () => {
    for (const s of SERVICOS) {
      if (!s.consulta && !s.gratuito) {
        expect(typeof s.preco).toBe('number')
        expect(isElegivelParaDesconto(s)).toBe(true)
      }
    }
  })

  it('serviços sob consulta não têm preço numérico definido', () => {
    for (const codigo of CODIGOS_SOB_CONSULTA) {
      const servico = SERVICOS.find((s) => s.code === codigo) as CatalogService
      expect(servico.preco).toBeUndefined()
      expect(precoLabel(servico)).toBe('Sob consulta')
    }
  })

  it('VLK10 e VLK11 são mensais', () => {
    expect(SERVICOS.find((s) => s.code === 'VLK10')?.mensal).toBe(true)
    expect(SERVICOS.find((s) => s.code === 'VLK11')?.mensal).toBe(true)
  })

  it('precoLabel formata corretamente gratuito, mensal e preço fixo', () => {
    const vlk01 = SERVICOS.find((s) => s.code === 'VLK01') as CatalogService
    const vlk02 = SERVICOS.find((s) => s.code === 'VLK02') as CatalogService
    const vlk10 = SERVICOS.find((s) => s.code === 'VLK10') as CatalogService

    expect(precoLabel(vlk01)).toBe('Gratuito')
    expect(precoLabel(vlk02)).toBe('R$ 299,00')
    expect(precoLabel(vlk10)).toBe('R$ 390,00/mês')
  })

  it('apenas VLK04 tem página de detalhe, apontando para a rota correta', () => {
    const comDetalhe = SERVICOS.filter((s) => s.detalhe)
    expect(comDetalhe.map((s) => s.code)).toEqual(['VLK04'])
    expect(comDetalhe[0].detalhe).toBe('/servicos/dossie-de-certidoes')
  })

  it('getServicoById encontra um serviço existente e não encontra um inexistente', () => {
    expect(getServicoById('vlk01')?.code).toBe('VLK01')
    expect(getServicoById('servico-que-nao-existe')).toBeUndefined()
  })

  it('cada serviço pertence a pelo menos um filtro válido (perfil ou sob consulta)', () => {
    for (const s of SERVICOS) {
      const pertenceAlgumPerfil = s.perfis.length > 0
      expect(pertenceAlgumPerfil || s.consulta).toBe(true)
    }
  })
})

describe('filtros da seção Soluções', () => {
  it('filtro "todos" retorna o catálogo inteiro', () => {
    expect(filterServicos('todos')).toHaveLength(22)
  })

  it('filtro "consulta" retorna exatamente os 6 serviços sob consulta', () => {
    const resultado = filterServicos('consulta').map((s) => s.code).sort()
    expect(resultado).toEqual([...CODIGOS_SOB_CONSULTA].sort())
  })

  it('filtro por perfil só retorna serviços que listam aquele perfil', () => {
    const compradores = filterServicos('comprar')
    expect(compradores.length).toBeGreaterThan(0)
    for (const s of compradores) {
      expect(s.perfis).toContain('comprar')
    }
  })

  it('todos os filtros declarados em FILTROS produzem algum resultado', () => {
    for (const f of FILTROS) {
      if (f.key === 'todos') continue
      expect(filterServicos(f.key).length).toBeGreaterThan(0)
    }
  })
})

describe('desconto progressivo do simulador', () => {
  it('menos de 2 serviços elegíveis não gera desconto', () => {
    expect(pctDesconto(0)).toBe(0)
    expect(pctDesconto(1)).toBe(0)
  })

  it('segue exatamente as faixas do briefing: 2→3%, 3→5%, 4→7%, 5→10%, 6→15%, 7+→20%', () => {
    expect(pctDesconto(2)).toBe(3)
    expect(pctDesconto(3)).toBe(5)
    expect(pctDesconto(4)).toBe(7)
    expect(pctDesconto(5)).toBe(10)
    expect(pctDesconto(6)).toBe(15)
    expect(pctDesconto(7)).toBe(20)
  })

  it('7 ou mais serviços sempre ficam no teto de 20%, sem limite superior', () => {
    expect(pctDesconto(8)).toBe(20)
    expect(pctDesconto(22)).toBe(20)
  })

  it('FAIXAS está em ordem crescente de quantidade', () => {
    const quantidades = FAIXAS.map(([q]) => q)
    expect(quantidades).toEqual([...quantidades].sort((a, b) => a - b))
  })

  it('cálculo de um pacote real: VLK02+VLK03+VLK04 (3 serviços) dá 5% sobre R$1.547,00', () => {
    const vlk02 = SERVICOS.find((s) => s.code === 'VLK02')!
    const vlk03 = SERVICOS.find((s) => s.code === 'VLK03')!
    const vlk04 = SERVICOS.find((s) => s.code === 'VLK04')!
    const subtotal = (vlk02.preco ?? 0) + (vlk03.preco ?? 0) + (vlk04.preco ?? 0)
    expect(subtotal).toBe(1547)
    const percentual = pctDesconto(3)
    expect(percentual).toBe(5)
    const total = subtotal - subtotal * (percentual / 100)
    expect(total).toBeCloseTo(1469.65, 2)
  })
})

describe('formatação de moeda (brl)', () => {
  it('formata valores inteiros e com centavos em pt-BR', () => {
    expect(brl(299)).toBe('R$ 299,00')
    expect(brl(1547)).toBe('R$ 1.547,00')
    expect(brl(77.35)).toBe('R$ 77,35')
    expect(brl(1469.65)).toBe('R$ 1.469,65')
  })
})
