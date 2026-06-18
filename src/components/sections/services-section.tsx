import { useEffect, useState } from 'react'
import { Check, ArrowRight, ShieldCheck, Info } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { SITE_CONFIG } from '@/lib/config'
import { db, Service } from '@/lib/db'

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    db.services.findMany().then((data) => {
      // Show specific services matching original design
      const displayServices = data.filter((s) =>
        [
          'checkup-imobiliario',
          'compra-segura',
          'assessoria-leiloes',
          'leiloes-orgaos-publicos',
        ].includes(s.id),
      )
      setServices(displayServices.length ? displayServices : data.slice(0, 4))
      setLoading(false)
    })
  }, [])

  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-petrol mb-4">
            Portfólio de Soluções
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Consultoria especializada e gestão ponta a ponta para assegurar a conformidade
            patrimonial das suas operações e investimentos.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto min-h-[400px]">
          {loading ? (
            <div className="col-span-2 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-cyan border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            services.map((s) => {
              const Icon = (LucideIcons as any)[s.icon_name || 'Circle'] || LucideIcons.Circle
              return (
                <div
                  key={s.title}
                  className={`rounded-3xl p-8 flex flex-col transition-all duration-300 relative bg-white ${s.featured ? 'border-2 border-cyan shadow-xl shadow-cyan/10 scale-105 md:z-10' : 'border border-slate-200 hover:border-cyan hover:shadow-xl'}`}
                >
                  {s.featured && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan text-petrol px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                      Mais Procurado
                    </div>
                  )}
                  <div className="w-12 h-12 bg-petrol/5 rounded-xl flex items-center justify-center text-petrol mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-petrol mb-3">{s.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 flex-1">
                    {s.full_content || s.short_description}
                  </p>

                  {s.partnerNote && (
                    <div className="mb-6 bg-slate-50 border border-slate-100 p-3 rounded-lg flex items-start gap-2">
                      <Info className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-500 font-medium">
                        Serviços técnicos e peças jurídicas executados por nossa rede de parceiros
                        especializados.
                      </span>
                    </div>
                  )}

                  <ul className="space-y-3 mb-8 flex-1">
                    {(s.features || []).map((f) => (
                      <li key={f} className="flex items-start text-slate-600 text-sm font-medium">
                        <Check className="w-5 h-5 text-cyan mr-3 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to={`/servicos/${s.id}`} className="block w-full mt-auto pt-4">
                    <Button
                      className={`w-full font-bold h-14 rounded-xl transition-all duration-300 ${s.featured ? 'bg-petrol text-white hover:bg-petrol/90 hover:shadow-lg' : 'bg-slate-50 text-petrol hover:bg-cyan/10 border border-slate-200 hover:border-cyan/30'}`}
                    >
                      Consultar Solução <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              )
            })
          )}
        </div>
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <div className="inline-block bg-white border border-slate-200 p-6 rounded-2xl text-sm font-medium shadow-sm text-left">
            <h4 className="font-bold text-petrol mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan" /> Nota Importante
            </h4>
            <p className="text-slate-500 leading-relaxed">{SITE_CONFIG.servicesDisclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
