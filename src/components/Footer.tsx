import { Linkedin, Instagram, ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SITE_CONFIG } from '@/lib/config'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-petrol text-white pt-16 pb-8 border-t-4 border-cyan">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div>
              <img
                src={SITE_CONFIG.logoUrl}
                alt={SITE_CONFIG.name}
                className="h-10 object-contain brightness-0 invert"
              />
              <p className="text-xs font-bold text-cyan mt-2 tracking-widest uppercase">
                {SITE_CONFIG.grupo}
              </p>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              {SITE_CONFIG.slogan}. Transformando a maneira como você gerencia e protege seu
              patrimônio.
            </p>
            <div className="flex gap-4 pt-2">
              {SITE_CONFIG.instagram && (
                <a
                  href={SITE_CONFIG.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/50 hover:text-cyan transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {SITE_CONFIG.linkedin && (
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/50 hover:text-cyan transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-4">Plataforma</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contratar"
                  className="text-sm text-white/70 hover:text-cyan transition-colors"
                >
                  Contratar Serviços
                </Link>
              </li>
              <li>
                <Link
                  to="/cliente"
                  className="text-sm text-white/70 hover:text-cyan transition-colors"
                >
                  Portal do Cliente
                </Link>
              </li>
              <li>
                <a
                  href="/#ecossistema"
                  className="text-sm text-white/70 hover:text-cyan transition-colors"
                >
                  Soluções e Ecossistema
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="text-sm text-white/70">WhatsApp: +{SITE_CONFIG.whatsapp}</li>
              <li className="text-sm text-white/70">Email: {SITE_CONFIG.email}</li>
              <li className="text-sm text-white/70">{SITE_CONFIG.cidade}</li>
            </ul>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="font-display font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan" /> Legal Box
            </h3>
            <p className="text-xs text-white/50 mb-4 leading-relaxed">
              Atuamos em conformidade com as resoluções do COFECI/CRECI e LGPD. Suas informações
              estão seguras.
            </p>
            <div className="space-y-1 text-xs text-white/70">
              <p>CNPJ: {SITE_CONFIG.cnpj}</p>
              <p>CNAE: {SITE_CONFIG.cnae}</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-white/50">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. Todos os direitos reservados.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-white/50 hover:text-cyan transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-sm text-white/50 hover:text-cyan transition-colors">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
