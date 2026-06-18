import { useState, useEffect } from 'react'
import { MessageCircle, Bot } from 'lucide-react'
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
      <div className="fixed bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto md:right-auto z-50 pointer-events-none flex justify-center md:justify-end p-4 md:p-0 animate-fade-in-up">
        <div className="bg-white/90 backdrop-blur-lg border border-slate-200 shadow-xl rounded-full p-2 flex items-center gap-2 pointer-events-auto w-full md:w-auto justify-around md:justify-start">
          <button
            onClick={() => setIsKoraOpen(true)}
            className="flex items-center gap-2 bg-petrol text-white px-5 py-3 rounded-full hover:bg-petrol/90 transition-all flex-1 md:flex-initial justify-center shadow-md shadow-petrol/20"
          >
            <Bot className="w-5 h-5 text-cyan" />
            <span className="font-semibold text-sm">Falar com Kora</span>
          </button>

          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full hover:bg-[#1EBE5C] transition-all flex-1 md:flex-initial justify-center shadow-md shadow-[#25D366]/20"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold text-sm">WhatsApp</span>
          </a>
        </div>
      </div>

      <KoraChat open={isKoraOpen} onOpenChange={setIsKoraOpen} />
    </>
  )
}
