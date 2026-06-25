import { SITE_CONFIG } from '@/lib/config'
import { MapPin, Mail, Phone, Instagram, Linkedin, Facebook, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { VelkorLogo } from '@/components/VelkorLogo'

export function Footer() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}`
  const mailtoUrl = `mailto:${SITE_CONFIG.email}`

  return (
    <footer className="bg-petrol text-white pt-20 pb-24 lg:pb-10 border-t border-white/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/solucoes" className="inline-block mb-6 hover:opacity-90 transition-opacity">
              <VelkorLogo variant="light" className="h-12" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">{SITE_CONFIG.slogan}</p>

            {/* Redes sociais visíveis */}
            <div className="flex gap-3 mb-6">
              {SITE_CONFIG.instagram && (
                <a
                  href={SITE_CONFIG.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan hover:text-petrol transition-colors focus:ring-2 focus:ring-cyan focus:outline-none"
                  aria-label="Instagram VELKOR"
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
                  aria-label="LinkedIn VELKOR"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan hover:text-petrol transition-colors focus:ring-2 focus:ring-cyan focus:outline-none"
                aria-label="Facebook VELKOR"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>

            {/* Contato clicável */}
            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-white/60 hover:text-[#25D366] transition-colors text-sm group"
                aria-label="WhatsApp Business VELKOR"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span>WhatsApp Business</span>
              </a>
              <a
                href={mailtoUrl}
                className="flex items-center gap-3 text-white/60 hover:text-cyan transition-colors text-sm group"
                aria-label="E-mail VELKOR"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan/20 transition-colors shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span>{SITE_CONFIG.email}</span>
              </a>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Taubaté, Vale do Paraíba / SP</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Serviços</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contratar"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Check-up Imobiliário
                </Link>
              </li>
              <li>
                <Link
                  to="/contratar"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Compra Segura
                </Link>
              </li>
              <li>
                <Link
                  to="/contratar"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Assessoria em Leilões
                </Link>
              </li>
              <li>
                <Link
                  to="/contratar"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Escritura + Registro
                </Link>
              </li>
              <li>
                <Link
                  to="/contratar"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Regularização de Imóveis
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Empresa</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/solucoes"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Sobre a VELKOR
                </Link>
              </li>
              <li>
                <a
                  href="/solucoes#ecossistema"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Ecossistema
                </a>
              </li>
              <li>
                <a
                  href="/solucoes#precos"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Tabela de Referência
                </a>
              </li>
              <li>
                <a
                  href="/solucoes#faq"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <Link
                  to="/cliente"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Área do Cliente
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Links Úteis</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://registradores.org.br/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  ONR · Registradores
                </a>
              </li>
              <li>
                <a
                  href="https://www.receita.fazenda.gov.br/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Receita Federal
                </a>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  ← Grupo VELKOR
                </Link>
              </li>
            </ul>

            {/* Institucional Links */}
            <h4 className="font-bold text-lg mb-6 mt-8">Legal & Institucional</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Política de Atendimento
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  Aviso de Atuação Documental
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-white/60 hover:text-cyan text-sm block py-1.5 transition-colors"
                >
                  LGPD
                </Link>
              </li>
            </ul>

            {/* Limitação de atuação */}
            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/40 text-xs leading-relaxed">
                <strong className="text-white/60">Aviso Legal:</strong> A VELKOR atua como
                despachante documental imobiliário, exclusivamente na esfera administrativa e
                documental. Não exercemos advocacia, corretagem ou engenharia diretamente.
              </p>
            </div>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2026 VELKOR Soluções Imobiliárias. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <span>CNPJ {SITE_CONFIG.cnpj}</span>
            <span>·</span>
            <span>Uma empresa do Grupo VELKOR</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
