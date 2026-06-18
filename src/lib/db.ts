import { SERVICE_CATALOG } from './catalog'

export interface Service {
  id: string
  title: string
  short_description: string
  full_content?: string
  icon_name?: string
  image_url?: string
  name?: string // backward compat
  description?: string // backward compat
  price?: string
  basePrice?: number
  type?: string
  methodology?: string[]
  benefits?: string[]
  featured?: boolean
  partnerNote?: boolean
  features?: string[]
}

export interface Testimonial {
  id: string
  client_name: string
  position?: string
  feedback_text: string
  rating: number
  image?: string
}

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  service_id?: string
  created_at: string
}

export interface Lead {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export interface SiteContent {
  id: string
  page_title: string
  hero_description: string
  logo_url: string
  primary_cta_text: string
  contact_email: string
  contact_phone: string
  background_image_url?: string
  footer_text?: string
}

export interface GatewayLink {
  id: string
  title: string
  description?: string
  image_url?: string
  link_url: string
  order: number
  is_active: boolean
  badge_text?: string
}

const DEFAULT_SITE_CONTENT: SiteContent = {
  id: '1',
  page_title: 'Seja bem-vindo ao GRUPO VELKOR',
  hero_description: 'Selecione a unidade de negócio para acessar nossos serviços.',
  logo_url:
    'https://api.altan.ai/platform/media/c0352277-2fce-4c12-92ab-621cae528aab?account_id=45753086-63e2-45e0-81f1-0bc4cb5499dd',
  primary_cta_text: 'Acessar Portal',
  contact_email: 'contato@velkor.com.br',
  contact_phone: '5512999999999',
  background_image_url:
    'https://img.usecurling.com/p/1920/1080?q=modern%20architecture&color=black&dpr=2',
  footer_text: 'VELKOR SOLUÇÕES IMOBILIÁRIAS. Todos os direitos reservados.',
}

const DEFAULT_GATEWAY_LINKS: GatewayLink[] = [
  {
    id: '1',
    title: 'VELKOR SOLUÇÕES IMOBILIÁRIAS',
    description: 'Regularização patrimonial, due diligence, leilões e compra segura.',
    image_url:
      'https://api.altan.ai/platform/media/c0352277-2fce-4c12-92ab-621cae528aab?account_id=45753086-63e2-45e0-81f1-0bc4cb5499dd',
    link_url: '/solucoes',
    order: 1,
    is_active: true,
  },
  {
    id: '2',
    title: 'VELKOR Seguros',
    description: 'Proteção completa para patrimônio, vida e negócios. Soluções personalizadas.',
    link_url: '#',
    order: 2,
    is_active: true,
    badge_text: 'EM BREVE',
  },
]

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    client_name: 'Ana Silva',
    position: 'Investidora Imobiliária',
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    feedback_text:
      'A assessoria em leilões da VELKOR me deu a segurança que eu precisava para investir. O processo foi conduzido com extrema transparência e profissionalismo.',
    rating: 5,
  },
  {
    id: '2',
    client_name: 'Carlos Mendes',
    position: 'Diretor de Expansão, VarejoCorp',
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2',
    feedback_text:
      'A Due Diligence Documental executada pela rede de parceiros da VELKOR evitou que entrássemos em um negócio de alto risco. Eles são meticulosos em cada detalhe.',
    rating: 5,
  },
  {
    id: '3',
    client_name: 'Juliana Costa',
    position: 'Compradora de Imóvel',
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=3',
    feedback_text:
      'Graças ao serviço de Compra Segura, realizei o sonho da casa própria sem surpresas desagradáveis. A organização documental feita por eles foi impecável.',
    rating: 5,
  },
  {
    id: '4',
    client_name: 'Roberto Alves',
    position: 'Gestor Patrimonial',
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4',
    feedback_text:
      'Centralizamos todas as regularizações do nosso portfólio no Hub da VELKOR. É muito prático ter um único ponto de contato orquestrando todas as soluções.',
    rating: 5,
  },
]

// Simulate network delay for mock backend API calls
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const getHeaders = () => ({
  'Content-Type': 'application/json',
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
})

export const db = {
  services: {
    async findMany(): Promise<Service[]> {
      await delay(300)
      const data = localStorage.getItem('skip_db_services')
      if (data) return JSON.parse(data)
      localStorage.setItem('skip_db_services', JSON.stringify(SERVICE_CATALOG))
      return SERVICE_CATALOG as Service[]
    },
    async findUnique(id: string): Promise<Service | null> {
      const services = await this.findMany()
      return services.find((s) => s.id === id) || null
    },
  },
  testimonials: {
    async findMany(): Promise<Testimonial[]> {
      await delay(300)
      const data = localStorage.getItem('skip_db_testimonials')
      if (data) return JSON.parse(data)
      localStorage.setItem('skip_db_testimonials', JSON.stringify(DEFAULT_TESTIMONIALS))
      return DEFAULT_TESTIMONIALS
    },
  },
  contacts: {
    async create(data: Omit<Contact, 'id' | 'created_at'>): Promise<Contact> {
      if (SUPABASE_URL && SUPABASE_ANON_KEY) {
        try {
          const res = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
            method: 'POST',
            headers: { ...getHeaders(), Prefer: 'return=representation' },
            body: JSON.stringify(data),
          })
          if (res.ok) {
            const json = await res.json()
            return json[0]
          }
        } catch (e) {
          console.error('Supabase contact create error:', e)
        }
      }
      await delay(500)
      const contactsStr = localStorage.getItem('skip_db_contacts')
      const contacts: Contact[] = contactsStr ? JSON.parse(contactsStr) : []
      const newContact: Contact = {
        ...data,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
      }
      contacts.push(newContact)
      localStorage.setItem('skip_db_contacts', JSON.stringify(contacts))
      return newContact
    },
  },
  leads: {
    async create(data: Omit<Lead, 'id' | 'created_at'>): Promise<Lead> {
      if (SUPABASE_URL && SUPABASE_ANON_KEY) {
        try {
          const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
            method: 'POST',
            headers: { ...getHeaders(), Prefer: 'return=representation' },
            body: JSON.stringify(data),
          })
          if (res.ok) {
            const json = await res.json()
            return json[0]
          }
        } catch (e) {
          console.error('Supabase lead create error:', e)
        }
      }
      await delay(500)
      const leadsStr = localStorage.getItem('skip_db_leads')
      const leads: Lead[] = leadsStr ? JSON.parse(leadsStr) : []
      const newLead: Lead = {
        ...data,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
      }
      leads.push(newLead)
      localStorage.setItem('skip_db_leads', JSON.stringify(leads))
      return newLead
    },
  },
  gatewayLinks: {
    async findMany(): Promise<GatewayLink[]> {
      if (SUPABASE_URL && SUPABASE_ANON_KEY) {
        try {
          const res = await fetch(
            `${SUPABASE_URL}/rest/v1/gateway_links?select=*&order=order.asc`,
            {
              headers: getHeaders(),
            },
          )
          if (res.ok) {
            const data = await res.json()
            if (data && data.length > 0) return data
          }
        } catch (e) {
          console.error('Supabase gateway_links fetch error:', e)
        }
      }
      await delay(300)
      const data = localStorage.getItem('skip_db_gateway_links')
      if (data) return JSON.parse(data)
      localStorage.setItem('skip_db_gateway_links', JSON.stringify(DEFAULT_GATEWAY_LINKS))
      return DEFAULT_GATEWAY_LINKS
    },
  },
  siteContent: {
    async findFirst(): Promise<SiteContent> {
      if (SUPABASE_URL && SUPABASE_ANON_KEY) {
        try {
          const res = await fetch(`${SUPABASE_URL}/rest/v1/site_content?select=*&limit=1`, {
            headers: getHeaders(),
          })
          if (res.ok) {
            const data = await res.json()
            if (data && data.length > 0) return data[0]
          }
        } catch (e) {
          console.error('Supabase site_content fetch error:', e)
        }
      }
      await delay(300)
      const data = localStorage.getItem('skip_db_site_content')
      if (data) return JSON.parse(data)
      localStorage.setItem('skip_db_site_content', JSON.stringify(DEFAULT_SITE_CONTENT))
      return DEFAULT_SITE_CONTENT
    },
  },
}
