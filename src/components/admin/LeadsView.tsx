import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type LeadStatus = 'New' | 'Contacted' | 'In Progress'

interface Lead {
  id: string
  client: string
  service: string
  date: string
  status: LeadStatus
}

const INITIAL_LEADS: Lead[] = [
  {
    id: '1',
    client: 'Carlos Almeida',
    service: 'Check-up Imobiliário',
    date: '2026-06-18',
    status: 'New',
  },
  {
    id: '2',
    client: 'Mariana Costa',
    service: 'Compra Segura',
    date: '2026-06-17',
    status: 'Contacted',
  },
  {
    id: '3',
    client: 'TechCorp LTDA',
    service: 'Regularização',
    date: '2026-06-15',
    status: 'In Progress',
  },
  {
    id: '4',
    client: 'Ana Beatriz',
    service: 'Leilão Assistido',
    date: '2026-06-14',
    status: 'New',
  },
]

export function LeadsView() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS)
  const [search, setSearch] = useState('')

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)))
    toast.success('Status do lead atualizado!')
  }

  const filteredLeads = leads.filter(
    (l) =>
      l.client.toLowerCase().includes(search.toLowerCase()) ||
      l.service.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Buscar por cliente ou serviço..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white border-slate-200 focus-visible:ring-cyan"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            <TableRow>
              <TableHead className="font-bold text-petrol h-12">Cliente</TableHead>
              <TableHead className="font-bold text-petrol">Serviço Solicitado</TableHead>
              <TableHead className="font-bold text-petrol">Data de Contato</TableHead>
              <TableHead className="font-bold text-petrol">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-bold text-petrol">{lead.client}</TableCell>
                <TableCell className="text-slate-600 font-medium">{lead.service}</TableCell>
                <TableCell className="text-slate-600">
                  {new Date(lead.date).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  <Select
                    value={lead.status}
                    onValueChange={(val: LeadStatus) => handleStatusChange(lead.id, val)}
                  >
                    <SelectTrigger
                      className={cn(
                        'w-[140px] h-8 text-[11px] font-bold tracking-wide uppercase',
                        lead.status === 'New'
                          ? 'bg-cyan/10 text-cyan border-cyan/20'
                          : lead.status === 'Contacted'
                            ? 'bg-blue-50 text-blue-600 border-blue-200'
                            : 'bg-orange-50 text-orange-600 border-orange-200',
                      )}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New" className="font-semibold text-cyan">
                        NEW
                      </SelectItem>
                      <SelectItem value="Contacted" className="font-semibold text-blue-600">
                        CONTACTED
                      </SelectItem>
                      <SelectItem value="In Progress" className="font-semibold text-orange-600">
                        IN PROGRESS
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
            {filteredLeads.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-slate-500">
                  Nenhum lead encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
