import { Scale } from 'lucide-react'

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

export function SocialProofSection() {
  return (
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
  )
}
