import { MapPin } from 'lucide-react'

export function CoverageSection() {
  return (
    <section className="py-24 bg-petrol text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-cyan/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/20 border border-cyan/50 text-cyan text-sm font-bold tracking-wider uppercase">
            <MapPin className="w-4 h-4" /> Vale do Paraíba / SP
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
            Presença Regional Fortalecida
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Nossa matriz estratégica atende com excelência todo o Vale do Paraíba (São José dos
            Campos, Taubaté, Jacareí e região), garantindo agilidade em diligências e protocolos
            físicos nos cartórios locais.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <div className="absolute w-64 h-64 rounded-full border border-cyan/20 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute w-48 h-48 rounded-full border border-cyan/40 animate-[spin_15s_linear_infinite_reverse]"></div>

            {/* Map Pins */}
            <div className="absolute top-1/4 left-1/4">
              <div className="w-3 h-3 bg-cyan rounded-full animate-ping absolute"></div>
              <div className="w-3 h-3 bg-cyan rounded-full relative z-10"></div>
            </div>
            <div className="absolute bottom-1/3 right-1/4">
              <div
                className="w-4 h-4 bg-cyan rounded-full animate-ping absolute"
                style={{ animationDelay: '1s' }}
              ></div>
              <div className="w-4 h-4 bg-cyan rounded-full relative z-10"></div>
            </div>
            <div className="absolute top-1/2 left-2/3">
              <div
                className="w-2 h-2 bg-cyan rounded-full animate-ping absolute"
                style={{ animationDelay: '0.5s' }}
              ></div>
              <div className="w-2 h-2 bg-cyan rounded-full relative z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
