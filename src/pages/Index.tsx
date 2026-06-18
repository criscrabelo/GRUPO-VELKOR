import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronRight, Briefcase, User, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const SERVICES = [
  {
    id: '1',
    title: 'Avaliação Imobiliária',
    desc: 'Laudo técnico detalhado de valor de mercado e precificação.',
    price: 800,
  },
  {
    id: '2',
    title: 'Gestão de Aluguel',
    desc: 'Administração completa do seu imóvel com repasse garantido.',
    price: 150,
    suffix: '/mês',
  },
  {
    id: '3',
    title: 'Assessoria Jurídica',
    desc: 'Análise de contratos, certidões e toda documentação imobiliária.',
    price: 1200,
  },
  {
    id: '4',
    title: 'Fotografia Profissional',
    desc: 'Sessão de fotos em alta resolução para alavancar seu anúncio.',
    price: 400,
  },
]

export default function Index() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)

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

  const handleNextStep1 = () => {
    if (!selectedServiceId) return
    setStep(2)
  }

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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setStep(3)
  }

  const handleSubmit = () => {
    const protocol = `PV-${Math.floor(1000 + Math.random() * 9000)}`
    navigate('/success', { state: { protocol } })
  }

  const steps = [
    { id: 1, title: 'Serviço' },
    { id: 2, title: 'Dados' },
    { id: 3, title: 'Revisão' },
  ]

  const selectedService = SERVICES.find((s) => s.id === selectedServiceId)

  return (
    <div className="min-h-screen bg-slate-50 py-12 flex flex-col items-center">
      <div className="w-full max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-petrol mb-2 font-display">
            Contrate nossos Serviços
          </h1>
          <p className="text-slate-600">Simples, rápido e 100% digital.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors',
                    step > s.id
                      ? 'bg-cyan text-petrol'
                      : step === s.id
                        ? 'bg-petrol text-white'
                        : 'bg-slate-200 text-slate-500',
                  )}
                >
                  {step > s.id ? <Check className="w-5 h-5" /> : s.id}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-semibold',
                    step >= s.id ? 'text-petrol' : 'text-slate-400',
                  )}
                >
                  {s.title}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    'h-1 w-16 mx-4 rounded-full transition-colors',
                    step > s.id ? 'bg-cyan' : 'bg-slate-200',
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Steps Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 animate-fade-in-up">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold font-display text-petrol">
                Qual serviço você precisa?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={cn(
                      'text-left p-6 rounded-xl border-2 transition-all duration-200 relative group',
                      selectedServiceId === service.id
                        ? 'border-cyan bg-cyan/5'
                        : 'border-slate-100 hover:border-slate-300 hover:shadow-sm bg-white',
                    )}
                  >
                    {selectedServiceId === service.id && (
                      <div className="absolute top-4 right-4 text-cyan">
                        <Check className="w-6 h-6" />
                      </div>
                    )}
                    <h3 className="font-bold text-lg text-petrol mb-2">{service.title}</h3>
                    <p className="text-slate-500 text-sm mb-4 leading-relaxed">{service.desc}</p>
                    <div className="font-display font-semibold text-petrol text-xl">
                      R$ {service.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      <span className="text-sm font-normal text-slate-500">{service.suffix}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <Button
                  size="lg"
                  onClick={handleNextStep1}
                  disabled={!selectedServiceId}
                  className="bg-petrol hover:bg-petrol/90 text-white"
                >
                  Continuar <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold font-display text-petrol mb-2">Seus Dados</h2>
                <p className="text-slate-500">Preencha as informações para o contrato.</p>
              </div>

              <Tabs
                value={customerType}
                onValueChange={(v) => setCustomerType(v as 'PF' | 'PJ')}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-slate-100 rounded-lg">
                  <TabsTrigger
                    value="PF"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:text-petrol data-[state=active]:shadow-sm"
                  >
                    <User className="w-4 h-4 mr-2" /> Pessoa Física
                  </TabsTrigger>
                  <TabsTrigger
                    value="PJ"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:text-petrol data-[state=active]:shadow-sm"
                  >
                    <Briefcase className="w-4 h-4 mr-2" /> Pessoa Jurídica
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="PF" className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo *</Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className={cn(errors.nome && 'border-red-500 focus-visible:ring-red-500')}
                      />
                      {errors.nome && (
                        <p className="text-xs text-red-500 flex items-center mt-1">
                          <AlertCircle className="w-3 h-3 mr-1" /> Campo obrigatório
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        value={formData.cpf}
                        onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                        className={cn(errors.cpf && 'border-red-500 focus-visible:ring-red-500')}
                      />
                      {errors.cpf && (
                        <p className="text-xs text-red-500 flex items-center mt-1">
                          <AlertCircle className="w-3 h-3 mr-1" /> Campo obrigatório
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="PJ" className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="razaoSocial">Razão Social *</Label>
                      <Input
                        id="razaoSocial"
                        value={formData.razaoSocial}
                        onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
                        className={cn(
                          errors.razaoSocial && 'border-red-500 focus-visible:ring-red-500',
                        )}
                      />
                      {errors.razaoSocial && (
                        <p className="text-xs text-red-500 flex items-center mt-1">
                          <AlertCircle className="w-3 h-3 mr-1" /> Campo obrigatório
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ *</Label>
                      <Input
                        id="cnpj"
                        value={formData.cnpj}
                        onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                        className={cn(errors.cnpj && 'border-red-500 focus-visible:ring-red-500')}
                      />
                      {errors.cnpj && (
                        <p className="text-xs text-red-500 flex items-center mt-1">
                          <AlertCircle className="w-3 h-3 mr-1" /> Campo obrigatório
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={cn(errors.email && 'border-red-500 focus-visible:ring-red-500')}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" /> Campo obrigatório
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone / WhatsApp *</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className={cn(errors.telefone && 'border-red-500 focus-visible:ring-red-500')}
                    />
                    {errors.telefone && (
                      <p className="text-xs text-red-500 flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" /> Campo obrigatório
                      </p>
                    )}
                  </div>
                </div>
              </Tabs>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Voltar
                </Button>
                <Button
                  onClick={handleNextStep2}
                  size="lg"
                  className="bg-petrol hover:bg-petrol/90 text-white"
                >
                  Revisar Pedido <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-2xl font-semibold font-display text-petrol mb-2">
                  Revisão do Pedido
                </h2>
                <p className="text-slate-500">
                  Verifique se as informações estão corretas antes de finalizar.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-slate-100 shadow-sm">
                  <CardHeader className="bg-slate-50/50 pb-4">
                    <CardTitle className="text-lg">Resumo do Serviço</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-petrol">{selectedService?.title}</p>
                        <p className="text-sm text-slate-500 mt-1">{selectedService?.desc}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Total a pagar</span>
                        <span className="text-xl font-display font-bold text-petrol">
                          R${' '}
                          {selectedService?.price.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                          })}
                          <span className="text-sm font-normal text-slate-500">
                            {selectedService?.suffix}
                          </span>
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-100 shadow-sm">
                  <CardHeader className="bg-slate-50/50 pb-4">
                    <CardTitle className="text-lg">Dados do Cliente</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-3 text-sm">
                    {customerType === 'PF' ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Nome:</span>{' '}
                          <span className="font-medium text-right">{formData.nome}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">CPF:</span>{' '}
                          <span className="font-medium text-right">{formData.cpf}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Razão Social:</span>{' '}
                          <span className="font-medium text-right">{formData.razaoSocial}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">CNPJ:</span>{' '}
                          <span className="font-medium text-right">{formData.cnpj}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">Email:</span>{' '}
                      <span className="font-medium text-right">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Telefone:</span>{' '}
                      <span className="font-medium text-right">{formData.telefone}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Voltar
                </Button>
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="bg-cyan hover:bg-cyan/90 text-petrol font-bold"
                >
                  Finalizar Contratação <Check className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
