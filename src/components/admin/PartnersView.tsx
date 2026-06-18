import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, MoreHorizontal, FileEdit, Trash2, Mail, Phone, FileText } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'

type PartnerStatus = 'active' | 'inactive' | 'pending'
type PartnerSpecialty = 'Legal' | 'Engenharia' | 'Arquitetura' | 'Advocacia'

interface Partner {
  id: string
  name: string
  company: string
  specialty: PartnerSpecialty
  status: PartnerStatus
  email: string
  phone: string
  registrationNumber: string
}

interface AssignedDossier {
  id: string
  title: string
  client: string
  status: string
  assignedDate: string
}

const mockPartners: Partner[] = [
  {
    id: 'p1',
    name: 'Dr. Roberto Almeida',
    company: 'Almeida & Advogados Associados',
    specialty: 'Advocacia',
    status: 'active',
    email: 'roberto@almeidaadv.com.br',
    phone: '(11) 98888-7777',
    registrationNumber: 'OAB/SP 123456',
  },
  {
    id: 'p2',
    name: 'Eng. Carlos Mendes',
    company: 'Mendes Engenharia Estrutural',
    specialty: 'Engenharia',
    status: 'active',
    email: 'carlos@mendeseng.com.br',
    phone: '(11) 97777-6666',
    registrationNumber: 'CREA/SP 654321',
  },
  {
    id: 'p3',
    name: 'Arq. Juliana Costa',
    company: 'JC Arquitetura e Urbanismo',
    specialty: 'Arquitetura',
    status: 'pending',
    email: 'contato@jcarquitetura.com',
    phone: '(11) 96666-5555',
    registrationNumber: 'CAU/BR A12345-6',
  },
  {
    id: 'p4',
    name: 'Dra. Fernanda Lima',
    company: 'Lima Consultoria Jurídica',
    specialty: 'Legal',
    status: 'inactive',
    email: 'fernanda@limaconsultoria.com',
    phone: '(11) 95555-4444',
    registrationNumber: 'OAB/SP 789012',
  },
]

const mockDossiers: AssignedDossier[] = [
  {
    id: 'DOS-2023-001',
    title: 'Regularização de Imóvel - Matrícula 12345',
    client: 'João da Silva',
    status: 'Em Análise',
    assignedDate: '2023-10-01',
  },
  {
    id: 'DOS-2023-045',
    title: 'Due Diligence - Terreno Industrial',
    client: 'Construtora Alpha',
    status: 'Concluído',
    assignedDate: '2023-09-15',
  },
]

export function PartnersView() {
  const [partners] = useState<Partner[]>(mockPartners)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)

  const getStatusBadge = (status: PartnerStatus) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">
            Ativo
          </Badge>
        )
      case 'pending':
        return (
          <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
            Em Análise
          </Badge>
        )
      case 'inactive':
        return (
          <Badge variant="secondary" className="bg-slate-100 text-slate-500">
            Inativo
          </Badge>
        )
    }
  }

  const getSpecialtyBadge = (specialty: PartnerSpecialty) => {
    switch (specialty) {
      case 'Advocacia':
      case 'Legal':
        return (
          <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
            {specialty}
          </Badge>
        )
      case 'Engenharia':
        return (
          <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50">
            {specialty}
          </Badge>
        )
      case 'Arquitetura':
        return (
          <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
            {specialty}
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Gestão de Parceiros</h2>
          <p className="text-sm text-slate-500 mt-1">
            Visualize e gerencie os profissionais e empresas habilitadas para serviços privativos.
          </p>
        </div>
        <Button className="bg-petrol text-white hover:bg-petrol/90">
          <Plus className="w-4 h-4 mr-2" /> Novo Parceiro
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Profissional / Empresa</TableHead>
                <TableHead>Especialidade</TableHead>
                <TableHead>Registro</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner) => (
                <TableRow
                  key={partner.id}
                  className="hover:bg-slate-50/50 cursor-pointer"
                  onClick={() => setSelectedPartner(partner)}
                >
                  <TableCell>
                    <div className="font-medium text-slate-900">{partner.name}</div>
                    <div className="text-sm text-slate-500">{partner.company}</div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {partner.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {partner.phone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getSpecialtyBadge(partner.specialty)}</TableCell>
                  <TableCell className="text-sm text-slate-600 font-mono">
                    {partner.registrationNumber}
                  </TableCell>
                  <TableCell>{getStatusBadge(partner.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem className="cursor-pointer text-slate-700">
                          <FileEdit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Remover</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {partners.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                    Nenhum parceiro encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Sheet open={!!selectedPartner} onOpenChange={(open) => !open && setSelectedPartner(null)}>
        <SheetContent className="sm:max-w-md w-full bg-slate-50 p-0 flex flex-col gap-0 border-l border-slate-200">
          {selectedPartner && (
            <>
              <div className="p-6 bg-white border-b border-slate-200">
                <SheetHeader className="text-left space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <SheetTitle className="text-xl font-bold text-slate-900">
                        {selectedPartner.name}
                      </SheetTitle>
                      <SheetDescription className="text-slate-500 mt-1">
                        {selectedPartner.company}
                      </SheetDescription>
                    </div>
                    {getStatusBadge(selectedPartner.status)}
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Especialidade
                      </p>
                      <div>{getSpecialtyBadge(selectedPartner.specialty)}</div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Registro
                      </p>
                      <p className="text-sm font-mono text-slate-700">
                        {selectedPartner.registrationNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      {selectedPartner.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      {selectedPartner.phone}
                    </div>
                  </div>
                </SheetHeader>
              </div>

              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan" />
                      Dossiês Atribuídos
                    </h3>
                    <Badge variant="secondary" className="bg-slate-200 text-slate-700">
                      {mockDossiers.length}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {mockDossiers.map((dossier) => (
                      <div
                        key={dossier.id}
                        className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-sm text-slate-900 leading-tight">
                            {dossier.title}
                          </p>
                          <Badge
                            variant="outline"
                            className="text-[10px] whitespace-nowrap bg-slate-50"
                          >
                            {dossier.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>Cliente: {dossier.client}</span>
                          <span className="font-mono">{dossier.id}</span>
                        </div>
                        <div className="text-xs text-slate-400 pt-2 border-t border-slate-100">
                          Atribuído em: {new Date(dossier.assignedDate).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>

              <div className="p-4 bg-white border-t border-slate-200 flex justify-end gap-2 shrink-0">
                <Button variant="outline" onClick={() => setSelectedPartner(null)}>
                  Fechar
                </Button>
                <Button className="bg-petrol text-white hover:bg-petrol/90">Atribuir Dossiê</Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
