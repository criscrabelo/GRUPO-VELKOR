import { Scale, HardHat, Compass } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/config'

export function PartnersSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale':
        return <Scale className="w-8 h-8 text-cyan" />
      case 'HardHat':
        return <HardHat className="w-8 h-8 text-cyan" />
      case 'Compass':
        return <Compass className="w-8 h-8 text-cyan" />
      default:
        return <Scale className="w-8 h-8 text-cyan" />
    }
  }

  const getDesc = (id: string) => {
    switch (id) {
      case 'legal':
        return 'Advogados especialistas em direito imobiliário (OAB) acionados para execução de atos privativos e defesas em regularizações.'
      case 'engineering':
        return 'Peritos e engenheiros (CREA) homologados para laudos estruturais, retificação de área e desmembramentos complexos.'
      case 'architecture':
        return 'Profissionais habilitados (CAU) focados em aprovações prefeiturais, projetos de regularização e alvarás.'
      default:
        return ''
    }
  }

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-petrol mb-4">
            Nossos Parceiros Especializados
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            A VELKOR atua como um hub orquestrador, coordenando toda a esteira documental. Para a
            execução técnica e jurídica de atos privativos, acionamos nossa seleta rede de
            especialistas homologados, garantindo segurança total.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SITE_CONFIG.partnerCategories?.map((p, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-3xl shadow-lg shadow-petrol/5 border border-slate-100 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-cyan/10 rounded-2xl flex items-center justify-center mb-6 border border-cyan/20">
                {getIcon(p.icon)}
              </div>
              <h3 className="text-xl font-bold text-petrol mb-3">{p.label}</h3>
              <p className="text-slate-500 leading-relaxed">{getDesc(p.id)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
