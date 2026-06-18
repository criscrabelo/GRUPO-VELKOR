import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Lock, FileText, Upload, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function VaultView() {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-petrol">Vault de Documentos</h2>
          <p className="text-slate-500">
            Repositório seguro e criptografado para arquivos de governança e clientes.
          </p>
        </div>
        <Button className="bg-petrol text-white hover:bg-petrol/90 shrink-0">
          <Upload className="w-4 h-4 mr-2" />
          Novo Documento
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Arquivos Recentes e Matrículas</CardTitle>
            <CardDescription>Acesso controlado e restrito por nível hierárquico.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Matrícula_Atualizada_Lote4A.pdf', type: 'Público', date: 'Hoje, 10:20' },
                { name: 'Contrato_Parceria_OAB_Silva.pdf', type: 'Restrito', date: 'Ontem, 16:45' },
                {
                  name: 'Due_Diligence_Report_Final.pdf',
                  type: 'Confidencial',
                  date: '12/06/2026',
                },
              ].map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-cyan hover:bg-cyan/5 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-cyan/50">
                      <FileText className="w-6 h-6 text-slate-400 group-hover:text-cyan transition-colors" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-700">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${doc.type === 'Restrito' || doc.type === 'Confidencial' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}
                        >
                          {doc.type}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{doc.date}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-cyan shrink-0"
                  >
                    <Download className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-cyan">
          <CardHeader>
            <CardTitle>Log de Segurança</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-cyan/10 flex items-center justify-center border-4 border-white shadow-sm relative">
                <Lock className="w-10 h-10 text-cyan relative z-10" />
                <div className="absolute inset-0 bg-cyan/20 rounded-full animate-ping opacity-50" />
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Todos os arquivos carregados ou acessados neste vault são versionados e
                automaticamente registrados no log de auditoria corporativa daVELKOR.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
