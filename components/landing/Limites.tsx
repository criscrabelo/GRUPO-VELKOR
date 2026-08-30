'use client'

import { useState } from 'react'
import { Check, X, ChevronDown } from 'lucide-react'

const FAZ = [
  'Pesquisa, conferência e organização documental do imóvel e das partes.',
  'Gestão administrativa de prazos, guias, boletos e comprovantes.',
  'Acompanhamento das etapas administrativas junto a órgãos e cartórios.',
  'Relatório de risco documental e entrega do dossiê digital final.',
]

const NAO_FAZ = [
  'Parecer jurídico, peça processual ou representação legal.',
  'Corretagem de imóveis, laudo de engenharia ou arquitetura.',
  'Pagamento de guias, taxas ou boletos em nome do cliente.',
  'Dispensa de exigências de cartórios ou de órgãos públicos.',
]

const FAQ = [
  {
    q: 'Quem paga guias, boletos e taxas?',
    a: 'Você, diretamente ao órgão competente. A Velkor organiza, avisa o vencimento e conferece o comprovante que você anexa no painel — nunca paga em seu nome.',
  },
  {
    q: 'Vou precisar ir ao cartório?',
    a: 'Depende do serviço. A Velkor organiza e acompanha administrativamente; atos que exigem presença ou assinatura em cartório seguem as regras do próprio cartório.',
  },
  {
    q: 'Em quanto tempo o serviço começa?',
    a: 'Logo após a contratação. Cada serviço tem um prazo estimado próprio, exibido no catálogo — etapas de terceiros podem variar.',
  },
  {
    q: 'Meus documentos ficam protegidos?',
    a: 'Documentos e dados sensíveis devem ser enviados apenas pelo painel do cliente, nunca por WhatsApp, e-mail ou pela Kora, com acesso restrito ao titular e à equipe da operação.',
  },
]

export function Limites() {
  const [aberto, setAberto] = useState<number | null>(null)

  return (
    <section id="limites" className="py-20 bg-page">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <p className="section-label text-teal-action mb-3">Limites de escopo</p>
          <h2 className="heading-serif text-3xl md:text-4xl font-bold text-ink-primary">
            O que a Velkor faz e não faz
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="rounded-card border border-border bg-surface p-6">
            <h3 className="font-bold text-success mb-4 flex items-center gap-2">
              <Check className="w-5 h-5" /> Faz
            </h3>
            <ul className="space-y-3">
              {FAZ.map((item) => (
                <li key={item} className="text-sm text-ink-secondary flex gap-2">
                  <Check className="w-4 h-4 text-success shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-border bg-surface p-6">
            <h3 className="font-bold text-ink-primary mb-4 flex items-center gap-2">
              <X className="w-5 h-5 text-ink-tertiary" /> Não faz
            </h3>
            <ul className="space-y-3">
              {NAO_FAZ.map((item) => (
                <li key={item} className="text-sm text-ink-secondary flex gap-2">
                  <X className="w-4 h-4 text-ink-tertiary shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-sm text-ink-tertiary text-center mb-16 max-w-2xl mx-auto">
          Atos jurídicos, técnicos, registrais ou profissionais específicos são conduzidos por
          profissionais habilitados ou parceiros, quando necessários, e sempre informados ao
          cliente antes da execução.
        </p>

        <div className="text-center mb-10">
          <h3 className="heading-serif text-2xl font-bold text-ink-primary">Dúvidas frequentes</h3>
        </div>

        <div className="rounded-card border border-border bg-surface divide-y divide-border">
          {FAQ.map((item, i) => (
            <div key={item.q}>
              <button
                type="button"
                aria-expanded={aberto === i}
                onClick={() => setAberto(aberto === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left min-h-[44px]"
              >
                <span className="font-bold text-ink-primary">{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-ink-tertiary shrink-0 transition-transform ${aberto === i ? 'rotate-180' : ''}`}
                />
              </button>
              {aberto === i && <p className="px-6 pb-5 text-sm text-ink-secondary">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
