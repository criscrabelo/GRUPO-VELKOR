import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { LayoutDashboard, Users, FileText, BookOpen, Settings } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/config'
import { cn } from '@/lib/utils'

export type AdminView = 'overview' | 'leads' | 'processes' | 'catalog' | 'settings'

interface AdminSidebarProps {
  activeView: AdminView
  onViewChange: (view: AdminView) => void
}

export function AdminSidebar({ activeView, onViewChange }: AdminSidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads & Inquiries', icon: Users },
    { id: 'processes', label: 'Process Tracking', icon: FileText },
    { id: 'catalog', label: 'Service Catalog', icon: BookOpen },
    { id: 'settings', label: 'Institutional Settings', icon: Settings },
  ] as const

  return (
    <Sidebar className="border-r border-slate-200 bg-petrol [&_[data-sidebar=sidebar]]:bg-petrol text-white">
      <SidebarHeader className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3 px-2">
          <img src={SITE_CONFIG.logoUrl} alt="Logo" className="h-6 brightness-0 invert" />
          <span className="font-bold text-[10px] uppercase tracking-widest text-cyan border border-cyan/30 px-2 py-0.5 rounded-full">
            Admin
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeView === item.id}
                    onClick={() => onViewChange(item.id)}
                    className={cn(
                      'transition-colors py-5',
                      activeView === item.id
                        ? 'bg-cyan/10 text-cyan font-bold hover:bg-cyan/20 hover:text-cyan'
                        : 'text-white/70 hover:text-white hover:bg-white/10',
                    )}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
