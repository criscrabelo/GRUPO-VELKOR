import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function FaqSection() {
  const faqs = [
    {
      q: 'A VELKOR é uma imobiliária?',
      a: 'Não. Somos um Hub de Soluções e atuamos como Coordenadores e Despachantes Documentais. Não realizamos corretagem (intermediação de compra e venda) ou administração de locações diretas.',
    },
    {
      q: 'Vocês prestam assessoria jurídica ou advocacia?',
      a: 'Não. A VELKOR atua estritamente na coordenação administrativa. Sempre que um ato privativo for necessário durante a regularização, ele será executado exclusivamente por nossa rede de escritórios parceiros inscritos na OAB.',
    },
    {
      q: 'O que exatamente está incluso no Check-up Imobiliário?',
      a: 'O serviço engloba o levantamento completo da situação da matrícula imobiliária, verificação de ônus, apontamentos e bloqueios judiciais, além de pendências de IPTU e análise preliminar da cadeia sucessória do imóvel para garantir clareza no negócio.',
    },
    {
      q: 'Como funciona a rede de especialistas?',
      a: 'A VELKOR coordena e gerencia todo o processo, enquanto nossos parceiros especialistas (advogados, engenheiros, arquitetos) cuidam da emissão de laudos técnicos e peças jurídicas específicas. Isso garante agilidade, segurança e centralização da comunicação em um único lugar, mantendo nossa atuação como um hub orquestrador.',
    },
    {
      q: 'Como acompanho a evolução do meu serviço contratado?',
      a: 'Transparência é nossa prioridade. Todos os nossos clientes recebem acesso exclusivo ao Portal do Cliente (Área Logada), onde é possível acompanhar o status do serviço em tempo real, fazer download dos laudos e contratos, e visualizar extratos de pagamentos.',
    },
  ]

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-petrol mb-4">
            Dúvidas Frequentes
          </h2>
          <p className="text-lg text-slate-500">
            Transparência total e compliance sobre nosso modelo de atuação.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm"
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-slate-200/60 last:border-0"
            >
              <AccordionTrigger className="text-left font-bold text-petrol text-lg py-5 hover:text-cyan hover:no-underline transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-6 pt-1 text-base">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
