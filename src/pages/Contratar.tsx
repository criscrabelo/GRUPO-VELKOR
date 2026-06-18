import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Check,
  ChevronRight,
  Briefcase,
  User,
  AlertCircle,
  ShieldCheck,
  CreditCard,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { SERVICE_CATALOG } from '@/lib/catalog'

export default function Contratar() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const [customerType, setCustomerType] = useState<'PF' | 'PJ'>('PF')
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    razaoSocial: '',
    cnpj: '',
    email: '',
    telefone: '',
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleNextStep2 = () => {
    const newErrors: Record<string, boolean> = {}
    if (customerType === 'PF') {
      if (!formData.nome) newErrors.nome = true
      if (!formData.cpf) newErrors.cpf = true
    } else {
      if (!formData.razaoSocial) newErrors.razaoSocial = true
      if (!formData.cnpj) newErrors.cnpj = true
    }
    if (!formData.email) newErrors.email = true
    if (!formData.telefone) newErrors.telefone = true

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors)

    setErrors({})
    setStep(3)
  }

  const selectedService = SERVICE_CATALOG.find((s) => s.id === selectedServiceId)

  const handleSubmitPayment = () => {
    const protocol = `VK-${Math.floor(1000 + Math.random() * 9000)}`
    localStorage.setItem(
      'velkor_last_order',
      JSON.stringify({
        protocol,
        service: selectedService?.name,
        email: formData.email,
        date: new Date().toISOString(),
        status: 'pago',
      }),
    )
    navigate('/success', { state: { protocol } })
  }

  const steps = [
    { id: 1, title: 'Serviço' },
    { id: 2, title: 'Dados' },
    { id: 3, title: 'Revisão' },
    { id: 4, title: 'Pagamento' },
  ]

  const ErrorMsg = ({ show }: { show?: boolean }) =>
    show ? (
      <p className="text-xs text-red-500 flex items-center mt-1">
        <AlertCircle className="w-3 h-3 mr-1" /> Obrigatório
      </p>
    ) : null

  return (
    <div className="min-h-screen bg-slate-50 py-12 flex flex-col items-center relative">
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-petrol -z-10" />

      <div className="w-full max-w-5xl px-4 z-10 pt-10">
        <div className="mb-10 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-3">Contratação Digital</h1>
          <p className="text-cyan text-lg">Rápido, seguro e 100% online.</p>
        </div>

        <div className="flex items-center justify-center mb-12 bg-white p-5 rounded-2xl shadow-lg border border-slate-100 max-w-3xl mx-auto overflow-x-auto">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center min-w-[60px]">
                <div
                  className={cn(
                    'w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300',
                    step > s.id
                      ? 'bg-cyan text-petrol shadow-md'
                      : step === s.id
                        ? 'bg-petrol text-white shadow-md'
                        : 'bg-slate-100 text-slate-400',
                  )}
                >
                  {step > s.id ? <Check className="w-5 h-5 md:w-6 md:h-6" /> : s.id}
                </div>
                <span
                  className={cn(
                    'mt-2 md:mt-3 text-[10px] md:text-xs font-bold uppercase tracking-wider',
                    step >= s.id ? 'text-petrol' : 'text-slate-400',
                  )}
                >
                  {s.title}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    'h-1.5 w-8 md:w-16 mx-2 md:mx-4 rounded-full transition-colors duration-300',
                    step > s.id ? 'bg-cyan' : 'bg-slate-100',
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-petrol/5 border border-slate-100 p-6 md:p-10 animate-fade-in-up">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold text-petrol text-center mb-8">
                Selecione o serviço desejado
              </h2>

              <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="min-w-[200px] text-petrol font-bold">
                          Serviço
                        </TableHead>
                        <TableHead className="min-w-[300px]">Descrição</TableHead>
                        <TableHead className="min-w-[150px]">Categoria</TableHead>
                        <TableHead className="min-w-[150px]">Valor Estimado</TableHead>
                        <TableHead className="text-right min-w-[120px]">Ação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {SERVICE_CATALOG.map((service) => (
                        <TableRow
                          key={service.id}
                          className={cn(
                            'transition-colors cursor-pointer',
                            selectedServiceId === service.id && 'bg-cyan/5',
                          )}
                          onClick={() => setSelectedServiceId(service.id)}
                        >
                          <TableCell className="font-bold text-petrol align-top pt-4">
                            {service.name}
                          </TableCell>
                          <TableCell className="text-slate-500 text-sm align-top pt-4">
                            {service.description}
                          </TableCell>
                          <TableCell className="align-top pt-4">
                            <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md font-medium">
                              {service.type}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium text-petrol align-top pt-4">
                            {service.price}
                          </TableCell>
                          <TableCell className="text-right align-top pt-4">
                            <Button
                              variant={selectedServiceId === service.id ? 'default' : 'outline'}
                              className={cn(
                                'w-full shadow-none',
                                selectedServiceId === service.id
                                  ? 'bg-petrol text-white hover:bg-petrol/90'
                                  : 'hover:bg-slate-50 hover:text-cyan border-slate-200',
                              )}
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedServiceId(service.id)
                              }}
                            >
                              {selectedServiceId === service.id ? (
                                <>
                                  <Check className="w-4 h-4 mr-1" /> Selecionado
                                </>
                              ) : (
                                'Contratar'
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end mt-10 pt-6 border-t border-slate-100">
                <Button
                  size="lg"
                  onClick={() => setStep(2)}
                  disabled={!selectedServiceId}
                  className="bg-petrol hover:bg-petrol/90 text-white font-bold px-8 h-14 w-full sm:w-auto text-lg rounded-xl"
                >
                  Continuar <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-2xl font-display font-bold text-petrol mb-2">
                  Dados de Contato
                </h2>
                <p className="text-slate-500">
                  Preencha as informações para a geração do contrato.
                </p>
              </div>

              <Tabs
                value={customerType}
                onValueChange={(v) => setCustomerType(v as 'PF' | 'PJ')}
                className="w-full"
              >
                <TabsList className="grid w-full max-w-sm grid-cols-2 mb-8 p-1.5 bg-slate-100 rounded-xl h-14">
                  <TabsTrigger
                    value="PF"
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-petrol font-bold"
                  >
                    <User className="w-4 h-4 mr-2" /> Pessoa Física
                  </TabsTrigger>
                  <TabsTrigger
                    value="PJ"
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-petrol font-bold"
                  >
                    <Briefcase className="w-4 h-4 mr-2" /> Pessoa Jurídica
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="PF" className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo *</Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className={cn('h-12 bg-slate-50', errors.nome && 'border-red-500')}
                      />
                      <ErrorMsg show={errors.nome} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        value={formData.cpf}
                        onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                        className={cn('h-12 bg-slate-50', errors.cpf && 'border-red-500')}
                      />
                      <ErrorMsg show={errors.cpf} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="PJ" className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="razaoSocial">Razão Social *</Label>
                      <Input
                        id="razaoSocial"
                        value={formData.razaoSocial}
                        onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
                        className={cn('h-12 bg-slate-50', errors.razaoSocial && 'border-red-500')}
                      />
                      <ErrorMsg show={errors.razaoSocial} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ *</Label>
                      <Input
                        id="cnpj"
                        value={formData.cnpj}
                        onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                        className={cn('h-12 bg-slate-50', errors.cnpj && 'border-red-500')}
                      />
                      <ErrorMsg show={errors.cnpj} />
                    </div>
                  </div>
                </TabsContent>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Corporativo / Pessoal *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={cn('h-12 bg-slate-50', errors.email && 'border-red-500')}
                    />
                    <ErrorMsg show={errors.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone / WhatsApp *</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className={cn('h-12 bg-slate-50', errors.telefone && 'border-red-500')}
                    />
                    <ErrorMsg show={errors.telefone} />
                  </div>
                </div>
              </Tabs>

              <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100">
                <Button variant="ghost" onClick={() => setStep(1)} className="text-slate-500 h-12">
                  Voltar
                </Button>
                <Button
                  onClick={handleNextStep2}
                  size="lg"
                  className="bg-petrol hover:bg-petrol/90 text-white font-bold h-12 px-8 rounded-xl"
                >
                  Revisar Pedido <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-2xl font-display font-bold text-petrol mb-2">Revisão Final</h2>
                <p className="text-slate-500">
                  Confirme os dados abaixo e aceite os termos para ir ao pagamento.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-slate-200 shadow-sm bg-slate-50/50">
                  <CardHeader className="pb-3 border-b border-slate-200">
                    <CardTitle className="text-lg font-display text-petrol flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-cyan" /> Resumo do Serviço
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-5 space-y-4">
                    <div>
                      <p className="font-bold text-petrol">{selectedService?.name}</p>
                      <p className="text-sm text-slate-500 mt-1">{selectedService?.description}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                      <span className="text-slate-600 font-medium">Investimento Estimado</span>
                      <span className="text-xl font-display font-bold text-cyan">
                        {selectedService?.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm bg-slate-50/50">
                  <CardHeader className="pb-3 border-b border-slate-200">
                    <CardTitle className="text-lg font-display text-petrol flex items-center gap-2">
                      <User className="w-5 h-5 text-cyan" /> Dados do Titular
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-5 space-y-3 text-sm">
                    {customerType === 'PF' ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Nome:</span>
                          <span className="font-semibold text-petrol">{formData.nome}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">CPF:</span>
                          <span className="font-semibold text-petrol">{formData.cpf}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Razão Social:</span>
                          <span className="font-semibold text-petrol">{formData.razaoSocial}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">CNPJ:</span>
                          <span className="font-semibold text-petrol">{formData.cnpj}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">Email:</span>
                      <span className="font-semibold text-petrol">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">WhatsApp:</span>
                      <span className="font-semibold text-petrol">{formData.telefone}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-cyan/5 border border-cyan/20 p-5 rounded-2xl flex items-start space-x-4">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(c) => setTermsAccepted(c as boolean)}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="terms" className="text-sm font-bold text-petrol cursor-pointer">
                    Li e concordo com os Termos e Condições de Serviço
                  </label>
                  <p className="text-sm text-slate-500">
                    Ao prosseguir, você concorda com nossa Política de Privacidade.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100">
                <Button variant="ghost" onClick={() => setStep(2)} className="text-slate-500 h-14">
                  Voltar
                </Button>
                <Button
                  onClick={() => setStep(4)}
                  size="lg"
                  disabled={!termsAccepted}
                  className="bg-cyan hover:bg-cyan/90 text-petrol font-bold px-8 h-14 rounded-xl text-lg shadow-lg shadow-cyan/20"
                >
                  Ir para Pagamento <ShieldCheck className="w-6 h-6 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-2xl font-display font-bold text-petrol mb-2">
                  Pagamento Seguro
                </h2>
                <p className="text-slate-500">
                  Insira os dados do seu cartão para concluir a contratação.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <h3 className="font-bold text-petrol text-lg border-b border-slate-100 pb-2">
                    Dados do Cartão
                  </h3>
                  <div className="space-y-2">
                    <Label>Nome no Cartão</Label>
                    <Input
                      placeholder="Como impresso no cartão"
                      defaultValue={formData.nome || formData.razaoSocial}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Número do Cartão</Label>
                    <Input placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Validade</Label>
                      <Input placeholder="MM/AA" />
                    </div>
                    <div className="space-y-2">
                      <Label>CVC</Label>
                      <Input placeholder="123" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-petrol text-lg mb-4 border-b border-slate-200 pb-2">
                      Resumo do Pedido
                    </h3>
                    <div className="space-y-3 text-sm mb-6">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Serviço:</span>
                        <span className="font-medium text-petrol text-right max-w-[200px]">
                          {selectedService?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Cliente:</span>
                        <span className="font-medium text-petrol text-right">{formData.email}</span>
                      </div>
                      <div className="pt-4 mt-2 border-t border-slate-200 flex justify-between items-center">
                        <span className="font-bold text-slate-700">Total a Pagar:</span>
                        <span className="text-xl font-display font-bold text-cyan">
                          R${' '}
                          {selectedService?.basePrice?.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 mb-4 text-center">
                      <ShieldCheck className="w-4 h-4 inline-block mr-1 text-green-600" />
                      Ambiente 100% seguro. Pagamento processado via Gateway Público.
                    </p>
                    <Button
                      onClick={handleSubmitPayment}
                      size="lg"
                      className="w-full bg-petrol hover:bg-petrol/90 text-white font-bold h-14 rounded-xl shadow-lg"
                    >
                      Finalizar Pagamento <CreditCard className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-start mt-8 pt-6 border-t border-slate-100">
                <Button variant="ghost" onClick={() => setStep(3)} className="text-slate-500 h-12">
                  Voltar para Revisão
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
