import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FileText, CheckCircle2, AlertCircle } from 'lucide-react'

export function OverviewView() {
  const metrics = [
    { title: 'New Leads', value: 12, icon: Users, color: 'text-cyan', bg: 'bg-cyan/10' },
    {
      title: 'Active Regularizations',
      value: 8,
      icon: FileText,
      color: 'text-petrol',
      bg: 'bg-petrol/5',
    },
    {
      title: 'Completed Destaques',
      value: 24,
      icon: CheckCircle2,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Pending Document Reviews',
      value: 5,
      icon: AlertCircle,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <Card key={i} className="border-slate-200 shadow-sm flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-slate-500">{metric.title}</CardTitle>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${metric.bg}`}>
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-display font-bold text-slate-900">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-slate-200 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-petrol">
              Fluxo de Entradas (Mês Atual)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-400 font-medium">
              [ Gráfico de Atividades / Fluxo de Leads ]
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-petrol">Alertas do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 border border-orange-100"
              >
                <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-orange-900">Documentação Pendente</p>
                  <p className="text-xs text-orange-700">Certidão Negativa - Processo #{i}004</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
