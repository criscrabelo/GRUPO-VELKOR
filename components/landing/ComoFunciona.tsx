const PASSOS = [
  {
    numero: '1',
    titulo: 'Diagnóstico e escolha',
    desc: 'Três perguntas, soluções da sua etapa e pacote com desconto progressivo.',
  },
  {
    numero: '2',
    titulo: 'Pagamento do serviço',
    desc: 'Apenas o serviço Velkor é pago no site; taxas oficiais seguem pagas por você ao órgão.',
  },
  {
    numero: '3',
    titulo: 'Envio pelo painel',
    desc: 'A operação abre no painel, com pendências, guias, boletos e prazos organizados.',
  },
  {
    numero: '4',
    titulo: 'Dossiê concluído',
    desc: 'Histórico e documentos conferidos viram um dossiê digital final.',
  },
]

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-20 bg-surface">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="section-label text-teal-action mb-3">Como funciona</p>
          <h2 className="heading-serif text-3xl md:text-4xl font-bold text-ink-primary">
            Quatro passos, do diagnóstico ao dossiê
          </h2>
        </div>

        <div className="grid grid-stack:grid-cols-1 sm:grid-cols-2 nav:grid-cols-4 gap-6">
          {PASSOS.map((p) => (
            <div key={p.numero} className="rounded-card border border-border bg-page p-6">
              <span className="heading-serif text-3xl font-bold text-cyan-brand block mb-3">
                {p.numero}
              </span>
              <h3 className="font-bold text-ink-primary mb-2">{p.titulo}</h3>
              <p className="text-sm text-ink-secondary">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
