import { useState, useMemo } from 'react'
import { toast } from 'sonner'
import {
  Search,
  Eye,
  LogOut,
  FileText,
  CheckCircle2,
  Clock,
  Inbox,
  Users,
  Network,
  Lock,
  Download,
  Shield,
} from 'lucide-react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { useNavigate } from 'react-router-dom'
import { SITE_CONFIG } from '@/lib/config'

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
    protocol: 'VK-1021',
    service: 'Avaliação Imobiliária',
    client: 'João Silva',
    email: 'joao@email.com',
    phone: '11999991111',
    date: '2026-06-12',
    status: 'novo',
    price: 800,
  },
  {
    id: '2',
    protocol: 'VK-1022',
    service: 'Gestão de Aluguel',
    client: 'TechCorp LTDA',
    email: 'contato@techcorp.com',
    phone: '11988882222',
    date: '2026-06-11',
    status: 'andamento',
    price: 150,
  },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('velkor_orders')
    if (saved) return JSON.parse(saved)
    return INITIAL_ORDERS
  })
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
        o.client.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'todos' || o.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [orders, search, statusFilter])

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    setOrders(updated)
    localStorage.setItem('velkor_orders', JSON.stringify(updated))
    toast.success('Status atualizado com sucesso e log registrado!')
  }

  const openDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsDrawerOpen(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-petrol text-white py-4 px-6 sticky top-0 z-10 shadow-md flex justify-between items-center border-b-2 border-cyan">
        <div className="flex items-center gap-4">
          <img src={SITE_CONFIG.logoUrl} alt="Logo" className="h-8 brightness-0 invert" />
          <span className="text-cyan font-bold text-xs uppercase tracking-widest px-3 py-1 bg-cyan/10 rounded-full border border-cyan/20">
            Operations
          </span>
        </div>
        <Button
          variant="ghost"
          className="text-white hover:bg-white/10 hover:text-cyan"
          onClick={() => navigate('/admin/login')}
        >
          <LogOut className="w-4 h-4 mr-2" /> Sair
        </Button>
      </header>

      <main className="p-6 md:p-8 max-w-7xl mx-auto w-full flex-1">
        <Tabs defaultValue="pedidos" className="w-full space-y-8">
          <TabsList className="bg-white border border-slate-200 p-1 h-auto rounded-xl">
            <TabsTrigger
              value="pedidos"
              className="py-2.5 px-6 rounded-lg data-[state=active]:bg-petrol data-[state=active]:text-white font-semibold"
            >
              Painel de Pedidos
            </TabsTrigger>
            <TabsTrigger
              value="raci"
              className="py-2.5 px-6 rounded-lg data-[state=active]:bg-petrol data-[state=active]:text-white font-semibold"
            >
              Matriz RACI
            </TabsTrigger>
            <TabsTrigger
              value="org"
              className="py-2.5 px-6 rounded-lg data-[state=active]:bg-petrol data-[state=active]:text-white font-semibold"
            >
              Organograma
            </TabsTrigger>
            <TabsTrigger
              value="vault"
              className="py-2.5 px-6 rounded-lg data-[state=active]:bg-petrol data-[state=active]:text-white font-semibold"
            >
              Document Vault
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pedidos" className="space-y-8 animate-fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  title: 'Total de Demandas',
                  value: stats.total,
                  icon: FileText,
                  color: 'text-petrol',
                  bg: 'bg-petrol/5',
                },
                {
                  title: 'Novas Entradas',
                  value: stats.novos,
                  icon: Inbox,
                  color: 'text-cyan',
                  bg: 'bg-cyan/10',
                },
                {
                  title: 'Em Andamento',
                  value: stats.andamento,
                  icon: Clock,
                  color: 'text-orange-500',
                  bg: 'bg-orange-50',
                },
                {
                  title: 'Concluídas',
                  value: stats.concluidos,
                  icon: CheckCircle2,
                  color: 'text-green-600',
                  bg: 'bg-green-50',
                },
              ].map((kpi, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm text-slate-500 font-bold mb-1">{kpi.title}</p>
                    <p className="text-4xl font-display font-bold text-petrol">{kpi.value}</p>
                  </div>
                  <div
                    className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center',
                      kpi.bg,
                      kpi.color,
                    )}
                  >
                    <kpi.icon className="w-7 h-7" />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Buscar protocolo ou cliente..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 bg-white h-10 border-slate-200 focus-visible:ring-cyan"
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                  <Badge
                    variant="outline"
                    className={cn(
                      'cursor-pointer shrink-0 px-4 py-1.5',
                      statusFilter === 'todos' ? 'bg-petrol text-white' : 'text-slate-600 bg-white',
                    )}
                    onClick={() => setStatusFilter('todos')}
                  >
                    Todos
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      'cursor-pointer shrink-0 px-4 py-1.5',
                      statusFilter === 'novo'
                        ? 'bg-cyan text-petrol border-cyan'
                        : 'text-cyan border-cyan/20 bg-white',
                    )}
                    onClick={() => setStatusFilter('novo')}
                  >
                    Novos
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      'cursor-pointer shrink-0 px-4 py-1.5',
                      statusFilter === 'andamento'
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'text-orange-600 border-orange-200 bg-white',
                    )}
                    onClick={() => setStatusFilter('andamento')}
                  >
                    Andamento
                  </Badge>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-white">
                    <TableRow className="hover:bg-white border-b-slate-100">
                      <TableHead className="font-bold text-petrol h-12">Protocolo</TableHead>
                      <TableHead className="font-bold text-petrol">Serviço</TableHead>
                      <TableHead className="font-bold text-petrol">Cliente</TableHead>
                      <TableHead className="font-bold text-petrol">Status</TableHead>
                      <TableHead className="text-right font-bold text-petrol">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <TableRow key={order.id} className="hover:bg-slate-50/80 transition-colors">
                          <TableCell className="font-bold text-petrol">{order.protocol}</TableCell>
                          <TableCell className="text-slate-600 font-medium">
                            {order.service}
                          </TableCell>
                          <TableCell className="text-slate-600">{order.client}</TableCell>
                          <TableCell>
                            <Select
                              value={order.status}
                              onValueChange={(val: OrderStatus) =>
                                handleStatusChange(order.id, val)
                              }
                            >
                              <SelectTrigger
                                className={cn(
                                  'w-[140px] h-9 text-xs font-bold uppercase tracking-wider',
                                  order.status === 'novo'
                                    ? 'bg-cyan/10 text-cyan border-cyan/20'
                                    : order.status === 'andamento'
                                      ? 'bg-orange-50 text-orange-600 border-orange-200'
                                      : 'bg-green-50 text-green-600 border-green-200',
                                )}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="novo" className="font-semibold text-cyan">
                                  NOVO
                                </SelectItem>
                                <SelectItem
                                  value="andamento"
                                  className="font-semibold text-orange-600"
                                >
                                  ANDAMENTO
                                </SelectItem>
                                <SelectItem
                                  value="concluido"
                                  className="font-semibold text-green-600"
                                >
                                  CONCLUÍDO
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDetails(order)}
                              className="text-petrol hover:bg-cyan/10 hover:text-cyan font-semibold"
                            >
                              <Eye className="w-4 h-4 mr-2" /> Detalhes
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-40 text-center text-slate-500">
                          Nenhum pedido encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="raci" className="animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-display font-bold text-petrol mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-cyan" /> Matriz RACI
              </h2>
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="font-bold text-petrol">Atividade</TableHead>
                    <TableHead className="font-bold text-petrol text-center">Gerente</TableHead>
                    <TableHead className="font-bold text-petrol text-center">Analista</TableHead>
                    <TableHead className="font-bold text-petrol text-center">Jurídico</TableHead>
                    <TableHead className="font-bold text-petrol text-center">Cliente</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Aprovação de Contrato
                    </TableCell>
                    <TableCell className="text-center font-bold text-petrol">A</TableCell>
                    <TableCell className="text-center font-bold text-cyan">R</TableCell>
                    <TableCell className="text-center font-bold text-orange-500">C</TableCell>
                    <TableCell className="text-center font-bold text-slate-400">I</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">Vistoria de Imóvel</TableCell>
                    <TableCell className="text-center font-bold text-petrol">A</TableCell>
                    <TableCell className="text-center font-bold text-cyan">R</TableCell>
                    <TableCell className="text-center font-bold text-slate-400">I</TableCell>
                    <TableCell className="text-center font-bold text-slate-400">I</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="org" className="animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-display font-bold text-petrol mb-6 flex items-center gap-2">
                <Network className="w-6 h-6 text-cyan" /> Organograma Operacional
              </h2>
              <div className="flex flex-col items-center p-10 bg-slate-50 rounded-xl border border-slate-100">
                <div className="bg-petrol text-white px-8 py-3 rounded-lg font-bold shadow-md">
                  Diretoria Executiva
                </div>
                <div className="w-0.5 h-8 bg-slate-300"></div>
                <div className="w-[60%] h-0.5 bg-slate-300"></div>
                <div className="flex justify-between w-[60%]">
                  <div className="w-0.5 h-8 bg-slate-300"></div>
                  <div className="w-0.5 h-8 bg-slate-300"></div>
                </div>
                <div className="flex justify-between w-[80%]">
                  <div className="bg-cyan text-petrol px-6 py-3 rounded-lg font-bold shadow-md">
                    Operações (Ops)
                  </div>
                  <div className="bg-white border border-slate-300 text-petrol px-6 py-3 rounded-lg font-bold shadow-md">
                    Jurídico e Compliance
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vault" className="animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-display font-bold text-petrol mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-cyan" /> Secure Document Vault
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:border-cyan transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-petrol group-hover:bg-cyan/10">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-petrol">NDA_Cliente_{i}.pdf</p>
                        <p className="text-xs text-slate-500">Criptografado AES-256</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 group-hover:text-cyan"
                    >
                      <Download className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Detail Drawer */}
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetContent className="w-full sm:max-w-md bg-white border-l border-slate-200 p-0 flex flex-col shadow-2xl">
            {selectedOrder && (
              <>
                <div className="bg-petrol p-6 text-white shrink-0 relative overflow-hidden">
                  <div
                    className="absolute top-0 right-0 w-[150%] h-[150%] opacity-20 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(115deg, transparent 40%, rgba(25, 200, 232, 1) 40%, rgba(25, 200, 232, 1) 60%, transparent 60%)',
                      transform: 'translate(20%, -20%)',
                    }}
                  />
                  <div className="relative z-10">
                    <Badge
                      variant="outline"
                      className="bg-cyan/20 text-cyan border-cyan/30 mb-3 uppercase text-[10px] tracking-wider font-bold"
                    >
                      {selectedOrder.status}
                    </Badge>
                    <SheetTitle className="text-3xl font-display font-bold text-white mb-1">
                      {selectedOrder.protocol}
                    </SheetTitle>
                    <SheetDescription className="text-white/70 font-medium">
                      Criado em {new Date(selectedOrder.date).toLocaleDateString('pt-BR')}
                    </SheetDescription>
                  </div>
                </div>

                <div className="p-6 flex-1 overflow-y-auto space-y-8 bg-slate-50/50">
                  <section>
                    <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">
                      Dados do Contrato
                    </h3>
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4 text-sm">
                      <div>
                        <p className="text-slate-500 mb-1">Cliente / Razão Social</p>
                        <p className="font-bold text-petrol text-base">{selectedOrder.client}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-slate-500 mb-1">Telefone</p>
                          <p className="font-semibold text-petrol">{selectedOrder.phone}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 mb-1">Valor</p>
                          <p className="font-bold text-cyan text-lg">R$ {selectedOrder.price}</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">
                      Audit Log Imutável
                    </h3>
                    <div className="space-y-3">
                      <div className="flex gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-cyan mt-1.5 shrink-0" />
                        <div>
                          <p className="text-slate-700">
                            Status alterado para{' '}
                            <span className="font-bold uppercase">{selectedOrder.status}</span>
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">Por admin@velkor.com.br</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="p-6 border-t border-slate-200 bg-white shrink-0">
                  <Button
                    className="w-full bg-petrol hover:bg-petrol/90 h-12 text-lg font-bold"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Fechar Painel
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
