import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, AlertCircle, Building2 } from 'lucide-react'
import { VelkorLogo } from '@/components/VelkorLogo'
import { Skeleton } from '@/components/ui/skeleton'
import { supabase } from '@/lib/supabase/client'
import { ContactForm } from '@/components/ContactForm'

export default function Gateway() {
  const [settings, setSettings] = useState<any>(null)
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, projectsRes] = await Promise.all([
          supabase.from('site_settings').select('*').limit(1).maybeSingle(),
          supabase.from('featured_projects').select('*').order('created_at', { ascending: false }),
        ])

        if (settingsRes.error) throw settingsRes.error
        if (projectsRes.error) throw projectsRes.error

        setSettings(
          settingsRes.data || {
            site_name: 'GRUPO VELKOR',
            hero_title: 'Seja bem-vindo ao GRUPO VELKOR',
            hero_subtitle: 'Explore nossos projetos e serviços em destaque.',
            background_image_url: null,
            contact_email: 'contato@velkor.com.br',
          },
        )
        setProjects(projectsRes.data || [])
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center relative overflow-x-hidden">
      <div className="absolute inset-0 z-0 h-screen">
        <img
          src={
            settings?.background_image_url ||
            'https://img.usecurling.com/p/1920/1080?q=modern%20architecture&color=black&dpr=2'
          }
          alt="Bg"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-petrol/95 via-slate-900/95 to-slate-900/90" />
      </div>

      <div className="z-10 container px-4 max-w-5xl flex flex-col items-center py-16">
        <div className="mb-12 text-center animate-fade-in-down w-full flex flex-col items-center">
          {isLoading ? (
            <>
              <Skeleton className="h-12 md:h-16 w-3/4 max-w-2xl mb-4 bg-slate-800/80 rounded-xl" />
              <Skeleton className="h-6 md:h-7 w-2/3 max-w-xl bg-slate-800/50 rounded-lg" />
            </>
          ) : (
            <>
              <h1 className="text-white text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
                {settings?.hero_title}
              </h1>
              <p className="text-cyan text-lg md:text-xl max-w-2xl mx-auto">
                {settings?.hero_subtitle}
              </p>
            </>
          )}
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl animate-fade-in mb-16">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-8 border-2 border-slate-700/50 flex flex-col items-center h-[320px]"
              >
                <Skeleton className="w-20 h-20 rounded-2xl mb-6 bg-slate-700/50" />
                <Skeleton className="h-8 w-48 mb-4 bg-slate-700/50" />
                <Skeleton className="h-4 w-64 mb-2 bg-slate-700/30" />
                <Skeleton className="h-5 w-32 bg-slate-700/40 mt-auto" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-12 w-full animate-fade-in text-red-400 bg-red-950/20 rounded-2xl border border-red-900/50 backdrop-blur-sm mb-16">
            <AlertCircle className="w-10 h-10 mb-4 text-red-500" />
            <p className="text-lg">Não foi possível carregar os dados.</p>
            <p className="text-sm opacity-80 mt-1">Tente atualizar a página.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl animate-fade-in-up mb-20">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={project.link_url || '#'}
                className="group relative bg-white rounded-2xl p-8 shadow-2xl transition-all hover:-translate-y-2 hover:border-cyan border-2 border-transparent flex flex-col items-center text-center overflow-hidden"
              >
                {project.category && (
                  <div className="absolute top-4 right-4 bg-petrol/10 text-petrol text-xs font-bold px-3 py-1 rounded-full">
                    {project.category}
                  </div>
                )}
                <div className="w-24 h-24 rounded-2xl rotate-3 group-hover:rotate-6 flex items-center justify-center mb-6 z-10 transition-transform p-1 shadow-sm bg-slate-100 overflow-hidden">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.name}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <Building2 className="w-10 h-10 text-slate-400" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-petrol mb-4 z-10">{project.name}</h2>
                <p className="text-slate-600 mb-8 z-10">{project.description}</p>
                <div className="flex items-center text-cyan font-bold group-hover:translate-x-2 transition-transform z-10 mt-auto">
                  Acessar Projeto <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Contact Section */}
        <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row mb-12 animate-fade-in-up">
          <div className="md:w-5/12 bg-petrol p-10 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">Fale Conosco</h3>
              <p className="text-petrol-100 mb-8 opacity-80">
                Tem alguma dúvida ou deseja saber mais sobre nossos projetos? Envie uma mensagem e
                nossa equipe entrará em contato.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <VelkorLogo variant="light" className="w-6 h-6" />
                </div>
                <span className="font-medium">{settings?.site_name || 'GRUPO VELKOR'}</span>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-10 bg-slate-50">
            <ContactForm />
          </div>
        </div>
      </div>
      <div className="relative text-white/40 text-xs text-center z-10 w-full font-medium pb-6 mt-auto">
        &copy; {new Date().getFullYear()} {settings?.site_name || 'GRUPO VELKOR'}. Todos os direitos
        reservados.
      </div>
    </div>
  )
}
