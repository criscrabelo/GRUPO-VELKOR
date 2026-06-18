import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, MapPin, Phone } from 'lucide-react'
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
              <MapPin className="w-3 h-3" /> {SITE_CONFIG.cidade}
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Phone className="w-3 h-3" /> {SITE_CONFIG.email}
            </span>
          </div>
          <div>WhatsApp: +{SITE_CONFIG.whatsapp}</div>
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
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={SITE_CONFIG.logoUrl}
              alt={SITE_CONFIG.name}
              className={cn(
                'object-contain transition-all duration-300 group-hover:scale-105',
                isScrolled ? 'h-8' : 'h-10',
              )}
            />
            <div className="hidden sm:block border-l border-slate-300 pl-3">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block leading-tight">
                {SITE_CONFIG.grupo}
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="/#ecossistema"
              className="text-sm font-semibold text-petrol hover:text-cyan transition-colors"
            >
              Ecossistema
            </a>
            <a
              href="/#faq"
              className="text-sm font-semibold text-petrol hover:text-cyan transition-colors"
            >
              FAQ
            </a>
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
                Contratar Serviços
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-petrol p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col md:hidden animate-fade-in-down max-h-[80vh] overflow-y-auto">
          <Accordion type="single" collapsible className="w-full mb-2">
            <AccordionItem value="solucoes" className="border-none">
              <AccordionTrigger className="text-base font-bold text-petrol py-3 px-2 hover:bg-cyan/5 rounded-lg no-underline hover:no-underline">
                Soluções
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-2 space-y-2">
                <Link
                  to="/contratar"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-slate-600 font-medium"
                >
                  Check-up Imobiliário
                </Link>
                <Link
                  to="/contratar"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-slate-600 font-medium"
                >
                  Compra Segura
                </Link>
                <Link
                  to="/contratar"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-slate-600 font-medium"
                >
                  Leilão Assistido
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <a
            href="/#ecossistema"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-bold text-petrol p-3 hover:bg-cyan/5 rounded-lg"
          >
            Ecossistema
          </a>
          <a
            href="/#faq"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-bold text-petrol p-3 hover:bg-cyan/5 rounded-lg"
          >
            FAQ
          </a>

          <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-slate-100">
            <Link to="/cliente" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full border-petrol text-petrol font-bold h-12">
                Área do Cliente
              </Button>
            </Link>
            <Link to="/contratar" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-cyan text-petrol hover:bg-cyan/90 font-bold h-12">
                Contratar Serviços
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
