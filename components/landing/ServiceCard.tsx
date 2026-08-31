'use client'

import Link from 'next/link'
import { CatalogService, precoLabel } from '@/lib/catalog'
import { Check, Plus, Info } from 'lucide-react'

export function ServiceCard({
  servico,
  selecionado,
  onToggle,
  onPedirOrcamento,
  onComecarDiagnostico,
}: {
  servico: CatalogService
  selecionado: boolean
  onToggle: (id: string) => void
  onPedirOrcamento: (servico: CatalogService) => void
  onComecarDiagnostico: () => void
}) {
  return (
    <div
      className={`rounded-card border bg-surface p-5 flex flex-col transition-colors ${
        selecionado ? 'border-cyan-brand shadow-sm' : 'border-border hover:border-cyan-brand/50'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="section-label text-ink-tertiary">{servico.familia}</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-tertiary/70">
          {servico.code}
        </span>
      </div>

      <h3 className="heading-serif text-lg font-semibold text-ink-primary mb-2">
        {servico.nome}
      </h3>
      <p className="text-sm text-ink-secondary mb-3 flex-1">{servico.desc}</p>
      <p className="text-xs text-ink-tertiary mb-4">Inclui: {servico.inclui}</p>

      {servico.detalhe && (
        <Link
          href={servico.detalhe}
          className="text-[12.5px] font-semibold text-teal-action hover:text-teal-deep mb-4 -mt-2"
        >
          Ver página do serviço →
        </Link>
      )}

      {servico.consulta && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-attention-border bg-attention-bg p-3">
          <Info className="w-4 h-4 text-attention-text shrink-0 mt-0.5" />
          <span className="text-xs text-attention-text font-medium">
            Depende da análise do caso e, quando necessário, de parceiro habilitado.
          </span>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
        <div>
          <span className="block font-semibold text-ink-primary heading-serif">
            {precoLabel(servico)}
          </span>
          <span className="block text-[11px] text-ink-tertiary">{servico.prazo}</span>
        </div>

        {servico.gratuito ? (
          <button
            type="button"
            onClick={onComecarDiagnostico}
            className="rounded-button bg-cyan-brand text-teal-institutional font-bold text-sm px-4 py-2.5 hover:bg-cyan-brand/90 transition-colors min-h-[44px]"
          >
            Começar diagnóstico
          </button>
        ) : servico.consulta ? (
          <button
            type="button"
            onClick={() => onPedirOrcamento(servico)}
            className="rounded-button border border-teal-action text-teal-action font-bold text-sm px-4 py-2.5 hover:bg-teal-action/5 transition-colors min-h-[44px]"
          >
            Pedir orçamento
          </button>
        ) : (
          <button
            type="button"
            aria-pressed={selecionado}
            onClick={() => onToggle(servico.id)}
            className={`rounded-button font-bold text-sm px-4 py-2.5 transition-colors min-h-[44px] flex items-center gap-1.5 ${
              selecionado
                ? 'bg-teal-institutional text-white hover:bg-teal-institutional/90'
                : 'border border-teal-action text-teal-action hover:bg-teal-action/5'
            }`}
          >
            {selecionado ? (
              <>
                <Check className="w-4 h-4" /> No pacote
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Adicionar
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
