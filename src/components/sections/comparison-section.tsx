import { useState } from 'react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function ComparisonSection() {
  const { ref, isVisible } = useScrollReveal()
  const [view, setView] = useState<'before' | 'after'>('after')

  return (
    <section ref={ref} className="py-20 md:py-32 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <h2
              className={cn(
                'text-3xl md:text-4xl font-bold text-slate-900 opacity-0',
                isVisible && 'animate-fade-in-up',
              )}
            >
              Chega de caos. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500">
                Assuma o controle.
              </span>
            </h2>
            <p
              className={cn('text-lg text-slate-600 opacity-0', isVisible && 'animate-fade-in-up')}
              style={{ animationDelay: '100ms' }}
            >
              Veja a diferença que uma plataforma centralizada pode fazer na sua rotina diária.
              Substitua dezenas de abas abertas por um único hub de produtividade.
            </p>

            <div
              className={cn(
                'flex items-center gap-4 bg-white p-2 rounded-lg border border-slate-200 inline-flex shadow-sm opacity-0',
                isVisible && 'animate-fade-in-up',
              )}
              style={{ animationDelay: '200ms' }}
            >
              <Button
                variant={view === 'before' ? 'default' : 'ghost'}
                onClick={() => setView('before')}
                className={cn(
                  'px-6',
                  view === 'before'
                    ? 'bg-slate-800 text-white hover:bg-slate-700'
                    : 'text-slate-600',
                )}
              >
                Antes
              </Button>
              <Button
                variant={view === 'after' ? 'default' : 'ghost'}
                onClick={() => setView('after')}
                className="px-6"
              >
                Com NexFlow
              </Button>
            </div>

            <div
              className={cn('space-y-4 opacity-0', isVisible && 'animate-fade-in-up')}
              style={{ animationDelay: '300ms' }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'mt-1 w-2 h-2 rounded-full flex-shrink-0',
                    view === 'before' ? 'bg-red-500' : 'bg-green-500',
                  )}
                />
                <p className="text-slate-700">
                  {view === 'before'
                    ? 'Dados espalhados em múltiplas planilhas difíceis de atualizar.'
                    : 'Todos os dados sincronizados em tempo real em um único lugar.'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'mt-1 w-2 h-2 rounded-full flex-shrink-0',
                    view === 'before' ? 'bg-red-500' : 'bg-green-500',
                  )}
                />
                <p className="text-slate-700">
                  {view === 'before'
                    ? 'Processos manuais que tomam horas da sua equipe.'
                    : 'Automações inteligentes que liberam sua equipe para o trabalho criativo.'}
                </p>
              </div>
            </div>
          </div>

          <div
            className={cn('lg:w-1/2 w-full opacity-0', isVisible && 'animate-fade-in')}
            style={{ animationDelay: '400ms' }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-white transition-all duration-500 ease-in-out aspect-[4/3]">
              {view === 'before' ? (
                <img
                  src="https://img.usecurling.com/p/800/600?q=messy%20office&color=gray"
                  alt="Situação antes do produto"
                  className="w-full h-full object-cover animate-fade-in"
                />
              ) : (
                <img
                  src="https://img.usecurling.com/p/800/600?q=modern%20clean%20office&color=blue"
                  alt="Situação depois do produto"
                  className="w-full h-full object-cover animate-fade-in"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
