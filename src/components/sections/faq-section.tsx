import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Como funciona a avaliação imobiliária da Velkor?',
    answer:
      'Nossos especialistas realizam uma análise técnica detalhada utilizando dados de mercado atualizados, vistorias in loco e métodos comparativos rigorosos para determinar o valor real e estratégico do seu imóvel.',
  },
  {
    question: 'O que está incluído na Gestão de Ativos?',
    answer:
      'A Gestão de Ativos inclui desde a cobrança de aluguéis, repasses financeiros, atendimento ao inquilino, gestão de manutenções até a renovação e reajuste de contratos, garantindo tranquilidade total ao proprietário.',
  },
  {
    question: 'A assessoria jurídica atende quais demandas?',
    answer:
      'Nossa equipe jurídica cuida da elaboração e revisão de contratos, due diligence imobiliária (análise de certidões e riscos), ações de despejo, cobranças judiciais e regularização de imóveis.',
  },
  {
    question: 'Como funciona a contratação online?',
    answer:
      'Pelo nosso portal, você escolhe o serviço desejado, preenche seus dados, aceita os termos e um de nossos especialistas entrará em contato rapidamente. Todo o andamento pode ser acompanhado pelo Portal do Cliente.',
  },
]

export function FaqSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="faq" ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2
            className={cn(
              'text-3xl md:text-4xl font-display font-bold text-petrol mb-4 opacity-0',
              isVisible && 'animate-fade-in-up',
            )}
          >
            Perguntas Frequentes
          </h2>
          <p
            className={cn('text-lg text-slate-500 opacity-0', isVisible && 'animate-fade-in-up')}
            style={{ animationDelay: '100ms' }}
          >
            Tire suas dúvidas sobre nossos serviços e processos operacionais.
          </p>
        </div>

        <div
          className={cn('max-w-3xl mx-auto opacity-0', isVisible && 'animate-fade-in-up')}
          style={{ animationDelay: '200ms' }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-slate-100 px-4 mb-2 bg-slate-50 rounded-xl overflow-hidden data-[state=open]:bg-white data-[state=open]:shadow-md data-[state=open]:border-cyan/30 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-bold text-petrol hover:text-cyan py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
