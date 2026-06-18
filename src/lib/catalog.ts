export const SERVICE_CATALOG = [
  {
    id: 'consultoria-documental',
    name: 'Consultoria Documental',
    type: 'Pessoa Física e Jurídica',
    description: 'Orientação por vídeo ou email sobre documentos e sequência de certidões.',
    price: 'A partir de R$ 180',
    basePrice: 180,
    methodology: [
      'Agendamento e alinhamento da pauta',
      'Análise prévia de documentos enviados',
      'Sessão de consultoria (vídeo ou presencial)',
      'Envio de relatório com plano de ação',
    ],
    benefits: [
      'Clareza sobre os próximos passos',
      'Evita gastos desnecessários',
      'Atendimento personalizado com especialistas',
    ],
  },
  {
    id: 'checkup-imobiliario',
    name: 'Check-up Imobiliário',
    type: 'Pessoa Física e Jurídica',
    description:
      'Diagnóstico completo da situação documental do imóvel, matrícula, ônus, IPTU. Serviços técnicos e peças jurídicas executados por nossa rede de parceiros especializados.',
    price: 'R$ 600 - R$ 1.500',
    basePrice: 600,
    methodology: [
      'Coleta de informações iniciais do imóvel',
      'Busca e emissão de certidões nos órgãos competentes',
      'Análise técnica e jurídica pelos parceiros',
      'Emissão de parecer detalhado com diagnóstico',
    ],
    benefits: [
      'Visão clara da real situação do imóvel',
      'Identificação antecipada de riscos e dívidas',
      'Segurança para planejar negociações ou reformas',
    ],
  },
  {
    id: 'compra-segura',
    name: 'Compra Segura',
    type: 'Compradores',
    description:
      'Análise de riscos documentais, certidões do vendedor e comprador. Serviços técnicos e peças jurídicas executados por nossa rede de parceiros especializados.',
    price: 'R$ 1.200 - R$ 2.800',
    basePrice: 1200,
    methodology: [
      'Análise inicial da viabilidade do negócio',
      'Levantamento completo de certidões do imóvel e das partes',
      'Auditoria de passivos trabalhistas, fiscais e cíveis',
      'Elaboração ou revisão de contratos de promessa de compra e venda',
    ],
    benefits: [
      'Redução drástica de riscos de perda do imóvel',
      'Tranquilidade durante o repasse de valores',
      'Negociação embasada em dados concretos',
    ],
  },
  {
    id: 'assessoria-leiloes',
    name: 'Assessoria em Leilões',
    type: 'Investidores',
    description:
      'Assessoria especializada para leilões judiciais e extrajudiciais. Da análise administrativa do edital ao registro da arrematação. Serviços técnicos e peças jurídicas executados por nossa rede de parceiros especializados.',
    price: 'A partir de R$ 2.500',
    basePrice: 2500,
    methodology: [
      'Seleção de oportunidades e análise do edital',
      'Levantamento de débitos (IPTU, condomínio) e ônus',
      'Acompanhamento do leilão e lances',
      'Apoio no registro da arrematação e desocupação',
    ],
    benefits: [
      'Investimento altamente seguro com alta rentabilidade',
      'Evita arrematações com passivos ocultos',
      'Todo o trâmite orquestrado em um só lugar',
    ],
  },
  {
    id: 'escritura-registro',
    name: 'Escritura e Registro',
    type: 'Geral',
    description:
      'Organização documental e apoio no tabelionato e Registro de Imóveis, incluindo regularizações por parceiros técnicos.',
    price: 'R$ 1.500 - R$ 3.500',
    basePrice: 1500,
    methodology: [
      'Coleta de assinaturas e documentos',
      'Agendamento e acompanhamento em cartório',
      'Recolhimento de impostos (ITBI/ITCMD)',
      'Protocolo e acompanhamento do registro final',
    ],
    benefits: [
      'Agilidade no registro definitivo',
      'Evita exigências e atrasos cartorários',
      'Segurança jurídica na titularidade',
    ],
  },
  {
    id: 'diagnostico-patrimonial',
    name: 'Diagnóstico Patrimonial Familiar',
    type: 'Famílias/Herdeiros',
    description: 'Matrícula, certidões, débitos e organização para sucessão patrimonial.',
    price: 'R$ 1.200 - R$ 3.500',
    basePrice: 1200,
    methodology: [
      'Mapeamento de todo o patrimônio familiar',
      'Levantamento de pendências documentais e fiscais',
      'Estudo de viabilidade para inventário ou holding',
      'Relatório final com recomendações estratégicas',
    ],
    benefits: [
      'Proteção e perpetuidade do patrimônio',
      'Facilidade na sucessão e menor carga tributária',
      'Tranquilidade para as gerações futuras',
    ],
  },
  {
    id: 'due-diligence',
    name: 'Due Diligence Documental',
    type: 'Investidores/Empresas',
    description:
      'Levantamento de certidões, débitos e pendências administrativas de imóveis e sócios. Serviços técnicos e peças jurídicas executados por nossa rede de parceiros especializados.',
    price: 'R$ 2.500 - R$ 8.000',
    basePrice: 2500,
    methodology: [
      'Assinatura de NDA e início das investigações',
      'Auditoria de passivos ambientais, cíveis e trabalhistas',
      'Análise societária e imobiliária aprofundada',
      'Entrega de report detalhado de riscos e mitigações',
    ],
    benefits: [
      'Base sólida para grandes transações imobiliárias',
      'Poder de barganha na negociação',
      'Compliance e adequação a normas vigentes',
    ],
  },
  {
    id: 'leiloes-orgaos-publicos',
    name: 'Participação em Leilões de Órgãos Públicos',
    type: 'Investidores/Empresas',
    description:
      'Gestão e representação estratégica em leilões promovidos por órgãos governamentais. Serviços técnicos e peças jurídicas executados por nossa rede de parceiros especializados.',
    price: 'Sob Consulta',
    basePrice: 0,
    methodology: [
      'Monitoramento de editais de órgãos governamentais (Caixa, Receita, etc.)',
      'Análise técnica do edital e viabilidade financeira',
      'Preparação e habilitação documental',
      'Representação em lances e trâmites de adjudicação',
    ],
    benefits: [
      'Acesso a excelentes oportunidades com preço abaixo do mercado',
      'Especialização técnica garantindo conformidade com a lei de licitações',
      'Assessoria ponta a ponta até a posse',
    ],
  },
]
