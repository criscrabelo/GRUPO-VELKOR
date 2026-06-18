import { HeroSection } from '@/components/sections/hero-section'
import { ServicesSection } from '@/components/sections/services-section'
import { FaqSection } from '@/components/sections/faq-section'

export default function Index() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeroSection />
      <ServicesSection />
      <FaqSection />
    </div>
  )
}
