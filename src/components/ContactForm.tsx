import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Send, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { db } from '@/lib/db'

export function ContactForm({ preselectedServiceId }: { preselectedServiceId?: string }) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [formData, setFormData] = useState({
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.message.trim()) newErrors.message = 'Mensagem é obrigatória'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    try {
      await db.contacts.create({
        name: 'Visitante',
        email: 'visitante@site.com',
        phone: 'N/A',
        message: formData.message,
        service_id: preselectedServiceId || undefined,
      })

      setIsSubmitting(false)
      setIsSuccess(true)

      toast({
        title: 'Mensagem Enviada!',
        description: 'Agradecemos o seu contato. Nossa equipe retornará em breve.',
      })

      setFormData({ message: '' })

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
      <div className="space-y-2">
        <Label htmlFor="message">Fale com um Especialista</Label>
        <Textarea
          id="message"
          placeholder="Como podemos ajudar?"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={cn('resize-none min-h-[120px] p-3', errors.message && 'border-red-500')}
        />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
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
