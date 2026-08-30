import Link from 'next/link'
import { VelkorLogo } from './VelkorLogo'

export function Footer() {
  return (
    <footer className="bg-teal-deep text-white/70">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid sm:grid-cols-2 nav:grid-cols-4 gap-8 mb-10">
          <div>
            <VelkorLogo heightClassName="h-7 brightness-0 invert mb-4" />
            <p className="text-sm">Taubaté/SP · Atendimento em todo o Brasil</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#solucoes" className="hover:text-white">
                  Soluções
                </a>
              </li>
              <li>
                <a href="#pacote" className="hover:text-white">
                  Monte seu pacote
                </a>
              </li>
              <li>
                <a href="#limites" className="hover:text-white">
                  O que fazemos
                </a>
              </li>
              <li>
                <Link href="/cliente" className="hover:text-white">
                  Área do cliente
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>WhatsApp (12) 98131-3521</li>
              <li>contato@velkor.com.br</li>
              <li>Seg. a sex., 9h às 18h</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="cursor-not-allowed opacity-60">
                  Política de Privacidade (em preparação)
                </span>
              </li>
              <li>
                <span className="cursor-not-allowed opacity-60">Termos de Uso (em preparação)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-xs space-y-2">
          <p>
            Valores referentes exclusivamente à gestão e execução Velkor. Taxas oficiais, custas de
            cartório, ITBI, emolumentos, guias e boletos de terceiros não estão inclusos.
          </p>
          <p>
            A Velkor Soluções Imobiliárias está em constituição. Este site não constitui parecer
            jurídico, corretagem, laudo técnico ou qualquer ato privativo de profissional
            habilitado.
          </p>
          <p>© {new Date().getFullYear()} Velkor Soluções Imobiliárias.</p>
        </div>
      </div>
    </footer>
  )
}
