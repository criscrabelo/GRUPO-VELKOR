import { Link } from 'react-router-dom'
import { VelkorLogo } from '@/components/VelkorLogo'
import { Building2, ShieldCheck, ArrowRight } from 'lucide-react'

export default function Gateway() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background with abstract corporate feel */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://img.usecurling.com/p/1920/1080?q=modern%20architecture&color=black&dpr=2"
          alt="Corporate background"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-petrol/95 via-slate-900/95 to-slate-900/90" />
      </div>

      <div className="z-10 container mx-auto px-4 max-w-5xl flex flex-col items-center text-center py-12 md:py-20 mb-12">
        <div className="mb-12 md:mb-16 animate-fade-in-down">
          <VelkorLogo variant="light" className="h-14 md:h-20 mx-auto mb-6 md:mb-8" />
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4 md:mb-6 leading-tight">
            Bem-vindo ao Grupo VELKOR
          </h1>
          <p className="text-cyan text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Selecione a unidade de negócio desejada para acessar nossos serviços e soluções
            especializadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl animate-fade-in-up">
          {/* Real Estate Card */}
          <Link
            to="/imobiliaria"
            className="group relative bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan/20 border-2 border-transparent hover:border-cyan flex flex-col items-center text-center overflow-hidden w-full"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500" />
            <div className="w-20 h-20 bg-petrol/5 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-300 flex items-center justify-center mb-6 relative z-10">
              <Building2 className="w-10 h-10 text-petrol group-hover:text-cyan transition-colors duration-300" />
            </div>
            <h2 className="text-2xl font-bold text-petrol mb-4 relative z-10">
              VELKOR Soluções Imobiliárias
            </h2>
            <p className="text-slate-600 mb-8 flex-grow leading-relaxed relative z-10">
              Regularização patrimonial, due diligence, assessoria em leilões e compra segura com
              nossa rede de especialistas.
            </p>
            <div className="flex items-center text-cyan font-bold group-hover:translate-x-2 transition-transform duration-300 relative z-10">
              Acessar Portal <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </Link>

          {/* Insurance Card (Coming Soon) */}
          <div className="group relative bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border-2 border-slate-700 flex flex-col items-center text-center overflow-hidden w-full">
            <div className="absolute top-6 right-6 bg-cyan/20 text-cyan text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse"></span>
              Em Breve
            </div>
            <div className="w-20 h-20 bg-slate-700/50 rounded-2xl -rotate-3 flex items-center justify-center mb-6 relative z-10">
              <ShieldCheck className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 relative z-10">VELKOR Seguros</h2>
            <p className="text-slate-400 mb-8 flex-grow leading-relaxed relative z-10">
              Proteção completa para seu patrimônio, vida e negócios. Soluções personalizadas em
              seguros com a excelência do Grupo VELKOR.
            </p>
            <div className="flex items-center text-slate-500 font-bold cursor-not-allowed uppercase tracking-wide text-sm relative z-10">
              Aguarde Novidades
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 md:bottom-8 text-white/40 text-xs md:text-sm text-center z-10 w-full animate-fade-in font-medium px-4">
        &copy; {new Date().getFullYear()} Grupo VELKOR. Todos os direitos reservados.
      </div>
    </div>
  )
}
