'use client'

import { RequireClienteAuth } from './RequireClienteAuth'
import { DossieDigital } from './DossieDigital'

export function DossiePageClient() {
  return <RequireClienteAuth>{(session) => <DossieDigital userId={session.user.id} />}</RequireClienteAuth>
}
