'use client'

import { useMemo } from 'react'
import { X, ShieldCheck, Lock, Info } from 'lucide-react'
import { FAIXAS, getServicoById, isElegivelParaDesconto, pctDesconto, brl } from '@/lib/catalog'

export function Simulador({
  selecionados,
  onRemover,
  onAvancar,
}: {
  selecionados: Set<string>
  onRemover: (id: string) => void
  onAvancar: () => void
}) {
  const itens = useMemo(
    () =>
      Array.from(selecionados)
        .map((id) => getServicoById(id))
        .filter((s): s is NonNullable<typeof s> => !!s && isElegivelParaDesconto(s)),
    [selecionados],
  )

  const subtotal = itens.reduce((acc, s) => acc + (s.preco ?? 0), 0)
  const percentual = pctDesconto(itens.length)
  const desconto = subtotal * (percentual / 100)
  const total = subtotal - desconto

  const mensagem =
    itens.length < 2
      ? `Selecione ${2 - itens.length === 1 ? 'mais 1 serviço' : '2 serviços'} para desbloquear seu primeiro desconto.`
      : `Seu pacote já tem ${percentual}% de desconto.`

  return (
    <section id="pacote" className="py-20 bg-teal-deep text-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="section-label text-cyan-light mb-3">Simulador</p>
          <h2 className="heading-serif text-3xl md:text-4xl font-bold mb-3">Monte seu pacote</h2>
          <p className="text-white/70" aria-live="polite">
            {mensagem}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Lista de itens selecionados */}
          <div className="bg-white/5 border border-white/10 rounded-card p-6">
            <h3 className="font-bold text-sm uppercase tracking-wider text-cyan-light mb-4">
              Serviços selecionados
            </h3>
            {itens.length === 0 ? (
              <p className="text-white/50 text-sm py-8 text-center">
                Nenhum serviço selecionado ainda. Escolha na seção Soluções acima.
              </p>
            ) : (
              <ul className="space-y-3">
                {itens.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between gap-3 bg-white/5 rounded-button px-4 py-3"
                  >
                    <div>
                      <span className="block text-sm font-semibold">{s.nome}</span>
                      <span className="block text-xs text-white/60">
                        {brl(s.preco ?? 0)}
                        {s.mensal ? '/mês' : ''}
                      </span>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remover ${s.nome} do pacote`}
                      onClick={() => onRemover(s.id)}
                      className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Resumo e faixas */}
          <div className="bg-white text-ink-primary rounded-card p-6 flex flex-col">
            <h3 className="font-bold text-sm uppercase tracking-wider text-ink-tertiary mb-4">
              Resumo
            </h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-ink-secondary">Serviços Velkor (subtotal)</span>
                <span className="font-medium">{brl(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary">Desconto progressivo ({percentual}%)</span>
                <span className="font-medium text-success">- {brl(desconto)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border">
                <span className="font-bold">Total para contratação</span>
                <span className="font-bold heading-serif text-lg">{brl(total)}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 mb-6">
              {FAIXAS.map(([qtd, pct]) => (
                <div
                  key={qtd}
                  className={`text-center rounded-button py-2 text-xs font-bold border ${
                    itens.length >= qtd && pctDesconto(itens.length) === pct
                      ? 'bg-cyan-brand/15 border-cyan-brand text-teal-institutional'
                      : 'border-border text-ink-tertiary'
                  }`}
                >
                  {qtd}+ · {pct}%
                </div>
              ))}
            </div>

            <button
              type="button"
              disabled={itens.length === 0}
              onClick={onAvancar}
              className="mt-auto rounded-button bg-cyan-brand text-teal-institutional font-bold px-6 py-3.5 hover:bg-cyan-brand/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
            >
              Aplicar meu desconto e avançar
            </button>

            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-[11px] text-ink-tertiary">
              <span className="inline-flex items-center gap-1">
                <Lock className="w-3 h-3" /> Dados protegidos
              </span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Pagamento seguro
              </span>
              <span className="inline-flex items-center gap-1">
                <Info className="w-3 h-3" /> Privacidade conforme a LGPD
              </span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-white/50 mt-6 max-w-2xl mx-auto">
          Serviços gratuitos e sob consulta nunca entram no cálculo do desconto. Taxas oficiais e
          custos de terceiros não estão inclusos.
        </p>
      </div>
    </section>
  )
}
