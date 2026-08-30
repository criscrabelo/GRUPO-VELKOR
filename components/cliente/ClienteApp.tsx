'use client'

import { RequireClienteAuth } from './RequireClienteAuth'
import { VisaoGeral } from './VisaoGeral'

export function ClienteApp() {
  return (
    <RequireClienteAuth>
      {(session) => <VisaoGeral userId={session.user.id} email={session.user.email ?? ''} />}
    </RequireClienteAuth>
  )
}
