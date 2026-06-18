import { useState } from 'react'
import { SITE_CONFIG } from '@/lib/config'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function SettingsView() {
  const [logoUrl, setLogoUrl] = useState(SITE_CONFIG.logoUrl)
  const [disclaimer, setDisclaimer] = useState(SITE_CONFIG.servicesDisclaimer)
  const [contactEmail, setContactEmail] = useState(SITE_CONFIG.email)

  const handleSave = () => {
    toast.success('Configurações institucionais salvas com sucesso!')
  }

  return (
    <div className="max-w-3xl space-y-6 animate-fade-in pb-10">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <CardTitle className="text-petrol font-bold">Identidade Visual</CardTitle>
          <CardDescription>Gerencie os elementos de branding da plataforma.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-3">
            <Label className="font-bold text-slate-700">URL da Logo Institucional</Label>
            <Input
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="border-slate-200 focus-visible:ring-cyan"
            />
            {logoUrl && (
              <div className="mt-4 p-6 bg-petrol rounded-xl inline-flex items-center justify-center border border-petrol/20 shadow-inner">
                <img
                  src={logoUrl}
                  alt="Logo Preview"
                  className="h-10 brightness-0 invert object-contain"
                />
              </div>
            )}
          </div>
          <div className="space-y-3">
            <Label className="font-bold text-slate-700">E-mail de Contato Central</Label>
            <Input
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="border-slate-200 focus-visible:ring-cyan"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm border-l-4 border-l-cyan">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <CardTitle className="text-petrol font-bold">Avisos Legais & Compliance</CardTitle>
          <CardDescription>
            Configure os disclaimers visíveis aos usuários garantindo a adequação jurídica da
            operação.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-3">
            <Label className="font-bold text-slate-700">
              Disclaimer de Serviços Naturais (Coordenação Documental)
            </Label>
            <Textarea
              value={disclaimer}
              onChange={(e) => setDisclaimer(e.target.value)}
              className="h-32 text-sm leading-relaxed border-slate-200 focus-visible:ring-cyan"
            />
            <p className="text-xs text-slate-500 font-medium">
              Aviso: Este texto aparecerá no rodapé do site e em documentos públicos gerados,
              reforçando que o Grupo Velkor não atua com corretagem ou advocacia direta, mitigando
              riscos legais.
            </p>
          </div>
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <Button
              onClick={handleSave}
              className="bg-petrol text-white font-bold hover:bg-petrol/90 px-8 h-12"
            >
              Salvar Configurações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
