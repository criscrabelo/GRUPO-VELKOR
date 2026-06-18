import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { SITE_CONFIG } from '@/lib/config'

export function ServicesSection() {
  const services = [
    {
      title: 'Avaliação Imobiliária',
      price: '800',
      isMonthly: false,
      features: [
        'Laudo Técnico Especializado',
        'Análise de Preço de Mercado',
        'Prazo de entrega em 48h',
      ],
    },
    {
      title: 'Estruturação Imobiliária',
      price: '2.500',
      isMonthly: false,
      featured: true,
      features: ['Planejamento Estratégico', 'Análise de Viabilidade', 'Modelagem de Negócios'],
    },
    {
      title: 'Assessoria Jurídica',
      price: '1.200',
      isMonthly: false,
      features: [
        'Análise Contratual Profunda',
        'Levantamento de Certidões',
        'Due Diligence Imobiliária',
      ],
    },
  ]

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-petrol mb-4">
            Catálogo de Serviços
          </h2>
          <p className="text-slate-600 text-lg">
            Transparência nos custos e excelência comprovada nas entregas.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {services.map((s) => (
            <div
              key={s.title}
              className={`rounded-3xl p-8 transition-all duration-300 relative bg-white ${s.featured ? 'border-2 border-cyan shadow-xl shadow-cyan/10 scale-105 md:z-10' : 'border border-slate-200 hover:border-cyan hover:shadow-xl'}`}
            >
              {s.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan text-petrol px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                  Mais Procurado
                </div>
              )}
              <h3 className="text-xl font-display font-bold text-petrol mb-2">{s.title}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-3xl font-display font-bold text-petrol">R$ {s.price}</span>
                {s.isMonthly && <span className="text-slate-500 font-medium">/mês</span>}
              </div>
              <ul className="space-y-4 mb-8">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start text-slate-600 text-sm font-medium">
                    <Check className="w-5 h-5 text-cyan mr-3 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/contratar" className="block w-full">
                <Button
                  className={`w-full font-bold h-14 rounded-xl ${s.featured ? 'bg-petrol text-white hover:bg-petrol/90' : 'bg-slate-50 text-petrol hover:bg-cyan/10 border border-slate-200'}`}
                >
                  Contratar Agora <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="inline-block bg-slate-50 border border-slate-200 text-slate-500 px-6 py-3 rounded-full text-sm font-medium">
            <span className="font-bold text-petrol">Atenção:</span> {SITE_CONFIG.servicesDisclaimer}
          </p>
        </div>
      </div>
    </section>
  )
}
