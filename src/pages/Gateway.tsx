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
            {units.map((unit) => {
              let brandName = unit.name
              let complement = ''

              if (unit.name.toUpperCase().startsWith('VELKOR ')) {
                brandName = 'VELKOR'
                complement = unit.name.substring(7)
              } else if (unit.name.toUpperCase().startsWith('VELKOR')) {
                brandName = 'VELKOR'
                complement = unit.name.substring(6).trim()
              }

              const CardContent = () => (
                <div className="flex flex-col h-full rounded-2xl bg-slate-900/80 border border-slate-700/50 overflow-hidden hover:bg-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 group shadow-xl backdrop-blur-md">
                  <div className="w-full h-48 sm:h-52 overflow-hidden relative border-b border-slate-700/50 shrink-0">
                    <img
                      src={unit.image_url}
                      alt={unit.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="p-6 md:p-8 flex-1 flex flex-col text-center">
                    <h2 className="text-2xl md:text-3xl font-black tracking-widest text-white mb-1 uppercase">
                      {brandName}
                    </h2>
                    {complement && (
                      <h3 className="text-base md:text-lg font-medium text-cyan-400 mb-4">
                        {complement}
                      </h3>
                    )}

                    {unit.description && (
                      <p className="text-slate-400 text-sm md:text-base flex-1 mb-8">
                        {unit.description}
                      </p>
                    )}

                    <div className="mt-auto w-full">
                      {unit.is_coming_soon ? (
                        <span className="inline-flex items-center justify-center px-6 py-3 bg-slate-800 text-slate-500 text-sm font-semibold rounded-xl w-full border border-slate-700">
                          Em breve
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-xl w-full transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(8,145,178,0.4)]">
                          Acessar
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )

              if (unit.is_coming_soon) {
                return (
                  <div key={unit.id} className="cursor-default block h-full">
                    <CardContent />
                  </div>
                )
              }

              if (unit.link_url?.startsWith('http')) {
                return (
                  <a
                    key={unit.id}
                    href={unit.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <CardContent />
                  </a>
                )
              }

              return (
                <Link key={unit.id} to={unit.link_url || '#'} className="block h-full">
                  <CardContent />
                </Link>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
