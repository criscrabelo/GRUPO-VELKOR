'use client'

import { useEffect, useRef, useState } from 'react'
import { registrarEvento } from '@/lib/analytics'
import { Header } from './Header'
import { Hero } from './Hero'
import { Diagnostico } from './Diagnostico'
import { PorQueVelkor } from './PorQueVelkor'
import { ComoFunciona } from './ComoFunciona'
import { Solucoes } from './Solucoes'
import { Simulador } from './Simulador'
import { Limites } from './Limites'
import { Contato } from './Contato'
import { Footer } from './Footer'
import type { CatalogFilter, CatalogService, ServiceProfile } from '@/lib/catalog'

export function LandingApp() {
  const [selecionados, setSelecionados] = useState<Set<string>>(new Set())
  const [filtroSolucoes, setFiltroSolucoes] = useState<CatalogFilter['key']>('todos')
  const [avancarMsg, setAvancarMsg] = useState(false)
  const [ultimoOrcamento, setUltimoOrcamento] = useState<string | null>(null)
  const solucoesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registrarEvento('visita')
  }, [])

  function toggleServico(id: string) {
    setSelecionados((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function removerServico(id: string) {
    setSelecionados((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  function verCaminho(perfil: ServiceProfile) {
    setFiltroSolucoes(perfil)
    document.getElementById('solucoes')?.scrollIntoView({ behavior: 'smooth' })
  }

  function pedirOrcamento(servico: CatalogService) {
    setUltimoOrcamento(servico.nome)
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
  }

  function comecarDiagnostico() {
    document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' })
  }

  function avancarComPacote() {
    registrarEvento('pacote_montado')
    setAvancarMsg(true)
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Diagnostico onVerCaminho={verCaminho} />
        <PorQueVelkor />
        <ComoFunciona />
        <div ref={solucoesRef}>
          <Solucoes
            selecionados={selecionados}
            onToggle={toggleServico}
            filtro={filtroSolucoes}
            onFiltroChange={setFiltroSolucoes}
            onPedirOrcamento={pedirOrcamento}
            onComecarDiagnostico={comecarDiagnostico}
          />
        </div>
        <Simulador selecionados={selecionados} onRemover={removerServico} onAvancar={avancarComPacote} />
        {avancarMsg && (
          <div
            role="status"
            aria-live="polite"
            className="bg-cyan-brand/10 border-y border-cyan-brand/30 text-teal-institutional text-sm text-center py-3 px-4"
          >
            Pacote registrado. A contratação e o pagamento digital serão concluídos na próxima
            etapa, ainda em construção.
          </div>
        )}
        <Limites />
        <Contato assuntoSugerido={ultimoOrcamento} />
      </main>
      <Footer />
    </>
  )
}
