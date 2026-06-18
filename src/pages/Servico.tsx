import { useEffect, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { db, Service } from '@/lib/db'
import { ContactForm } from '@/components/ContactForm'
import { CheckCircle, Shield, Briefcase, ChevronRight, ArrowLeft, Zap, Layers } from 'lucide-react'

export default function Servico() {
  const { id } = useParams<{ id: string }>()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      db.services.findUnique(id).then((data) => {
        setService(data)
        setLoading(false)
      })
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!service && !loading) {
    return <Navigate to="/contratar" replace />
  }

  const handleScrollToForm = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-petrol text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1200/800?q=modern%20architecture')] opacity-10 bg-cover bg-center mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-petrol via-petrol/90 to-transparent" />

        <div className="container mx-auto px-4 max-w-5xl relative z-10 pt-4">
          <Link
            to="/"
            className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o Início
          </Link>
          <br />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/20 text-cyan text-sm font-bold mb-6">
            <Briefcase className="w-4 h-4" /> {service.type}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
            {service?.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed mb-10">
            {service?.short_description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleScrollToForm}
              className="px-8 py-4 bg-cyan text-petrol font-bold rounded-xl hover:bg-cyan/90 transition-colors shadow-lg shadow-cyan/20 text-lg flex items-center justify-center gap-2"
            >
              Solicitar Orçamento <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={handleScrollToForm}
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/20 text-lg flex items-center justify-center"
            >
              Falar com Consultor
            </button>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-petrol mb-4 flex items-center gap-3">
                  <Layers className="w-8 h-8 text-cyan" />
                  Metodologia (Como fazemos)
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  Nossa atuação como Hub Orquestrador garante que cada etapa seja conduzida com
                  excelência. O processo de <strong>{service?.title}</strong> é transparente, seguro
                  e focado em resultados rápidos, com acompanhamento ponta a ponta.
                </p>
                <ul className="space-y-4">
                  {(
                    service?.methodology || [
                      'Análise inicial detalhada da sua demanda',
                      'Alocação dos parceiros técnicos mais qualificados',
                      'Gestão centralizada de todo o fluxo de trabalho',
                      'Acompanhamento em tempo real pela Área do Cliente',
                    ]
                  ).map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle className="w-6 h-6 text-cyan shrink-0 mt-0.5" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-display font-bold text-petrol mb-4 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-cyan" />
                  Principais Benefícios
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  Ao contratar a VELKOR para este serviço, você conta com as seguintes vantagens
                  estratégicas:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(
                    service.benefits || [
                      'Segurança total na transação',
                      'Agilidade na resolução',
                      'Conformidade com a legislação',
                    ]
                  ).map((benefit, i) => (
                    <div
                      key={i}
                      className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3"
                    >
                      <Shield className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-32">
                <Shield className="w-10 h-10 text-cyan mb-4" />
                <h3 className="text-xl font-bold text-petrol mb-2">Investimento Seguro</h3>
                <p className="text-slate-500 mb-6">Condições transparentes e sem custos ocultos.</p>
                <div className="py-4 border-y border-slate-100 mb-6">
                  <span className="text-sm text-slate-500 block mb-1">Valor Estimado</span>
                  <span className="text-2xl font-bold text-petrol">
                    {service?.price || 'Sob Consulta'}
                  </span>
                </div>
                <button
                  onClick={handleScrollToForm}
                  className="w-full py-3 bg-petrol text-white font-bold rounded-lg hover:bg-petrol/90 transition-colors"
                >
                  Solicitar Orçamento Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="contact-section" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-petrol mb-4">
              Solicite um Orçamento
            </h2>
            <p className="text-slate-600 text-lg">
              Preencha o formulário abaixo e entraremos em contato para apresentar a melhor proposta
              para o serviço de <strong>{service?.title}</strong>.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl shadow-petrol/5 border border-slate-100">
            <ContactForm preselectedServiceId={service?.id} />
          </div>
        </div>
      </section>
    </div>
  )
}
