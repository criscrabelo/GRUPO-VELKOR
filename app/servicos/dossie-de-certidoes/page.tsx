import type { Metadata } from 'next'
import Link from 'next/link'
import { VelkorLogo } from '@/components/landing/VelkorLogo'
import { getServicoById, brl } from '@/lib/catalog'

// Página de detalhe do serviço VLK04 — piloto do formato "página por serviço"
// para SEO/anúncios (handoff v2: "Servico Dossie de Certidoes.dc.html").
// Preço e prazo vêm do catálogo (fonte única) para nunca divergirem da landing.

export const metadata: Metadata = {
  title: 'Dossiê de certidões — Velkor Soluções Imobiliárias',
  description:
    'Certidões do imóvel, do comprador e do vendedor solicitadas, conferidas e organizadas pela Velkor, com controle de validade e prazos no painel digital.',
  alternates: { canonical: '/servicos/dossie-de-certidoes' },
}

const INCLUIDO = [
  'Levantamento das certidões exigidas para a sua operação (imóvel, comprador e vendedor).',
  'Solicitação junto aos órgãos e cartórios competentes, com guias disponibilizadas no painel.',
  'Conferência de cada certidão recebida e leitura administrativa de apontamentos.',
  'Controle de validade: alerta antes de qualquer certidão vencer durante a negociação.',
  'Dossiê digital final, organizado e pronto para apresentar a banco, tabelionato ou comprador.',
]

const PASSOS = [
  'Você contrata no site e informa os dados básicos do imóvel e das partes.',
  'A Velkor abre a operação no painel com a lista de certidões e as guias de emissão.',
  'Você paga as guias direto ao órgão e anexa os comprovantes; a Velkor acompanha cada emissão.',
  'As certidões conferidas viram um dossiê digital seu, com controle de validade.',
]

const FAQ = [
  {
    q: 'Quais certidões entram no dossiê?',
    a: 'Depende da operação e da praça. A lista é definida no início e apresentada no painel antes de qualquer emissão.',
  },
  {
    q: 'Quem paga as taxas de emissão?',
    a: 'Você, diretamente ao órgão emissor, com a guia disponibilizada no painel. O valor da Velkor cobre a gestão e a conferência.',
  },
  {
    q: 'E se aparecer um apontamento em alguma certidão?',
    a: 'A Velkor sinaliza o apontamento e orienta o próximo passo administrativo. Análise jurídica, quando necessária, é feita por profissional habilitado.',
  },
  {
    q: 'Posso combinar com outros serviços?',
    a: 'Sim — no simulador de pacotes, combinar 2 ou mais serviços gera desconto progressivo de até 20%.',
  },
]

export default function DossieDeCertidoesPage() {
  const servico = getServicoById('vlk04')
  if (!servico) return null

  return (
    <div className="bg-page text-ink-primary overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-teal-institutional border-b border-white/10">
        <div className="max-w-[1100px] mx-auto px-4 md:px-7 py-3.5 flex items-center gap-6">
          <Link href="/imobiliaria" aria-label="Voltar ao site Velkor" className="shrink-0 block">
            <VelkorLogo heightClassName="h-11 brightness-0 invert" />
          </Link>
          <Link
            href="/imobiliaria#solucoes"
            className="ml-auto text-white/[0.84] hover:text-white text-[13.5px] font-medium whitespace-nowrap transition-colors"
          >
            ← Todas as soluções
          </Link>
          <Link
            href="/imobiliaria#pacote"
            className="shrink-0 bg-cyan-brand text-[#07333B] text-[13.5px] font-semibold px-[18px] py-2.5 rounded-[7px] hover:bg-[#57CCEC] whitespace-nowrap transition-colors"
          >
            Montar meu pacote
          </Link>
        </div>
      </header>

      <main>
        <section className="bg-teal-institutional px-4 md:px-7 py-16">
          <div className="max-w-[1100px] mx-auto">
            <p className="text-[11px] font-semibold tracking-[0.13em] uppercase text-cyan-light">
              {servico.code} · {servico.familia}
            </p>
            <h1 className="heading-serif text-3xl detail:text-[42px] leading-[1.1] font-semibold text-white mt-3.5 max-w-[20em]">
              {servico.nome}
            </h1>
            <p className="text-[17px] leading-relaxed text-white/[0.88] mt-4 max-w-[36em]">
              Certidões do imóvel, do comprador e do vendedor solicitadas, conferidas e organizadas
              em um único dossiê, com controle de validade e prazos no painel.
            </p>
            <div className="flex flex-wrap items-center gap-5 mt-7">
              <div className="bg-white/[0.08] border border-white/[0.18] rounded-xl px-[22px] py-3.5">
                <span className="block text-[10.5px] font-semibold tracking-[0.1em] uppercase text-white/60">
                  Serviço Velkor
                </span>
                <span className="block heading-serif text-[27px] font-semibold text-white mt-[3px]">
                  {brl(servico.preco ?? 0)}
                </span>
              </div>
              <div className="bg-white/[0.08] border border-white/[0.18] rounded-xl px-[22px] py-3.5">
                <span className="block text-[10.5px] font-semibold tracking-[0.1em] uppercase text-white/60">
                  Prazo estimado
                </span>
                <span className="block heading-serif text-[27px] font-semibold text-white mt-[3px]">
                  {servico.prazo}
                </span>
              </div>
              <Link
                href="/imobiliaria#solucoes"
                className="bg-cyan-brand text-[#07333B] text-[15px] font-semibold px-[26px] py-[15px] rounded-button hover:bg-[#57CCEC] transition-colors"
              >
                Selecionar este serviço
              </Link>
            </div>
            <p className="text-[12.5px] leading-relaxed text-white/60 mt-4 max-w-[44em]">
              Valor referente ao serviço de gestão Velkor. Taxas de emissão das certidões e
              emolumentos de cartório não estão inclusos e são pagos por você diretamente ao órgão
              emissor.
            </p>
          </div>
        </section>

        <section className="px-4 md:px-7 py-16">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 detail:grid-cols-[1.1fr_0.9fr] gap-11 items-start">
            <div>
              <h2 className="heading-serif text-[28px] leading-[1.15] font-semibold">
                O que está incluído
              </h2>
              <div className="flex flex-col gap-[13px] mt-[22px]">
                {INCLUIDO.map((item) => (
                  <p key={item} className="flex gap-[11px] text-[15px] leading-relaxed text-[#2C4C52]">
                    <span className="text-success font-bold">✓</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
              <div className="bg-attention-bg border border-attention-border rounded-[11px] px-[18px] py-4 mt-[26px]">
                <p className="text-[13px] leading-[1.65] text-[#7A5A21]">
                  <strong className="font-semibold text-[#5F4415]">O que não está incluído:</strong>{' '}
                  parecer jurídico sobre os apontamentos encontrados, atos de cartório e taxas de
                  emissão. Etapas que dependem de órgãos externos seguem o prazo desses órgãos.
                </p>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-card p-7">
              <h3 className="heading-serif text-[19px] font-semibold">Como funciona</h3>
              <div className="flex flex-col gap-4 mt-5">
                {PASSOS.map((passo, i) => (
                  <div key={passo} className="flex gap-[13px] items-start">
                    <span className="shrink-0 w-6 h-6 rounded-md bg-[#E8F6FA] text-[#0F4E57] text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-[1.55] text-[#2C4C52]">{passo}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/imobiliaria#diagnostico"
                className="block text-center mt-6 bg-teal-action text-white text-[14.5px] font-semibold px-[22px] py-3.5 rounded-button hover:bg-[#0F4E57] transition-colors"
              >
                Não sabe se precisa? Faça o diagnóstico gratuito
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-surface border-t border-border px-4 md:px-7 py-14">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="heading-serif text-2xl font-semibold">Perguntas frequentes</h2>
            <div className="grid grid-cols-1 detail:grid-cols-2 gap-y-[22px] gap-x-11 mt-[26px]">
              {FAQ.map((item) => (
                <div key={item.q}>
                  <h3 className="heading-serif text-[16.5px] font-semibold">{item.q}</h3>
                  <p className="text-sm leading-relaxed text-ink-secondary mt-2">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-teal-institutional px-4 md:px-7 py-14 text-center">
          <div className="max-w-[640px] mx-auto">
            <h2 className="heading-serif text-[28px] font-semibold text-white">
              Pronto para organizar as certidões?
            </h2>
            <div className="flex justify-center flex-wrap gap-3.5 mt-[26px]">
              <Link
                href="/imobiliaria#solucoes"
                className="bg-cyan-brand text-[#07333B] text-[15px] font-semibold px-[26px] py-[15px] rounded-button hover:bg-[#57CCEC] transition-colors"
              >
                Selecionar este serviço
              </Link>
              <a
                href="https://wa.me/5512981313521"
                target="_blank"
                rel="noopener"
                className="border-[1.5px] border-white/[0.34] text-white text-[15px] font-semibold px-6 py-[13.5px] rounded-button hover:border-cyan-brand transition-colors"
              >
                Tirar dúvida no WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-teal-deep px-4 md:px-7 py-6">
        <p className="max-w-[1100px] mx-auto text-center text-xs leading-[1.65] text-white/[0.55]">
          Velkor Soluções Imobiliárias · Taubaté/SP · Valores referem-se ao serviço de gestão
          Velkor; taxas oficiais, emolumentos e guias de terceiros não inclusos.
        </p>
      </footer>
    </div>
  )
}
