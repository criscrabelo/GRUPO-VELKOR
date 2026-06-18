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
import { Plus, MoreHorizontal, FileEdit, Trash2, Mail, Phone } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
  registrationNumber: string // OAB, CREA, CAU, etc.
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

export function PartnersView() {
  const [partners] = useState<Partner[]>(mockPartners)

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
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Rede de Parceiros</h2>
          <p className="text-sm text-slate-500 mt-1">
            Gerencie os profissionais e empresas habilitadas para serviços privativos.
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
                <TableRow key={partner.id} className="hover:bg-slate-50/50">
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
                      <DropdownMenuTrigger asChild>
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
    </div>
  )
}
