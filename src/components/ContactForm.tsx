import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Send, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { db, Service } from '@/lib/db'

export function ContactForm({ preselectedServiceId }: { preselectedServiceId?: string }) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    db.services.findMany().then(setServices)
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceId: preselectedServiceId || '',
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório'
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    try {
      await db.contacts.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        service_id: formData.serviceId || undefined,
      })

      setIsSubmitting(false)
      setIsSuccess(true)

      toast({
        title: 'Mensagem Enviada!',
        description: 'Agradecemos o seu contato. Nossa equipe retornará em breve.',
      })

      setFormData({ name: '', email: '', phone: '', serviceId: '', message: '' })

      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      setIsSubmitting(false)
      toast({
        title: 'Erro ao enviar',
        description: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.',
        variant: 'destructive',
      })
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Mensagem Enviada!</h3>
        <p className="text-green-600">
          Agradecemos o seu contato. Nossa equipe retornará em breve.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo *</Label>
          <Input
            id="name"
            placeholder="Seu nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={cn('h-12', errors.name && 'border-red-500')}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={cn('h-12', errors.email && 'border-red-500')}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone / WhatsApp *</Label>
          <Input
            id="phone"
            placeholder="(00) 00000-0000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={cn('h-12', errors.phone && 'border-red-500')}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="service">Solução de Interesse</Label>
          <Select
            value={formData.serviceId}
            onValueChange={(value) => setFormData({ ...formData, serviceId: value })}
          >
            <SelectTrigger id="service" className="h-12">
              <SelectValue placeholder="Selecione uma solução (opcional)" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          id="message"
          placeholder="Como podemos ajudar?"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="resize-none min-h-[120px] p-3"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-petrol hover:bg-petrol/90 text-white font-bold h-12"
      >
        {isSubmitting ? (
          'Enviando...'
        ) : (
          <>
            Enviar Mensagem <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </form>
  )
}
