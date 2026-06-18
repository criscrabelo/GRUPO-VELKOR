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
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Search, Eye, CheckCircle2, Circle, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type ProcessStatus =
  | 'Aguardando Documentos'
  | 'Em Protocolo'
  | 'Pendência de Terceiros'
  | 'Finalizado'

interface Process {
  id: string
  protocol: string
  client: string
  service: string
  date: string
  status: ProcessStatus
  propertyDetails?: string
}

const INITIAL_PROCESSES: Process[] = [
  {
    id: '1',
    protocol: 'VK-1001',
    client: 'João Silva',
    service: 'Pacote Escritura + Registro',
    date: '2026-06-01',
    status: 'Aguardando Documentos',
    propertyDetails: 'Apartamento 302, Edifício Solar, Centro',
  },
  {
    id: '2',
    protocol: 'VK-1002',
    client: 'Empresa XYZ',
    service: 'Compra Segura',
    date: '2026-05-20',
    status: 'Em Protocolo',
    propertyDetails: 'Galpão Logístico - Zona Industrial',
  },
  {
    id: '3',
    protocol: 'VK-1003',
    client: 'Roberto Nogueira',
    service: 'Check-up Imobiliário',
    date: '2026-05-15',
    status: 'Finalizado',
    propertyDetails: 'Terreno Lote 15, Quadra B, Residencial Jardim',
  },
  {
    id: '4',
    protocol: 'VK-1004',
    client: 'Maria Oliveira',
    service: 'Leilão Imobiliário Assistido',
    date: '2026-06-10',
    status: 'Pendência de Terceiros',
    propertyDetails: 'Casa em Leilão Judicial - TRT 15',
  },
]

const STAGES = [
  'Diagnóstico',
  'Levantamento Documental',
  'Protocolo & Acompanhamento',
  'Entrega Final',
]

export function ProcessesView() {
  const [processes, setProcesses] = useState<Process[]>(INITIAL_PROCESSES)
  const [search, setSearch] = useState('')
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null)

  const handleStatusChange = (id: string, val: ProcessStatus) => {
    setProcesses(processes.map((p) => (p.id === id ? { ...p, status: val } : p)))
    toast.success('Status do processo atualizado!')
  }

  const getStageIndex = (status: ProcessStatus) => {
    switch (status) {
      case 'Aguardando Documentos':
        return 1
      case 'Pendência de Terceiros':
        return 1
      case 'Em Protocolo':
        return 2
      case 'Finalizado':
        return 3
      default:
        return 0
    }
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
            className="pl-10 bg-white border-slate-200 focus-visible:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            <TableRow>
              <TableHead className="font-bold text-slate-900 h-12">Protocolo</TableHead>
              <TableHead className="font-bold text-slate-900">Cliente</TableHead>
              <TableHead className="font-bold text-slate-900">Serviço</TableHead>
              <TableHead className="font-bold text-slate-900">Início</TableHead>
              <TableHead className="font-bold text-slate-900">Status</TableHead>
              <TableHead className="font-bold text-slate-900 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-bold text-blue-900">{p.protocol}</TableCell>
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
                        'w-[220px] h-8 text-[11px] font-bold tracking-wide uppercase',
                        p.status === 'Aguardando Documentos'
                          ? 'bg-orange-50 text-orange-600 border-orange-200'
                          : p.status === 'Em Protocolo'
                            ? 'bg-blue-50 text-blue-600 border-blue-200'
                            : p.status === 'Pendência de Terceiros'
                              ? 'bg-red-50 text-red-600 border-red-200'
                              : 'bg-green-50 text-green-600 border-green-200',
                      )}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="Aguardando Documentos"
                        className="font-semibold text-orange-600"
                      >
                        AGUARDANDO DOCUMENTOS
                      </SelectItem>
                      <SelectItem value="Em Protocolo" className="font-semibold text-blue-600">
                        EM PROTOCOLO
                      </SelectItem>
                      <SelectItem
                        value="Pendência de Terceiros"
                        className="font-semibold text-red-600"
                      >
                        PENDÊNCIA DE TERCEIROS
                      </SelectItem>
                      <SelectItem value="Finalizado" className="font-semibold text-green-600">
                        FINALIZADO
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedProcess(p)}>
                    <Eye className="w-4 h-4 text-slate-500 hover:text-blue-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                  Nenhum processo encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet open={!!selectedProcess} onOpenChange={(open) => !open && setSelectedProcess(null)}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          {selectedProcess && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl font-bold text-slate-900">
                  Dossiê: {selectedProcess.protocol}
                </SheetTitle>
                <SheetDescription className="text-sm text-slate-500">
                  Acompanhamento de processo documental
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Detalhes do Cliente
                  </h4>
                  <p className="text-base font-medium text-slate-900">{selectedProcess.client}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Serviço
                  </h4>
                  <p className="text-sm text-slate-700">{selectedProcess.service}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Detalhes do Imóvel
                  </h4>
                  <p className="text-sm text-slate-700">{selectedProcess.propertyDetails}</p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-4">Progresso Estratégico</h4>
                  <div className="space-y-4">
                    {STAGES.map((stage, index) => {
                      const currentStageIndex = getStageIndex(selectedProcess.status)
                      const isCompleted =
                        index < currentStageIndex ||
                        (index === 3 && selectedProcess.status === 'Finalizado')
                      const isCurrent =
                        index === currentStageIndex && selectedProcess.status !== 'Finalizado'

                      return (
                        <div key={index} className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : isCurrent ? (
                              <Clock className="w-5 h-5 text-blue-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-300" />
                            )}
                          </div>
                          <div>
                            <p
                              className={cn(
                                'text-sm font-semibold',
                                isCompleted
                                  ? 'text-green-700'
                                  : isCurrent
                                    ? 'text-blue-700'
                                    : 'text-slate-500',
                              )}
                            >
                              0{index + 1}. {stage}
                            </p>
                            {isCurrent && (
                              <p className="text-xs text-blue-600 mt-1">
                                Status atual: {selectedProcess.status}
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
