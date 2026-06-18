import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ContactDock } from '@/components/ContactDock'
import { useEffect, useState } from 'react'

export function Layout() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = document.documentElement.scrollTop
      const max = document.documentElement.scrollHeight - document.documentElement.clientHeight
      setProgress(max > 0 ? (scrolled / max) * 100 : 0)
    }
    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-petrol to-cyan z-50 transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <ContactDock />
    </div>
  )
}
