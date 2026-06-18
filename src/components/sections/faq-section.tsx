import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function FaqSection() {
  const faqs = [
    {
      q: 'Como funciona a contratação digital?',
      a: 'Todo o processo é realizado de forma 100% online. Você seleciona o serviço desejado, preenche seus dados (PF ou PJ), revisa o resumo do pedido e pronto. O acesso ao seu painel de acompanhamento é ativado imediatamente.',
    },
    {
      q: 'Qual é a área de cobertura dos serviços?',
      a: 'Temos cobertura nacional garantida, contando com bases operacionais estratégicas localizadas em todas as capitais do Brasil.',
    },
    {
      q: 'As minhas informações e documentos estão seguros?',
      a: 'Absolutamente. Atuamos em estrita conformidade com a LGPD e regulamentações do setor. Todos os dados e arquivos são armazenados de forma criptografada em nosso Secure Document Vault.',
    },
    {
      q: 'Como acompanho o status da minha solicitação?',
      a: 'Ao contratar, você recebe acesso ao Portal do Cliente utilizando apenas o seu e-mail cadastrado, onde pode visualizar o status em tempo real e fazer download de documentos.',
    },
  ]

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-petrol mb-4">
            Dúvidas Frequentes
          </h2>
          <p className="text-slate-600">Encontre respostas rápidas sobre nossa operação.</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-white mb-4 border border-slate-200 rounded-xl px-6 shadow-sm"
            >
              <AccordionTrigger className="text-petrol font-bold text-left hover:no-underline hover:text-cyan transition-colors py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-5 text-base">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
