import { SITE_CONFIG } from '@/lib/config'
import { MapPin, Mail, Phone, Instagram, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { VelkorLogo } from '@/components/VelkorLogo'

export function Footer() {
  return (
    <footer className="bg-petrol text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-6 hover:opacity-90 transition-opacity">
              <VelkorLogo variant="light" className="h-12" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">{SITE_CONFIG.slogan}</p>
            <div className="flex gap-4">
              {SITE_CONFIG.instagram && (
                <a
                  href={SITE_CONFIG.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan hover:text-petrol transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {SITE_CONFIG.linkedin && (
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan hover:text-petrol transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Serviços</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/60 hover:text-cyan text-sm">
                  Check-up Imobiliário
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white/60 hover:text-cyan text-sm">
                  Compra Segura
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white/60 hover:text-cyan text-sm">
                  Assessoria em Leilões
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white/60 hover:text-cyan text-sm">
                  Due Diligence
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/cliente" className="text-white/60 hover:text-cyan text-sm">
                  Área do Cliente
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-white/60 hover:text-cyan text-sm">
                  Painel Operacional
                </Link>
              </li>
              <li>
                <Link to="/contratar" className="text-white/60 hover:text-cyan text-sm">
                  Contratar Serviço
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contato Central</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-5 h-5 shrink-0 text-cyan" />
                <div className="flex flex-col">
                  <span>Sediados em Taubaté, Vale do Paraíba</span>
                  <span className="font-bold text-cyan text-xs mt-0.5">
                    Atendimento em todo o Brasil
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-5 h-5 shrink-0 text-cyan" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-cyan">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-5 h-5 shrink-0 text-cyan" />
                <div className="flex flex-col">
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cyan font-bold"
                  >
                    WhatsApp Oficial
                  </a>
                  <span className="text-xs opacity-75">+{SITE_CONFIG.whatsapp}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. Todos os direitos reservados.
            </p>
            {SITE_CONFIG.cnpj && (
              <p className="text-white/40 text-xs mt-1 font-bold">CNPJ: {SITE_CONFIG.cnpj}</p>
            )}
          </div>
          <p className="text-white/30 text-[10px] max-w-xl text-right leading-relaxed border-l border-white/10 pl-6">
            {SITE_CONFIG.servicesDisclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}
