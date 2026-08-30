import type { Metadata } from 'next'
import { AdminApp } from '@/components/admin/AdminApp'

export const metadata: Metadata = {
  title: 'Painel administrativo — Velkor Soluções Imobiliárias',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <AdminApp />
}
