'use client'

import { useRef, useState } from 'react'
import { X, UploadCloud, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const TIPOS_ACEITOS = ['application/pdf', 'image/jpeg', 'image/png']
const TAMANHO_MAX = 10 * 1024 * 1024 // 10 MB

export function EnviarDocumentoModal({
  userId,
  operacaoId,
  pendenciaId,
  onFechar,
  onEnviado,
}: {
  userId: string
  operacaoId: string
  pendenciaId?: string
  onFechar: () => void
  onEnviado: () => void
}) {
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [aceite, setAceite] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [arrastando, setArrastando] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function validarEDefinir(file: File | undefined) {
    setErro(null)
    if (!file) return
    if (!TIPOS_ACEITOS.includes(file.type)) {
      setErro('Formato não aceito. Envie um arquivo PDF, JPG ou PNG.')
      return
    }
    if (file.size > TAMANHO_MAX) {
      setErro('Arquivo maior que 10 MB.')
      return
    }
    setArquivo(file)
  }

  async function enviar() {
    if (!arquivo || !aceite) return
    setEnviando(true)
    setErro(null)

    const caminho = `${userId}/${operacaoId}/${Date.now()}-${arquivo.name}`

    const { error: uploadError } = await supabase.storage
      .from('documentos-clientes')
      .upload(caminho, arquivo)

    if (uploadError) {
      setEnviando(false)
      setErro('Não foi possível enviar o arquivo. Tente novamente.')
      return
    }

    const { error: insertError } = await supabase.from('documentos').insert({
      operacao_id: operacaoId,
      cliente_user_id: userId,
      nome: arquivo.name,
      origem: 'cliente',
      status: 'em_conferencia',
      storage_path: caminho,
    })

    if (insertError) {
      // Não deixa o arquivo órfão no Storage se o registro falhou.
      await supabase.storage.from('documentos-clientes').remove([caminho])
      setEnviando(false)
      setErro('O arquivo subiu, mas não foi possível registrar o documento. Nada foi salvo — tente novamente.')
      return
    }

    let pendenciaError: unknown = null
    if (pendenciaId) {
      const { error, count } = await supabase
        .from('pendencias')
        .update({ status: 'em_conferencia', atualizado_em: new Date().toISOString() }, { count: 'exact' })
        .eq('id', pendenciaId)
      pendenciaError = error ?? (count === 0 ? new Error('pendência não atualizada') : null)
    }

    const { error: historicoError } = await supabase.from('historico_eventos').insert({
      operacao_id: operacaoId,
      cliente_user_id: userId,
      titulo: `Documento enviado por você: ${arquivo.name}`,
      autor: 'Cliente',
    })

    setEnviando(false)

    if (pendenciaError || historicoError) {
      setErro(
        'O documento foi salvo, mas a atualização da pendência ou do histórico falhou. ' +
          'A equipe Velkor ainda verá o documento na conferência.',
      )
      return
    }

    onEnviado()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Enviar documento"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div className="w-full max-w-md bg-surface rounded-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="heading-serif text-lg font-bold text-ink-primary">Enviar documento</h2>
          <button
            type="button"
            aria-label="Fechar"
            onClick={onFechar}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-page text-ink-tertiary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault()
            setArrastando(true)
          }}
          onDragLeave={() => setArrastando(false)}
          onDrop={(e) => {
            e.preventDefault()
            setArrastando(false)
            validarEDefinir(e.dataTransfer.files[0])
          }}
          onClick={() => inputRef.current?.click()}
          className={`rounded-button border-2 border-dashed p-8 text-center cursor-pointer transition-colors mb-4 ${
            arrastando ? 'border-cyan-brand bg-cyan-brand/5' : 'border-border'
          }`}
        >
          <UploadCloud className="w-8 h-8 text-ink-tertiary mx-auto mb-2" />
          {arquivo ? (
            <p className="text-sm font-medium text-ink-primary">{arquivo.name}</p>
          ) : (
            <p className="text-sm text-ink-secondary">
              Arraste o arquivo aqui, ou clique para escolher
              <br />
              <span className="text-xs text-ink-tertiary">PDF, JPG ou PNG · até 10 MB</span>
            </p>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => validarEDefinir(e.target.files?.[0])}
          />
        </div>

        {erro && (
          <p className="text-sm text-red-600 flex items-center gap-1.5 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" /> {erro}
          </p>
        )}

        <label className="flex items-start gap-2.5 mb-5 cursor-pointer">
          <input
            type="checkbox"
            checked={aceite}
            onChange={(e) => setAceite(e.target.checked)}
            className="mt-1 w-4 h-4"
          />
          <span className="text-xs text-ink-secondary">
            Autorizo o tratamento deste documento para a execução do serviço contratado. O acesso
            é restrito ao titular e à equipe da operação.
          </span>
        </label>

        <button
          type="button"
          disabled={!arquivo || !aceite || enviando}
          onClick={enviar}
          className="w-full rounded-button bg-cyan-brand text-teal-institutional font-bold py-3.5 hover:bg-cyan-brand/90 transition-colors disabled:opacity-50 min-h-[44px]"
        >
          {enviando ? 'Enviando...' : 'Enviar documento'}
        </button>
      </div>
    </div>
  )
}
