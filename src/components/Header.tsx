import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
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

  const navLinks = [
    { name: 'Soluções', href: '/#ecossistema' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Contratar', href: '/contratar' },
    { name: 'Portal', href: '/cliente' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-3'
          : 'bg-transparent py-5',
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={SITE_CONFIG.logoUrl}
            alt={SITE_CONFIG.name}
            className="h-8 md:h-10 object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-petrol hover:text-cyan transition-colors"
            >
              {link.name}
            </a>
          ))}
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
            <Button className="bg-petrol text-white hover:bg-petrol/90 shadow-lg shadow-petrol/20 transition-all font-bold">
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

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-4 md:hidden animate-fade-in-down">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-petrol p-3 hover:bg-cyan/5 rounded-md"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-100">
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
