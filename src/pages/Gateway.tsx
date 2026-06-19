import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { VelkorLogo } from '@/components/VelkorLogo'

const units = [
  {
    id: 'solucoes-imobiliarias',
    name: 'VELKOR Soluções Imobiliárias',
    subtitle: 'Soluções Imobiliárias',
    description:
      'Despachante documental imobiliário, regularização, escritura, registro, assembleias e compra segura.',
    link_url: '/solucoes',
    is_coming_soon: false,
  },
  {
    id: 'seguros-consorcios',
    name: 'VELKOR Seguros & Consórcios',
    subtitle: 'Seguros & Consórcios',
    description: 'Seguros, consórcios e proteção patrimonial para pessoas, famílias e empresas.',
    link_url: '#',
    is_coming_soon: true,
  },
]

function UnitLogo({ subtitle, muted = false }: { subtitle: string; muted?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <VelkorLogo variant="light" className="h-16 md:h-20 w-auto" />
      <span
        className={`font-display text-2xl md:text-3xl tracking-wide ${
          muted ? 'text-white/65' : 'text-white'
        }`}
      >
        {subtitle}
      </span>
    </div>
  )
}

export default function Gateway() {
  return (
    <div className="min-h-[100dvh] bg-[#0b1820] flex flex-col items-center relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#18c7d8]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#18c7d8]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(24,199,216,0.08),transparent_55%)] pointer-events-none" />

      <header className="z-10 w-full pt-10 pb-6 flex justify-center items-center">
        <span className="text-slate-200 font-semibold tracking-[0.28em] text-xs md:text-sm uppercase">
          Grupo VELKOR
        </span>
      </header>

      <main className="z-10 container px-6 w-full max-w-6xl flex-1 flex flex-col items-center justify-center pb-16">
        <div className="mb-12 text-center w-full flex flex-col items-center animate-fade-in-down">
          <h1 className="text-white text-3xl md:text-[48px] font-bold tracking-tight mb-5 leading-tight">
            Bem-vindo ao ecossistema VELKOR
          </h1>
          <p className="text-[#18c7d8] text-base md:text-[1.125rem] max-w-3xl mx-auto font-medium leading-relaxed">
            Escolha a unidade de negócio e acesse soluções para proteger, organizar e resolver.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-[960px] animate-fade-in-up">
          {units.map((unit) =>
            unit.is_coming_soon ? (
              <div
                key={unit.id}
                className="relative bg-[#111c25]/95 rounded-3xl p-8 md:p-10 border border-slate-700/80 flex flex-col items-center text-center overflow-hidden cursor-not-allowed group min-h-[380px]"
              >
                <div className="absolute inset-0 bg-slate-950/35 z-0 pointer-events-none" />
                <div className="absolute top-5 right-5 z-20">
                  <div className="relative bg-gradient-to-r from-[#18c7d8] to-petrol text-white text-[11px] uppercase font-black tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(24,199,216,0.35)] border border-[#18c7d8]/30">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    EM BREVE
                  </div>
                </div>

                <div className="w-full min-h-[150px] flex items-center justify-center mb-8 relative z-10 shrink-0 px-4 opacity-70 grayscale">
                  <UnitLogo subtitle={unit.subtitle} muted />
                </div>

                <h2 className="text-[1.4rem] font-bold text-white mb-3 relative z-10 opacity-95">
                  {unit.name}
                </h2>
                <p className="text-slate-400 mb-10 leading-relaxed text-[15px] max-w-[330px] relative z-10 opacity-90">
                  {unit.description}
                </p>

                <div className="mt-auto flex items-center text-slate-600 font-semibold text-[15px] relative z-10 pointer-events-none">
                  Em breve <ArrowRight className="ml-2 w-4 h-4 opacity-50" />
                </div>
              </div>
            ) : (
              <Link
                key={unit.id}
                to={unit.link_url}
                className="group relative bg-[#123f46] rounded-3xl p-8 md:p-10 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[#18c7d8]/20 flex flex-col items-center text-center overflow-hidden border border-[#18c7d8]/20 hover:border-[#18c7d8]/60 min-h-[380px]"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#18c7d8]/10 rounded-bl-full -mr-20 -mt-20 transition-transform group-hover:scale-110 duration-500" />
                <div className="w-full min-h-[150px] flex items-center justify-center mb-8 relative z-10 shrink-0 px-4">
                  <UnitLogo subtitle={unit.subtitle} />
                </div>
                <h2 className="text-[1.4rem] font-bold text-white mb-3 relative z-10">{unit.name}</h2>
                <p className="text-white/75 mb-10 leading-relaxed text-[15px] max-w-[340px] relative z-10">
                  {unit.description}
                </p>
                <div className="mt-auto flex items-center text-[#18c7d8] font-bold text-[15px] group-hover:translate-x-1 transition-transform duration-300 relative z-10">
                  Acessar portal <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Link>
            ),
          )}
        </div>
      </main>

      <footer className="w-full py-6 text-center z-10 text-slate-500/60 text-[13px] font-medium mt-auto">
        &copy; 2026 Grupo VELKOR. Todos os direitos reservados.
      </footer>
    </div>
  )
}
