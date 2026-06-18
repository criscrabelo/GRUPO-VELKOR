import { Scale, HardHat, Ruler, Briefcase, CheckCircle2 } from 'lucide-react'

export function PartnersSection() {
  const categories = [
    {
      title: 'Consultoria Jurídica',
      icon: Briefcase,
      desc: 'Escritórios especializados em due diligence, análise de riscos e estruturação legal de operações imobiliárias.',
    },
    {
      title: 'Engenharia',
      icon: HardHat,
      desc: 'Laudos técnicos, vistorias de recebimento e avaliação estrutural de imóveis com engenheiros credenciados.',
    },
    {
      title: 'Arquitetura',
      icon: Ruler,
      desc: 'Projetos de adequação, levantamentos as-built e aprovação junto a órgãos municipais.',
    },
    {
      title: 'Advogados',
      icon: Scale,
      desc: 'Profissionais habilitados para a execução de serviços privativos de advocacia, como contencioso e regularização.',
    },
  ]

  return (
    <section id="parceiros" className="py-24 bg-white relative border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-cyan font-bold tracking-widest uppercase text-sm mb-2 block">
            Hub de Soluções
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-petrol mb-4">
            Nossos Parceiros Estratégicos
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            A VELKOR atua como coordenadora central do seu processo. Para garantir a máxima
            qualidade técnica e segurança legal, contamos com uma rede de profissionais e empresas
            especializadas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {categories.map((c) => (
            <div
              key={c.title}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-cyan/30 hover:shadow-lg hover:shadow-cyan/5 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-petrol mb-6 group-hover:scale-110 group-hover:bg-cyan/10 group-hover:text-cyan transition-all">
                <c.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-display font-bold text-petrol mb-3">{c.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <div className="bg-petrol/5 rounded-full px-6 py-3 flex flex-col sm:flex-row items-center gap-3 border border-petrol/10 max-w-fit text-center sm:text-left">
            <CheckCircle2 className="w-5 h-5 text-cyan shrink-0" />
            <p className="text-sm text-petrol font-medium">
              Todos os parceiros são homologados e devidamente credenciados em seus conselhos de
              classe.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
