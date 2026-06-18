import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react'

export default function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)

  const { plan = 'Pro', price = 79, billing = 'mensal' } = location.state || {}

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      navigate('/success')
    }, 2000)
  }

  const tax = price * 0.1
  const total = price + tax

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Finalizar Assinatura</h1>
              <p className="text-slate-500 mt-2">
                Preencha seus dados para começar a usar o NexFlow.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8"
            >
              <section>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  1. Informações Pessoais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <Input id="firstName" placeholder="João" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input id="lastName" placeholder="Silva" required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email de acesso</Label>
                    <Input id="email" type="email" placeholder="joao@empresa.com" required />
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">2. Pagamento</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Nome no cartão</Label>
                    <Input id="cardName" placeholder="JOAO C SILVA" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número do cartão</Label>
                    <Input
                      id="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Validade</Label>
                      <Input id="expiry" placeholder="MM/AA" maxLength={5} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" maxLength={4} required type="password" />
                    </div>
                  </div>
                </div>
              </section>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Confirmar Pagamento'
                )}
              </Button>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <ShieldCheck className="w-4 h-4 text-green-600" /> Pagamento seguro e criptografado
              </div>
            </form>
          </div>

          <div className="lg:col-span-5 sticky top-24">
            <Card className="shadow-lg border-primary/20">
              <CardHeader className="bg-slate-50 rounded-t-xl border-b border-slate-100">
                <CardTitle className="text-xl">Resumo do Pedido</CardTitle>
                <CardDescription>
                  Plano {plan} ({billing})
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Plano {plan}</span>
                  <span>R$ {price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Impostos (10%)</span>
                  <span>R$ {tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center font-bold text-xl text-slate-900">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="bg-indigo-50/50 flex-col items-start gap-4 p-6 rounded-b-xl mt-4">
                <h4 className="font-semibold text-slate-900">O que está incluído:</h4>
                <ul className="space-y-2 text-sm text-slate-600 w-full">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Acesso imediato à
                    plataforma
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Cancelamento a qualquer
                    momento
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Garantia de 7 dias ou seu
                    dinheiro de volta
                  </li>
                </ul>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
