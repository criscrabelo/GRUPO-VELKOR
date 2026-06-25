import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react'
import { VelkorLogo } from '@/components/VelkorLogo'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/config'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-40 transition-all duration-300')}>
      <div
        className={cn(
          'bg-petrol text-white text-xs py-1.5 transition-all duration-300',
          isScrolled ? 'h-0 opacity-0 overflow-hidden py-0' : 'h-8 opacity-100',
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center h-full">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="hidden lg:inline">
                Sediados em Taubaté - Vale do Paraíba | Atendimento em todo o Brasil
              </span>
              <span className="lg:hidden">Taubaté, SP | Atendimento Nacional</span>
            </span>
            <span className="hidden sm:inline text-white/50 px-2">|</span>
            <Link to="/" className="hidden sm:inline hover:text-cyan transition-colors font-medium">
              Acessar Portal
            </Link>
            <span className="hidden sm:flex items-center gap-1">
              <Mail className="w-3 h-3" /> {SITE_CONFIG.email}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-3 h-3" /> WhatsApp: +{SITE_CONFIG.whatsapp}
          </div>
        </div>
      </div>

      <div
        className={cn(
          'transition-all duration-300',
          isScrolled
            ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-3'
            : 'bg-white py-4',
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link to="/solucoes" className="flex items-center group">
            <VelkorLogo
              variant="dark"
              className={cn(
                'transition-all duration-300 group-hover:scale-105',
                isScrolled ? 'h-8 md:h-10' : 'h-10 md:h-12',
              )}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <a
              href="/solucoes#para-quem"
              className="text-sm font-semibold text-petrol hover:text-cyan transition-colors"
            >
              Para quem é
            </a>
            <a
              href="/solucoes#servicos"
              className="text-sm font-semibold text-petrol hover:text-cyan transition-colors"
            >
              Serviços
            </a>
            <a
              href="/solucoes#precos"
              className="text-sm font-semibold text-petrol hover:text-cyan transition-colors"
            >
              Planos
            </a>
            <Link
              to="/contato"
              className="text-sm font-semibold text-petrol hover:text-cyan transition-colors"
            >
              Contato
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/cliente">
              <Button
                variant="ghost"
                className="text-petrol hover:text-cyan hover:bg-cyan/10 font-bold"
              >
                Área do Cliente
              </Button>
            </Link>
            <Link to="/contratar">
              <Button className="bg-petrol text-white hover:bg-petrol/90 shadow-lg shadow-petrol/20 font-bold">
                Solicitar atendimento
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-petrol p-2 -mr-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu Principal"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col md:hidden animate-fade-in-down max-h-[calc(100vh-80px)] overflow-y-auto pb-8">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-bold text-cyan p-3 hover:bg-cyan/5 rounded-lg mb-2 flex items-center min-h-[44px]"
          >
            &larr; Acessar Portal
          </Link>
          <a
            href="/solucoes#para-quem"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-bold text-petrol p-3 hover:bg-cyan/5 rounded-lg block min-h-[44px]"
          >
            Para quem é
          </a>
          <a
            href="/solucoes#servicos"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-bold text-petrol p-3 hover:bg-cyan/5 rounded-lg block min-h-[44px]"
          >
            Serviços
          </a>
          <a
            href="/solucoes#precos"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-bold text-petrol p-3 hover:bg-cyan/5 rounded-lg block min-h-[44px]"
          >
            Planos
          </a>
          <Link
            to="/contato"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-bold text-petrol p-3 hover:bg-cyan/5 rounded-lg block min-h-[44px]"
          >
            Contato
          </Link>

          <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-slate-100">
            <Link to="/cliente" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full border-petrol text-petrol font-bold h-12">
                Área do Cliente
              </Button>
            </Link>
            <Link to="/contratar" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-cyan text-petrol hover:bg-cyan/90 font-bold h-12">
                Solicitar atendimento
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
