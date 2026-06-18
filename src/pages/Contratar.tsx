import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronRight, Briefcase, User, AlertCircle, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

const SERVICES = [
  {
    id: '1',
    title: 'Avaliação Imobiliária',
    desc: 'Laudo técnico detalhado de valor de mercado e precificação.',
    price: 800,
    isPartner: true,
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
    desc: 'Análise de contratos, certidões e toda documentação.',
    price: 1200,
    isPartner: true,
  },
  {
    id: '4',
    title: 'Fotografia Profissional',
    desc: 'Sessão de fotos em alta resolução para seu anúncio.',
    price: 400,
  },
  {
    id: '5',
    title: 'Seguro Patrimonial (VELKOR Seguros)',
    desc: 'Proteção completa para o seu imóvel e bens com a gestão e orquestração do Grupo VELKOR.',
    price: 250,
    suffix: '/mês (a partir)',
  },
]

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
    if (!termsAccepted) return
    const protocol = `VK-${Math.floor(1000 + Math.random() * 9000)}`

    // Save to local storage for Client Portal mock
    localStorage.setItem(
      'velkor_last_order',
      JSON.stringify({
        protocol,
        service: SERVICES.find((s) => s.id === selectedServiceId)?.title,
        email: formData.email,
        date: new Date().toISOString(),
        status: 'novo',
      }),
    )

    navigate('/success', { state: { protocol } })
  }

  const steps = [
    { id: 1, title: 'Serviço' },
    { id: 2, title: 'Dados' },
    { id: 3, title: 'Revisão' },
  ]

  const selectedService = SERVICES.find((s) => s.id === selectedServiceId)

  return (
    <div className="min-h-screen bg-slate-50 py-12 flex flex-col items-center relative">
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-petrol -z-10" />

      <div className="w-full max-w-4xl px-4 z-10 pt-10">
        <div className="mb-10 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-3">Contratação Digital</h1>
          <p className="text-cyan text-lg">Rápido, seguro e 100% online.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-12 bg-white p-5 rounded-2xl shadow-lg border border-slate-100 max-w-2xl mx-auto">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300',
                    step > s.id
                      ? 'bg-cyan text-petrol shadow-md'
                      : step === s.id
                        ? 'bg-petrol text-white shadow-md'
                        : 'bg-slate-100 text-slate-400',
                  )}
                >
                  {step > s.id ? <Check className="w-6 h-6" /> : s.id}
                </div>
                <span
                  className={cn(
                    'mt-3 text-xs font-bold uppercase tracking-wider',
                    step >= s.id ? 'text-petrol' : 'text-slate-400',
                  )}
                >
                  {s.title}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    'h-1.5 w-12 md:w-24 mx-3 md:mx-6 rounded-full transition-colors duration-300',
                    step > s.id ? 'bg-cyan' : 'bg-slate-100',
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Steps Content */}
        <div className="bg-white rounded-3xl shadow-xl shadow-petrol/5 border border-slate-100 p-6 md:p-10 animate-fade-in-up">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold text-petrol text-center mb-8">
                Qual solução você precisa hoje?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={cn(
                      'text-left p-6 rounded-2xl border-2 transition-all duration-300 relative group overflow-hidden',
                      selectedServiceId === service.id
                        ? 'border-cyan bg-cyan/5 shadow-md'
                        : 'border-slate-100 hover:border-cyan/50 hover:shadow-sm bg-white',
                    )}
                  >
                    {selectedServiceId === service.id && (
                      <div className="absolute top-4 right-4 text-cyan bg-white rounded-full p-0.5 shadow-sm z-20">
                        <Check className="w-6 h-6" />
                      </div>
                    )}
                    <div
                      className="absolute top-0 right-0 w-[150%] h-[150%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(115deg, transparent 40%, rgba(25, 200, 232, 0.05) 40%, rgba(25, 200, 232, 0.05) 60%, transparent 60%)',
                        transform: 'translate(20%, -20%)',
                      }}
                    />

                    <div className="flex flex-col h-full relative z-10">
                      <h3 className="font-display font-bold text-lg text-petrol mb-2">
                        {service.title}
                      </h3>
                      <p className="text-slate-500 text-sm mb-4 leading-relaxed flex-grow">
                        {service.desc}
                      </p>
                      {service.isPartner && (
                        <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded-md mb-4 border border-amber-100 font-medium">
                          Serviço executado por parceiros técnicos especializados sob gestão VELKOR.
                        </p>
                      )}
                      <div className="font-display font-bold text-petrol text-2xl pt-2">
                        R$ {service.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        <span className="text-sm font-normal text-slate-500 ml-1">
                          {service.suffix}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-end mt-10 pt-6 border-t border-slate-100">
                <Button
                  size="lg"
                  onClick={handleNextStep1}
                  disabled={!selectedServiceId}
                  className="bg-petrol hover:bg-petrol/90 text-white font-bold px-8 h-14 w-full sm:w-auto text-lg rounded-xl"
                >
                  Continuar Cadastro <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
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
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-petrol data-[state=active]:shadow-sm font-bold"
                  >
                    <User className="w-4 h-4 mr-2" /> Pessoa Física
                  </TabsTrigger>
                  <TabsTrigger
                    value="PJ"
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-petrol data-[state=active]:shadow-sm font-bold"
                  >
                    <Briefcase className="w-4 h-4 mr-2" /> Pessoa Jurídica
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="PF" className="space-y-5 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo *</Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className={cn(
                          'h-12 bg-slate-50 border-slate-200 focus-visible:ring-cyan',
                          errors.nome && 'border-red-500',
                        )}
                      />
                      {errors.nome && (
                        <p className="text-xs text-red-500 flex items-center mt-1">
                          <AlertCircle className="w-3 h-3 mr-1" /> Obrigatório
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        value={formData.cpf}
                        onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                        className={cn(
                          'h-12 bg-slate-50 border-slate-200 focus-visible:ring-cyan',
                          errors.cpf && 'border-red-500',
                        )}
                      />
                      {errors.cpf && (
                        <p className="text-xs text-red-500 flex items-center mt-1">
                          <AlertCircle className="w-3 h-3 mr-1" /> Obrigatório
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="PJ" className="space-y-5 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="razaoSocial">Razão Social *</Label>
                      <Input
                        id="razaoSocial"
                        value={formData.razaoSocial}
                        onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
                        className={cn(
                          'h-12 bg-slate-50 border-slate-200 focus-visible:ring-cyan',
                          errors.razaoSocial && 'border-red-500',
                        )}
                      />
                      {errors.razaoSocial && (
                        <p className="text-xs text-red-500 flex items-center mt-1">
                          <AlertCircle className="w-3 h-3 mr-1" /> Obrigatório
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ *</Label>
                      <Input
                        id="cnpj"
                        value={formData.cnpj}
                        onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                        className={cn(
                          'h-12 bg-slate-50 border-slate-200 focus-visible:ring-cyan',
                          errors.cnpj && 'border-red-500',
                        )}
                      />
                      {errors.cnpj && (
                        <p className="text-xs text-red-500 flex items-center mt-1">
                          <AlertCircle className="w-3 h-3 mr-1" /> Obrigatório
                        </p>
                      )}
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
                      className={cn(
                        'h-12 bg-slate-50 border-slate-200 focus-visible:ring-cyan',
                        errors.email && 'border-red-500',
                      )}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" /> Obrigatório
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone / WhatsApp *</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className={cn(
                        'h-12 bg-slate-50 border-slate-200 focus-visible:ring-cyan',
                        errors.telefone && 'border-red-500',
                      )}
                    />
                    {errors.telefone && (
                      <p className="text-xs text-red-500 flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" /> Obrigatório
                      </p>
                    )}
                  </div>
                </div>
              </Tabs>

              <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-10 pt-6 border-t border-slate-100">
                <Button
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="text-slate-500 w-full sm:w-auto h-12"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleNextStep2}
                  size="lg"
                  className="bg-petrol hover:bg-petrol/90 text-white font-bold px-8 h-12 rounded-xl w-full sm:w-auto"
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
                  Confirme os dados abaixo e aceite os termos para concluir.
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
                      <p className="font-bold text-petrol">{selectedService?.title}</p>
                      <p className="text-sm text-slate-500 mt-1">{selectedService?.desc}</p>
                      {selectedService?.isPartner && (
                        <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded-md mt-3 border border-amber-100 font-medium">
                          Serviço executado por parceiros técnicos especializados sob gestão VELKOR.
                        </p>
                      )}
                    </div>
                    <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                      <span className="text-slate-600 font-medium">Investimento</span>
                      <span className="text-2xl font-display font-bold text-cyan">
                        R${' '}
                        {selectedService?.price.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                        })}
                        <span className="text-sm font-normal text-slate-500">
                          {selectedService?.suffix}
                        </span>
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
                          <span className="text-slate-500">Nome:</span>{' '}
                          <span className="font-semibold text-petrol text-right">
                            {formData.nome}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">CPF:</span>{' '}
                          <span className="font-semibold text-petrol text-right">
                            {formData.cpf}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Razão Social:</span>{' '}
                          <span className="font-semibold text-petrol text-right">
                            {formData.razaoSocial}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">CNPJ:</span>{' '}
                          <span className="font-semibold text-petrol text-right">
                            {formData.cnpj}
                          </span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">Email:</span>{' '}
                      <span className="font-semibold text-petrol text-right">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">WhatsApp:</span>{' '}
                      <span className="font-semibold text-petrol text-right">
                        {formData.telefone}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-cyan/5 border border-cyan/20 p-5 rounded-2xl flex items-start space-x-4">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(c) => setTermsAccepted(c as boolean)}
                  className="mt-1 border-petrol/30 data-[state=checked]:bg-cyan data-[state=checked]:border-cyan data-[state=checked]:text-petrol w-5 h-5 rounded"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm font-bold leading-relaxed text-petrol cursor-pointer"
                  >
                    Li e concordo com os Termos e Condições de Serviço
                  </label>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Ao prosseguir, você concorda com nossa Política de Privacidade e confirma que os
                    dados informados são verdadeiros. Nenhuma cobrança será feita nesta etapa.
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-10 pt-6 border-t border-slate-100">
                <Button
                  variant="ghost"
                  onClick={() => setStep(2)}
                  className="text-slate-500 w-full sm:w-auto h-14"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  disabled={!termsAccepted}
                  className="bg-cyan hover:bg-cyan/90 text-petrol font-bold px-8 h-14 rounded-xl w-full sm:w-auto text-lg shadow-lg shadow-cyan/20"
                >
                  Confirmar Contratação <ShieldCheck className="w-6 h-6 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
