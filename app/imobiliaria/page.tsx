import type { Metadata } from 'next'
import { LandingApp } from '@/components/landing/LandingApp'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Velkor Soluções Imobiliárias — documentação de imóveis em um painel digital',
  description:
    'Regularização e documentação de imóveis em Taubaté/SP e em todo o Brasil: matrícula, certidões, ITBI, registro e boletos acompanhados em um painel digital. Diagnóstico inicial gratuito.',
  alternates: { canonical: '/imobiliaria' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/imobiliaria`,
    siteName: 'Velkor Soluções Imobiliárias',
    title: 'Velkor Soluções Imobiliárias — documentação de imóveis em um painel digital',
    description:
      'Regularização e documentação de imóveis: matrícula, certidões, ITBI, registro e boletos acompanhados em um painel digital.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Velkor Soluções Imobiliárias',
  description:
    'Documentação imobiliária organizada, acompanhada, sem burocracia e 100% digital.',
  url: `${SITE_URL}/imobiliaria`,
  areaServed: 'BR',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Taubaté',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  openingHours: 'Mo-Fr 09:00-18:00',
}

export default function ImobiliariaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingApp />
    </>
  )
}
