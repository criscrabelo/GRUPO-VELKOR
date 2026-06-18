import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Success() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white px-4">
      <div className="text-center max-w-md mx-auto relative">
        <div className="absolute inset-0 bg-green-100 blur-3xl opacity-50 rounded-full w-full h-full -z-10" />

        <div
          className="flex justify-center mb-8 animate-fade-in-up"
          style={{ animationDelay: '0ms' }}
        >
          <div className="bg-green-100 text-green-600 p-4 rounded-full">
            <CheckCircle className="w-20 h-20" />
          </div>
        </div>

        <h1
          className="text-4xl font-bold text-slate-900 mb-4 animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          Pagamento Aprovado!
        </h1>

        <p
          className="text-lg text-slate-600 mb-8 animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          Obrigado por escolher o NexFlow. Seu ambiente já está sendo preparado. Enviamos os
          detalhes de acesso e recibo para o seu email.
        </p>

        <div
          className="animate-fade-in-up bg-slate-50 border border-slate-100 rounded-xl p-6 mb-8 text-left"
          style={{ animationDelay: '300ms' }}
        >
          <h3 className="font-semibold text-slate-900 mb-2">Próximos passos:</h3>
          <ul className="text-slate-600 space-y-2 text-sm list-decimal list-inside">
            <li>Verifique sua caixa de entrada</li>
            <li>Crie sua senha de acesso</li>
            <li>Configure seu primeiro projeto</li>
          </ul>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 text-lg group">
            <Link to="/">
              Ir para o Dashboard
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
