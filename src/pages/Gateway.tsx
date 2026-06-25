import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
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

      <header className="z-10 w-full pt-10 pb-6 flex justify-center items-center">
        <div className="h-6 flex items-center justify-center">
          <VelkorLogo variant="light" className="h-full w-auto" />
        </div>
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
              'grid gap-6 w-full animate-fade-in-up mx-auto justify-center items-stretch',
              units.length === 1 ? 'max-w-[440px] grid-cols-1' : 'md:grid-cols-2 max-w-[880px]',
            )}
          >
            {units.map((unit) => {
              const match = unit.name.match(/^(VELKOR)/i)
              const brandName = match ? match[1].toUpperCase() : unit.name

              const CardWrapper = unit.is_coming_soon || !unit.link_url ? 'div' : Link

              return (
                <CardWrapper
                  key={unit.id}
                  to={unit.link_url || '#'}
                  className={cn(
                    'group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 flex flex-col h-full',
                    (unit.is_coming_soon || !unit.link_url) &&
                      'opacity-80 hover:translate-y-0 hover:shadow-none hover:border-slate-800 cursor-default',
                  )}
                >
                  {unit.is_coming_soon && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-slate-800/80 backdrop-blur-md text-cyan-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-cyan-500/20">
                        Em Breve
                      </span>
                    </div>
                  )}

                  <div className="relative w-full aspect-[16/9] overflow-hidden shrink-0 bg-slate-900">
                    {unit.image_url ? (
                      <img
                        src={unit.image_url}
                        alt={unit.name}
                        className={cn(
                          'w-full h-full object-cover transition-transform duration-700 ease-out',
                          !unit.is_coming_soon && 'group-hover:scale-105',
                        )}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <VelkorLogo variant="icon" className="w-12 h-12 opacity-20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent pointer-events-none" />
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-1 items-center text-center">
                    <div className="flex flex-col items-center justify-center flex-1">
                      <h2 className="text-white text-2xl md:text-3xl font-bold tracking-wider mb-1 uppercase">
                        {brandName}
                      </h2>
                      {unit.description && (
                        <h3 className="text-cyan-400 text-lg md:text-xl font-medium mb-4 line-clamp-3">
                          {unit.description}
                        </h3>
                      )}
                    </div>

                    {!unit.is_coming_soon && unit.link_url && (
                      <div className="mt-6 flex items-center text-cyan-400 font-medium text-sm md:text-base group-hover:text-cyan-300 transition-colors w-full justify-center">
                        Acessar Portal
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </div>
                </CardWrapper>
              )
            })}
          </div>
        )}
      </main>

      <footer className="z-10 w-full py-6 text-center text-slate-500 text-xs md:text-sm">
        <p>
          © {new Date().getFullYear()} {settings?.site_name || 'GRUPO VELKOR'}. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  )
}
