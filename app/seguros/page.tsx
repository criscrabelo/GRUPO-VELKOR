import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// Página provisória da divisão Seguros & Consórcios (handoff v2:
// "Velkor Seguros.dc.html"). Site em construção — contato via WhatsApp.

export const metadata: Metadata = {
  title: 'Velkor Seguros e Consórcios — Protege. Organiza. Resolve.',
  description:
    'Velkor Seguros e Consórcios: proteção e planejamento para o seu patrimônio. Fale com a equipe pelo WhatsApp.',
  alternates: { canonical: '/seguros' },
}

export default function SegurosPage() {
  return (
    <div
      className="min-h-screen flex flex-col text-white"
      style={{ background: 'linear-gradient(180deg, #0F3A42 0%, #144C55 100%)' }}
    >
      <header className="px-7 py-4 flex justify-between items-center gap-5 border-b border-white/[0.12]">
        <Link href="/" className="text-[13px] font-semibold text-cyan-light hover:text-white transition-colors">
          ← Grupo Velkor
        </Link>
        <Link
          href="/imobiliaria"
          className="text-[13px] font-semibold text-cyan-light hover:text-white transition-colors"
        >
          Soluções Imobiliárias →
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-7 py-14 text-center">
        <Image
          src="/brand/velkor-seguros-logo.png"
          alt="Velkor Seguros"
          width={3586}
          height={933}
          priority
          className="h-[76px] w-auto"
        />
        <p className="mt-[22px] inline-flex bg-cyan-brand/[0.16] text-cyan-light text-[11px] font-semibold tracking-[0.14em] uppercase px-[15px] py-[7px] rounded-full">
          Seguros e Consórcios
        </p>
        <h1 className="heading-serif text-3xl detail:text-[38px] leading-[1.12] font-semibold text-white mt-5 max-w-[20em]">
          Proteção para o que você conquistou. Planejamento para o que vem.
        </h1>
        <p className="text-base leading-relaxed text-white/[0.78] mt-4 max-w-[34em]">
          O site desta divisão está em construção. Enquanto isso, a equipe atende diretamente pelo
          WhatsApp.
        </p>
        <div className="flex flex-wrap justify-center gap-3.5 mt-8">
          <a
            href="https://wa.me/5512996641194"
            target="_blank"
            rel="noopener"
            className="bg-cyan-brand text-[#07333B] text-[15.5px] font-semibold px-7 py-[15px] rounded-button hover:bg-[#57CCEC] transition-colors"
          >
            WhatsApp (12) 99664-1194
          </a>
          <Link
            href="/imobiliaria"
            className="border-[1.5px] border-white/[0.34] text-white text-[15.5px] font-semibold px-[26px] py-[13.5px] rounded-button hover:border-cyan-brand transition-colors"
          >
            Ver Soluções Imobiliárias
          </Link>
        </div>
        <p className="text-[12.5px] text-white/[0.55] mt-5">
          Atendimento de segunda a sexta, das 9h às 18h.
        </p>
      </main>

      <footer className="px-7 py-6 border-t border-white/[0.12]">
        <p className="text-center text-[12.5px] leading-relaxed text-white/[0.60]">
          Velkor Seguros e Consórcios · Grupo Velkor · Taubaté/SP
        </p>
      </footer>
    </div>
  )
}
