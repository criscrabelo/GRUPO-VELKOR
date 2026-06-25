import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Shield, ArrowRight } from 'lucide-react'
import { VelkorLogo } from '@/components/VelkorLogo'
import { Skeleton } from '@/components/ui/skeleton'
import { supabase } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

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
            site_name: 'GRUPO VELKOR',
            hero_title: 'Bem-vindo ao GRUPO VELKOR',
            hero_subtitle:
              'Selecione a unidade de negócio para acessar nossos serviços e soluções.',
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
    <div className="min-h-[100dvh] bg-[#0F172A] flex flex-col items-center relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

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
          {settings?.site_name || 'GRUPO VELKOR'}
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
                {settings?.hero_title || 'Bem-vindo ao GRUPO VELKOR'}
              </h1>
              <p className="text-cyan-400 text-base md:text-[1.125rem] max-w-2xl mx-auto font-medium">
                {settings?.hero_subtitle ||
                  'Selecione a unidade de negócio para acessar nossos serviços e soluções.'}
              </p>
            </>
          )}
        </div>

        {!isLoading && units.length > 0 && (
          <div
            className={cn(
              'grid gap-6 w-full animate-fade-in-up mx-auto justify-center auto-rows-fr',
              units.length === 1 ? 'max-w-[440px] grid-cols-1' : 'md:grid-cols-2 max-w-[880px]',
            )}
          >
            {units.map((unit) =>
              unit.is_coming_soon ? (
                <div
                  key={unit.id}
                  className="relative bg-[#121c25] rounded-2xl p-8 md:p-10 border border-slate-800/80 flex flex-col items-center text-center overflow-hidden cursor-not-allowed group h-full min-h-[420px]"
                >
                  {/* Overlay to differentiate from active units */}
                  <div className="absolute inset-0 bg-slate-900/60 z-0 pointer-events-none" />

                  <div className="absolute top-5 right-5 z-20">
                    <div className="relative bg-gradient-to-r from-cyan-500 to-cyan-700 text-white text-[11px] uppercase font-black tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-cyan-400/30">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      EM BREVE
                    </div>
                  </div>

                  <div className="relative z-10 mb-8 shrink-0 pt-2">
                    <h3 className="text-2xl font-black tracking-[0.2em] text-white/90 uppercase">
                      VELKOR
                    </h3>
                  </div>

                  <div className="w-full h-24 overflow-hidden flex items-center justify-center relative z-10 shrink-0">
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
                      <Building2 className="w-12 h-12 text-slate-700" />
                    )}
                  </div>

                  <div className="mt-auto pt-8 flex flex-col items-center relative z-10 shrink-0 w-full">
                    <h2 className="text-[1.25rem] font-bold text-slate-300 mb-3 text-center">
                      {(() => {
                        const match = unit.name.match(/^(VELKOR)\s+(.+)$/i)
                        return match ? match[2] : unit.name
                      })()}
                    </h2>
                    <p className="text-slate-400 mb-6 leading-relaxed text-[15px] max-w-[280px] opacity-80">
                      {unit.description}
                    </p>

                    <div className="flex items-center text-slate-500 font-semibold text-[15px] pointer-events-none">
                      Acessar Portal <ArrowRight className="ml-2 w-4 h-4 opacity-50" />
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={unit.id}
                  to={unit.link_url || '#'}
                  className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/10 flex flex-col items-center text-center overflow-hidden border border-transparent hover:border-cyan-500/20 h-full min-h-[420px]"
                >
                  <div className="relative z-10 mb-8 shrink-0 pt-2">
                    <h3 className="text-2xl font-black tracking-[0.2em] text-[#0a1118] uppercase">
                      VELKOR
                    </h3>
                  </div>

                  <div className="w-full h-24 overflow-hidden flex items-center justify-center relative z-10 shrink-0">
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
                      <Building2 className="w-12 h-12 text-[#0fa5b4]" />
                    )}
                  </div>

                  <div className="mt-auto pt-8 flex flex-col items-center relative z-10 shrink-0 w-full">
                    <h2 className="text-[1.25rem] font-bold text-slate-600 mb-3 text-center">
                      {(() => {
                        const match = unit.name.match(/^(VELKOR)\s+(.+)$/i)
                        return match ? match[2] : unit.name
                      })()}
                    </h2>
                    <p className="text-slate-500 mb-6 leading-relaxed text-[15px] max-w-[280px]">
                      {unit.description}
                    </p>
                    <div className="flex items-center text-cyan-600 font-semibold text-[15px] group-hover:translate-x-1 transition-transform duration-300">
                      Acessar Portal <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ),
            )}
          </div>
        )}

        {isLoading && (
          <div className="grid gap-6 w-full max-w-[440px] animate-fade-in-up mx-auto">
            <Skeleton className="h-[360px] w-full rounded-2xl bg-white/5" />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center z-10 text-slate-500/60 text-[13px] font-medium mt-auto">
        &copy; 2026 {settings?.site_name || 'GRUPO VELKOR'}. Todos os direitos reservados.
      </footer>
    </div>
  )
}
