import { useMemo, useState } from 'react'
import { ArrowRight, ShieldCheck, Info } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { SITE_CONFIG } from '@/lib/config'
import { SERVICE_CATALOG, SERVICE_FILTERS, filterServices, type ServiceProfile } from '@/lib/catalog'

export function ServicesSection() {
  const [filter, setFilter] = useState<ServiceProfile | 'sob-consulta' | 'todas'>('todas')

  const services = useMemo(() => filterServices(filter), [filter])

  return (
    <section id="servicos" className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-petrol mb-4">
            Catálogo de Soluções
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            {SERVICE_CATALOG.length} serviços de documentação e organização administrativa
            imobiliária, do diagnóstico gratuito ao dossiê final.
          </p>
        </div>

        <div
          className="flex flex-wrap justify-center gap-2 mb-12"
          role="group"
          aria-label="Filtrar soluções"
        >
          {SERVICE_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors border ${
                filter === f.value
                  ? 'bg-petrol text-white border-petrol'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-petrol/40'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
          {services.map((s) => {
            const Icon = (LucideIcons as any)[s.iconName] || LucideIcons.Circle
            return (
              <div
                key={s.code}
                className="rounded-2xl p-6 flex flex-col bg-white border border-slate-200 hover:border-cyan hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-petrol/5 rounded-xl flex items-center justify-center text-petrol">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {s.code}
                  </span>
                </div>
                <h3 className="text-lg font-display font-bold text-petrol mb-2">{s.name}</h3>
                <p className="text-slate-600 text-sm mb-4 flex-1">{s.shortDescription}</p>

                {s.pricingType === 'sob-consulta' && (
                  <div className="mb-4 bg-slate-50 border border-slate-100 p-3 rounded-lg flex items-start gap-2">
                    <Info className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-500 font-medium">
                      Depende da análise do caso e, quando necessário, de parceiro habilitado.
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <span className="font-display font-bold text-petrol">
                    {s.priceLabel}
                  </span>
                  <Link to={`/servicos/${s.id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-petrol border-slate-200 hover:bg-cyan/10 hover:border-cyan/30"
                    >
                      Ver detalhes <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center max-w-4xl mx-auto">
          <div className="inline-block bg-white border border-slate-200 p-6 rounded-2xl text-sm font-medium shadow-sm text-left">
            <h4 className="font-bold text-petrol mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan" /> Nota Importante
            </h4>
            <p className="text-slate-500 leading-relaxed">{SITE_CONFIG.servicesDisclaimer}</p>
            <p className="text-slate-500 leading-relaxed mt-2">
              Os valores acima referem-se exclusivamente à gestão e execução Velkor. Taxas
              oficiais, custas de cartório, ITBI, emolumentos, guias e boletos de terceiros não
              estão inclusos e são pagos diretamente pelo cliente ao órgão competente.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
