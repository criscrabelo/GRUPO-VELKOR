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

type ProcessStatus = 'Drafting Dossier' | 'Awaiting Registry' | 'Concluded'

interface Process {
  id: string
  protocol: string
  client: string
  service: string
  date: string
  status: ProcessStatus
}

const INITIAL_PROCESSES: Process[] = [
  {
    id: '1',
    protocol: 'VK-1001',
    client: 'João Silva',
    service: 'Pacote Escritura + Registro',
    date: '2026-06-01',
    status: 'Drafting Dossier',
  },
  {
    id: '2',
    protocol: 'VK-1002',
    client: 'Empresa XYZ',
    service: 'Compra Segura',
    date: '2026-05-20',
    status: 'Awaiting Registry',
  },
  {
    id: '3',
    protocol: 'VK-1003',
    client: 'Roberto Nogueira',
    service: 'Check-up Imobiliário',
    date: '2026-05-15',
    status: 'Concluded',
  },
]

export function ProcessesView() {
  const [processes, setProcesses] = useState<Process[]>(INITIAL_PROCESSES)
  const [search, setSearch] = useState('')

  const handleStatusChange = (id: string, val: ProcessStatus) => {
    setProcesses(processes.map((p) => (p.id === id ? { ...p, status: val } : p)))
    toast.success('Status do processo atualizado!')
  }

  const filtered = processes.filter(
    (p) =>
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.protocol.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Buscar por protocolo ou cliente..."
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
              <TableHead className="font-bold text-petrol h-12">Protocolo</TableHead>
              <TableHead className="font-bold text-petrol">Cliente</TableHead>
              <TableHead className="font-bold text-petrol">Serviço</TableHead>
              <TableHead className="font-bold text-petrol">Início</TableHead>
              <TableHead className="font-bold text-petrol">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-bold text-petrol">{p.protocol}</TableCell>
                <TableCell className="font-medium text-slate-900">{p.client}</TableCell>
                <TableCell className="text-slate-600">{p.service}</TableCell>
                <TableCell className="text-slate-600">
                  {new Date(p.date).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  <Select
                    value={p.status}
                    onValueChange={(val: ProcessStatus) => handleStatusChange(p.id, val)}
                  >
                    <SelectTrigger
                      className={cn(
                        'w-[180px] h-8 text-[11px] font-bold tracking-wide uppercase',
                        p.status === 'Drafting Dossier'
                          ? 'bg-orange-50 text-orange-600 border-orange-200'
                          : p.status === 'Awaiting Registry'
                            ? 'bg-blue-50 text-blue-600 border-blue-200'
                            : 'bg-green-50 text-green-600 border-green-200',
                      )}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="Drafting Dossier"
                        className="font-semibold text-orange-600"
                      >
                        DRAFTING DOSSIER
                      </SelectItem>
                      <SelectItem value="Awaiting Registry" className="font-semibold text-blue-600">
                        AWAITING REGISTRY
                      </SelectItem>
                      <SelectItem value="Concluded" className="font-semibold text-green-600">
                        CONCLUDED
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                  Nenhum processo encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
