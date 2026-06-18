import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'
import { Zap, Shield, BarChart, Layers, Workflow, Smartphone } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Velocidade Incomparável',
    description:
      'Nossa infraestrutura otimizada garante que suas automações rodem em milissegundos.',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    icon: Shield,
    title: 'Segurança de Nível Bancário',
    description: 'Criptografia de ponta a ponta e conformidade total com LGPD e GDPR.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
  },
  {
    icon: BarChart,
    title: 'Análises Profundas',
    description: 'Dashboards interativos que transformam dados complexos em insights acionáveis.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50',
  },
  {
    icon: Layers,
    title: 'Integrações Nativas',
    description: 'Conecte-se com mais de 100 ferramentas populares com apenas alguns cliques.',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
  {
    icon: Workflow,
    title: 'Fluxos Visuais',
    description: 'Crie processos complexos arrastando e soltando elementos sem escrever código.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {
    icon: Smartphone,
    title: 'Experiência Mobile',
    description:
      'Gerencie tudo de qualquer lugar com nosso aplicativo responsivo de alta performance.',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
]

export function FeaturesSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="recursos" ref={ref} className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className={cn(
              'text-3xl md:text-4xl font-bold text-slate-900 mb-4 opacity-0',
              isVisible && 'animate-fade-in-up',
            )}
          >
            Tudo o que você precisa para crescer
          </h2>
          <p
            className={cn('text-lg text-slate-600 opacity-0', isVisible && 'animate-fade-in-up')}
            style={{ animationDelay: '100ms' }}
          >
            Ferramentas poderosas desenhadas com simplicidade. Potencialize sua equipe com recursos
            projetados para escalar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                'group relative bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 opacity-0',
                isVisible && 'animate-fade-in-up',
              )}
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center mb-6',
                  feature.bg,
                  feature.color,
                )}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
