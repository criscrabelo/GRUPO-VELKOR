import { Building2, Factory, FileText, Home, Landmark, ShieldCheck } from 'lucide-react'

const audiences = [
  {
    title: 'Quem vai comprar imóvel',
    description: 'Levantamento documental antes da compra, com matrícula, certidões, débitos e pendências administrativas.',
    icon: ShieldCheck,
  },
  {
    title: 'Quem precisa regularizar imóvel',
    description: 'Organização da pasta, protocolos, averbações, escritura, registro e acompanhamento em cartórios e prefeituras.',
    icon: Home,
  },
  {
    title: 'Famílias e herdeiros',
    description: 'Matrículas, certidões, débitos e documentos para inventário, divórcio, partilha ou atualização de titularidade.',
    icon: FileText,
  },
  {
    title: 'Investidores e leilões',
    description: 'Análise administrativa de edital, matrícula, débitos, ITBI e registro da arrematação, sem parecer jurídico.',
    icon: Landmark,
  },
  {
    title: 'Construtoras e incorporadoras',
    description: 'Certidões em lote, dossiês, Habite-se, CND de obra, averbações, relatórios e controle de protocolos.',
    icon: Factory,
  },
  {
    title: 'Holdings e empresas',
    description: 'Gestão documental de carteira imobiliária, controle de vencimentos, regularizações e relatórios gerenciais.',
    icon: Building2,
  },
]

export function ForWhomSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50" id="para-quem">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-cyan font-bold tracking-wider uppercase text-xs md:text-sm mb-4 block">
            Para quem é
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-petrol mb-4">
            A VELKOR é para quem precisa resolver a documentação do imóvel com método.
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Você não precisa saber por onde começar. A VELKOR identifica as pendências,
            organiza os documentos, acompanha os protocolos e, quando necessário, direciona para
            profissionais parceiros habilitados.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm hover:border-cyan/50 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-cyan/10 rounded-2xl flex items-center justify-center text-petrol mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-bold text-petrol mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
