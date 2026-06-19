import { HeroSection } from '@/components/sections/hero-section'
import { ForWhomSection } from '@/components/sections/for-whom-section'
import { EcosystemSection } from '@/components/sections/ecosystem-section'
import { ServicesSection } from '@/components/sections/services-section'
import { PricingSection } from '@/components/sections/pricing-section'
import { CoverageSection } from '@/components/sections/coverage-section'
import { SocialProofSection } from '@/components/sections/social-proof-section'
import { FaqSection } from '@/components/sections/faq-section'
import { PartnersSection } from '@/components/sections/partners-section'
import { AuctionsSection } from '@/components/sections/auctions-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'

export default function Index() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeroSection />
      <ForWhomSection />
      <section className="py-16 md:py-24 bg-white relative" id="quem-somos">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="text-cyan font-bold tracking-wider uppercase text-xs md:text-sm mb-3 md:mb-4 block">
            Quem Somos
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-petrol mb-6 leading-tight">
            Despachante documental imobiliário com atuação administrativa e rede de especialistas.
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6">
            A VELKOR Soluções Imobiliárias atua na organização, emissão, conferência, protocolo
            e acompanhamento de documentos relacionados a imóveis, escrituras, registros,
            certidões, ITBI, averbações, financiamento documental, Habite-se, CND de obra e
            regularização administrativa.
          </p>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6">
            Nosso trabalho é ajudar pessoas físicas, empresas, construtoras, incorporadoras e
            holdings patrimoniais a entenderem quais documentos precisam providenciar, quais
            pendências podem travar o processo e quais etapas devem ser acompanhadas perante
            cartórios, prefeituras, bancos e órgãos públicos.
          </p>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            A VELKOR não vende imóveis, não faz corretagem, não emite parecer jurídico e não
            assina laudos técnicos. Quando a demanda exigir atuação privativa de advogado,
            engenheiro, arquiteto, contador, corretor ou outro profissional regulamentado, o
            cliente poderá ser direcionado a parceiros habilitados, mediante contratação própria e
            independente.
          </p>
        </div>
      </section>
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
