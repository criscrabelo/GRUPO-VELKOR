import { AlertTriangle } from 'lucide-react'

export function RascunhoBanner() {
  return (
    <div className="bg-attention-bg border-b-2 border-attention-border">
      <div className="container mx-auto px-4 py-4 max-w-3xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-attention-text shrink-0 mt-0.5" />
        <p className="text-sm text-attention-text font-medium">
          <strong>Rascunho — pendente de revisão jurídica.</strong> Este texto foi gerado como
          minuta de trabalho e ainda não foi revisado por um advogado especializado em proteção de
          dados. Não tem validade jurídica até aprovação formal e não deve ser publicado nem
          vinculado ao site em produção antes dessa revisão.
        </p>
      </div>
    </div>
  )
}
