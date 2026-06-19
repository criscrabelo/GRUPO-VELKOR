import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Shield, ArrowRight } from 'lucide-react'
import { VelkorLogo } from '@/components/VelkorLogo'
import { Skeleton } from '@/components/ui/skeleton'
import { supabase } from '@/lib/supabase/client'

export default function Gateway() {
  const [settings, setSettings] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .limit(1)
          .maybeSingle()

        if (error) throw error

        if (data) {
          setSettings(data)
        } else {
          setSettings({
            site_name: 'Grupo VELKOR',
            hero_title: 'Bem-vindo ao Grupo VELKOR',
            hero_subtitle: 'Selecione a unidade de negócio para acessar nossos serviços.',
            background_image_url: null,
          })
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  return (
    <div className="min-h-[100dvh] bg-[#0c151e] flex flex-col items-center relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#0fa5b4]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#0fa5b4]/5 rounded-full blur-[140px] pointer-events-none" />

      {settings?.background_image_url && (
        <div className="absolute inset-0 z-0 h-screen opacity-[0.03] mix-blend-overlay">
          <img
            src={settings.background_image_url}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <header className="z-10 w-full pt-10 pb-6 flex justify-center items-center gap-3">
        <div className="h-6 flex items-center justify-center">
          <VelkorLogo variant="light" className="h-full w-auto" />
        </div>
        <span className="text-slate-300 font-medium tracking-wide text-sm">
          {settings?.site_name || 'Grupo VELKOR'}
        </span>
      </header>

      <main className="z-10 container px-6 w-full max-w-5xl flex-1 flex flex-col items-center justify-center pb-16">
        <div className="mb-12 text-center w-full flex flex-col items-center animate-fade-in-down">
          {isLoading ? (
            <>
              <Skeleton className="h-10 md:h-[3.25rem] w-3/4 max-w-lg mb-4 bg-slate-800/80 rounded-xl" />
              <Skeleton className="h-5 md:h-6 w-2/3 max-w-md bg-slate-800/50 rounded-lg" />
            </>
          ) : (
            <>
              <h1 className="text-white text-3xl md:text-[44px] font-bold tracking-tight mb-5 leading-tight">
                {settings?.hero_title}
              </h1>
              <p className="text-[#0fa5b4] text-base md:text-[1.125rem] max-w-2xl mx-auto font-medium">
                {settings?.hero_subtitle}
              </p>
            </>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-[880px] animate-fade-in-up">
          {/* Card 1 - Active */}
          <Link
            to="/solucoes"
            className="group relative bg-white rounded-2xl p-10 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[#0fa5b4]/10 flex flex-col items-center text-center overflow-hidden border border-transparent hover:border-[#0fa5b4]/20"
          >
            <div className="w-[4.5rem] h-[4.5rem] rounded-[1.25rem] bg-[#f0f7f9] text-[#1e3a5f] flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
              <Building2 className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="text-[1.35rem] font-bold text-[#0a1118] mb-3">VELKOR Soluções</h2>
            <p className="text-slate-500 mb-10 leading-relaxed text-[15px] max-w-[280px]">
              Regularização patrimonial, due diligence, leilões e compra segura.
            </p>
            <div className="mt-auto flex items-center text-[#0fa5b4] font-semibold text-[15px] group-hover:translate-x-1 transition-transform duration-300">
              Acessar Portal <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </Link>

          {/* Card 2 - Disabled */}
          <div className="relative bg-[#121c25] rounded-2xl p-10 border border-slate-800/80 flex flex-col items-center text-center overflow-hidden opacity-90 cursor-not-allowed">
            <div className="absolute top-5 right-5 bg-[#0fa5b4]/10 text-[#0fa5b4] text-[10px] uppercase font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#0fa5b4]/20 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0fa5b4] animate-pulse" />
              EM BREVE
            </div>
            <div className="w-[4.5rem] h-[4.5rem] rounded-[1.25rem] bg-[#1a2632] text-slate-400 flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="text-[1.35rem] font-bold text-white mb-3">VELKOR Seguros</h2>
            <p className="text-slate-400 leading-relaxed text-[15px] max-w-[280px]">
              Proteção completa para patrimônio, vida e negócios. Soluções personalizadas.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center z-10 text-slate-500/60 text-[13px] font-medium mt-auto">
        &copy; 2026 {settings?.site_name || 'Grupo VELKOR'}. Todos os direitos reservados.
      </footer>
    </div>
  )
}
