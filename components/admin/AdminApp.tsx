'use client'

import { RequireStaffAuth } from './RequireStaffAuth'
import { Dashboard } from './Dashboard'

export function AdminApp() {
  return <RequireStaffAuth>{(_session, equipe) => <Dashboard equipe={equipe} />}</RequireStaffAuth>
}
