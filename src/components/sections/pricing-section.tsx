import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'
import { Check, Info } from 'lucide-react'

const plans = [
  {
    name: 'Consultoria Online',
    description: 'Orientação documental e administrativa remota.',
    price: 'R$ 120 - R$ 450',
    type: 'por serviço',
    features: [
      'Triagem documental',
      'Checklist personalizado',
      'Análise de pendências',
      '100% pagamento antecipado',
    ],
    highlighted: false,
  },
  {
    name: 'Escritura + Registro',
    description: 'Fluxo completo até a matrícula atualizada.',
    price: 'R$ 1.500 - R$ 3.500',
    type: 'por operação',
    features: [
      'Organização documental',
      'Acompanhamento em tabelionato',
      'Protocolo de registro',
      'Pagamento: 50% sinal / 50% entrega',
    ],
    highlighted: true,
  },
  {
    name: 'Diligência Regional',
    description: 'Atuação presencial exclusiva no Vale do Paraíba.',
    price: 'R$ 180 - R$ 350',
    type: 'por saída',
    features: [
      'Cartórios e Prefeituras',
      'SJC, Taubaté, Jacareí e região',
      'Protocolos físicos e retiradas',
      'Taxas de deslocamento incluídas',
    ],
    highlighted: false,
  },
]

export function PricingSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="precos" ref={ref} className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className={cn(
              'text-3xl md:text-4xl font-display font-bold text-petrol mb-4 opacity-0',
              isVisible && 'animate-fade-in-up',
            )}
          >
            Tabela Base - Vale do Paraíba
          </h2>
          <p
            className={cn(
              'text-lg text-slate-600 mb-8 opacity-0',
              isVisible && 'animate-fade-in-up',
            )}
            style={{ animationDelay: '100ms' }}
          >
            Honorários claros e transparentes. Valores sugeridos para serviços operacionais em nossa
            matriz regional.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={cn(
                'relative rounded-3xl border bg-slate-50 p-8 shadow-sm transition-all duration-300 opacity-0 flex flex-col',
                plan.highlighted
                  ? 'border-cyan shadow-xl md:-translate-y-4 ring-1 ring-cyan/50 bg-white'
                  : 'border-slate-200 hover:border-cyan/50',
                isVisible && 'animate-fade-in-up',
              )}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-cyan text-petrol text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                  Destaque
                </div>
              )}
              <h3 className="text-xl font-display font-bold text-petrol mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-500 mb-6 min-h-[40px]">{plan.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-display font-bold text-petrol">{plan.price}</span>
                <span className="text-slate-500 block text-sm mt-1">{plan.type}</span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-cyan shrink-0" />
                    <span className="text-slate-600 text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-3xl mx-auto flex items-start gap-4 p-5 bg-petrol/5 rounded-2xl border border-petrol/10 text-sm text-petrol font-medium">
          <Info className="w-6 h-6 shrink-0 text-cyan" />
          <p>
            <strong>Atenção:</strong> Os valores acima referem-se exclusivamente aos honorários de
            gestão e operação documental. Custas de cartórios, emolumentos, ITBI, taxas de
            prefeitura e certidões pagas são cobrados separadamente mediante comprovação.
          </p>
        </div>
      </div>
    </section>
  )
}
