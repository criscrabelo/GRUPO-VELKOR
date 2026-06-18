import { HeroSection } from '@/components/sections/hero-section'
import { EcosystemSection } from '@/components/sections/ecosystem-section'
import { ServicesSection } from '@/components/sections/services-section'
import { PricingSection } from '@/components/sections/pricing-section'
import { CoverageSection } from '@/components/sections/coverage-section'
import { SocialProofSection } from '@/components/sections/social-proof-section'
import { FaqSection } from '@/components/sections/faq-section'
import { PartnersSection } from '@/components/sections/partners-section'

export default function Index() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeroSection />
      <section className="py-20 bg-white relative" id="quem-somos">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="text-cyan font-bold tracking-wider uppercase text-sm mb-4 block">
            Quem Somos
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-petrol mb-6">
            Seu Hub Orquestrador de Soluções Imobiliárias
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            A VELKOR não é uma imobiliária, nem um escritório de advocacia. Nós atuamos como um
            verdadeiro <strong>Hub de Soluções</strong> que coordena toda a jornada de regularização
            e transações imobiliárias. Não prestamos serviços de corretagem direta, nem realizamos
            atos jurídicos internamente.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Nosso papel é gerenciar e orquestrar o processo do início ao fim, acionando nossa
            robusta rede de <strong>parceiros técnicos especializados</strong> apenas quando a
            execução de atos privativos (como laudos de engenharia ou peças jurídicas) se faz
            necessária.
          </p>
        </div>
      </section>
      <SocialProofSection />
      <EcosystemSection />
      <PartnersSection />
      <ServicesSection />
      <PricingSection />
      <CoverageSection />
      <FaqSection />
    </div>
  )
}
