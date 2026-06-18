import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Hexagon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Recursos', href: '/#recursos' },
    { name: 'Preços', href: '/#precos' },
    { name: 'Depoimentos', href: '/#depoimentos' },
    { name: 'FAQ', href: '/#faq' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-white/70 backdrop-blur-md border-b border-gray-200/50 shadow-sm py-3'
          : 'bg-transparent py-5',
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
            <Hexagon className="w-5 h-5 fill-current" />
          </div>
          <span className="font-bold text-xl tracking-tight">NexFlow</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-slate-600 hover:text-primary">
            Login
          </Button>
          <Button className="animate-pulse-subtle hover:animate-none shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
            Começar Agora
          </Button>
        </div>

        <button
          className="md:hidden text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-4 md:hidden animate-fade-in-down">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-slate-800 p-2 hover:bg-slate-50 rounded-md"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
            <Button variant="outline" className="w-full">
              Login
            </Button>
            <Button className="w-full">Começar Agora</Button>
          </div>
        </div>
      )}
    </header>
  )
}
