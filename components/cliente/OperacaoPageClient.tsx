'use client'

import { RequireClienteAuth } from './RequireClienteAuth'
import { OperacaoDetalhe } from './OperacaoDetalhe'

export function OperacaoPageClient({ operacaoId }: { operacaoId: string }) {
  return (
    <RequireClienteAuth>
      {(session) => <OperacaoDetalhe userId={session.user.id} operacaoId={operacaoId} />}
    </RequireClienteAuth>
  )
}
