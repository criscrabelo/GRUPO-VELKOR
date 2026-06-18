import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'

export function HeroSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section ref={ref} className="relative overflow-hidden pt-16 md:pt-24 pb-20 lg:pt-32 lg:pb-28">
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-indigo-50 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-cyan-50 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <div
              className={cn('opacity-0', isVisible && 'animate-fade-in-up')}
              style={{ animationDelay: '0ms' }}
            >
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 mb-6">
                ✨ Novo recurso: Automações com IA
              </span>
            </div>
            <h1
              className={cn(
                'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 opacity-0',
                isVisible && 'animate-fade-in-up',
              )}
              style={{ animationDelay: '100ms' }}
            >
              Transforme sua produtividade com um{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500">
                clique
              </span>
            </h1>
            <p
              className={cn(
                'text-lg md:text-xl text-slate-600 mb-8 leading-relaxed opacity-0',
                isVisible && 'animate-fade-in-up',
              )}
              style={{ animationDelay: '200ms' }}
            >
              A plataforma completa para gerenciar, automatizar e escalar seu negócio digital.
              Simplifique fluxos de trabalho e foque no que realmente importa.
            </p>
            <div
              className={cn(
                'flex flex-col sm:flex-row gap-4 opacity-0',
                isVisible && 'animate-fade-in-up',
              )}
              style={{ animationDelay: '300ms' }}
            >
              <Button
                size="lg"
                className="h-12 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
              >
                Começar Gratuitamente <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base bg-white/50 backdrop-blur-sm"
              >
                <Play className="mr-2 w-4 h-4 fill-current" /> Ver Demonstração
              </Button>
            </div>
            <p
              className={cn(
                'text-sm text-slate-500 mt-4 opacity-0',
                isVisible && 'animate-fade-in-up',
              )}
              style={{ animationDelay: '400ms' }}
            >
              Sem necessidade de cartão de crédito. Teste grátis por 14 dias.
            </p>
          </div>

          <div
            className={cn(
              'relative mx-auto w-full max-w-lg lg:max-w-none opacity-0',
              isVisible && 'animate-fade-in',
            )}
            style={{ animationDelay: '400ms', animationDuration: '1s' }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white/40 backdrop-blur-sm p-2 animate-float">
              <img
                src="https://img.usecurling.com/p/800/600?q=dashboard%20interface&color=blue&dpr=2"
                alt="Interface do Dashboard NexFlow"
                className="rounded-xl w-full h-auto border border-gray-100/50 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
