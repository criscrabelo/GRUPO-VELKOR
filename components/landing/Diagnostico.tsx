'use client'

import { useRef, useState } from 'react'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { PERGUNTAS, PERFIS, PASSOS, type ServiceProfile } from '@/lib/catalog'
import { registrarEvento } from '@/lib/analytics'

export function Diagnostico({ onVerCaminho }: { onVerCaminho: (perfil: ServiceProfile) => void }) {
  const [passo, setPasso] = useState(0) // 0..2 = perguntas, 3 = resultado
  const [respostas, setRespostas] = useState<string[]>([])
  // Um mesmo visitante conta uma vez em cada etapa do funil, mesmo que
  // volte ou refaça o diagnóstico na mesma visita.
  const iniciadoRegistrado = useRef(false)
  const concluidoRegistrado = useRef(false)

  const progresso = Math.min(passo, PERGUNTAS.length) / PERGUNTAS.length

  function responder(valor: string) {
    if (passo === 0 && !iniciadoRegistrado.current) {
      iniciadoRegistrado.current = true
      registrarEvento('diagnostico_iniciado')
    }
    const novas = [...respostas.slice(0, passo), valor]
    setRespostas(novas)
    const proximoPasso = passo + 1
    setPasso(proximoPasso)
    if (proximoPasso === PERGUNTAS.length && !concluidoRegistrado.current) {
      concluidoRegistrado.current = true
      registrarEvento('diagnostico_concluido')
    }
  }

  function voltar() {
    if (passo > 0) setPasso(passo - 1)
  }

  function reiniciar() {
    setPasso(0)
    setRespostas([])
  }

  const perfil = respostas[0] as ServiceProfile | undefined
  const passoResposta = respostas[2]

  return (
    <section id="diagnostico" className="py-20 bg-surface">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-10">
          <p className="section-label text-teal-action mb-3">Diagnóstico gratuito</p>
          <h2 className="heading-serif text-3xl font-bold text-ink-primary mb-3">
            Três perguntas para saber por onde começar
          </h2>
          <p className="text-ink-secondary">
            Orientação inicial e gratuita — não substitui a conferência documental contratada.
          </p>
        </div>

        <div className="bg-page rounded-card border border-border p-6 md:p-8">
          {passo < PERGUNTAS.length ? (
            <>
              <div
                role="progressbar"
                aria-valuenow={Math.round(progresso * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Pergunta ${passo + 1} de ${PERGUNTAS.length}`}
                className="h-1.5 w-full rounded-full bg-border mb-8 overflow-hidden"
              >
                <div
                  className="h-full bg-cyan-brand transition-all duration-300"
                  style={{ width: `${((passo + 1) / PERGUNTAS.length) * 100}%` }}
                />
              </div>

              <p className="text-xs font-bold uppercase tracking-wider text-ink-tertiary mb-3">
                Pergunta {passo + 1} de {PERGUNTAS.length}
              </p>
              <h3 className="heading-serif text-xl md:text-2xl font-semibold text-ink-primary mb-6">
                {PERGUNTAS[passo].q}
              </h3>

              <div className="grid gap-3 mb-6">
                {PERGUNTAS[passo].opcoes.map((op) => (
                  <button
                    key={op.v}
                    type="button"
                    onClick={() => responder(op.v)}
                    className="text-left rounded-button border border-border bg-surface px-5 py-4 font-medium text-ink-primary hover:border-cyan-brand hover:bg-cyan-brand/5 transition-colors min-h-[44px]"
                  >
                    {op.label}
                  </button>
                ))}
              </div>

              {passo > 0 && (
                <button
                  type="button"
                  onClick={voltar}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-secondary hover:text-teal-action"
                >
                  <ArrowLeft className="w-4 h-4" /> Voltar
                </button>
              )}
            </>
          ) : (
            perfil &&
            PERFIS[perfil] && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-brand mb-3">
                  Resultado
                </p>
                <h3 className="heading-serif text-2xl font-bold text-ink-primary mb-2">
                  {PERFIS[perfil].titulo}
                </h3>
                <p className="text-ink-secondary mb-6">{PERFIS[perfil].resumo}</p>

                {passoResposta && PASSOS[passoResposta] && (
                  <div className="bg-surface border border-border rounded-button p-4 mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-ink-tertiary mb-1.5">
                      Próximo passo sugerido
                    </p>
                    <p className="text-ink-primary font-medium">{PASSOS[passoResposta]}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => onVerCaminho(perfil)}
                    className="rounded-button bg-cyan-brand text-teal-institutional font-bold px-6 py-3.5 hover:bg-cyan-brand/90 transition-colors min-h-[44px]"
                  >
                    Ver meu caminho recomendado
                  </button>
                  <button
                    type="button"
                    onClick={reiniciar}
                    className="inline-flex items-center justify-center gap-1.5 rounded-button border border-border px-6 py-3.5 font-bold text-ink-secondary hover:border-teal-action hover:text-teal-action transition-colors min-h-[44px]"
                  >
                    <RotateCcw className="w-4 h-4" /> Refazer diagnóstico
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
