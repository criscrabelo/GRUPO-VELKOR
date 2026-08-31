import Image from 'next/image'
import Link from 'next/link'
import { Home, Shield } from 'lucide-react'

// Portal institucional do Grupo Velkor (handoff v2: "Grupo Velkor.dc.html").
// Página de entrada: escolha entre as duas divisões do grupo.

const CHIP_CLASSES =
  'bg-cyan-ghost/[0.08] border border-cyan-ghost/20 text-cyan-ghost text-xs font-medium px-3 py-1.5 rounded-full'

function Chips({ itens }: { itens: string[] }) {
  return (
    <span className="flex flex-wrap justify-center gap-2 mb-8">
      {itens.map((item) => (
        <span key={item} className={CHIP_CLASSES}>
          {item}
        </span>
      ))}
    </span>
  )
}

export default function PortalGrupoVelkor() {
  const cardClasses =
    'group flex flex-col justify-between bg-[#11282C] border border-white/[0.08] rounded-2xl px-7 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-ghost/35 hover:shadow-[0_12px_28px_rgba(0,0,0,0.35),0_0_15px_rgba(50,197,230,0.1)]'

  return (
    <div className="min-h-screen bg-ink-deep text-white">
      <main
        className="min-h-screen flex justify-center items-center px-4 py-10"
        style={{
          background:
            'radial-gradient(circle at 50% 18%, rgba(50,197,230,0.07) 0%, transparent 60%)',
        }}
      >
        <div className="max-w-[1000px] w-full text-center">
          <Image
            src="/brand/grupo-velkor-logo.png"
            alt="Grupo Velkor"
            width={623}
            height={132}
            priority
            className="inline-block h-[75px] w-auto mb-9 drop-shadow-[0_0_16px_rgba(50,197,230,0.25)]"
          />

          <h1 className="heading-serif text-[28px] duo:text-4xl font-bold leading-[1.18] tracking-[-0.5px]">
            Bem-vindo ao <span className="text-cyan-ghost">Grupo Velkor</span>.
          </h1>
          <p className="text-white/85 text-base leading-relaxed max-w-[540px] mx-auto mt-2.5 mb-11">
            Duas empresas, um mesmo compromisso: cuidar do seu patrimônio, facilitar suas decisões
            e acompanhar cada conquista com clareza e segurança.
          </p>

          <div className="grid grid-cols-1 duo:grid-cols-2 gap-7 mb-11">
            <Link href="/imobiliaria" className={cardClasses}>
              <div>
                <h2 className="heading-serif text-xl font-bold text-white mb-4 flex items-center justify-center gap-[9px]">
                  <Home className="w-5 h-5 text-cyan-ghost" strokeWidth={2.25} aria-hidden />
                  <span>
                    Soluções <span className="text-cyan-ghost">Imobiliárias</span>
                  </span>
                </h2>
                <p className="text-[#A3B8BC] text-sm leading-[1.55] mb-6 min-h-[3.8em]">
                  Matrículas, certidões, ITBI, registros, contratos, prazos e obrigações do seu
                  imóvel em um só lugar, com acompanhamento digital de cada etapa.
                </p>
                <Chips itens={['Certidões', 'ITBI', 'Registro', 'Leilões']} />
              </div>
              <span className="inline-flex items-center justify-center gap-2 w-full px-5 py-[13px] rounded-button font-semibold text-sm bg-cyan-ghost text-[#051315] whitespace-nowrap">
                Acessar Soluções Imobiliárias →
              </span>
            </Link>

            <Link href="/seguros" className={cardClasses}>
              <div>
                <h2 className="heading-serif text-xl font-bold text-white mb-4 flex items-center justify-center gap-[9px]">
                  <Shield className="w-5 h-5 text-cyan-ghost" strokeWidth={2} aria-hidden />
                  <span>
                    Seguros &amp; <span className="text-cyan-ghost">Consórcios</span>
                  </span>
                </h2>
                <p className="text-[#A3B8BC] text-sm leading-[1.55] mb-6 min-h-[3.8em]">
                  Proteja o que você conquistou e planeje seus próximos projetos com seguros e
                  consórcios adequados ao seu momento.
                </p>
                <Chips itens={['Auto', 'Residencial', 'Vida', 'Consórcios']} />
              </div>
              <span className="inline-flex items-center justify-center gap-2 w-full px-5 py-[11.5px] rounded-button font-semibold text-sm bg-transparent text-cyan-ghost border-[1.5px] border-cyan-ghost whitespace-nowrap transition-all group-hover:bg-cyan-ghost/10 group-hover:shadow-[0_0_12px_rgba(50,197,230,0.2)]">
                Acessar Seguros &amp; Consórcios →
              </span>
            </Link>
          </div>

          <p className="text-[#A3B8BC] text-[15px] font-medium tracking-[0.2px] opacity-85 mt-10">
            Escolha a solução que corresponde ao seu momento.
          </p>
        </div>
      </main>
    </div>
  )
}
