import { Link } from 'react-router-dom'
import { Building2, ShieldCheck, ArrowRight } from 'lucide-react'

export default function Gateway() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://img.usecurling.com/p/1920/1080?q=modern%20architecture&color=black&dpr=2"
          alt="Bg"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-petrol/95 via-slate-900/95 to-slate-900/90" />
      </div>

      <div className="z-10 container px-4 max-w-5xl flex flex-col items-center py-12 mb-8">
        <div className="mb-12 text-center animate-fade-in-down">
          <h1 className="text-white text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">
            VELKOR SOLUÇÕES IMOBILIÁRIAS
          </h1>
          <p className="text-cyan text-lg max-w-2xl mx-auto">
            Selecione a unidade de negócio para acessar nossos serviços.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl animate-fade-in-up">
          <Link
            to="/solucoes"
            className="group relative bg-white rounded-2xl p-8 shadow-2xl transition-all hover:-translate-y-2 hover:border-cyan border-2 border-transparent flex flex-col items-center text-center overflow-hidden"
          >
            <div className="w-20 h-20 bg-petrol/5 rounded-2xl rotate-3 group-hover:rotate-6 flex items-center justify-center mb-6 z-10 transition-transform">
              <Building2 className="w-10 h-10 text-petrol group-hover:text-cyan transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-petrol mb-4 z-10">
              VELKOR SOLUÇÕES IMOBILIÁRIAS
            </h2>
            <p className="text-slate-600 mb-8 z-10">
              Regularização patrimonial, due diligence, leilões e compra segura.
            </p>
            <div className="flex items-center text-cyan font-bold group-hover:translate-x-2 transition-transform z-10">
              Acessar Portal <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </Link>

          <div className="group relative bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 shadow-xl border-2 border-slate-700 flex flex-col items-center text-center">
            <div className="absolute top-6 right-6 bg-cyan/20 text-cyan text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan"></span> EM BREVE
            </div>
            <div className="w-20 h-20 bg-slate-700/50 rounded-2xl -rotate-3 flex items-center justify-center mb-6 z-10">
              <ShieldCheck className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 z-10">VELKOR Seguros</h2>
            <p className="text-slate-400 z-10">
              Proteção completa para patrimônio, vida e negócios. Soluções personalizadas.
            </p>
          </div>
        </div>
      </div>
      <div className="relative text-white/40 text-xs text-center z-10 w-full font-medium pb-4">
        &copy; {new Date().getFullYear()} VELKOR SOLUÇÕES IMOBILIÁRIAS. Todos os direitos
        reservados.
      </div>
    </div>
  )
}
