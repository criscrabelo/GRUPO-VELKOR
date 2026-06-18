import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'

const logos = [
  { name: 'Acme', url: 'https://img.usecurling.com/i?q=acme&color=black&shape=outline' },
  { name: 'Stripe', url: 'https://img.usecurling.com/i?q=stripe&color=black&shape=outline' },
  { name: 'Google', url: 'https://img.usecurling.com/i?q=google&color=black&shape=outline' },
  { name: 'Amazon', url: 'https://img.usecurling.com/i?q=amazon&color=black&shape=outline' },
  { name: 'Netflix', url: 'https://img.usecurling.com/i?q=netflix&color=black&shape=outline' },
]

export function SocialProofSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section ref={ref} className="py-10 border-y border-gray-100 bg-slate-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <p
          className={cn(
            'text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8 opacity-0',
            isVisible && 'animate-fade-in-up',
          )}
        >
          Confiado por equipes inovadoras em todo o mundo
        </p>
        <div
          className={cn(
            'flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-0',
            isVisible && 'animate-fade-in-up',
          )}
          style={{ animationDelay: '100ms' }}
        >
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center w-24 md:w-32 h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={logo.url}
                alt={`Logo ${logo.name}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
