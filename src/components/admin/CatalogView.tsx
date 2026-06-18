import { useState } from 'react'
import { SERVICE_CATALOG } from '@/lib/catalog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function CatalogView() {
  const [services, setServices] = useState(SERVICE_CATALOG.map((s) => ({ ...s, isActive: true })))

  const toggleStatus = (id: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s)))
    toast.success('Status do serviço atualizado!')
  }

  const handleSave = () => {
    toast.success('Catálogo de serviços salvo com sucesso!')
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Gestão do Catálogo</h2>
          <p className="text-sm text-slate-500 mt-1">
            Ative, desative ou edite as informações dos serviços (Consultoria, Certidões,
            Regularização, Soluções Patrimoniais).
          </p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-blue-600 text-white hover:bg-blue-700 font-bold w-full sm:w-auto"
        >
          Salvar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className={`transition-all duration-300 ${!service.isActive ? 'opacity-60 bg-slate-50 grayscale-[0.2]' : 'shadow-sm border-slate-200'}`}
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3 border-b border-slate-100 mb-4">
              <CardTitle className="text-lg font-bold text-blue-900">{service.name}</CardTitle>
              <Switch checked={service.isActive} onCheckedChange={() => toggleStatus(service.id)} />
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Descrição Pública
                </Label>
                <Textarea
                  defaultValue={service.description}
                  className="h-20 resize-none text-sm bg-white border-slate-200 focus-visible:ring-blue-500"
                  disabled={!service.isActive}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Preço Base
                  </Label>
                  <Input
                    defaultValue={service.price}
                    className="h-9 text-sm bg-white border-slate-200 focus-visible:ring-blue-500"
                    disabled={!service.isActive}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Público Alvo
                  </Label>
                  <Input
                    defaultValue={service.type}
                    className="h-9 text-sm bg-white border-slate-200 focus-visible:ring-blue-500"
                    disabled={!service.isActive}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
