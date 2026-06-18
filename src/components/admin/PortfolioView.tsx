import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Briefcase, Gavel, UserCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PortfolioView() {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-petrol">Carteira & Deliberação</h2>
          <p className="text-slate-500">
            Gestão de carteira ativa de clientes corporativos e aprovações do conselho.
          </p>
        </div>
      </div>

      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-sm bg-slate-100 p-1 mb-8">
          <TabsTrigger
            value="portfolio"
            className="data-[state=active]:bg-white data-[state=active]:text-petrol"
          >
            <Briefcase className="w-4 h-4 mr-2" /> Carteira Ativa
          </TabsTrigger>
          <TabsTrigger
            value="deliberation"
            className="data-[state=active]:bg-white data-[state=active]:text-petrol"
          >
            <Gavel className="w-4 h-4 mr-2" /> Deliberação
          </TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Carteira</CardTitle>
              <CardDescription>
                Monitoramento de clientes VIPs, construtoras e investidores recorrentes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center text-cyan shrink-0 border border-cyan/20">
                        <UserCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-petrol">Construtora Alpha {i}</p>
                        <p className="text-xs text-slate-500 font-medium">
                          Due Diligences Ativas: {i * 2}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs font-bold">
                      Abrir Ficha
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deliberation">
          <Card>
            <CardHeader>
              <CardTitle>Painel de Deliberação</CardTitle>
              <CardDescription>
                Aprovações de conselho administrativo para descontos e casos excepcionais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-5 border border-amber-200 bg-amber-50 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-amber-900 text-sm">
                      Aprovação de Condição Especial (15% OFF)
                    </h4>
                    <p className="text-xs text-amber-800 mt-1">
                      Due Diligence Lote Aberto - Ref: #5512 - Cliente: Grupo Z
                    </p>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 sm:flex-none border-amber-200 text-amber-700 hover:bg-amber-100"
                    >
                      Rejeitar
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 sm:flex-none bg-amber-600 text-white hover:bg-amber-700"
                    >
                      Aprovar
                    </Button>
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
