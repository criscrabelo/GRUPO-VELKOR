import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'
import { Check, Info } from 'lucide-react'

const plans = [
  {
    name: 'Diagnóstico Inicial',
    description: 'Para entender o caso, documentos existentes e pendências que podem travar o processo.',
    price: 'A partir de R$ 600',
    type: 'por imóvel ou operação',
    features: [
      'Triagem documental',
      'Matrícula, certidões e débitos',
      'Relatório administrativo de pendências',
      'Próximos passos documentais',
    ],
    highlighted: false,
  },
  {
    name: 'Gestão Documental Completa',
    description: 'Para acompanhar ITBI, escritura, registro, averbações e matrícula atualizada.',
    price: 'A partir de R$ 1.500',
    type: 'por escopo aprovado',
    features: [
      'Organização da pasta documental',
      'Acompanhamento em cartório e prefeitura',
      'Controle de exigências administrativas',
      'Atualizações sobre andamento',
    ],
    highlighted: true,
  },
  {
    name: 'Regularização Complexa',
    description: 'Para casos com obra, Habite-se, CND, inventário documental, leilão ou carteira de imóveis.',
    price: 'Sob análise',
    type: 'proposta personalizada',
    features: [
      'Escopo conforme complexidade',
      'Rede de parceiros quando necessário',
      'Relatórios gerenciais',
      'Custos externos sempre separados',
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
            Planos sob diagnóstico
          </h2>
          <p
            className={cn(
              'text-lg text-slate-600 mb-8 opacity-0',
              isVisible && 'animate-fade-in-up',
            )}
            style={{ animationDelay: '100ms' }}
          >
            Cada imóvel tem uma situação documental diferente. Após a análise inicial, a VELKOR
            apresenta proposta personalizada com escopo, prazo estimado e custos externos separados.
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
                  Mais completo
                </div>
              )}
              <h3 className="text-xl font-display font-bold text-petrol mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-500 mb-6 min-h-[56px]">{plan.description}</p>
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
            <strong>Atenção:</strong> os valores indicados referem-se aos honorários da VELKOR.
            Taxas, emolumentos, certidões, ITBI, custas cartorárias, despesas de prefeitura,
            deslocamentos e serviços de terceiros não estão incluídos, salvo previsão expressa na
            proposta.
          </p>
        </div>
      </div>
    </section>
  )
}
