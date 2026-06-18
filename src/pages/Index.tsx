import { HeroSection } from '@/components/sections/hero-section'
import { EcosystemSection } from '@/components/sections/ecosystem-section'
import { ServicesSection } from '@/components/sections/services-section'
import { CoverageSection } from '@/components/sections/coverage-section'
import { SocialProofSection } from '@/components/sections/social-proof-section'
import { FaqSection } from '@/components/sections/faq-section'

export default function Index() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeroSection />
      <SocialProofSection />
      <EcosystemSection />
      <ServicesSection />
      <CoverageSection />
      <FaqSection />
    </div>
  )
}
