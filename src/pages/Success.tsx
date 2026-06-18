import { Link, useLocation } from 'react-router-dom'
import { CheckCircle, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Success() {
  const location = useLocation()
  const protocol = location.state?.protocol || 'PV-9999'

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-md mx-auto relative bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
        <div
          className="flex justify-center mb-6 animate-fade-in-up"
          style={{ animationDelay: '0ms' }}
        >
          <div className="bg-cyan/10 text-cyan-600 p-4 rounded-full">
            <CheckCircle className="w-16 h-16" />
          </div>
        </div>

        <h1
          className="text-3xl font-display font-bold text-petrol mb-2 animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          Pedido Confirmado!
        </h1>

        <p className="text-slate-600 mb-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Recebemos sua solicitação. Acompanhe o status do seu pedido com o número de protocolo
          abaixo.
        </p>

        <div
          className="bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 mb-8 animate-fade-in-up flex flex-col items-center"
          style={{ animationDelay: '300ms' }}
        >
          <span className="text-sm text-slate-500 uppercase font-semibold mb-1">Seu Protocolo</span>
          <span className="text-3xl font-bold font-display text-petrol tracking-wider">
            {protocol}
          </span>
        </div>

        <div className="flex flex-col gap-3 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <Button asChild size="lg" className="w-full bg-petrol hover:bg-petrol/90 text-white">
            <Link to="/">Voltar ao Início</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link to="/admin/login">
              Acessar Painel <LayoutDashboard className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
