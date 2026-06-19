import { Scale } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'

const IsabelaPradoLogo = () => (
  <div className="flex flex-col items-center justify-center p-4 bg-[#3d3d3d] rounded-xl w-full h-28 shadow-sm">
    <svg
      width="32"
      height="32"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-2"
    >
      <path d="M45 20H75V85H65V55H55V85H45V20Z" stroke="white" strokeWidth="4" />
      <path d="M25 45H45V85H35V65H25V85H15V45Z" stroke="white" strokeWidth="4" />
    </svg>
    <div className="text-white font-serif text-[11px] sm:text-[13px] tracking-[0.15em] leading-none text-center">
      ISABELA PRADO
    </div>
    <div className="text-white text-[7px] sm:text-[8px] tracking-[0.3em] mt-1.5">
      E N G E N H A R I A
    </div>
  </div>
)

const TetraLogo = () => (
  <div className="flex flex-col items-center justify-center p-4 bg-[#0a2f25] rounded-xl w-full h-28 shadow-sm">
    <svg
      width="32"
      height="32"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-2"
    >
      <path d="M50 15L85 50V85H65V60H35V85H15V50L50 15Z" fill="#d4af37" />
    </svg>
    <div className="text-[#d4af37] font-sans font-bold text-[16px] sm:text-[20px] tracking-wider leading-none mt-1">
      TETRA
    </div>
    <div className="text-[#d4af37] text-[7px] sm:text-[8px] tracking-[0.2em] mt-1.5">
      I M O B I L I Á R I A
    </div>
  </div>
)

const CarneiroRabeloLogo = () => (
  <div className="flex flex-col items-center justify-center p-4 bg-[#1a1a1a] rounded-xl w-full h-28 shadow-sm">
    <Scale className="w-7 h-7 text-amber-500 mb-2" />
    <div className="text-white font-serif text-[10px] sm:text-[12px] tracking-[0.2em] leading-tight text-center">
      CARNEIRO
      <br />
      RABELO
    </div>
    <div className="text-amber-500 text-[7px] sm:text-[8px] tracking-[0.3em] mt-1.5">ADVOCACIA</div>
  </div>
)

// Dados das métricas
const metrics = [
  {
    value: '+1.200',
    label: 'processos documentais concluídos',
    highlight: false,
  },
  {
    value: '+850',
    label: 'famílias e empresas atendidas',
    highlight: false,
  },
  {
    value: '4,9/5',
    label: 'avaliação média dos clientes',
    highlight: false,
  },
  {
    value: '−50%',
    label: 'no prazo médio de regularização com know-how cartorário',
    highlight: true, // destaque especial
  },
]

export function SocialProofSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <>
      {/* Seção de Métricas — Cards com destaque visual */}
      <section ref={ref} className="py-20 md:py-28 bg-petrol relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan/10 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-14">
            <span className="text-cyan font-bold tracking-wider uppercase text-sm mb-3 block">
              Resultados & Confiança
            </span>
            <h2
              className={cn(
                'text-3xl md:text-4xl font-display font-bold text-white opacity-0',
                isVisible && 'animate-fade-in-up',
              )}
            >
              Famílias e empresas do Vale que já dormem tranquilas.
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {metrics.map((metric, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-2xl p-6 md:p-8 flex flex-col items-center text-center opacity-0 transition-all duration-300',
                  metric.highlight
                    ? 'bg-cyan/15 border-2 border-cyan/50 shadow-lg shadow-cyan/10 ring-1 ring-cyan/20'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10',
                  isVisible && 'animate-fade-in-up',
                )}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span
                  className={cn(
                    'text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-3 leading-none',
                    metric.highlight ? 'text-cyan' : 'text-white',
                  )}
                >
                  {metric.value}
                </span>
                <span className="text-white/60 text-sm leading-snug font-medium">
                  {metric.label}
                </span>
                {metric.highlight && (
                  <span className="mt-3 text-[10px] uppercase tracking-widest font-bold text-cyan/80 bg-cyan/10 px-3 py-1 rounded-full">
                    Diferencial
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Parceiros */}
      <section className="py-16 bg-slate-50 border-y border-slate-100 flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-10">
            Empresas que confiam na excelência VELKOR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 opacity-90">
            <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
              <IsabelaPradoLogo />
            </div>
            <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
              <TetraLogo />
            </div>
            <a
              href="https://monitorremoto.com.br/"
              target="_blank"
              rel="noreferrer"
              className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer block group"
            >
              <div className="group-hover:-translate-y-1 transition-transform duration-300 h-full">
                <CarneiroRabeloLogo />
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
