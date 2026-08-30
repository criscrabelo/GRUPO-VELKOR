'use client'

import { useMemo } from 'react'
import { FILTROS, SERVICOS, filterServicos, type CatalogFilter, type CatalogService } from '@/lib/catalog'
import { ServiceCard } from './ServiceCard'

export function Solucoes({
  selecionados,
  onToggle,
  filtro,
  onFiltroChange,
  onPedirOrcamento,
  onComecarDiagnostico,
}: {
  selecionados: Set<string>
  onToggle: (id: string) => void
  filtro: CatalogFilter['key']
  onFiltroChange: (filtro: CatalogFilter['key']) => void
  onPedirOrcamento: (servico: CatalogService) => void
  onComecarDiagnostico: () => void
}) {
  const servicos = useMemo(() => filterServicos(filtro), [filtro])

  return (
    <section id="solucoes" className="py-20 bg-page">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="section-label text-teal-action mb-3">Catálogo oficial</p>
          <h2 className="heading-serif text-3xl md:text-4xl font-bold text-ink-primary mb-3">
            Soluções
          </h2>
          <p className="text-ink-secondary">
            {SERVICOS.length} serviços de documentação e organização administrativa imobiliária —
            do diagnóstico gratuito ao dossiê final.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10" role="group" aria-label="Filtrar soluções">
          {FILTROS.map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={filtro === f.key}
              onClick={() => onFiltroChange(f.key)}
              className={`rounded-full px-4 py-2 text-sm font-bold border transition-colors min-h-[40px] ${
                filtro === f.key
                  ? 'bg-teal-institutional text-white border-teal-institutional'
                  : 'bg-surface text-ink-secondary border-border hover:border-teal-action/40'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-ink-tertiary mb-8" aria-live="polite">
          {servicos.length} {servicos.length === 1 ? 'solução encontrada' : 'soluções encontradas'}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto grid-stack:grid-cols-1">
          {servicos.map((s) => (
            <ServiceCard
              key={s.id}
              servico={s}
              selecionado={selecionados.has(s.id)}
              onToggle={onToggle}
              onPedirOrcamento={onPedirOrcamento}
              onComecarDiagnostico={onComecarDiagnostico}
            />
          ))}
        </div>

        <div className="mt-12 max-w-3xl mx-auto rounded-card border border-border bg-surface p-5 text-sm text-ink-secondary space-y-2">
          <p>
            <strong className="text-ink-primary">Nota sobre valores:</strong> os preços acima
            referem-se exclusivamente à gestão e execução Velkor. Taxas oficiais, custas de
            cartório, ITBI, emolumentos, guias e boletos de terceiros não estão inclusos e são
            pagos diretamente pelo cliente ao órgão competente.
          </p>
          <p>
            <strong className="text-ink-primary">Nota sobre prazos:</strong> etapas que dependem
            de cartórios, prefeituras, órgãos públicos ou bancos seguem o tempo desses órgãos e
            podem variar.
          </p>
        </div>
      </div>
    </section>
  )
}
