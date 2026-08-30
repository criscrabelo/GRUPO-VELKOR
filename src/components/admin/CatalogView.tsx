import { SERVICE_CATALOG } from '@/lib/catalog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function CatalogView() {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Catálogo oficial VLK01–VLK22</h2>
          <p className="text-sm text-slate-500 mt-1">
            Somente leitura. O catálogo é definido em código (fonte única de verdade) e usado por
            landing, checkout e Kora — editar aqui exigiria persistência real em banco de dados,
            ainda não implementada.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICE_CATALOG.map((service) => (
          <Card key={service.code} className="shadow-sm border-slate-200">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {service.code} · {service.family}
                </span>
                <CardTitle className="text-lg font-bold text-blue-900">{service.name}</CardTitle>
              </div>
              {service.pricingType === 'gratuito' && <Badge variant="secondary">Gratuito</Badge>}
              {service.pricingType === 'sob-consulta' && <Badge variant="outline">Sob consulta</Badge>}
              {service.pricingType === 'mensal' && <Badge>Mensal</Badge>}
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-600">{service.shortDescription}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Valor
                  </span>
                  <span className="font-medium text-petrol">{service.priceLabel}</span>
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Prazo
                  </span>
                  <span className="font-medium text-petrol">{service.deadline || '—'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
