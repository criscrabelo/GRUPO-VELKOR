'use client'

import { useEffect, useState } from 'react'
import { Mail, KeyRound, AlertCircle, ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { VelkorLogo } from '@/components/landing/VelkorLogo'

const REENVIO_SEGUNDOS = 60
const MAX_TENTATIVAS = 5

export function LoginForm({
  onEntrar,
  titulo = 'Área do cliente',
  faixaTitulo = 'Documentação imobiliária organizada, acompanhada, sem burocracia e 100% digital.',
  faixaTexto = 'Acesso restrito ao titular da operação. Nunca compartilhe o código recebido por e-mail.',
  rodape = 'Acesso restrito ao titular da operação. Documentos e dados sensíveis devem ser enviados apenas por aqui, nunca por WhatsApp, e-mail ou pela Kora.',
}: {
  onEntrar?: () => void
  titulo?: string
  faixaTitulo?: string
  faixaTexto?: string
  rodape?: string
}) {
  const [etapa, setEtapa] = useState<'email' | 'codigo'>('email')
  const [email, setEmail] = useState('')
  const [codigo, setCodigo] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [tentativas, setTentativas] = useState(0)
  const [reenvioEm, setReenvioEm] = useState(0)

  useEffect(() => {
    if (reenvioEm <= 0) return
    const t = setTimeout(() => setReenvioEm((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [reenvioEm])

  async function enviarCodigo(e?: React.FormEvent) {
    e?.preventDefault()
    setErro(null)
    setCarregando(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    })

    setCarregando(false)

    if (error) {
      setErro('Não foi possível enviar o código. Verifique o e-mail e tente novamente.')
      return
    }

    setEtapa('codigo')
    setTentativas(0)
    setReenvioEm(REENVIO_SEGUNDOS)
  }

  async function confirmarCodigo(e: React.FormEvent) {
    e.preventDefault()
    setErro(null)

    if (tentativas >= MAX_TENTATIVAS) {
      setErro('Muitas tentativas. Solicite um novo código.')
      return
    }

    setCarregando(true)
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: codigo,
      type: 'email',
    })
    setCarregando(false)

    if (error) {
      setTentativas((t) => t + 1)
      setErro(
        tentativas + 1 >= MAX_TENTATIVAS
          ? 'Muitas tentativas incorretas. Solicite um novo código.'
          : 'Código inválido ou expirado. Confira e tente novamente.',
      )
      return
    }

    onEntrar?.()
  }

  return (
    <div className="min-h-screen grid nav:grid-cols-2 bg-page">
      <div className="hidden nav:flex flex-col justify-between bg-teal-institutional text-white p-12">
        <Link href="/imobiliaria">
          <VelkorLogo heightClassName="h-8 brightness-0 invert" />
        </Link>
        <div>
          <h1 className="heading-serif text-3xl font-bold mb-4 max-w-sm">{faixaTitulo}</h1>
          <p className="text-white/70 max-w-sm">{faixaTexto}</p>
        </div>
        <p className="text-xs text-white/50">Conforme a LGPD — Lei nº 13.709/2018.</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="nav:hidden mb-8 flex justify-center">
            <Link href="/imobiliaria">
              <VelkorLogo heightClassName="h-8" />
            </Link>
          </div>

          <h2 className="heading-serif text-2xl font-bold text-ink-primary mb-2">{titulo}</h2>
          <p className="text-ink-secondary text-sm mb-8">
            {etapa === 'email'
              ? 'Informe seu e-mail para receber um código de acesso.'
              : `Enviamos um código de 6 dígitos para ${email}.`}
          </p>

          {etapa === 'email' ? (
            <form onSubmit={enviarCodigo} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-ink-primary mb-1.5">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-button border border-border bg-surface text-ink-primary min-h-[44px]"
                  />
                </div>
              </div>

              {erro && (
                <p className="text-sm text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {erro}
                </p>
              )}

              <button
                type="submit"
                disabled={carregando || !email}
                className="w-full rounded-button bg-cyan-brand text-teal-institutional font-bold py-3.5 hover:bg-cyan-brand/90 transition-colors disabled:opacity-50 min-h-[44px]"
              >
                {carregando ? 'Enviando...' : 'Receber código de acesso'}
              </button>
            </form>
          ) : (
            <form onSubmit={confirmarCodigo} className="space-y-4">
              <div>
                <label htmlFor="codigo" className="block text-sm font-bold text-ink-primary mb-1.5">
                  Código de 6 dígitos
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
                  <input
                    id="codigo"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="w-full pl-10 pr-4 py-3 rounded-button border border-border bg-surface text-ink-primary tracking-[0.3em] font-mono min-h-[44px]"
                  />
                </div>
              </div>

              {erro && (
                <p className="text-sm text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {erro}
                </p>
              )}

              <button
                type="submit"
                disabled={carregando || codigo.length !== 6 || tentativas >= MAX_TENTATIVAS}
                className="w-full rounded-button bg-cyan-brand text-teal-institutional font-bold py-3.5 hover:bg-cyan-brand/90 transition-colors disabled:opacity-50 min-h-[44px]"
              >
                {carregando ? 'Verificando...' : 'Entrar no painel'}
              </button>

              <div className="flex items-center justify-between text-sm pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEtapa('email')
                    setCodigo('')
                    setErro(null)
                  }}
                  className="inline-flex items-center gap-1 text-ink-secondary hover:text-teal-action font-medium"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Usar outro e-mail
                </button>

                <button
                  type="button"
                  disabled={reenvioEm > 0}
                  onClick={() => enviarCodigo()}
                  className="text-teal-action font-bold disabled:text-ink-tertiary disabled:cursor-not-allowed"
                >
                  {reenvioEm > 0 ? `Reenviar em ${reenvioEm}s` : 'Reenviar código'}
                </button>
              </div>
            </form>
          )}

          <p className="text-xs text-ink-tertiary mt-8">{rodape}</p>
        </div>
      </div>
    </div>
  )
}
