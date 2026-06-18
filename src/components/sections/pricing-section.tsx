import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Básico',
    description: 'Perfeito para indivíduos e pequenos projetos.',
    monthlyPrice: 29,
    yearlyPrice: 24,
    features: ['Até 3 projetos', 'Análises básicas', 'Suporte por email', 'Automações limitadas'],
    highlighted: false,
  },
  {
    name: 'Pro',
    description: 'Ideal para equipes em crescimento que precisam de mais poder.',
    monthlyPrice: 79,
    yearlyPrice: 65,
    features: [
      'Projetos ilimitados',
      'Análises avançadas',
      'Suporte prioritário 24/7',
      'Automações ilimitadas',
      'Colaboração em tempo real',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'Para grandes organizações com necessidades complexas.',
    monthlyPrice: 199,
    yearlyPrice: 169,
    features: [
      'Tudo do plano Pro',
      'SSO e SAML',
      'Gerente de conta dedicado',
      'Treinamento presencial',
      'SLA garantido',
    ],
    highlighted: false,
  },
]

export function PricingSection() {
  const { ref, isVisible } = useScrollReveal()
  const [isYearly, setIsYearly] = useState(true)

  return (
    <section id="precos" ref={ref} className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className={cn(
              'text-3xl md:text-4xl font-bold text-slate-900 mb-4 opacity-0',
              isVisible && 'animate-fade-in-up',
            )}
          >
            Preços simples e transparentes
          </h2>
          <p
            className={cn(
              'text-lg text-slate-600 mb-8 opacity-0',
              isVisible && 'animate-fade-in-up',
            )}
            style={{ animationDelay: '100ms' }}
          >
            Comece de graça e escale conforme sua necessidade. Cancele a qualquer momento.
          </p>

          <div
            className={cn(
              'flex items-center justify-center space-x-4 opacity-0',
              isVisible && 'animate-fade-in-up',
            )}
            style={{ animationDelay: '200ms' }}
          >
            <span
              className={cn('text-sm font-medium', !isYearly ? 'text-slate-900' : 'text-slate-500')}
            >
              Mensal
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span
              className={cn(
                'text-sm font-medium flex items-center',
                isYearly ? 'text-slate-900' : 'text-slate-500',
              )}
            >
              Anual{' '}
              <span className="ml-2 text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                -20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={cn(
                'relative rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 opacity-0 flex flex-col',
                plan.highlighted
                  ? 'border-primary shadow-xl md:-translate-y-4 ring-1 ring-primary/20'
                  : 'border-slate-200 hover:border-primary/50',
                isVisible && 'animate-fade-in-up',
              )}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                  Mais Popular
                </div>
              )}
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-500 mb-6 min-h-[40px]">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900">
                  R$ {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-slate-500">/mês</span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={plan.highlighted ? 'default' : 'outline'}
                className={cn('w-full h-12', plan.highlighted && 'shadow-lg shadow-primary/20')}
              >
                <Link
                  to="/checkout"
                  state={{
                    plan: plan.name,
                    price: isYearly ? plan.yearlyPrice : plan.monthlyPrice,
                    billing: isYearly ? 'anual' : 'mensal',
                  }}
                >
                  Assinar Agora
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
