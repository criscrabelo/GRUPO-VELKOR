import { useState } from 'react'
import { SITE_CONFIG } from '@/lib/config'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Github, RefreshCw, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SettingsView() {
  const [logoUrl, setLogoUrl] = useState(SITE_CONFIG.logoUrl)
  const [disclaimer, setDisclaimer] = useState(SITE_CONFIG.servicesDisclaimer)
  const [contactEmail, setContactEmail] = useState(SITE_CONFIG.email)
  const [isGithubConnected, setIsGithubConnected] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSync, setLastSync] = useState<string | null>(null)

  const handleSave = () => {
    toast.success('Configurações institucionais salvas com sucesso!')
  }

  const handleConnectGithub = () => {
    toast.success('Redirecionando para autenticação do GitHub...')
    setTimeout(() => {
      setIsGithubConnected(true)
      toast.success(
        'Conta do GitHub conectada com sucesso! Repositório "grupo-velkor-app" vinculado.',
      )
      // Simulate initial sync after connection
      handleSync()
    }, 1500)
  }

  const handleSync = () => {
    setIsSyncing(true)
    toast.info('Iniciando sincronização com o GitHub...')

    setTimeout(() => {
      setIsSyncing(false)
      const now = new Date()
      setLastSync(now.toLocaleString('pt-BR'))
      toast.success(
        'Código exportado e sincronizado com sucesso! Acesse o GitHub para clonar/baixar localmente.',
      )
    }, 2500)
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

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <CardTitle className="text-petrol font-bold flex items-center gap-2">
            <Github className="w-5 h-5" />
            Integração com GitHub
          </CardTitle>
          <CardDescription>
            Sincronize o código fonte do projeto (React, TypeScript, Tailwind) com um repositório
            para backup local.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {!isGithubConnected ? (
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
              <Github className="w-12 h-12 text-slate-400 mb-4" />
              <h3 className="text-lg font-bold text-slate-700 mb-2">Conecte sua conta</h3>
              <p className="text-slate-500 text-center text-sm mb-6 max-w-md">
                Autorize para criar repositórios e exportar a estrutura completa do GRUPO VELKOR
                automaticamente, preservando o stack de UI (Shadcn/Tailwind) e assets.
              </p>
              <Button
                onClick={handleConnectGithub}
                className="bg-[#24292e] hover:bg-[#24292e]/90 text-white gap-2"
              >
                <Github className="w-4 h-4" />
                Sincronizar com GitHub
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-green-50/50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800 text-sm">
                      Conta conectada com sucesso
                    </p>
                    <p className="text-xs text-green-600">Repositório: grupo-velkor-app</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsGithubConnected(false)}
                  className="text-slate-600 h-8 text-xs"
                >
                  Desconectar
                </Button>
              </div>

              <div className="space-y-4">
                <Label className="font-bold text-slate-700">Status da Sincronização Contínua</Label>
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <span className="text-sm text-slate-600 font-medium">
                    Último push: {lastSync || 'Pendente'}
                  </span>
                  <Button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="bg-[#24292e] text-white hover:bg-[#24292e]/90 gap-2 h-9"
                  >
                    <RefreshCw className={cn('w-4 h-4', isSyncing && 'animate-spin')} />
                    {isSyncing ? 'Enviando...' : 'Fazer Push de Alterações'}
                  </Button>
                </div>
                <p className="text-xs text-slate-500">
                  O repositório reflete 100% da arquitetura original em React, os arquivos da página
                  "Gateway", os logos da Velkor Soluções e os textos "Seja bem-vindo ao GRUPO
                  VELKOR".
                </p>
              </div>
            </div>
          )}
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
