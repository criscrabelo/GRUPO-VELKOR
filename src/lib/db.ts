export interface Service {
  id: string
  title: string
  type?: string
  short_description: string
  full_content?: string
  icon_name?: string
  features?: string[]
  featured?: boolean
  partnerNote?: boolean
  methodology?: string[]
  benefits?: string[]
  price?: string
}

export interface Testimonial {
  id: string
  feedback_text: string
  rating: number
  client_name: string
  image?: string
  position?: string
}

const mockServices: Service[] = [
  {
    id: 'checkup-imobiliario',
    title: 'Checkup Imobiliário',
    type: 'Consultoria',
    short_description: 'Análise completa da documentação e situação do imóvel.',
    full_content: 'Análise completa da documentação e situação do imóvel.',
    icon_name: 'Search',
    features: ['Análise de matrícula', 'Verificação de ônus', 'Relatório detalhado'],
    featured: false,
    partnerNote: true,
    methodology: [
      'Levantamento completo de documentação',
      'Análise de viabilidade',
      'Parecer técnico',
    ],
    benefits: ['Evita fraudes', 'Segurança na compra', 'Garantia jurídica'],
    price: 'A partir de R$ 990',
  },
  {
    id: 'compra-segura',
    title: 'Compra Segura',
    type: 'Assessoria',
    short_description: 'Assessoria completa para aquisição de imóveis com segurança jurídica.',
    full_content: 'Assessoria completa para aquisição de imóveis com segurança jurídica.',
    icon_name: 'ShieldCheck',
    features: ['Análise de riscos', 'Acompanhamento do contrato', 'Suporte jurídico'],
    featured: true,
    partnerNote: true,
    methodology: [
      'Validação das certidões do vendedor',
      'Verificação do imóvel',
      'Acompanhamento no cartório',
    ],
    benefits: [
      'Investimento protegido',
      'Processo sem burocracia',
      'Acompanhamento em todo momento',
    ],
    price: 'A partir de R$ 1.500',
  },
  {
    id: 'assessoria-leiloes',
    title: 'Assessoria em Leilões',
    type: 'Assessoria',
    short_description:
      'Especialistas na arrematação de imóveis em leilões judiciais e extrajudiciais.',
    full_content: 'Especialistas na arrematação de imóveis em leilões judiciais e extrajudiciais.',
    icon_name: 'Gavel',
    features: ['Busca de oportunidades', 'Análise do edital', 'Acompanhamento de lances'],
    featured: false,
    partnerNote: false,
    methodology: [
      'Busca no edital',
      'Análise de viabilidade financeira',
      'Arrematação e documentação',
    ],
    benefits: ['Imóveis com desconto', 'Lucro acima do mercado', 'Menor risco'],
    price: 'Sob Consulta',
  },
  {
    id: 'leiloes-orgaos-publicos',
    title: 'Leilões de Órgãos Públicos',
    type: 'Assessoria',
    short_description: 'Assessoria na participação de leilões promovidos por órgãos públicos.',
    full_content: 'Assessoria na participação de leilões promovidos por órgãos públicos.',
    icon_name: 'Landmark',
    features: ['Análise de documentação', 'Habilitação no certame', 'Suporte pós-arrematação'],
    featured: false,
    partnerNote: false,
    methodology: [
      'Avaliação da oportunidade pública',
      'Inscrição nos órgãos',
      'Arrematação com segurança',
    ],
    benefits: ['Descontos atrativos', 'Transparência total', 'Garantia estatal'],
    price: 'Sob Consulta',
  },
]

const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    feedback_text:
      'Excelente serviço, superaram todas as minhas expectativas. Recomendo fortemente.',
    rating: 5,
    client_name: 'João Silva',
    position: 'Empresário',
  },
  {
    id: '2',
    feedback_text:
      'A assessoria foi fundamental para fechar um ótimo negócio com total segurança e praticidade.',
    rating: 5,
    client_name: 'Maria Oliveira',
    position: 'Investidora',
  },
  {
    id: '3',
    feedback_text:
      'Comprar meu primeiro imóvel em leilão só foi possível graças à equipe. Muito obrigado!',
    rating: 5,
    client_name: 'Carlos Mendes',
    position: 'Servidor Público',
  },
]

export const db = {
  services: {
    findMany: async (): Promise<Service[]> => {
      return mockServices
    },
    findUnique: async (id: string): Promise<Service | null> => {
      return mockServices.find((s) => s.id === id) || null
    },
  },
  testimonials: {
    findMany: async (): Promise<Testimonial[]> => {
      return mockTestimonials
    },
  },
}
