import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const testimonials = [
  {
    name: 'Ana Silva',
    role: 'Investidora Imobiliária',
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    content:
      'A assessoria em leilões da VELKOR me deu a segurança que eu precisava para investir. O processo foi conduzido com extrema transparência e profissionalismo.',
  },
  {
    name: 'Carlos Mendes',
    role: 'Diretor de Expansão, VarejoCorp',
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2',
    content:
      'A Due Diligence Documental executada pela rede de parceiros da VELKOR evitou que entrássemos em um negócio de alto risco. Eles são meticulosos em cada detalhe.',
  },
  {
    name: 'Juliana Costa',
    role: 'Compradora de Imóvel',
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=3',
    content:
      'Graças ao serviço de Compra Segura, realizei o sonho da casa própria sem surpresas desagradáveis. A organização documental feita por eles foi impecável.',
  },
  {
    name: 'Roberto Alves',
    role: 'Gestor Patrimonial',
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4',
    content:
      'Centralizamos todas as regularizações do nosso portfólio no Hub da VELKOR. É muito prático ter um único ponto de contato orquestrando todas as soluções.',
  },
]

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section
      id="depoimentos"
      ref={ref}
      className="py-20 md:py-32 bg-petrol overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-cyan/20 rounded-full blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-cyan/20 rounded-full blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-cyan font-bold tracking-wider uppercase text-sm mb-4 block">
            Depoimentos
          </span>
          <h2
            className={cn(
              'text-3xl md:text-4xl font-display font-bold text-white mb-4 opacity-0',
              isVisible && 'animate-fade-in-up',
            )}
          >
            Reconhecimento de quem confia em nós
          </h2>
          <p
            className={cn('text-lg text-white/70 opacity-0', isVisible && 'animate-fade-in-up')}
            style={{ animationDelay: '100ms' }}
          >
            Veja o que nossos clientes têm a dizer sobre a excelência dos serviços orquestrados pela
            VELKOR.
          </p>
        </div>

        <div
          className={cn('max-w-5xl mx-auto opacity-0', isVisible && 'animate-fade-in-up')}
          style={{ animationDelay: '200ms' }}
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl h-full flex flex-col hover:bg-white/15 transition-colors">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-white text-lg leading-relaxed mb-8 flex-1">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full border-2 border-cyan"
                      />
                      <div>
                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-sm text-white/60">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious className="static bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white translate-y-0" />
              <CarouselNext className="static bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
