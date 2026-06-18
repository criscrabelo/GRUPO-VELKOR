import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col md:flex-row overflow-hidden bg-white">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 z-10 pt-24 md:pt-16">
        <div className="max-w-xl animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-cyan/10 text-cyan text-xs font-bold uppercase tracking-widest mb-6">
            Hub de Soluções Imobiliárias
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-petrol mb-6 leading-tight">
            Descomplique a Gestão do seu Patrimônio
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
            Centralize sua documentação e regularização imobiliária no Vale do Paraíba. Uma única
            plataforma para garantir segurança administrativa sem complicações.
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
            <a href="#precos" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-2 border-slate-200 text-slate-600 font-bold h-14 px-8 rounded-xl hover:bg-slate-50"
              >
                Ver Valores
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-full flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 relative min-h-[30vh]">
          <img
            src="https://img.usecurling.com/p/800/1200?q=modern%20architecture&color=blue"
            alt="Modern Architecture"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-petrol/20 mix-blend-multiply"></div>
        </div>
        <div className="w-full sm:w-1/2 bg-cyan flex flex-col items-center justify-center p-8 text-petrol text-center relative overflow-hidden min-h-[30vh]">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          ></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-display font-bold mb-4">100% Digital</h3>
            <p className="font-medium text-petrol/80 mb-8">
              Certidões, matrículas, registros e análises diretamente do seu dispositivo.
            </p>
            <Link to="/cliente">
              <Button
                size="lg"
                className="bg-petrol hover:bg-petrol/90 text-white font-bold h-12 px-6 rounded-xl shadow-lg shadow-petrol/20"
              >
                Acessar Portal do Cliente
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
