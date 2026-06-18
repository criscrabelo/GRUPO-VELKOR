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
    question: 'Como funciona o período de teste gratuito?',
    answer:
      'Você recebe acesso total a todos os recursos do plano Pro por 14 dias. Não é necessário cartão de crédito para iniciar. Após os 14 dias, você pode escolher o plano que melhor atende às suas necessidades.',
  },
  {
    question: 'Posso cancelar minha assinatura a qualquer momento?',
    answer:
      'Sim! Não há contratos de longo prazo (exceto se você optar pelo plano anual para obter o desconto). Você pode cancelar sua assinatura a qualquer momento no painel de configurações.',
  },
  {
    question: 'O NexFlow se integra com as ferramentas que já uso?',
    answer:
      'Absolutamente. Oferecemos mais de 100 integrações nativas com ferramentas populares como Slack, Google Workspace, Jira, Salesforce e muito mais. Também temos uma API aberta para integrações personalizadas.',
  },
  {
    question: 'Meus dados estão seguros?',
    answer:
      'A segurança é nossa prioridade número um. Usamos criptografia AES-256 para todos os dados em repouso e TLS 1.2+ para dados em trânsito. Somos certificados SOC 2 Type II e totalmente em conformidade com LGPD.',
  },
  {
    question: 'Como funciona o suporte técnico?',
    answer:
      'O suporte via email está disponível para todos os planos. Usuários do plano Pro têm acesso ao suporte prioritário 24/7 com tempo de resposta garantido de menos de 2 horas. Clientes Enterprise recebem um gerente de conta dedicado.',
  },
]

export function FaqSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="faq" ref={ref} className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2
            className={cn(
              'text-3xl md:text-4xl font-bold text-slate-900 mb-4 opacity-0',
              isVisible && 'animate-fade-in-up',
            )}
          >
            Perguntas Frequentes
          </h2>
          <p
            className={cn('text-lg text-slate-600 opacity-0', isVisible && 'animate-fade-in-up')}
            style={{ animationDelay: '100ms' }}
          >
            Tudo o que você precisa saber sobre o produto e faturamento.
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
                className="border-b border-slate-200 px-2"
              >
                <AccordionTrigger className="text-left text-lg font-medium text-slate-900 hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6">
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
