import { Button } from '@/components/ui/button'
import { ArrowRight, ShieldCheck, MapPin, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SITE_CONFIG } from '@/lib/config'

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-white flex items-center min-h-[90vh] overflow-hidden">
      {/* Decorativo ajustado — sem overflow cortado */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-3xl opacity-60 translate-x-1/4 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-petrol/5 rounded-full blur-3xl opacity-40 -translate-x-1/4 translate-y-1/4 pointer-events-none" />
      {/* Linha diagonal decorativa — bem posicionada */}
      <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-cyan/20 to-transparent pointer-events-none hidden lg:block" />

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
            Sua única preocupação será a entrega das chaves.
          </h1>

          {/* Subtítulo reduzido — direto e objetivo */}
          <p
            className="text-lg md:text-xl text-slate-600 mb-8 md:mb-10 leading-relaxed max-w-xl animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            Coordenamos certidões, ITBI, escritura e registro — do início ao fim, sem vai-e-vem.
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

          {/* 2 CTAs principais */}
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

          {/* 3º CTA secundário — âncora scroll */}
          <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <a
              href="#quem-somos"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan text-sm font-medium transition-colors group"
            >
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              Ver como funciona
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
