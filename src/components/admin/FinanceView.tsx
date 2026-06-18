import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { TrendingUp, PieChart, Building2 } from 'lucide-react'

export function FinanceView() {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-petrol">Finanças & Projetos COEVO</h2>
          <p className="text-slate-500">
            Projeções financeiras, estruturas de custos e gestão de empreendimentos.
          </p>
        </div>
      </div>

      <Tabs defaultValue="projections" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-xl bg-slate-100 p-1 mb-8">
          <TabsTrigger
            value="projections"
            className="data-[state=active]:bg-white data-[state=active]:text-petrol"
          >
            <TrendingUp className="w-4 h-4 mr-2" /> Projeções
          </TabsTrigger>
          <TabsTrigger
            value="costs"
            className="data-[state=active]:bg-white data-[state=active]:text-petrol"
          >
            <PieChart className="w-4 h-4 mr-2" /> Custos
          </TabsTrigger>
          <TabsTrigger
            value="coevo"
            className="data-[state=active]:bg-white data-[state=active]:text-petrol"
          >
            <Building2 className="w-4 h-4 mr-2" /> Empreendimentos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projections">
          <Card>
            <CardHeader>
              <CardTitle>Projeções Financeiras (Q3)</CardTitle>
              <CardDescription>Receitas estimadas vs Realizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-medium">
                [ Gráfico de Projeções e MRR ]
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-green-50 text-green-900 rounded-lg border border-green-100">
                  <p className="text-sm font-bold opacity-70">Receita Prevista</p>
                  <p className="text-2xl font-display font-bold">R$ 450k</p>
                </div>
                <div className="p-4 bg-blue-50 text-blue-900 rounded-lg border border-blue-100">
                  <p className="text-sm font-bold opacity-70">MRR Recorrente</p>
                  <p className="text-2xl font-display font-bold">R$ 85k</p>
                </div>
                <div className="p-4 bg-purple-50 text-purple-900 rounded-lg border border-purple-100">
                  <p className="text-sm font-bold opacity-70">Ticket Médio</p>
                  <p className="text-2xl font-display font-bold">R$ 4.2k</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs">
          <Card>
            <CardHeader>
              <CardTitle>Estrutura de Custos</CardTitle>
              <CardDescription>Distribuição de despesas operacionais e repasses.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Repasse a Parceiros Técnicos (OAB/CREA)
                    </span>
                    <span className="text-sm font-bold text-slate-700">42%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-petrol h-full w-[42%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Custos Operacionais e Hub Central</span>
                    <span className="text-sm font-bold text-slate-700">18%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan h-full w-[18%]"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coevo">
          <Card>
            <CardHeader>
              <CardTitle>Desenvolvimento COEVO</CardTitle>
              <CardDescription>
                Acompanhamento de empreendimentos próprios e parceiros.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-5 shadow-sm hover:border-cyan transition-colors group">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-petrol group-hover:text-cyan transition-colors">
                      Residencial Vista do Vale
                    </h4>
                    <span className="bg-blue-100 text-blue-700 text-[10px] uppercase font-bold px-2 py-1 rounded">
                      Em Aprovação
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-5 line-clamp-2">
                    Loteamento em fase avançada de licenciamento ambiental (GRAPROHAB). Previsão de
                    VGV: R$ 12M.
                  </p>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[30%]"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
