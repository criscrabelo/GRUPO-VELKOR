import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'
import { Building2, Gavel, Camera, Briefcase, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const ECOSYSTEM = [
  {
    icon: Building2,
    title: 'Avaliação Imobiliária',
    desc: 'Laudos técnicos precisos baseados em inteligência de mercado e dados atualizados.',
  },
  {
    icon: Briefcase,
    title: 'Gestão de Ativos',
    desc: 'Administração profissional do seu portfólio de imóveis com maximização de rentabilidade.',
  },
  {
    icon: Gavel,
    title: 'Assessoria Jurídica',
    desc: 'Segurança total em contratos, certidões e toda burocracia do mercado imobiliário.',
  },
  {
    icon: Camera,
    title: 'Marketing Visual',
    desc: 'Produções fotográficas e tours virtuais que valorizam seus imóveis para locação ou venda.',
  },
]

export function ServicesSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="ecossistema" ref={ref} className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2
            className={cn(
              'text-sm font-bold tracking-widest text-cyan uppercase mb-3 opacity-0',
              isVisible && 'animate-fade-in-up',
            )}
          >
            Ecossistema Velkor
          </h2>
          <h3
            className={cn(
              'text-3xl md:text-5xl font-display font-bold text-petrol mb-6 opacity-0',
              isVisible && 'animate-fade-in-up',
            )}
            style={{ animationDelay: '100ms' }}
          >
            Soluções completas
          </h3>
          <p
            className={cn(
              'text-lg text-slate-600 opacity-0 leading-relaxed',
              isVisible && 'animate-fade-in-up',
            )}
            style={{ animationDelay: '200ms' }}
          >
            Tudo o que você precisa para gerenciar, proteger e valorizar seus imóveis centralizado
            em uma única plataforma.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ECOSYSTEM.map((item, idx) => (
            <Link
              key={idx}
              to="/contratar"
              className={cn(
                'group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-petrol/5 hover:border-cyan/30 overflow-hidden opacity-0 flex flex-col',
                isVisible && 'animate-fade-in-up',
              )}
              style={{ animationDelay: `${300 + idx * 100}ms` }}
            >
              {/* Slash Motif Background */}
              <div
                className="absolute top-0 right-0 w-[150%] h-[150%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(115deg, transparent 40%, rgba(25, 200, 232, 0.05) 40%, rgba(25, 200, 232, 0.05) 60%, transparent 60%)',
                  transform: 'translate(20%, -20%)',
                }}
              />

              <div className="w-16 h-16 rounded-2xl bg-slate-50 text-petrol group-hover:bg-cyan group-hover:text-petrol transition-colors duration-500 flex items-center justify-center mb-8 relative z-10">
                <item.icon className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-display font-bold text-petrol mb-3 relative z-10">
                {item.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed relative z-10 flex-1">
                {item.desc}
              </p>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center text-sm font-bold text-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                Contratar Serviço <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
