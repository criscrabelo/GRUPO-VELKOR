import { Gavel, Check, TrendingUp, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function AuctionsSection() {
  return (
    <section
      className="py-24 bg-petrol text-white relative overflow-hidden"
      id="assessoria-leiloes"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan/5 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2">
            <span className="text-cyan font-bold tracking-wider uppercase text-sm mb-4 block">
              Oportunidades Seguras
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Assessoria em Leilões Judiciais e Extrajudiciais
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Hub de Soluções Imobiliárias e Regularização Patrimonial. Estruturamos e coordenamos
              toda a esteira documental imobiliária. Tudo com inteligência, compliance e
              previsibilidade.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                'Análise prévia e minuciosa de editais',
                'Levantamento completo de débitos e ônus na matrícula',
                'Assessoria administrativa pós-arrematação',
                'Apoio na desocupação (via parceiros jurídicos)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-cyan/20 p-1 rounded-full shrink-0">
                    <Check className="w-4 h-4 text-cyan" />
                  </div>
                  <span className="text-slate-200">{item}</span>
                </li>
              ))}
            </ul>

            <Link to="/contratar">
              <Button
                size="lg"
                className="bg-cyan hover:bg-cyan/90 text-petrol font-bold px-8 h-14 rounded-xl text-lg w-full sm:w-auto"
              >
                Consultar Assessoria
              </Button>
            </Link>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/10 border border-white/20 p-6 rounded-2xl backdrop-blur-sm">
              <TrendingUp className="w-10 h-10 text-cyan mb-4" />
              <h3 className="text-xl font-bold mb-2">Alta Rentabilidade</h3>
              <p className="text-slate-300 text-sm">
                Acesse oportunidades com descontos expressivos em relação ao valor de mercado com
                segurança estruturada.
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 p-6 rounded-2xl backdrop-blur-sm sm:mt-10">
              <ShieldCheck className="w-10 h-10 text-cyan mb-4" />
              <h3 className="text-xl font-bold mb-2">Riscos Mitigados</h3>
              <p className="text-slate-300 text-sm">
                Nossa diligência documental prévia identifica potenciais passivos, protegendo o seu
                capital investido.
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 p-6 rounded-2xl backdrop-blur-sm">
              <Gavel className="w-10 h-10 text-cyan mb-4" />
              <h3 className="text-xl font-bold mb-2">Suporte Integral</h3>
              <p className="text-slate-300 text-sm">
                Do estudo de viabilidade ao registro final da arrematação, coordenamos cada etapa do
                seu investimento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
