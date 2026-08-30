import type { Metadata } from 'next'
import { DossiePageClient } from '@/components/cliente/DossiePageClient'

export const metadata: Metadata = {
  title: 'Dossiê digital — Velkor Soluções Imobiliárias',
  robots: { index: false, follow: false },
}

export default function DossiePage() {
  return <DossiePageClient />
}
