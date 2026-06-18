import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col md:flex-row overflow-hidden bg-white">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 z-10 pt-24 md:pt-16">
        <div className="max-w-xl animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-petrol mb-6 leading-tight">
            Gestão Patrimonial do Futuro
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
            Centralize sua operação imobiliária com segurança jurídica, inteligência de dados e a
            eficiência estrutural do Grupo Velkor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contratar" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-petrol hover:bg-petrol/90 text-white font-bold h-14 px-8 rounded-xl shadow-lg shadow-petrol/20"
              >
                Iniciar Contratação
              </Button>
            </Link>
            <Link to="/cliente" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-2 border-petrol text-petrol font-bold h-14 px-8 rounded-xl hover:bg-cyan/5"
              >
                Acessar Portal
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-full bg-gradient-to-br from-petrol to-cyan flex items-center justify-center p-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        ></div>
        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl max-w-sm w-full animate-float">
          <div className="h-48 rounded-xl bg-white/20 mb-6 flex flex-col items-center justify-center text-white p-4 text-center">
            <div className="w-16 h-16 rounded-full bg-cyan/20 border border-cyan/50 flex items-center justify-center mb-4">
              <div className="w-3 h-3 bg-cyan rounded-full animate-ping absolute"></div>
              <div className="w-3 h-3 bg-cyan rounded-full relative z-10"></div>
            </div>
            <span className="font-display font-bold text-xl mb-1">100% Digital</span>
            <span className="text-sm text-white/80">Plataforma integrada</span>
          </div>
          <div className="space-y-3">
            <div className="h-3 bg-white/30 rounded-full w-3/4"></div>
            <div className="h-3 bg-white/20 rounded-full w-1/2"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
