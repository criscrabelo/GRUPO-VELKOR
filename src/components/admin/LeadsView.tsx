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
  email: string
  phone: string
  interest: 'Pessoa Física' | 'Empresa/Investidor'
  service: string
  date: string
  status: LeadStatus
}

const INITIAL_LEADS: Lead[] = [
  {
    id: '1',
    client: 'Carlos Almeida',
    email: 'carlos@email.com',
    phone: '(12) 99123-4567',
    interest: 'Pessoa Física',
    service: 'Check-up Imobiliário',
    date: '2026-06-18',
    status: 'New',
  },
  {
    id: '2',
    client: 'Mariana Costa',
    email: 'mariana.c@email.com',
    phone: '(11) 98765-4321',
    interest: 'Pessoa Física',
    service: 'Compra Segura',
    date: '2026-06-17',
    status: 'Contacted',
  },
  {
    id: '3',
    client: 'TechCorp LTDA',
    email: 'contato@techcorp.com',
    phone: '(12) 3900-1234',
    interest: 'Empresa/Investidor',
    service: 'Diagnóstico Patrimonial Familiar',
    date: '2026-06-15',
    status: 'In Progress',
  },
  {
    id: '4',
    client: 'Ana Beatriz',
    email: 'ana.b@email.com',
    phone: '(11) 99888-7777',
    interest: 'Empresa/Investidor',
    service: 'Leilão Imobiliário Assistido',
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
            className="pl-10 bg-white border-slate-200 focus-visible:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            <TableRow>
              <TableHead className="font-bold text-slate-900 h-12">Cliente / Contato</TableHead>
              <TableHead className="font-bold text-slate-900">Interesse</TableHead>
              <TableHead className="font-bold text-slate-900">Serviço Solicitado</TableHead>
              <TableHead className="font-bold text-slate-900">Data</TableHead>
              <TableHead className="font-bold text-slate-900">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell>
                  <p className="font-bold text-blue-900">{lead.client}</p>
                  <p className="text-xs text-slate-500">{lead.email}</p>
                  <p className="text-xs text-slate-500">{lead.phone}</p>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'px-2 py-1 rounded-full text-xs font-semibold',
                      lead.interest === 'Empresa/Investidor'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700',
                    )}
                  >
                    {lead.interest}
                  </span>
                </TableCell>
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
                          ? 'bg-blue-50 text-blue-600 border-blue-200'
                          : lead.status === 'Contacted'
                            ? 'bg-purple-50 text-purple-600 border-purple-200'
                            : 'bg-orange-50 text-orange-600 border-orange-200',
                      )}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New" className="font-semibold text-blue-600">
                        NEW
                      </SelectItem>
                      <SelectItem value="Contacted" className="font-semibold text-purple-600">
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
                <TableCell colSpan={5} className="h-32 text-center text-slate-500">
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
