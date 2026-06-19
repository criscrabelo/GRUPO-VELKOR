import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'
import { Check, Info, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/config'

const plans = [
  {
    name: 'Consultoria Online',
    description: 'Orientação documental e administrativa remota.',
    price: 'R$ 120 - R$ 450',
    type: 'por serviço',
    microtext: 'Inclui triagem, checklist personalizado e análise de pendências por escrito.',
    features: [
      'Triagem documental completa',
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
    microtext:
      'Inclui organização documental, acompanhamento em tabelionato e protocolo de registro.',
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
    microtext: 'Inclui cartórios, prefeituras, protocolos físicos e taxas de deslocamento.',
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
          <span className="text-cyan font-bold tracking-wider uppercase text-sm mb-4 block">
            Tabela de Referência
          </span>
          <h2
            className={cn(
              'text-3xl md:text-4xl font-display font-bold text-petrol mb-4 opacity-0',
              isVisible && 'animate-fade-in-up',
            )}
          >
            Honorários claros, sem surpresas.
          </h2>
          <p
            className={cn(
              'text-lg text-slate-600 mb-2 opacity-0',
              isVisible && 'animate-fade-in-up',
            )}
            style={{ animationDelay: '100ms' }}
          >
            Valores sugeridos para serviços operacionais em nossa matriz regional — Vale do
            Paraíba/SP.
          </p>
          <p
            className={cn('text-sm text-slate-400 opacity-0', isVisible && 'animate-fade-in-up')}
            style={{ animationDelay: '150ms' }}
          >
            Não incluem custas de cartório, ITBI, emolumentos ou despesas de terceiros.
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
                  Mais contratado
                </div>
              )}
              <h3 className="text-xl font-display font-bold text-petrol mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-500 mb-1 min-h-[40px]">{plan.description}</p>
              {/* Microtexto de contexto */}
              <p className="text-xs text-cyan/70 font-medium mb-5 italic">{plan.microtext}</p>
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

        {/* CTA integrado ao final da tabela */}
        <div
          className={cn(
            'mt-10 max-w-3xl mx-auto text-center p-7 rounded-2xl bg-petrol/5 border border-petrol/10 opacity-0',
            isVisible && 'animate-fade-in-up',
          )}
          style={{ animationDelay: '600ms' }}
        >
          <p className="text-petrol font-semibold text-base mb-4">
            Não sabe qual serviço você precisa?
          </p>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20indica%C3%A7%C3%A3o%20gratuita%20de%20qual%20servi%C3%A7o%20preciso.`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1EBE5C] transition-colors shadow-md shadow-[#25D366]/20"
          >
            <MessageCircle className="w-5 h-5" />
            Fale com a Kora e receba uma indicação gratuita
          </a>
        </div>

        <div className="mt-8 max-w-3xl mx-auto flex items-start gap-4 p-5 bg-petrol/5 rounded-2xl border border-petrol/10 text-sm text-petrol font-medium">
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
