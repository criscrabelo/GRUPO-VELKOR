import { Scale, HardHat, Compass } from 'lucide-react'

export function PartnersSection() {
  const partners = [
    {
      role: 'Consultoria Jurídica',
      desc: 'Advogados especialistas em direito imobiliário (OAB) acionados para execução de atos privativos e defesas em regularizações.',
      icon: Scale,
    },
    {
      role: 'Engenharia Civil',
      desc: 'Peritos e engenheiros (CREA) homologados para laudos estruturais, retificação de área e desmembramentos complexos.',
      icon: HardHat,
    },
    {
      role: 'Arquitetura & Urbanismo',
      desc: 'Profissionais habilitados (CAU) focados em aprovações prefeiturais, projetos de regularização e alvarás.',
      icon: Compass,
    },
  ]

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-petrol mb-4">
            Ecossistema de Parceiros Técnicos
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            A VELKOR coordena toda a esteira documental. Para a execução técnica de atos privativos,
            acionamos nossa seleta rede de especialistas homologados, garantindo segurança total.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {partners.map((p, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-3xl shadow-lg shadow-petrol/5 border border-slate-100 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-cyan/10 rounded-2xl flex items-center justify-center mb-6 border border-cyan/20">
                <p.icon className="w-8 h-8 text-cyan" />
              </div>
              <h3 className="text-xl font-bold text-petrol mb-3">{p.role}</h3>
              <p className="text-slate-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
