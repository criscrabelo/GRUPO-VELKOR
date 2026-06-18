import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function HeroSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 w-full h-full">
        {/* Left side gradient panel */}
        <div className="bg-gradient-to-br from-petrol to-[#0a2327] relative overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 lg:pt-0">
          {/* Decorative slash */}
          <div
            className="absolute top-0 right-0 w-[200%] h-[100%] pointer-events-none"
            style={{
              background:
                'linear-gradient(115deg, transparent 40%, rgba(25, 200, 232, 0.05) 40%, rgba(25, 200, 232, 0.05) 60%, transparent 60%)',
            }}
          />

          <div className="relative z-10 max-w-xl">
            <span
              className={cn(
                'inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan bg-cyan/10 border border-cyan/20 mb-8 opacity-0',
                isVisible && 'animate-fade-in-up',
              )}
              style={{ animationDelay: '0ms' }}
            >
              Ecossistema Imobiliário
            </span>

            <h1
              className={cn(
                'text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white mb-6 opacity-0 leading-[1.1]',
                isVisible && 'animate-fade-in-up',
              )}
              style={{ animationDelay: '100ms' }}
            >
              A evolução do seu patrimônio com a <span className="text-cyan">VELKOR</span>.
            </h1>

            <p
              className={cn(
                'text-lg text-white/70 mb-10 leading-relaxed opacity-0 max-w-lg',
                isVisible && 'animate-fade-in-up',
              )}
              style={{ animationDelay: '200ms' }}
            >
              Plataforma all-in-one para avaliação, gestão, assessoria jurídica e marketing visual
              de imóveis. Descomplique a administração do seu portfólio.
            </p>

            <div
              className={cn(
                'flex flex-col sm:flex-row gap-4 opacity-0',
                isVisible && 'animate-fade-in-up',
              )}
              style={{ animationDelay: '300ms' }}
            >
              <Link to="/contratar">
                <Button
                  size="lg"
                  className="h-14 px-8 text-base bg-cyan text-petrol hover:bg-cyan/90 font-bold w-full sm:w-auto shadow-lg shadow-cyan/20 rounded-xl"
                >
                  Contratar Serviços <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/cliente">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base border-white/20 text-white hover:bg-white/10 w-full sm:w-auto font-bold rounded-xl"
                >
                  Acessar Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right side image */}
        <div className="relative hidden lg:block h-full">
          <div className="absolute inset-0 bg-petrol/30 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2327] to-transparent z-20 w-32" />
          <img
            src="https://img.usecurling.com/p/1200/1600?q=modern%20architecture%20real%20estate&color=blue&dpr=2"
            alt="Arquitetura Moderna"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
