import type { Metadata } from 'next'
import { Source_Serif_4, Libre_Franklin } from 'next/font/google'
import { SITE_URL } from '@/lib/site'
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

// Metadados padrão (portal do grupo). Cada rota sobrescreve título,
// descrição e canonical nos seus próprios page.tsx.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Grupo Velkor — Protege. Organiza. Resolve.',
  description:
    'O Grupo Velkor reúne a Velkor Soluções Imobiliárias e a Velkor Seguros e Consórcios. Escolha por onde começar.',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.ico' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Grupo Velkor',
    title: 'Grupo Velkor — Protege. Organiza. Resolve.',
    description:
      'O Grupo Velkor reúne a Velkor Soluções Imobiliárias e a Velkor Seguros e Consórcios. Escolha por onde começar.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sourceSerif.variable} ${libreFranklin.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
