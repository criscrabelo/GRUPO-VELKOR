import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Lock, Mail } from 'lucide-react'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(false)

    setTimeout(() => {
      if (email === 'admin' && password === 'velkor2026') {
        navigate('/admin/dashboard')
      } else {
        setError(true)
        setIsLoading(false)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen bg-petrol flex items-center justify-center relative overflow-hidden">
      {/* Diagonal Slash Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[150%] h-[100px] bg-cyan/10 -rotate-45 top-[20%] -left-[20%] blur-3xl"></div>
        <div className="absolute w-[200%] h-[1px] bg-cyan/20 -rotate-45 top-[50%] -left-[50%]"></div>
        <div className="absolute w-[200%] h-[1px] bg-cyan/10 -rotate-45 top-[55%] -left-[50%]"></div>
      </div>

      <div className="w-full max-w-md p-8 bg-petrol/80 backdrop-blur-xl rounded-2xl border border-white/10 z-10 shadow-2xl animate-fade-in-up">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">VELKOR</h1>
          <p className="text-cyan/80 text-sm font-medium tracking-widest uppercase">Admin Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/70">
              Usuário / E-mail
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-white/40" />
              <Input
                id="email"
                type="text"
                placeholder="admin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-cyan focus-visible:ring-cyan/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/70">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-white/40" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-cyan focus-visible:ring-cyan/20"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Credenciais inválidas. Tente admin / velkor2026
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-cyan hover:bg-cyan/90 text-petrol font-bold h-12"
            disabled={isLoading}
          >
            {isLoading ? 'Autenticando...' : 'Entrar'}
          </Button>
        </form>
      </div>
    </div>
  )
}
