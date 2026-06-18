import { useState, useMemo } from 'react'
import { toast } from 'sonner'
import { Search, Eye, LogOut, FileText, CheckCircle2, Clock, Inbox } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { useNavigate } from 'react-router-dom'

type OrderStatus = 'novo' | 'andamento' | 'concluido'

interface Order {
  id: string
  protocol: string
  service: string
  client: string
  email: string
  phone: string
  date: string
  status: OrderStatus
  price: number
}

const INITIAL_ORDERS: Order[] = [
  {
    id: '1',
    protocol: 'PV-1021',
    service: 'Avaliação Imobiliária',
    client: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-1111',
    date: '2026-06-12',
    status: 'novo',
    price: 800,
  },
  {
    id: '2',
    protocol: 'PV-1022',
    service: 'Gestão de Aluguel',
    client: 'TechCorp LTDA',
    email: 'contato@techcorp.com',
    phone: '(11) 98888-2222',
    date: '2026-06-11',
    status: 'andamento',
    price: 150,
  },
  {
    id: '3',
    protocol: 'PV-1023',
    service: 'Assessoria Jurídica',
    client: 'Maria Souza',
    email: 'maria@email.com',
    phone: '(11) 97777-3333',
    date: '2026-06-10',
    status: 'concluido',
    price: 1200,
  },
  {
    id: '4',
    protocol: 'PV-1024',
    service: 'Fotografia Profissional',
    client: 'Carlos Pereira',
    email: 'carlos@email.com',
    phone: '(11) 96666-4444',
    date: '2026-06-13',
    status: 'novo',
    price: 400,
  },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'todos' | OrderStatus>('todos')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const stats = useMemo(() => {
    return {
      total: orders.length,
      novos: orders.filter((o) => o.status === 'novo').length,
      andamento: orders.filter((o) => o.status === 'andamento').length,
      concluidos: orders.filter((o) => o.status === 'concluido').length,
    }
  }, [orders])

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.protocol.toLowerCase().includes(search.toLowerCase()) ||
        o.client.toLowerCase().includes(search.toLowerCase()) ||
        o.service.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'todos' || o.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [orders, search, statusFilter])

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
    toast.success('Status atualizado com sucesso!')
  }

  const openDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsDrawerOpen(true)
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'novo':
        return 'text-cyan-600'
      case 'andamento':
        return 'text-orange-500'
      case 'concluido':
        return 'text-green-600'
      default:
        return 'text-slate-500'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navbar */}
      <header className="bg-petrol text-white py-4 px-6 sticky top-0 z-10 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-display font-bold tracking-wider">
            VELKOR{' '}
            <span className="text-cyan font-normal text-sm ml-2 px-2 py-0.5 bg-cyan/10 rounded-full">
              Admin
            </span>
          </h1>
        </div>
        <Button
          variant="ghost"
          className="text-white hover:bg-white/10"
          onClick={() => navigate('/admin/login')}
        >
          <LogOut className="w-4 h-4 mr-2" /> Sair
        </Button>
      </header>

      <main className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium mb-1">Total de Pedidos</p>
              <p className="text-3xl font-display font-bold text-petrol">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium mb-1 flex items-center">
                <span className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></span> Novos
              </p>
              <p className="text-3xl font-display font-bold text-petrol">{stats.novos}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600">
              <Inbox className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium mb-1 flex items-center">
                <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span> Em Andamento
              </p>
              <p className="text-3xl font-display font-bold text-petrol">{stats.andamento}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium mb-1 flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Concluídos
              </p>
              <p className="text-3xl font-display font-bold text-petrol">{stats.concluidos}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Buscar por protocolo, cliente ou serviço..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-full bg-slate-50 border-slate-200"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            <Badge
              variant={statusFilter === 'todos' ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer shrink-0',
                statusFilter === 'todos'
                  ? 'bg-petrol text-white hover:bg-petrol/90'
                  : 'text-slate-600',
              )}
              onClick={() => setStatusFilter('todos')}
            >
              Todos
            </Badge>
            <Badge
              variant={statusFilter === 'novo' ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer shrink-0',
                statusFilter === 'novo'
                  ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                  : 'text-cyan-700 border-cyan-200 bg-cyan-50',
              )}
              onClick={() => setStatusFilter('novo')}
            >
              Novos
            </Badge>
            <Badge
              variant={statusFilter === 'andamento' ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer shrink-0',
                statusFilter === 'andamento'
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : 'text-orange-700 border-orange-200 bg-orange-50',
              )}
              onClick={() => setStatusFilter('andamento')}
            >
              Em Andamento
            </Badge>
            <Badge
              variant={statusFilter === 'concluido' ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer shrink-0',
                statusFilter === 'concluido'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'text-green-700 border-green-200 bg-green-50',
              )}
              onClick={() => setStatusFilter('concluido')}
            >
              Concluídos
            </Badge>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-semibold text-petrol">Protocolo</TableHead>
                <TableHead className="font-semibold text-petrol">Serviço</TableHead>
                <TableHead className="font-semibold text-petrol">Cliente</TableHead>
                <TableHead className="font-semibold text-petrol">Data</TableHead>
                <TableHead className="font-semibold text-petrol">Status</TableHead>
                <TableHead className="text-right font-semibold text-petrol">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-medium text-slate-900">{order.protocol}</TableCell>
                    <TableCell className="text-slate-600">{order.service}</TableCell>
                    <TableCell className="text-slate-600">{order.client}</TableCell>
                    <TableCell className="text-slate-600">
                      {new Date(order.date).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(val: OrderStatus) => handleStatusChange(order.id, val)}
                      >
                        <SelectTrigger
                          className={cn(
                            'w-[140px] h-8 text-xs font-semibold',
                            getStatusColor(order.status),
                          )}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="novo" className="text-cyan-600 font-medium">
                            Novo
                          </SelectItem>
                          <SelectItem value="andamento" className="text-orange-500 font-medium">
                            Em Andamento
                          </SelectItem>
                          <SelectItem value="concluido" className="text-green-600 font-medium">
                            Concluído
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDetails(order)}
                        className="text-petrol hover:bg-slate-100"
                      >
                        <Eye className="w-4 h-4 mr-2" /> Ver Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                    Nenhum pedido encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Detail Drawer */}
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetContent className="w-full sm:max-w-md bg-white/95 backdrop-blur-md border-l border-slate-200 sm:rounded-l-2xl p-0 flex flex-col">
            {selectedOrder && (
              <>
                <div className="bg-petrol p-6 text-white shrink-0">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Badge
                        variant="outline"
                        className="bg-white/10 text-cyan border-white/20 mb-2 uppercase text-[10px] tracking-wider"
                      >
                        {selectedOrder.status}
                      </Badge>
                      <SheetTitle className="text-2xl font-display text-white">
                        {selectedOrder.protocol}
                      </SheetTitle>
                    </div>
                  </div>
                  <SheetDescription className="text-white/70">
                    Criado em {new Date(selectedOrder.date).toLocaleDateString('pt-BR')}
                  </SheetDescription>
                </div>

                <div className="p-6 flex-1 overflow-y-auto space-y-8">
                  <section>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">
                      Dados do Cliente
                    </h3>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3 text-sm">
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-slate-500">Nome:</span>
                        <span className="col-span-2 font-medium text-slate-900">
                          {selectedOrder.client}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-slate-500">Email:</span>
                        <span className="col-span-2 font-medium text-slate-900">
                          {selectedOrder.email}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-slate-500">Telefone:</span>
                        <span className="col-span-2 font-medium text-slate-900">
                          {selectedOrder.phone}
                        </span>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">
                      Detalhes do Serviço
                    </h3>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3 text-sm">
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-slate-500">Serviço:</span>
                        <span className="col-span-2 font-medium text-slate-900">
                          {selectedOrder.service}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 items-center">
                        <span className="text-slate-500">Valor:</span>
                        <span className="col-span-2 font-display font-bold text-lg text-petrol">
                          R${' '}
                          {selectedOrder.price.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="p-6 border-t border-slate-200 bg-slate-50 shrink-0">
                  <Button
                    className="w-full bg-petrol hover:bg-petrol/90"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Fechar
                  </Button>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </main>
    </div>
  )
}
