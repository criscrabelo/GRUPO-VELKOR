import type { Metadata } from 'next'
import { Source_Serif_4, Libre_Franklin } from 'next/font/google'
import './globals.css'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-source-serif',
  display: 'swap',
})

const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-libre-franklin',
  display: 'swap',
})

const SITE_URL = 'https://velkor.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Velkor Soluções Imobiliárias — documentação de imóveis em um painel digital',
  description:
    'Regularização e documentação de imóveis em Taubaté/SP e em todo o Brasil: matrícula, certidões, ITBI, registro e boletos acompanhados em um painel digital. Diagnóstico inicial gratuito.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Velkor Soluções Imobiliárias',
    title: 'Velkor Soluções Imobiliárias — documentação de imóveis em um painel digital',
    description:
      'Regularização e documentação de imóveis: matrícula, certidões, ITBI, registro e boletos acompanhados em um painel digital.',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Velkor Soluções Imobiliárias',
  description:
    'Documentação imobiliária organizada, acompanhada, sem burocracia e 100% digital.',
  areaServed: 'BR',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Taubaté',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  openingHours: 'Mo-Fr 09:00-18:00',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sourceSerif.variable} ${libreFranklin.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
