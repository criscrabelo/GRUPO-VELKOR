'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { VelkorLogo } from './VelkorLogo'

const NAV_LINKS = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#solucoes', label: 'Soluções' },
  { href: '#pacote', label: 'Monte seu pacote' },
  { href: '#limites', label: 'O que fazemos' },
  { href: '#contato', label: 'Contato' },
]

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-teal-institutional/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Voltar ao Grupo Velkor">
          <VelkorLogo heightClassName="h-11 brightness-0 invert" />
        </Link>

        <nav className="hidden nav:flex items-center gap-6" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden nav:flex items-center gap-3">
          <Link
            href="/cliente"
            className="text-sm font-bold text-white/90 hover:text-white px-3 py-2 transition-colors"
          >
            Área do cliente
          </Link>
          <a
            href="#diagnostico"
            className="rounded-button bg-cyan-brand text-teal-institutional font-bold text-sm px-4 py-2.5 hover:bg-cyan-brand/90 transition-colors min-h-[44px] flex items-center"
          >
            Começar diagnóstico
          </a>
        </div>

        <button
          type="button"
          className="nav:hidden text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto((v) => !v)}
        >
          {menuAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuAberto && (
        <nav
          className="nav:hidden bg-teal-institutional border-t border-white/10 px-4 py-4 space-y-1"
          aria-label="Navegação mobile"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuAberto(false)}
              className="block px-2 py-3 text-white/90 font-medium hover:text-white min-h-[44px]"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/cliente"
            onClick={() => setMenuAberto(false)}
            className="block px-2 py-3 text-white/90 font-bold min-h-[44px]"
          >
            Área do cliente
          </Link>
          <a
            href="#diagnostico"
            onClick={() => setMenuAberto(false)}
            className="block text-center rounded-button bg-cyan-brand text-teal-institutional font-bold px-4 py-3 mt-2 min-h-[44px]"
          >
            Começar diagnóstico
          </a>
        </nav>
      )}
    </header>
  )
}
