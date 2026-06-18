import { Button } from '@/components/ui/button'
import { ArrowRight, ShieldCheck, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SITE_CONFIG } from '@/lib/config'

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-white flex items-center min-h-[90vh]">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan/5 rounded-full blur-3xl opacity-70 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-petrol/5 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 text-cyan text-sm font-bold uppercase tracking-widest mb-8 border border-cyan/20 animate-fade-in-up">
            <ShieldCheck className="w-4 h-4" />
            Sua Central de Regularização
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-petrol leading-[1.1] mb-6 md:mb-8 animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            Governança e segurança para o seu patrimônio.
          </h1>

          <p
            className="text-lg md:text-xl text-slate-600 mb-8 md:mb-10 leading-relaxed max-w-2xl animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            {SITE_CONFIG.slogan}. Estruturamos e coordenamos toda a esteira documental imobiliária.
            Tudo com inteligência, compliance e previsibilidade.
          </p>

          <div
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 text-slate-700 text-sm font-medium border border-slate-200 shadow-sm mb-8 md:mb-10 animate-fade-in-up"
            style={{ animationDelay: '250ms' }}
          >
            <MapPin className="w-5 h-5 text-cyan shrink-0" />
            <span>
              Sediados em <strong>Taubaté - Vale do Paraíba</strong> | Atendimento em{' '}
              <strong>todo o Brasil</strong>
            </span>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up w-full sm:w-auto"
            style={{ animationDelay: '300ms' }}
          >
            <Button
              asChild
              size="lg"
              className="bg-cyan text-petrol hover:bg-cyan/90 font-bold h-14 px-8 text-base md:text-lg rounded-xl shadow-lg shadow-cyan/20 w-full sm:w-auto"
            >
              <Link to="/contratar">
                Consultar Soluções
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base md:text-lg rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700 font-bold w-full sm:w-auto"
            >
              <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noreferrer">
                Falar com Especialista
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
