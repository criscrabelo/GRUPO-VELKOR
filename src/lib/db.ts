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
    id: 'diagnostico-imobiliario',
    title: 'Diagnóstico Imobiliário Completo',
    type: 'Consultoria',
    short_description: 'Levantamento da situação documental do imóvel.',
    full_content:
      'Levantamento minucioso e parecer técnico da situação documental do imóvel para garantir segurança antes de qualquer transação.',
    icon_name: 'Search',
    features: ['Busca de certidões', 'Verificação de matrícula', 'Análise de passivos'],
    featured: false,
    partnerNote: true,
    methodology: ['Pesquisa prévia', 'Emissão de certidões', 'Elaboração de parecer'],
    benefits: ['Evita prejuízos', 'Clareza na negociação', 'Tomada de decisão baseada em fatos'],
    price: 'A partir de R$ 600',
  },
  {
    id: 'compra-segura',
    title: 'Compra Segura VELKOR',
    type: 'Assessoria',
    short_description: 'Análise documental pré-compra de forma especializada.',
    full_content:
      'Auditoria completa em toda a documentação das partes e do imóvel antes da assinatura do contrato de compra e venda.',
    icon_name: 'ShieldCheck',
    features: ['Análise de vendedor e comprador', 'Auditoria imobiliária', 'Parecer de risco'],
    featured: true,
    partnerNote: true,
    methodology: ['Due diligence', 'Checagem de restrições', 'Acompanhamento contratual'],
    benefits: ['Investimento blindado', 'Prevenção de fraudes', 'Tranquilidade total'],
    price: 'A partir de R$ 1.500',
  },
  {
    id: 'escritura-registro',
    title: 'Escritura, Registro e Matrícula',
    type: 'Despachante',
    short_description: 'Acompanhamento de ITBI e registros nos cartórios competentes.',
    full_content:
      'Gestão integral do fluxo de transferência de propriedade, do pagamento de guias até o registro na matrícula.',
    icon_name: 'FileSignature',
    features: [
      'Cálculo e emissão de ITBI',
      'Agendamento de escritura',
      'Protocolo e acompanhamento de registro',
    ],
    featured: true,
    partnerNote: false,
    methodology: ['Preparação de dossiê', 'Emissão de guias', 'Registro em cartório'],
    benefits: ['Agilidade processual', 'Sem burocracia para você', 'Imóvel no seu nome'],
    price: 'A partir de R$ 1.500',
  },
  {
    id: 'regularizacao-imoveis',
    title: 'Regularização de Imóveis',
    type: 'Despachante',
    short_description: 'Averbações, Habite-se, CND e outros trâmites administrativos.',
    full_content:
      'Resolvemos pendências documentais na prefeitura, receita federal e cartórios para deixar o seu imóvel 100% legalizado.',
    icon_name: 'CheckSquare',
    features: ['Averbação de construção', 'Emissão de Habite-se', 'CND de Obra'],
    featured: false,
    partnerNote: true,
    methodology: ['Análise do passivo', 'Projeto de regularização', 'Protocolo nos órgãos'],
    benefits: ['Valorização do imóvel', 'Facilidade para venda', 'Evita multas'],
    price: 'Sob análise',
  },
  {
    id: 'analise-leiloes',
    title: 'Análise de Risco em Leilões',
    type: 'Consultoria',
    short_description: 'Matrícula, débitos e registros de arrematação.',
    full_content:
      'Estudo preventivo sobre o imóvel em leilão e todo o processo posterior à arrematação para garantir o registro do bem.',
    icon_name: 'Gavel',
    features: ['Análise de edital', 'Verificação de dívidas', 'Desembaraço pós-arrematação'],
    featured: false,
    partnerNote: true,
    methodology: ['Levantamento de dados', 'Auditoria jurídica parceira', 'Estratégia de registro'],
    benefits: ['Compra segura no leilão', 'Minimização de surpresas', 'Registro mais rápido'],
    price: 'Sob consulta',
  },
  {
    id: 'empresas-holdings',
    title: 'Empresas, Construtoras e Holdings',
    type: 'Assessoria',
    short_description: 'Gestão documental de carteira e patrimônio.',
    full_content:
      'Terceirização do departamento de legalização imobiliária para incorporadoras, construtoras e holdings familiares.',
    icon_name: 'Building2',
    features: ['Gestão de carteira', 'Regularização em massa', 'Auditoria contínua'],
    featured: false,
    partnerNote: true,
    methodology: ['Diagnóstico de carteira', 'Plano de ação', 'Execução paralela'],
    benefits: ['Foco no core business', 'Redução de custos operacionais', 'Conformidade legal'],
    price: 'Sob análise',
  },
  {
    id: 'assembleias',
    title: 'Participação em Assembleias',
    type: 'Representação',
    short_description: 'Representação administrativa, entrega de chaves e relatórios.',
    full_content:
      'Representamos seus interesses em assembleias de condomínio, realizamos acompanhamento na entrega de chaves e elaboramos relatórios administrativos detalhados.',
    icon_name: 'Users',
    features: [
      'Participação em reuniões',
      'Acompanhamento de vistorias',
      'Relatórios administrativos',
    ],
    featured: false,
    partnerNote: false,
    methodology: ['Alinhamento de pautas', 'Presença no ato', 'Documentação e repasse'],
    benefits: ['Representatividade', 'Registro fiel dos fatos', 'Economia de tempo'],
    price: 'A partir de R$ 400',
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
