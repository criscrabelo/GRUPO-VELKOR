import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'
import { KeyRound, FileCheck, Users, TrendingUp, Building, Briefcase } from 'lucide-react'

const targets = [
  {
    icon: KeyRound,
    title: 'Quem vai comprar imóvel',
    description:
      'Evite surpresas indesejadas. Fazemos a varredura completa antes de você assinar o contrato e investir seu dinheiro.',
  },
  {
    icon: FileCheck,
    title: 'Quem precisa regularizar imóvel',
    description:
      'Habite-se, averbações, CND de obras. Organização documental total para valorizar e legalizar seu patrimônio.',
  },
  {
    icon: Users,
    title: 'Famílias e herdeiros',
    description:
      'Gestão de documentação de inventários e transferências para garantir a segurança da sucessão familiar.',
  },
  {
    icon: TrendingUp,
    title: 'Investidores e leilões',
    description:
      'Análise de risco pré-leilão e gestão documental ágil para desembaraçar e registrar a propriedade arrematada.',
  },
  {
    icon: Building,
    title: 'Construtoras e incorporadoras',
    description:
      'Despachante parceiro para o registro de loteamentos, incorporações, instituição de condomínio e individualização.',
  },
  {
    icon: Briefcase,
    title: 'Holdings e empresas',
    description:
      'Terceirização da inteligência e execução documental para conferência e regularização de carteiras imobiliárias.',
  },
]

export function ForWhomSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section
      id="para-quem"
      ref={ref}
      className="py-20 md:py-32 bg-slate-50 border-y border-slate-100"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-cyan font-bold tracking-wider uppercase text-sm mb-4 block">
            Público de Atendimento
          </span>
          <h2
            className={cn(
              'text-3xl md:text-4xl font-display font-bold text-petrol mb-4 opacity-0',
              isVisible && 'animate-fade-in-up',
            )}
          >
            Para quem é a VELKOR?
          </h2>
          <p
            className={cn('text-lg text-slate-600 opacity-0', isVisible && 'animate-fade-in-up')}
            style={{ animationDelay: '100ms' }}
          >
            Nossas soluções atendem diferentes perfis que buscam segurança, agilidade e zero
            burocracia na gestão documental de imóveis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {targets.map((target, index) => (
            <div
              key={target.title}
              className={cn(
                'group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-cyan/30 transition-all duration-300 opacity-0 flex flex-col items-start',
                isVisible && 'animate-fade-in-up',
              )}
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="w-12 h-12 bg-petrol/5 text-cyan rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan/10 transition-all">
                <target.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-petrol mb-3">{target.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{target.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
