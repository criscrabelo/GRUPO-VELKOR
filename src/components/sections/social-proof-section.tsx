export function SocialProofSection() {
  return (
    <section className="py-12 bg-cyan/10 border-y border-cyan/20 flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-sm font-bold tracking-widest uppercase text-petrol/70 mb-8">
          Empresas que confiam na excelência VELKOR
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60 mix-blend-multiply">
          <img
            src="https://img.usecurling.com/i?q=google&shape=solid-black"
            alt="Partner 1"
            className="h-8 md:h-10 object-contain"
          />
          <img
            src="https://img.usecurling.com/i?q=amazon&shape=solid-black"
            alt="Partner 2"
            className="h-8 md:h-10 object-contain"
          />
          <img
            src="https://img.usecurling.com/i?q=microsoft&shape=solid-black"
            alt="Partner 3"
            className="h-8 md:h-10 object-contain"
          />
          <img
            src="https://img.usecurling.com/i?q=meta&shape=solid-black"
            alt="Partner 4"
            className="h-8 md:h-10 object-contain"
          />
        </div>
      </div>
    </section>
  )
}
