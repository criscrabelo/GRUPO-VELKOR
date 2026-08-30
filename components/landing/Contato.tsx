import { MessageCircle, Mail, AlertTriangle } from 'lucide-react'

export function Contato({ assuntoSugerido }: { assuntoSugerido?: string | null }) {
  const textoWhats = assuntoSugerido
    ? encodeURIComponent(`Olá! Gostaria de um orçamento para o serviço "${assuntoSugerido}".`)
    : ''
  const whatsappHref = assuntoSugerido
    ? `https://wa.me/5512981313521?text=${textoWhats}`
    : 'https://wa.me/5512981313521'

  return (
    <section id="contato" className="py-20 bg-surface">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <p className="section-label text-teal-action mb-3">Contato</p>
          <h2 className="heading-serif text-3xl md:text-4xl font-bold text-ink-primary mb-3">
            Fale com a Velkor
          </h2>
          <p className="text-ink-secondary">Atendimento de segunda a sexta, das 9h às 18h.</p>
          {assuntoSugerido && (
            <p className="text-sm text-teal-action font-medium mt-2">
              Orçamento sugerido: {assuntoSugerido}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-6">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-card border border-border bg-page p-6 hover:border-cyan-brand transition-colors"
          >
            <MessageCircle className="w-8 h-8 text-success mb-3" />
            <h3 className="font-bold text-ink-primary mb-1">WhatsApp</h3>
            <p className="text-sm text-ink-secondary">(12) 98131-3521</p>
          </a>
          <a
            href="mailto:contato@velkor.com.br"
            className="rounded-card border border-border bg-page p-6 hover:border-cyan-brand transition-colors"
          >
            <Mail className="w-8 h-8 text-teal-action mb-3" />
            <h3 className="font-bold text-ink-primary mb-1">E-mail</h3>
            <p className="text-sm text-ink-secondary">contato@velkor.com.br</p>
          </a>
        </div>

        <div className="flex items-start gap-3 rounded-card border border-attention-border bg-attention-bg p-4">
          <AlertTriangle className="w-5 h-5 text-attention-text shrink-0 mt-0.5" />
          <p className="text-sm text-attention-text">
            Documentos e dados sensíveis devem ser enviados pelo painel do cliente, nunca por
            WhatsApp ou e-mail.
          </p>
        </div>
      </div>
    </section>
  )
}
