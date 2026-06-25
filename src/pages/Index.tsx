import { HeroSection } from '@/components/sections/hero-section'
import { EcosystemSection } from '@/components/sections/ecosystem-section'
import { ServicesSection } from '@/components/sections/services-section'
import { PricingSection } from '@/components/sections/pricing-section'
import { CoverageSection } from '@/components/sections/coverage-section'
import { SocialProofSection } from '@/components/sections/social-proof-section'
import { FaqSection } from '@/components/sections/faq-section'
import { PartnersSection } from '@/components/sections/partners-section'
import { AuctionsSection } from '@/components/sections/auctions-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ForWhomSection } from '@/components/sections/for-whom-section'

export default function Index() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeroSection />
      <section className="py-16 md:py-24 bg-white relative" id="quem-somos">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="text-cyan font-bold tracking-wider uppercase text-xs md:text-sm mb-3 md:mb-4 block">
            Quem Somos
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-petrol mb-6 leading-tight">
            Consultoria e Soluções Especializadas
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6">
            A VELKOR não é uma imobiliária, nem um escritório de advocacia. Nós atuamos como um
            autêntico <strong>Despachante Documental Imobiliário</strong>, com foco na organização,
            protocolo e acompanhamento contínuo de processos administrativos. Sediados em{' '}
            <strong>Taubaté, Vale do Paraíba</strong>, nossa estrutura permite atendimento ágil e
            especializado em âmbito nacional.
          </p>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            Nosso papel é orquestrar toda a sua jornada documental do início ao fim, coordenando
            emissões, pagamentos de guias e registros, acionando nossa rede de{' '}
            <strong>parceiros técnicos especializados</strong> apenas quando a execução de atos
            privativos (como projetos de engenharia ou ações judiciais) se faz necessária.
          </p>
        </div>
      </section>
      <ForWhomSection />
      <SocialProofSection />
      <TestimonialsSection />
      <EcosystemSection />
      <PartnersSection />
      <ServicesSection />
      <AuctionsSection />
      <PricingSection />
      <CoverageSection />
      <FaqSection />
    </div>
  )
}
