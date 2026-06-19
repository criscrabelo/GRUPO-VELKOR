import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Shield, ArrowRight } from 'lucide-react'
import { VelkorLogo } from '@/components/VelkorLogo'
import { Skeleton } from '@/components/ui/skeleton'
import { supabase } from '@/lib/supabase/client'

export default function Gateway() {
  const [settings, setSettings] = useState<any>(null)
  const [units, setUnits] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, unitsRes] = await Promise.all([
          supabase.from('site_settings').select('*').limit(1).maybeSingle(),
          supabase.from('business_units').select('*').order('order_index', { ascending: true }),
        ])

        if (settingsRes.error) throw settingsRes.error
        if (unitsRes.error) throw unitsRes.error

        if (settingsRes.data) {
          setSettings(settingsRes.data)
        } else {
          setSettings({
            site_name: 'Grupo VELKOR',
            hero_title: 'Bem-vindo ao Grupo VELKOR',
            hero_subtitle: 'Selecione a unidade de negócio para acessar nossos serviços.',
            background_image_url: null,
          })
        }

        if (unitsRes.data) {
          setUnits(unitsRes.data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
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

        {!isLoading && units.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 w-full max-w-[880px] animate-fade-in-up">
            {units.map((unit) =>
              unit.is_coming_soon ? (
                <div
                  key={unit.id}
                  className="relative bg-[#121c25] rounded-2xl p-10 border border-slate-800/80 flex flex-col items-center text-center overflow-hidden cursor-not-allowed group"
                >
                  {/* Overlay to differentiate from active units */}
                  <div className="absolute inset-0 bg-slate-900/60 z-0 pointer-events-none" />

                  <div className="absolute top-5 right-5 z-20">
                    <div className="relative bg-gradient-to-r from-[#0fa5b4] to-[#085a63] text-white text-[11px] uppercase font-black tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(15,165,180,0.4)] border border-[#0fa5b4]/30">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      EM BREVE
                    </div>
                  </div>

                  <div className="w-full h-20 overflow-hidden flex items-center justify-center mb-6 relative z-10 shrink-0">
                    {unit.image_url ? (
                      <img
                        src={unit.image_url}
                        alt={unit.name}
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop'
                        }}
                        className="w-full h-full object-contain opacity-40 grayscale transition-all duration-500"
                      />
                    ) : (
                      <Building2 className="w-10 h-10 text-slate-700" />
                    )}
                  </div>

                  <h2 className="text-[1.35rem] font-bold text-white mb-3 relative z-10 opacity-90">
                    {unit.name}
                  </h2>
                  <p className="text-slate-400 mb-10 leading-relaxed text-[15px] max-w-[280px] relative z-10 opacity-80">
                    {unit.description}
                  </p>

                  <div className="mt-auto flex items-center text-slate-600 font-semibold text-[15px] relative z-10 pointer-events-none">
                    Acessar Portal <ArrowRight className="ml-2 w-4 h-4 opacity-50" />
                  </div>
                </div>
              ) : (
                <Link
                  key={unit.id}
                  to={unit.link_url || '#'}
                  className="group relative bg-white rounded-2xl p-10 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[#0fa5b4]/10 flex flex-col items-center text-center overflow-hidden border border-transparent hover:border-[#0fa5b4]/20"
                >
                  <div className="w-full h-20 overflow-hidden flex items-center justify-center mb-6 relative z-10 shrink-0">
                    {unit.image_url ? (
                      <img
                        src={unit.image_url}
                        alt={unit.name}
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop'
                        }}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <Building2 className="w-10 h-10 text-[#0fa5b4]" />
                    )}
                  </div>
                  <h2 className="text-[1.35rem] font-bold text-[#0a1118] mb-3 relative z-10">
                    {unit.name}
                  </h2>
                  <p className="text-slate-500 mb-10 leading-relaxed text-[15px] max-w-[280px] relative z-10">
                    {unit.description}
                  </p>
                  <div className="mt-auto flex items-center text-[#0fa5b4] font-semibold text-[15px] group-hover:translate-x-1 transition-transform duration-300 relative z-10">
                    Acessar Portal <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </Link>
              ),
            )}
          </div>
        )}

        {isLoading && (
          <div className="grid md:grid-cols-2 gap-6 w-full max-w-[880px] animate-fade-in-up">
            <Skeleton className="h-[360px] w-full rounded-2xl bg-white/5" />
            <Skeleton className="h-[360px] w-full rounded-2xl bg-[#121c25]/50" />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center z-10 text-slate-500/60 text-[13px] font-medium mt-auto">
        &copy; 2026 {settings?.site_name || 'Grupo VELKOR'}. Todos os direitos reservados.
      </footer>
    </div>
  )
}
