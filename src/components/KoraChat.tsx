import { useState } from 'react'
import { Bot, X, Send, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/config'
import { SERVICE_CATALOG } from '@/lib/catalog'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export function KoraChat({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [messages, setMessages] = useState<{ role: 'kora' | 'user'; text: string }[]>([
    {
      role: 'kora',
      text: 'Olá! Sou a Kora, assistente virtual inteligente da VELKOR - Sua Central de Regularização e Gestão Patrimonial. Como posso te ajudar hoje?',
    },
  ])
  const [input, setInput] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = input
    setMessages([...messages, { role: 'user', text: userMsg }])
    setInput('')

    const lowerInput = userMsg.toLowerCase()

    // Knowledge Base Check
    if (
      lowerInput.includes('aluguel') ||
      lowerInput.includes('locação') ||
      lowerInput.includes('venda') ||
      lowerInput.includes('corretagem') ||
      lowerInput.includes('avaliar')
    ) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'kora',
            text: 'Atenção: A VELKOR atua exclusivamente como Despachante Documental e Hub de Soluções. Não realizamos corretagem, intermediação de compra/venda, avaliação de imóveis ou gestão de locação. Posso ajudar com a parte documental do seu imóvel?',
          },
        ])
      }, 600)
      return
    }

    // Catalog Check
    const matchedService = SERVICE_CATALOG.find(
      (s) =>
        lowerInput.includes(s.name.toLowerCase().split(' ')[0]) ||
        lowerInput.includes(s.id.replace('-', ' ')),
    )

    if (matchedService) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'kora',
            text: `Temos o serviço ideal para isso: **${matchedService.name}**. ${matchedService.description} O valor base é ${matchedService.price}. Deseja que eu transfira para um especialista seguir com a contratação?`,
          },
        ])
      }, 800)
      return
    }

    // Fallback logic representing missing AI endpoint
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'kora',
          text: 'Como sou uma assistente virtual em treinamento, não encontrei a resposta exata em nossa base de catálogo. Por favor, clique no botão abaixo para falar diretamente com nosso time via WhatsApp corporativo.',
        },
      ])
    }, 1000)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-[400px] p-0 flex flex-col bg-slate-50 border-l border-slate-200 shadow-2xl"
      >
        <div className="bg-petrol text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center relative border border-cyan/30">
              <Bot className="w-6 h-6 text-cyan" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-petrol rounded-full">
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
              </span>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg leading-tight">Kora AI</h3>
              <p className="text-xs text-cyan flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Online / Live
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5 flex flex-col">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
            >
              <div
                className={cn(
                  'max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm',
                  msg.role === 'user'
                    ? 'bg-petrol text-white rounded-br-sm'
                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm',
                )}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {messages.length > 1 && messages[messages.length - 1].role === 'kora' && (
            <div className="flex justify-start pt-2 animate-fade-in">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#1EBE5C] transition-all shadow-md shadow-[#25D366]/20"
              >
                Continuar no WhatsApp <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua dúvida..."
              className="w-full bg-slate-100 border-transparent focus:bg-white focus:border-cyan focus:ring-1 focus:ring-cyan rounded-full pl-5 pr-14 py-3.5 text-sm outline-none transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 w-10 h-10 flex items-center justify-center bg-cyan text-petrol rounded-full hover:bg-cyan/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
