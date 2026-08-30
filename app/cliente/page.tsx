import type { Metadata } from 'next'
import { ClienteApp } from '@/components/cliente/ClienteApp'

export const metadata: Metadata = {
  title: 'Área do cliente — Velkor Soluções Imobiliárias',
  robots: { index: false, follow: false },
}

export default function ClientePage() {
  return <ClienteApp />
}
