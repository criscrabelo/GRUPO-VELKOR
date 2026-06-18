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
      a: 'Nosso foco de atuação física e diligências em órgãos está concentrado na região do Vale do Paraíba/SP. Para emissões 100% eletrônicas, atendemos demandas de âmbito nacional.',
    },
    {
      q: 'Vocês realizam corretagem ou vendem imóveis?',
      a: 'Não. A VELKOR atua exclusivamente na esfera documental, administrativa e de regularização, sem realizar corretagem ou intermediação imobiliária.',
    },
    {
      q: 'Como acompanho o status da minha solicitação?',
      a: 'Ao contratar, você recebe acesso ao Portal do Cliente utilizando apenas o seu e-mail cadastrado, onde pode visualizar o status em tempo real e fazer download de documentos no Document Vault.',
    },
    {
      q: 'A VELKOR oferece consultoria jurídica?',
      a: 'Não oferecemos defesa em processos ou emissão de pareceres jurídicos. Em caso de necessidade jurídica contenciosa, encaminhamos a advogados parceiros independentes.',
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
