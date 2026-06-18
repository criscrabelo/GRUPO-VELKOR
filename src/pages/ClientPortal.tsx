import { useState } from 'react'
import { FileText, PlayCircle, Clock, CheckCircle2, ChevronRight, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SITE_CONFIG } from '@/lib/config'
import { cn } from '@/lib/utils'

export default function ClientPortal() {
  const [email, setEmail] = useState('')
  const [isLogged, setIsLogged] = useState(false)
  const [order, setOrder] = useState<any>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    const saved = localStorage.getItem('velkor_last_order')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.email === email) {
        setOrder(parsed)
        setIsLogged(true)
        return
      }
    }

    // Demo Mock Fallback
    setOrder({
      protocol: 'VK-8842',
      service: 'Check-up Imobiliário',
      date: new Date().toISOString(),
      status: 'andamento',
    })
    setIsLogged(true)
  }

  if (!isLogged) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan/5 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-petrol/5 max-w-md w-full border border-slate-100 animate-fade-in-up relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-cyan/10 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
              <Lock className="w-10 h-10 text-cyan" />
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold text-center text-petrol mb-2">
            Portal do Cliente
          </h1>
          <p className="text-center text-slate-500 mb-8">
            Acompanhe seus serviços e acesse documentos com segurança.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-petrol ml-1">Email Cadastrado</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@email.com"
                className="h-14 bg-slate-50 border-slate-200 focus-visible:ring-cyan text-lg px-4"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-14 bg-petrol hover:bg-petrol/90 text-white font-bold text-lg rounded-xl shadow-lg shadow-petrol/20"
            >
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    )
  }

  const steps = [
    { id: 'novo', title: 'Solicitação Recebida', desc: 'Nossa equipe está validando seus dados' },
    { id: 'andamento', title: 'Em Execução', desc: 'Especialistas trabalhando no seu serviço' },
    { id: 'concluido', title: 'Finalizado', desc: 'Documentos liberados para acesso' },
  ]

  const currentStepIndex =
    steps.findIndex((s) => s.id === order.status) >= 0
      ? steps.findIndex((s) => s.id === order.status)
      : 0

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-petrol text-white pt-32 pb-32 px-4 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[150%] h-[100%] pointer-events-none"
          style={{
            background:
              'linear-gradient(115deg, transparent 40%, rgba(25, 200, 232, 0.05) 40%, rgba(25, 200, 232, 0.05) 60%, transparent 60%)',
          }}
        />
        <div className="container mx-auto max-w-5xl relative z-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Painel de Acompanhamento
          </h1>
          <p className="text-cyan text-lg">Visão em tempo real das suas solicitações.</p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg shadow-petrol/5 border border-slate-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-slate-100 pb-6 gap-4">
                <div>
                  <h2 className="font-display font-bold text-2xl text-petrol mb-1">
                    {order.service}
                  </h2>
                  <p className="text-sm font-medium text-slate-500 bg-slate-100 inline-block px-3 py-1 rounded-full">
                    Protocolo: {order.protocol}
                  </p>
                </div>
                <div className="bg-cyan/10 border border-cyan/20 text-cyan px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                  Status Atual
                </div>
              </div>

              <div className="relative pl-2 md:pl-4 py-4">
                <div className="absolute left-8 md:left-10 top-8 bottom-8 w-0.5 bg-slate-100" />
                <div className="space-y-10 relative">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex gap-6 items-start">
                      <div
                        className={cn(
                          'w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-white relative z-10 shadow-sm transition-colors duration-500',
                          idx <= currentStepIndex
                            ? 'bg-cyan text-petrol'
                            : 'bg-slate-100 text-slate-300',
                        )}
                      >
                        {idx < currentStepIndex ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Clock className="w-6 h-6" />
                        )}
                      </div>
                      <div className="pt-2">
                        <h4
                          className={cn(
                            'font-bold text-lg mb-1 transition-colors duration-500',
                            idx <= currentStepIndex ? 'text-petrol' : 'text-slate-400',
                          )}
                        >
                          {step.title}
                        </h4>
                        <p
                          className={cn(
                            'text-sm transition-colors duration-500',
                            idx <= currentStepIndex ? 'text-slate-600' : 'text-slate-400',
                          )}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg shadow-petrol/5 border border-slate-100">
              <h3 className="font-display font-bold text-xl text-petrol mb-6 flex items-center gap-3">
                <PlayCircle className="w-6 h-6 text-cyan" /> Vídeo de Boas-vindas
              </h3>
              <div className="aspect-video bg-petrol rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer shadow-inner">
                <img
                  src="https://img.usecurling.com/p/800/400?q=office%20handshake&color=blue&dpr=2"
                  alt="Boas vindas"
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700"
                />
                <div className="w-20 h-20 bg-cyan text-petrol rounded-full flex items-center justify-center relative z-10 pl-1.5 shadow-xl shadow-cyan/30 group-hover:scale-110 transition-transform duration-300">
                  <PlayCircle className="w-10 h-10" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg shadow-petrol/5 border border-slate-100">
              <h3 className="font-display font-bold text-xl text-petrol mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-cyan" /> Central de Documentos
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-cyan hover:bg-cyan/5 transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg text-petrol group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-petrol mb-0.5">Contrato Padrão</p>
                      <p className="text-xs text-slate-500 font-medium">PDF • Assinado</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-cyan transition-colors" />
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-cyan hover:bg-cyan/5 transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg text-petrol group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-petrol mb-0.5">
                        Comprovante de Pagamento
                      </p>
                      <p className="text-xs text-slate-500 font-medium">1ª Parcela • Pago</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-cyan transition-colors" />
                </button>
                {currentStepIndex >= 2 && (
                  <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-cyan hover:bg-cyan/5 transition-all duration-300 group animate-fade-in">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-cyan text-petrol rounded-lg group-hover:bg-cyan/90 transition-all duration-300">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-petrol mb-0.5">Laudo Final</p>
                        <p className="text-xs text-slate-500 font-medium">PDF • Liberado</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-cyan transition-colors" />
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg shadow-petrol/5 border border-slate-100 animate-fade-in">
              <h3 className="font-display font-bold text-xl text-petrol mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-cyan" /> Pagamentos e Saldos
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-slate-700">Sinal Inicial</p>
                    <p className="text-xs text-slate-500">10/05/2026</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    Pago
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-slate-700">Parcela 2/3</p>
                    <p className="text-xs text-slate-500">10/06/2026</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                    Pendente
                  </span>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-500">Saldo Devedor</span>
                  <span className="text-lg font-bold text-petrol">R$ 1.800,00</span>
                </div>
              </div>
            </div>

            <div className="bg-petrol p-8 rounded-3xl shadow-lg shadow-petrol/20 text-white text-center border border-petrol relative overflow-hidden animate-fade-in">
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan" />
              <h3 className="font-display font-bold text-xl mb-3">Dúvidas?</h3>
              <p className="text-sm text-white/70 mb-8 leading-relaxed">
                Seu gerente de conta está disponível no WhatsApp para qualquer esclarecimento.
              </p>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-cyan text-petrol font-bold py-4 rounded-xl hover:bg-cyan/90 transition-colors shadow-lg shadow-cyan/20 text-lg"
              >
                Falar com Gerente
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
