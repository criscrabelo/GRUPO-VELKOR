import { useState } from 'react'
import { Twitter, Linkedin, Github, Hexagon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

export function Footer() {
  const { toast } = useToast()
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    toast({
      title: 'Inscrição realizada!',
      description: 'Você receberá nossas novidades em breve.',
    })
    setEmail('')
  }

  return (
    <footer className="bg-slate-50 border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <Hexagon className="w-5 h-5 fill-current" />
              </div>
              <span className="font-bold text-xl tracking-tight">NexFlow</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Transformando a maneira como equipes modernas colaboram e entregam resultados com
              eficiência e velocidade.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Produto</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">
                  Recursos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">
                  Integrações
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">
                  Preços
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Recursos</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">
                  Documentação
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">
                  Guias
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">
                  Central de Ajuda
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Assine nossa Newsletter</h3>
            <p className="text-sm text-slate-500 mb-4">
              Receba as últimas novidades e dicas diretamente no seu email.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white"
                required
              />
              <Button type="submit" className="w-full">
                Inscrever-se
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2026 NexFlow Inc. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
              Privacidade
            </a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
