import type { Metadata } from 'next'
import { OperacaoPageClient } from '@/components/cliente/OperacaoPageClient'

export const metadata: Metadata = {
  title: 'Operação — Velkor Soluções Imobiliárias',
  robots: { index: false, follow: false },
}

export default async function OperacaoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <OperacaoPageClient operacaoId={id} />
}
