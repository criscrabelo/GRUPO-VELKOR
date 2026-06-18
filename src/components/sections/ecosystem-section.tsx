import { Card } from '@/components/ui/card'
import { Building2, Landmark, ShieldCheck, Umbrella } from 'lucide-react'

export function EcosystemSection() {
  const brands = [
    {
      name: 'Velkor Assets',
      desc: 'Gestão inteligente de fundos imobiliários e estruturação de carteiras de longo prazo.',
      icon: Landmark,
    },
    {
      name: 'Velkor Tech',
      desc: 'Plataformas digitais e inovação tecnológica voltada para simplificar a jornada do cliente.',
      icon: Building2,
    },
    {
      name: 'Velkor Legal',
      desc: 'Assessoria jurídica especializada, blindagem patrimonial e total compliance regulatório.',
      icon: ShieldCheck,
    },
    {
      name: 'Velkor Seguros',
      desc: 'Proteção patrimonial completa. Governança e segurança integradas em um só lugar.',
      icon: Umbrella,
    },
  ]
  return (
    <section id="ecossistema" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan/10 text-cyan text-sm font-bold tracking-wider uppercase mb-4 border border-cyan/20">
            Integração
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-petrol">
            Ecossistema GRUPO VELKOR
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">
            Nossas frentes de negócio trabalham em sinergia para oferecer a solução imobiliária e de
            proteção patrimonial mais completa do mercado.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {brands.map((b) => (
            <Card
              key={b.name}
              className="group p-8 text-center hover:-translate-y-2 transition-all duration-300 border-t-4 border-t-cyan hover:border-t-petrol hover:shadow-xl hover:shadow-petrol/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 bg-slate-100 rounded-bl-full -mr-8 -mt-8 opacity-50 transition-colors group-hover:bg-cyan/10 -z-10"></div>
              <div className="w-16 h-16 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-petrol transition-colors duration-300">
                <b.icon className="w-8 h-8 text-petrol group-hover:text-cyan transition-colors" />
              </div>
              <h3 className="text-xl font-display font-bold text-petrol mb-3">{b.name}</h3>
              <p className="text-slate-500 leading-relaxed">{b.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
