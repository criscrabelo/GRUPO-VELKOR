import { ContactForm } from '@/components/ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/config'

export default function Contato() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 flex flex-col items-center">
      <div className="w-full max-w-6xl px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-petrol mb-4">
            Fale com Nossos Especialistas
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Estamos prontos para entender sua necessidade e orquestrar a melhor solução para o seu
            patrimônio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações de Contato */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full">
              <h3 className="text-2xl font-bold text-petrol mb-8">Nossos Contatos</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-petrol">Telefone / WhatsApp</h4>
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-600 hover:text-cyan transition-colors mt-1 block"
                    >
                      +{SITE_CONFIG.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-petrol">E-mail</h4>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-slate-600 hover:text-cyan transition-colors mt-1 block"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-petrol">Endereço (Sede)</h4>
                    <p className="text-slate-600 mt-1 leading-relaxed">
                      Taubaté, Vale do Paraíba - SP
                      <br />
                      <span className="text-sm text-cyan font-bold block mt-1">
                        Atendimento Nacional Integrado
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-petrol">Horário de Atendimento</h4>
                    <p className="text-slate-600 mt-1">
                      Segunda a Sexta
                      <br />
                      09:00 às 18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-petrol to-cyan" />
              <h3 className="text-2xl font-bold text-petrol mb-6">Envie uma Mensagem</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
