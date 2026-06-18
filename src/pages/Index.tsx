import { HeroSection } from '@/components/sections/hero-section'
import { SocialProofSection } from '@/components/sections/social-proof-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { ComparisonSection } from '@/components/sections/comparison-section'
import { PricingSection } from '@/components/sections/pricing-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { FaqSection } from '@/components/sections/faq-section'

export default function Index() {
  return (
    <div className="flex flex-col w-full bg-white">
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <ComparisonSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
    </div>
  )
}
