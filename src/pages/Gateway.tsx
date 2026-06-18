import { useState } from 'react'
import { Link } from 'react-router-dom'
import { VelkorLogo } from '@/components/VelkorLogo'
import { Building2, ShieldCheck, ArrowRight, Send, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { db } from '@/lib/db'
import { cn } from '@/lib/utils'

export default function Gateway() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Obrigatório'
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Inválido'
    if (!form.message.trim()) errs.message = 'Obrigatório'
    setErrors(errs)

    if (Object.keys(errs).length > 0) return

    setLoading(true)
    try {
      await db.leads.create(form)
      setSuccess(true)
      toast({ title: 'Interesse Registrado!', description: 'Entraremos em contato em breve.' })
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSuccess(false), 5000)
    } catch {
      toast({ title: 'Erro', description: 'Tente novamente.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://img.usecurling.com/p/1920/1080?q=modern%20architecture&color=black&dpr=2"
          alt="Bg"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-petrol/95 via-slate-900/95 to-slate-900/90" />
      </div>

      <div className="z-10 container px-4 max-w-5xl flex flex-col items-center py-12 mb-8">
        <div className="mb-12 text-center animate-fade-in-down">
          <VelkorLogo variant="light" className="h-14 md:h-20 mx-auto mb-6" />
          <h1 className="text-white text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">
            Bem-vindo ao Grupo VELKOR
          </h1>
          <p className="text-cyan text-lg max-w-2xl mx-auto">
            Selecione a unidade de negócio para acessar nossos serviços.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl animate-fade-in-up mb-12">
          <Link
            to="/solucoes"
            className="group relative bg-white rounded-2xl p-8 shadow-2xl transition-all hover:-translate-y-2 hover:border-cyan border-2 border-transparent flex flex-col items-center text-center overflow-hidden"
          >
            <div className="w-20 h-20 bg-petrol/5 rounded-2xl rotate-3 group-hover:rotate-6 flex items-center justify-center mb-6 z-10 transition-transform">
              <Building2 className="w-10 h-10 text-petrol group-hover:text-cyan transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-petrol mb-4 z-10">VELKOR Soluções</h2>
            <p className="text-slate-600 mb-8 z-10">
              Regularização patrimonial, due diligence, leilões e compra segura.
            </p>
            <div className="flex items-center text-cyan font-bold group-hover:translate-x-2 transition-transform z-10">
              Acessar Portal <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </Link>

          <div className="group relative bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 shadow-xl border-2 border-slate-700 flex flex-col items-center text-center">
            <div className="absolute top-6 right-6 bg-cyan/20 text-cyan text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan"></span> EM BREVE
            </div>
            <div className="w-20 h-20 bg-slate-700/50 rounded-2xl -rotate-3 flex items-center justify-center mb-6 z-10">
              <ShieldCheck className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 z-10">VELKOR Seguros</h2>
            <p className="text-slate-400 z-10">
              Proteção completa para patrimônio, vida e negócios. Soluções personalizadas.
            </p>
          </div>
        </div>

        <div className="w-full max-w-2xl bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-slate-700/50 animate-fade-in-up mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white">Fale com um Especialista</h3>
          </div>
          {success ? (
            <div className="bg-cyan/10 border border-cyan/20 rounded-xl p-6 text-center">
              <CheckCircle2 className="w-8 h-8 text-cyan mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white">Recebemos seu contato!</h4>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <Label className="text-slate-200">Nome</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={cn(
                      'bg-slate-900 border-slate-700 text-white',
                      errors.name && 'border-red-500',
                    )}
                  />
                </div>
                <div className="space-y-1 text-left">
                  <Label className="text-slate-200">E-mail Corporativo</Label>
                  <Input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={cn(
                      'bg-slate-900 border-slate-700 text-white',
                      errors.email && 'border-red-500',
                    )}
                  />
                </div>
              </div>
              <div className="space-y-1 text-left">
                <Label className="text-slate-200">Mensagem</Label>
                <Textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={cn(
                    'bg-slate-900 border-slate-700 text-white resize-none',
                    errors.message && 'border-red-500',
                  )}
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan hover:bg-cyan/90 text-slate-900 font-bold"
              >
                {loading ? (
                  'Enviando...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> Enviar
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
      <div className="relative text-white/40 text-xs text-center z-10 w-full font-medium pb-4">
        &copy; {new Date().getFullYear()} Grupo VELKOR. Todos os direitos reservados.
      </div>
    </div>
  )
}
