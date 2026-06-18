import { useState } from 'react'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AdminSidebar, AdminView } from '@/components/admin/AdminSidebar'
import { OverviewView } from '@/components/admin/OverviewView'
import { LeadsView } from '@/components/admin/LeadsView'
import { ProcessesView } from '@/components/admin/ProcessesView'
import { CatalogView } from '@/components/admin/CatalogView'
import { SettingsView } from '@/components/admin/SettingsView'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState<AdminView>('overview')
  const navigate = useNavigate()

  const viewTitles: Record<AdminView, string> = {
    overview: 'Dashboard Overview',
    leads: 'Leads & Inquiries',
    processes: 'Process Tracking',
    catalog: 'Service Catalog',
    settings: 'Institutional Settings',
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50">
        <AdminSidebar activeView={activeView} onViewChange={setActiveView} />
        <SidebarInset className="flex-1 flex flex-col min-w-0 bg-transparent">
          <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shrink-0 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-slate-500 hover:text-petrol" />
              <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
              <h1 className="font-bold text-petrol text-lg uppercase tracking-wider">
                {viewTitles[activeView]}
              </h1>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/login')}
              className="text-slate-500 hover:text-red-600 hover:bg-red-50 font-semibold"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </header>
          <main className="flex-1 p-6 md:p-8 overflow-auto max-w-7xl mx-auto w-full">
            {activeView === 'overview' && <OverviewView />}
            {activeView === 'leads' && <LeadsView />}
            {activeView === 'processes' && <ProcessesView />}
            {activeView === 'catalog' && <CatalogView />}
            {activeView === 'settings' && <SettingsView />}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
