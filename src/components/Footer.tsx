import { SITE_CONFIG } from '@/lib/config'
import { MapPin, Mail, Phone, Instagram, Linkedin, Facebook } from 'lucide-react'
import { Link } from 'react-router-dom'
import { VelkorLogo } from '@/components/VelkorLogo'

export function Footer() {
  return (
    <footer className="bg-petrol text-white pt-20 pb-24 lg:pb-10 border-t border-white/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/solucoes" className="inline-block mb-6 hover:opacity-90 transition-opacity">
              <VelkorLogo variant="light" className="h-12" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">{SITE_CONFIG.slogan}</p>
            <div className="flex gap-4">
              {SITE_CONFIG.instagram && (
                <a
                  href={SITE_CONFIG.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan hover:text-petrol transition-colors focus:ring-2 focus:ring-cyan focus:outline-none"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {SITE_CONFIG.linkedin && (
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan hover:text-petrol transition-colors focus:ring-2 focus:ring-cyan focus:outline-none"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan hover:text-petrol transition-colors focus:ring-2 focus:ring-cyan focus:outline-none"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Serviços</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/servicos/diagnostico-documental"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Diagnóstico Imobiliário
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos/compra-segura-documental"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Compra Segura VELKOR
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos/escritura-registro-matricula"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Escritura e Registro
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos/regularizacao-imoveis"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Regularização de Imóveis
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos/analise-risco-leiloes"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Análise de Risco em Leilões
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Portal Grupo VELKOR
                </Link>
              </li>
              <li>
                <Link
                  to="/cliente"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Área do Cliente
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Painel Operacional
                </Link>
              </li>
              <li>
                <Link
                  to="/contratar"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Contratar Serviço
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contato Central</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-5 h-5 shrink-0 text-cyan mt-0.5" />
                <div className="flex flex-col py-1">
                  <span>Sediados em Taubaté, Vale do Paraíba</span>
                  <span className="font-bold text-cyan text-xs mt-0.5">
                    Atendimento em todo o Brasil
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <Mail className="w-5 h-5 shrink-0 text-cyan mt-0.5" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-cyan block py-1 break-all"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <Phone className="w-5 h-5 shrink-0 text-cyan mt-0.5" />
                <div className="flex flex-col py-1">
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cyan font-bold block"
                  >
                    WhatsApp Oficial
                  </a>
                  <span className="text-xs opacity-75 mt-0.5">+{SITE_CONFIG.whatsapp}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 text-center lg:text-left">
          <div className="w-full lg:w-auto">
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. Todos os direitos reservados.
            </p>
            {SITE_CONFIG.cnpj && (
              <p className="text-white/40 text-xs mt-2 font-bold">CNPJ: {SITE_CONFIG.cnpj}</p>
            )}
            <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2 text-[11px]">
              <a href="#" className="text-white/40 hover:text-cyan transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-white/40 hover:text-cyan transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-white/40 hover:text-cyan transition-colors">
                Política de Atendimento
              </a>
              <a href="#" className="text-white/40 hover:text-cyan transition-colors">
                Aviso de Atuação Documental
              </a>
              <a href="#" className="text-white/40 hover:text-cyan transition-colors">
                LGPD e Tratamento de Documentos
              </a>
            </div>
          </div>
          <p className="text-white/30 text-[10px] max-w-xl lg:text-right leading-relaxed lg:border-l border-white/10 lg:pl-6 w-full lg:w-auto">
            {SITE_CONFIG.servicesDisclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}
