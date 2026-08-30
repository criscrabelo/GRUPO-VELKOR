import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section
      id="inicio"
      className="pt-32 pb-20 md:pt-40 md:pb-28 text-white relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #144C55 0%, #144C55 63%, #0F3A42 100%)',
      }}
    >
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid nav:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <span className="inline-block section-label text-cyan-light bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
              Protege · Organiza · Resolve
            </span>
            <h1 className="heading-serif text-4xl md:text-5xl lg:text-[52px] font-bold leading-tight mb-6">
              Documentação imobiliária organizada, acompanhada, sem burocracia e 100% digital.
            </h1>
            <p className="text-lg text-white/80 max-w-xl mb-10">
              Mais clareza, menos deslocamentos e acompanhamento de cada etapa em um só lugar.
            </p>

            <div className="flex flex-col xs:flex-row gap-4 mb-12">
              <a
                href="#diagnostico"
                className="inline-flex items-center justify-center gap-2 rounded-button bg-cyan-brand text-teal-institutional font-bold px-6 py-4 hover:bg-cyan-brand/90 transition-colors min-h-[44px]"
              >
                Começar diagnóstico gratuito <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#pacote"
                className="inline-flex items-center justify-center gap-2 rounded-button border border-white/30 text-white font-bold px-6 py-4 hover:bg-white/5 transition-colors min-h-[44px]"
              >
                Montar meu pacote
              </a>
            </div>

            <dl className="grid grid-cols-3 gap-6 max-w-md">
              <div>
                <dt className="sr-only">Serviços no catálogo</dt>
                <dd className="heading-serif text-2xl font-bold">22</dd>
                <dd className="text-xs text-white/60">serviços no catálogo</dd>
              </div>
              <div>
                <dt className="sr-only">Diagnóstico</dt>
                <dd className="heading-serif text-2xl font-bold">3</dd>
                <dd className="text-xs text-white/60">perguntas no diagnóstico</dd>
              </div>
              <div>
                <dt className="sr-only">Diagnóstico gratuito</dt>
                <dd className="heading-serif text-2xl font-bold">R$0</dd>
                <dd className="text-xs text-white/60">diagnóstico inicial</dd>
              </div>
            </dl>
          </div>

          <div className="hidden nav:block">
            <div className="bg-white/5 border border-white/10 rounded-card p-6 backdrop-blur-sm">
              <p className="section-label text-cyan-light mb-4">Seu dossiê no painel</p>
              <div className="space-y-3">
                {['Certidão de matrícula e ônus', 'ITBI: organização e acompanhamento', 'Acompanhamento do registro'].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between bg-white/5 rounded-button px-4 py-3 text-sm"
                    >
                      <span className="text-white/90">{item}</span>
                      <span className="text-cyan-light text-xs font-bold uppercase">Conferido</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
