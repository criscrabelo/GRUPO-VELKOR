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
