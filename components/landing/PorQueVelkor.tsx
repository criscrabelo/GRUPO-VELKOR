import { ShieldCheck, FolderKanban, CheckCircle2 } from 'lucide-react'

const COLUNAS = [
  {
    icon: ShieldCheck,
    titulo: 'Protege',
    desc: 'Conferência documental antes de qualquer compromisso, para reduzir riscos de matrícula, ônus e pendências.',
  },
  {
    icon: FolderKanban,
    titulo: 'Organiza',
    desc: 'Certidões, guias, boletos e comprovantes reunidos em um único painel, com prazos e responsáveis claros.',
  },
  {
    icon: CheckCircle2,
    titulo: 'Resolve',
    desc: 'Acompanhamento administrativo ativo junto a cartórios e órgãos até o dossiê digital final.',
  },
]

export function PorQueVelkor() {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <p className="section-label text-teal-action mb-3">Por que a Velkor</p>
        <h2 className="heading-serif text-3xl md:text-4xl font-bold text-ink-primary mb-5">
          Documentação imobiliária costuma travar negociações
        </h2>
        <p className="text-ink-secondary max-w-2xl mx-auto mb-14">
          Certidões vencidas, guias não pagas e prazos perdidos atrasam compras, vendas, locações e
          regularizações. A Velkor organiza cada etapa para que isso não aconteça com você.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 text-left">
          {COLUNAS.map((c) => (
            <div key={c.titulo} className="rounded-card border border-border bg-page p-6">
              <c.icon className="w-8 h-8 text-cyan-brand mb-4" />
              <h3 className="heading-serif font-bold text-lg text-ink-primary mb-2">{c.titulo}</h3>
              <p className="text-sm text-ink-secondary">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
