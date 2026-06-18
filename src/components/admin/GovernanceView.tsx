import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ShieldAlert, Network, TableProperties, ScrollText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function GovernanceView() {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-petrol">Governança & Riscos</h2>
          <p className="text-slate-500">
            Gestão estrutural, matriz de responsabilidades e auditoria.
          </p>
        </div>
      </div>

      <Tabs defaultValue="organogram" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl bg-slate-100 p-1 mb-8">
          <TabsTrigger
            value="organogram"
            className="data-[state=active]:bg-white data-[state=active]:text-petrol"
          >
            <Network className="w-4 h-4 mr-2" /> Organograma
          </TabsTrigger>
          <TabsTrigger
            value="raci"
            className="data-[state=active]:bg-white data-[state=active]:text-petrol"
          >
            <TableProperties className="w-4 h-4 mr-2" /> Matriz RACI
          </TabsTrigger>
          <TabsTrigger
            value="risk"
            className="data-[state=active]:bg-white data-[state=active]:text-petrol"
          >
            <ShieldAlert className="w-4 h-4 mr-2" /> Riscos
          </TabsTrigger>
          <TabsTrigger
            value="audit"
            className="data-[state=active]:bg-white data-[state=active]:text-petrol"
          >
            <ScrollText className="w-4 h-4 mr-2" /> Auditoria
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organogram">
          <Card>
            <CardHeader>
              <CardTitle>Estrutura Societária e Organograma</CardTitle>
              <CardDescription>
                Visão hierárquica e controle do quadro de sócios (Editável em modo Admin)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px]">
                <Network className="w-16 h-16 text-slate-300 mb-4" />
                <p className="text-slate-500 text-center max-w-md">
                  Organograma interativo. Clique nos nós para editar diretores, coordenadores e
                  parceiros técnicos integrados.
                </p>
                <Button className="mt-6 bg-petrol text-white hover:bg-petrol/90">
                  Editar Estrutura
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="raci">
          <Card>
            <CardHeader>
              <CardTitle>Matriz RACI Corporativa</CardTitle>
              <CardDescription>Responsible, Accountable, Consulted, Informed.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-700">
                    <tr>
                      <th className="p-3 rounded-tl-lg">Atividade / Papel</th>
                      <th className="p-3 text-center">Diretoria</th>
                      <th className="p-3 text-center">Coord. Jurídica</th>
                      <th className="p-3 text-center">Parceiros (OAB/CREA)</th>
                      <th className="p-3 text-center rounded-tr-lg">Cliente</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-medium">Aprovação de Due Diligence</td>
                      <td className="p-3 text-center text-red-600 font-bold">A</td>
                      <td className="p-3 text-center text-blue-600 font-bold">R</td>
                      <td className="p-3 text-center text-slate-400">C</td>
                      <td className="p-3 text-center text-green-600">I</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-medium">Execução de Atos Privativos</td>
                      <td className="p-3 text-center text-red-600 font-bold">A</td>
                      <td className="p-3 text-center text-slate-400">C</td>
                      <td className="p-3 text-center text-blue-600 font-bold">R</td>
                      <td className="p-3 text-center text-green-600">I</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk">
          <Card>
            <CardHeader>
              <CardTitle>Matriz de Riscos</CardTitle>
              <CardDescription>
                Mapeamento de riscos operacionais, legais e financeiros.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-red-200 bg-red-50 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-red-900">Risco Legal (Exercício Ilegal)</h4>
                    <span className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded font-bold">
                      ALTO
                    </span>
                  </div>
                  <p className="text-sm text-red-800">
                    Mitigação: Contratos de parceria estritos. Avisos legais em todos os documentos
                    (Disclaimer ativado).
                  </p>
                </div>
                <div className="p-4 border border-amber-200 bg-amber-50 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-amber-900">Atraso em Órgãos Públicos</h4>
                    <span className="bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded font-bold">
                      MÉDIO
                    </span>
                  </div>
                  <p className="text-sm text-amber-800">
                    Mitigação: SLAs ajustados com margem. Comunicação proativa via Portal do
                    Cliente.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Auditoria e Registro Imutável</CardTitle>
              <CardDescription>Log de sistema consolidado.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm flex gap-4 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  <span className="text-slate-400 whitespace-nowrap">Hoje, 14:32</span>
                  <span className="font-medium text-slate-700">Admin_Global</span>
                  <span className="text-slate-600">
                    Alterou status do dossiê #8842 para "Em Execução"
                  </span>
                </div>
                <div className="text-sm flex gap-4 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  <span className="text-slate-400 whitespace-nowrap">Hoje, 10:15</span>
                  <span className="font-medium text-slate-700">Sistema</span>
                  <span className="text-slate-600">
                    Disparo de notificação WhatsApp para Cliente #102
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
