import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { RascunhoBanner } from './RascunhoBanner'

export function LegalLayout({
  titulo,
  atualizadoEm,
  children,
}: {
  titulo: string
  atualizadoEm: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-page">
      <RascunhoBanner />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link
          href="/imobiliaria"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-secondary hover:text-teal-action mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao início
        </Link>

        <h1 className="heading-serif text-3xl font-bold text-ink-primary mb-2">{titulo}</h1>
        <p className="text-sm text-ink-tertiary mb-10">Versão rascunho — {atualizadoEm}</p>

        <div className="prose-legal space-y-6 text-ink-secondary leading-relaxed">{children}</div>
      </div>
    </div>
  )
}
