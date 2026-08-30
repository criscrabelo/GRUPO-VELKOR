import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'
import { Check, Info, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/config'
import { getServiceByCode } from '@/lib/catalog'

// Três exemplos reais do catálogo oficial (VLK01–VLK22), não valores fictícios.
const highlightCodes = ['VLK01', 'VLK04', 'VLK12']
const highlights = highlightCodes.map((code) => getServiceByCode(code)!).filter(Boolean)

export function PricingSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="precos" ref={ref} className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-cyan font-bold tracking-wider uppercase text-sm mb-4 block">
            Exemplos do catálogo oficial
          </span>
          <h2
            className={cn(
              'text-3xl md:text-4xl font-display font-bold text-petrol mb-4 opacity-0',
              isVisible && 'animate-fade-in-up',
            )}
          >
            Preços por serviço, sem pacotes obscuros.
          </h2>
          <p
            className={cn(
              'text-lg text-slate-600 mb-2 opacity-0',
              isVisible && 'animate-fade-in-up',
            )}
            style={{ animationDelay: '100ms' }}
          >
            Cada um dos 22 serviços Velkor tem preço próprio. Veja o catálogo completo na seção
            Soluções, ou alguns exemplos abaixo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {highlights.map((service, index) => (
            <div
              key={service.code}
              className={cn(
                'relative rounded-3xl border bg-slate-50 p-8 shadow-sm transition-all duration-300 opacity-0 flex flex-col',
                index === 1
                  ? 'border-cyan shadow-xl md:-translate-y-4 ring-1 ring-cyan/50 bg-white'
                  : 'border-slate-200 hover:border-cyan/50',
                isVisible && 'animate-fade-in-up',
              )}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                {service.code}
              </span>
              <h3 className="text-xl font-display font-bold text-petrol mb-2">{service.name}</h3>
              <p className="text-sm text-slate-500 mb-5 min-h-[40px]">{service.shortDescription}</p>
              <div className="mb-6">
                <span className="text-3xl font-display font-bold text-petrol">
                  {service.priceLabel}
                </span>
                {service.deadline && (
                  <span className="text-slate-500 block text-sm mt-1">{service.deadline}</span>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-cyan shrink-0" />
                    <span className="text-slate-600 text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

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
            <strong>Nota Exclusiva de Honorários:</strong> Os valores informados referem-se apenas
            aos honorários da Velkor como gestora documental. Estes valores{' '}
            <strong>excluem</strong> expressamente taxas, emissão de certidões, ITBI, emolumentos de
            cartórios (notas e registro) e serviços de terceiros, que deverão ser arcados pelo
            cliente.
          </p>
        </div>
      </div>
    </section>
  )
}
