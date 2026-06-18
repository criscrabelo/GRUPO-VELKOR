import { Scale, HardHat, Compass, ShieldCheck } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/config'

const IsabelaPradoLogo = () => (
  <div className="flex flex-col items-center justify-center p-4 bg-[#3d3d3d] rounded-xl w-full h-32 shadow-sm">
    <svg
      width="36"
      height="36"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-3"
    >
      <path d="M45 20H75V85H65V55H55V85H45V20Z" stroke="white" strokeWidth="4" />
      <path d="M25 45H45V85H35V65H25V85H15V45Z" stroke="white" strokeWidth="4" />
    </svg>
    <div className="text-white font-serif text-[12px] sm:text-[14px] tracking-[0.15em] leading-none text-center">
      ISABELA PRADO
    </div>
    <div className="text-white text-[7px] sm:text-[8px] tracking-[0.3em] mt-2">
      E N G E N H A R I A
    </div>
  </div>
)

const TetraLogo = () => (
  <div className="flex flex-col items-center justify-center p-4 bg-[#0a2f25] rounded-xl w-full h-32 shadow-sm">
    <svg
      width="36"
      height="36"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-2"
    >
      <path d="M50 15L85 50V85H65V60H35V85H15V50L50 15Z" fill="#d4af37" />
    </svg>
    <div className="text-[#d4af37] font-sans font-bold text-[18px] sm:text-[22px] tracking-wider leading-none mt-1">
      TETRA
    </div>
    <div className="text-[#d4af37] text-[7px] sm:text-[8px] tracking-[0.2em] mt-1">
      I M O B I L I Á R I A
    </div>
  </div>
)

const MonitorRemotoLogo = () => (
  <div className="flex flex-col items-center justify-center p-4 bg-white border border-slate-100 rounded-xl w-full h-32 shadow-sm">
    <ShieldCheck className="w-8 h-8 text-blue-600 mb-2" />
    <div className="flex items-center gap-1">
      <span className="text-blue-900 font-bold text-[14px] sm:text-[16px] tracking-tight leading-none">
        MONITOR
      </span>
      <span className="text-blue-600 font-medium text-[14px] sm:text-[16px] tracking-tight leading-none">
        REMOTO
      </span>
    </div>
  </div>
)

const CarneiroRabeloLogo = () => (
  <div className="flex flex-col items-center justify-center p-4 bg-[#1a1a1a] rounded-xl w-full h-32 shadow-sm">
    <Scale className="w-7 h-7 text-amber-500 mb-2" />
    <div className="text-white font-serif text-[11px] sm:text-[13px] tracking-[0.2em] leading-tight text-center">
      CARNEIRO
      <br />
      RABELO
    </div>
    <div className="text-amber-500 text-[7px] sm:text-[8px] tracking-[0.3em] mt-2">ADVOCACIA</div>
  </div>
)

export function PartnersSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale':
        return <Scale className="w-8 h-8 text-cyan" />
      case 'HardHat':
        return <HardHat className="w-8 h-8 text-cyan" />
      case 'Compass':
        return <Compass className="w-8 h-8 text-cyan" />
      default:
        return <Scale className="w-8 h-8 text-cyan" />
    }
  }

  const getDesc = (id: string) => {
    switch (id) {
      case 'legal':
        return 'Advogados especialistas em direito imobiliário (OAB) acionados para execução de atos privativos e defesas em regularizações.'
      case 'engineering':
        return 'Peritos e engenheiros (CREA) homologados para laudos estruturais, retificação de área e desmembramentos complexos.'
      case 'architecture':
        return 'Profissionais habilitados (CAU) focados em aprovações prefeiturais, projetos de regularização e alvarás.'
      default:
        return ''
    }
  }

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-petrol mb-4">
            Nossos Parceiros Especializados
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            A VELKOR atua como um hub orquestrador, coordenando toda a esteira documental. Para a
            execução técnica e jurídica de atos privativos, acionamos nossa seleta rede de
            especialistas homologados, garantindo segurança total.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {SITE_CONFIG.partnerCategories?.map((p, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-3xl shadow-lg shadow-petrol/5 border border-slate-100 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-cyan/10 rounded-2xl flex items-center justify-center mb-6 border border-cyan/20">
                {getIcon(p.icon)}
              </div>
              <h3 className="text-xl font-bold text-petrol mb-3">{p.label}</h3>
              <p className="text-slate-500 leading-relaxed">{getDesc(p.id)}</p>
            </div>
          ))}
        </div>

        <div className="pt-16 border-t border-slate-200/60">
          <h3 className="text-sm font-bold text-slate-400 tracking-widest text-center uppercase mb-10">
            EMPRESAS QUE CONFIAM NA EXCELÊNCIA VELKOR
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
              <IsabelaPradoLogo />
            </div>
            <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
              <TetraLogo />
            </div>
            <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
              <MonitorRemotoLogo />
            </div>
            <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
              <CarneiroRabeloLogo />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
