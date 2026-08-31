'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, LogOut, Download, FileText, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { VelkorLogo } from '@/components/landing/VelkorLogo'
import { DOCUMENTO_STATUS_LABEL, type DocumentoRow } from '@/lib/types-db'

interface DocumentoComOperacao extends DocumentoRow {
  operacoes: { nome: string } | null
}

const STATUS_COR: Record<DocumentoRow['status'], string> = {
  conferido: 'bg-success/10 text-success',
  disponivel: 'bg-cyan-light/30 text-teal-action',
  arquivado: 'bg-page text-ink-tertiary',
  aguarda_pagamento: 'bg-attention-bg text-attention-text',
  em_conferencia: 'bg-attention-bg text-attention-text',
}

export function DossieDigital({ userId }: { userId: string }) {
  const [documentos, setDocumentos] = useState<DocumentoComOperacao[] | null>(null)
  const [baixando, setBaixando] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  const carregar = useCallback(async () => {
    const { data, error } = await supabase
      .from('documentos')
      .select('*, operacoes(nome)')
      .eq('cliente_user_id', userId)
      .order('criado_em', { ascending: false })

    if (error) {
      setErro('Não foi possível carregar seus documentos agora.')
      return
    }
    setErro(null)
    setDocumentos((data as unknown as DocumentoComOperacao[]) ?? [])
  }, [userId])

  useEffect(() => {
    carregar()
  }, [carregar])

  async function baixar(doc: DocumentoComOperacao) {
    if (!doc.storage_path) return
    setBaixando(doc.id)

    const { data, error } = await supabase.storage
      .from('documentos-clientes')
      .createSignedUrl(doc.storage_path, 60)

    setBaixando(null)

    if (error || !data?.signedUrl) {
      setErro('Não foi possível gerar o link de download deste documento.')
      return
    }

    const { error: registroError } = await supabase.from('historico_eventos').insert({
      operacao_id: doc.operacao_id,
      cliente_user_id: userId,
      titulo: `Documento baixado por você: ${doc.nome}`,
      autor: 'Cliente',
    })
    if (registroError) {
      // O download segue mesmo assim, mas a falha de registro não pode ser silenciosa.
      console.warn('Falha ao registrar download no histórico:', registroError.message)
    }

    window.open(data.signedUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-page">
      <header className="bg-teal-institutional text-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/imobiliaria">
            <VelkorLogo heightClassName="h-8 brightness-0 invert" />
          </Link>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-white/90 hover:text-white min-h-[44px] px-2"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-4xl">
        <Link
          href="/cliente"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-secondary hover:text-teal-action mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        <p className="section-label text-teal-action mb-2">Painel do cliente</p>
        <h1 className="heading-serif text-2xl font-bold text-ink-primary mb-6">Dossiê digital</h1>

        {erro && (
          <div className="rounded-card border border-red-200 bg-red-50 text-red-700 text-sm p-4 mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" /> {erro}
          </div>
        )}

        {documentos === null ? (
          <p className="text-ink-tertiary text-sm">Carregando...</p>
        ) : documentos.length === 0 ? (
          <div className="rounded-card border border-dashed border-border bg-surface p-8 text-center">
            <FileText className="w-8 h-8 text-ink-tertiary mx-auto mb-3" />
            <p className="text-ink-secondary font-medium">Nenhum documento no seu dossiê ainda.</p>
            <p className="text-sm text-ink-tertiary mt-1">
              Documentos conferidos e enviados nas suas operações aparecem aqui.
            </p>
          </div>
        ) : (
          <div className="rounded-card border border-border bg-surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-page text-left text-xs font-bold uppercase tracking-wider text-ink-tertiary">
                  <tr>
                    <th className="px-5 py-3">Documento</th>
                    <th className="px-5 py-3">Data</th>
                    <th className="px-5 py-3">Operação</th>
                    <th className="px-5 py-3">Origem</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {documentos.map((doc) => (
                    <tr key={doc.id}>
                      <td className="px-5 py-4 font-medium text-ink-primary">{doc.nome}</td>
                      <td className="px-5 py-4 text-ink-tertiary">
                        {new Date(doc.criado_em).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-5 py-4 text-ink-secondary">
                        {doc.operacoes?.nome ?? '—'}
                      </td>
                      <td className="px-5 py-4 text-ink-secondary">
                        {doc.origem === 'velkor' ? 'Velkor' : 'Cliente'}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${STATUS_COR[doc.status]}`}
                        >
                          {DOCUMENTO_STATUS_LABEL[doc.status]}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        {doc.storage_path ? (
                          <button
                            type="button"
                            disabled={baixando === doc.id}
                            onClick={() => baixar(doc)}
                            className="inline-flex items-center gap-1.5 rounded-button border border-teal-action text-teal-action text-xs font-bold px-3 py-2 hover:bg-teal-action/5 transition-colors disabled:opacity-50 min-h-[36px]"
                          >
                            <Download className="w-3.5 h-3.5" />
                            {baixando === doc.id ? 'Gerando link...' : 'Baixar'}
                          </button>
                        ) : (
                          <span className="text-xs text-ink-tertiary">Sem arquivo</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p className="text-xs text-ink-tertiary mt-6">
          Acesso restrito ao titular da operação. Todo download fica registrado.
        </p>
      </main>
    </div>
  )
}
