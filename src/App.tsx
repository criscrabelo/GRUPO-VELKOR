import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import Contratar from './pages/Contratar'
import Servico from './pages/Servico'
import Contato from './pages/Contato'
import ClientPortal from './pages/ClientPortal'
import Success from './pages/Success'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'
import { Layout } from './components/Layout'
import Gateway from './pages/Gateway'

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner position="bottom-center" />
      <Routes>
        <Route path="/" element={<Gateway />} />
        <Route element={<Layout />}>
          <Route path="/imobiliaria" element={<Index />} />
          <Route path="/contratar" element={<Contratar />} />
          <Route path="/servicos/:id" element={<Servico />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/cliente" element={<ClientPortal />} />
          <Route path="/success" element={<Success />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/painel" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
