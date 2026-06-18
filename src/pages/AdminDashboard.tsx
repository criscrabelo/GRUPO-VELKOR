import { useState } from 'react'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AdminSidebar, AdminView } from '@/components/admin/AdminSidebar'
import { OverviewView } from '@/components/admin/OverviewView'
import { LeadsView } from '@/components/admin/LeadsView'
import { ProcessesView } from '@/components/admin/ProcessesView'
import { SettingsView } from '@/components/admin/SettingsView'
import { GovernanceView } from '@/components/admin/GovernanceView'
import { FinanceView } from '@/components/admin/FinanceView'
import { PortfolioView } from '@/components/admin/PortfolioView'
import { VaultView } from '@/components/admin/VaultView'
import { PartnersView } from '@/components/admin/PartnersView'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState<AdminView>('overview')
  const navigate = useNavigate()

  const viewTitles: Record<AdminView, string> = {
    overview: 'Painel Geral',
    leads: 'Gestão de Leads',
    processes: 'Acompanhamento de Dossiês',
    governance: 'Governança & Riscos',
    vault: 'Vault de Documentos',
    finance: 'Finanças & Projetos',
    portfolio: 'Carteira & Deliberação',
    partners: 'Gestão de Parceiros',
    settings: 'Configurações',
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50">
        <AdminSidebar activeView={activeView} onViewChange={setActiveView} />
        <SidebarInset className="flex-1 flex flex-col min-w-0 bg-transparent">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shrink-0 sticky top-0 z-10 shadow-sm gap-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-slate-500 hover:text-blue-600" />
              <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
              <h1 className="font-bold text-slate-900 text-lg uppercase tracking-wider">
                {viewTitles[activeView]}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex bg-amber-50 border border-amber-200 text-amber-800 text-xs px-3 py-1.5 rounded-full font-medium">
                Modo Mock: Conecte ao Skip Cloud/Supabase para persistência
              </div>
              <Button
                variant="ghost"
                onClick={() => navigate('/admin/login')}
                className="text-slate-500 hover:text-red-600 hover:bg-red-50 font-semibold"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </header>
          <div className="md:hidden bg-amber-50 border-b border-amber-200 text-amber-800 text-xs px-6 py-2 font-medium">
            Modo Mock: Conecte ao Skip Cloud/Supabase para persistência
          </div>
          <main className="flex-1 p-6 md:p-8 overflow-auto max-w-7xl mx-auto w-full">
            {activeView === 'overview' && <OverviewView />}
            {activeView === 'leads' && <LeadsView />}
            {activeView === 'processes' && <ProcessesView />}
            {activeView === 'governance' && <GovernanceView />}
            {activeView === 'finance' && <FinanceView />}
            {activeView === 'portfolio' && <PortfolioView />}
            {activeView === 'vault' && <VaultView />}
            {activeView === 'partners' && <PartnersView />}
            {activeView === 'settings' && <SettingsView />}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
