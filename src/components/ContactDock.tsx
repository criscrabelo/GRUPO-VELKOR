import { useState, useEffect } from 'react'
import { MessageCircle, Bot, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SITE_CONFIG } from '@/lib/config'
import { KoraChat } from './KoraChat'

export function ContactDock() {
  const [show, setShow] = useState(false)
  const [isKoraOpen, setIsKoraOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 460)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!show) return null

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto z-50 pointer-events-none flex justify-center md:justify-end p-4 md:p-0 animate-fade-in-up">
        <div className="bg-white/90 backdrop-blur-lg border border-slate-200 shadow-xl rounded-full p-2 flex items-center gap-2 pointer-events-auto w-full md:w-auto justify-around md:justify-start">
          {/* Portal do Cliente — apenas mobile */}
          <Link
            to="/cliente"
            className="md:hidden flex flex-col items-center justify-center text-petrol p-2 flex-1 hover:text-cyan transition-colors"
            aria-label="Portal do Cliente"
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold">Portal</span>
          </Link>

          {/* Kora AI — assistente consultivo */}
          <button
            onClick={() => setIsKoraOpen(true)}
            title="Kora AI — Assistente consultivo inteligente"
            className="flex flex-col md:flex-row items-center gap-1 md:gap-2 bg-petrol text-white p-2 md:px-5 md:py-3 rounded-2xl md:rounded-full hover:bg-petrol/90 transition-all flex-1 md:flex-initial justify-center shadow-md shadow-petrol/20 group"
            aria-label="Abrir Kora AI — Assistente consultivo"
          >
            <Bot className="w-5 h-5 text-cyan" />
            <div className="flex flex-col md:flex-row items-center gap-0.5 md:gap-2">
              <span className="font-semibold text-[10px] md:text-sm">Kora AI</span>
              <span className="hidden md:inline text-white/50 text-xs font-normal">
                · Consultoria
              </span>
            </div>
          </button>

          {/* WhatsApp — contato direto rápido */}
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20VELKOR%20e%20gostaria%20de%20falar%20com%20um%20especialista.`}
            target="_blank"
            rel="noreferrer"
            title="Fale direto no WhatsApp com um especialista"
            className="flex flex-col md:flex-row items-center gap-1 md:gap-2 bg-[#25D366] text-white p-2 md:px-5 md:py-3 rounded-2xl md:rounded-full hover:bg-[#1EBE5C] transition-all flex-1 md:flex-initial justify-center shadow-md shadow-[#25D366]/20"
            aria-label="Fale direto no WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
            <div className="flex flex-col md:flex-row items-center gap-0.5 md:gap-2">
              <span className="font-semibold text-[10px] md:text-sm">WhatsApp</span>
              <span className="hidden md:inline text-white/70 text-xs font-normal">· Direto</span>
            </div>
          </a>
        </div>
      </div>

      <KoraChat open={isKoraOpen} onOpenChange={setIsKoraOpen} />
    </>
  )
}
