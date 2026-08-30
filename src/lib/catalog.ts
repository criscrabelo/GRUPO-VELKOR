// Fonte única de verdade do catálogo Velkor (VLK01–VLK22).
// Qualquer alteração de nome, preço, prazo ou regra deve ser feita aqui —
// landing, checkout, Kora e painel administrativo consomem estes dados.

export type ServiceFamily =
  | 'Pesquisa documental'
  | 'Compra e venda'
  | 'Pós-compra'
  | 'Gestão recorrente'
  | 'Análise e riscos'
  | 'Contratos'
  | 'Leilões'
  | 'Regularização'
  | 'Regularização rural'
  | 'Soluções digitais'
  | 'Velkor Corporate'

export type ServiceProfile = 'comprar' | 'vender' | 'alugar' | 'arrematar' | 'regularizar'

export type ServicePricingType = 'gratuito' | 'fixo' | 'mensal' | 'sob-consulta'

export interface CatalogService {
  /** Código oficial, ex.: 'VLK01'. Nunca reutilizar nem renumerar. */
  code: string
  /** Slug estável usado em rotas e formulários. */
  id: string
  name: string
  family: ServiceFamily
  shortDescription: string
  fullDescription: string
  iconName: string
  profiles: ServiceProfile[]
  pricingType: ServicePricingType
  /** Valor em reais. null quando sob consulta. */
  price: number | null
  /** Texto pronto para exibição (ex.: "R$ 299,00", "R$ 390,00/mês", "Gratuito", "Sob consulta"). */
  priceLabel: string
  deadline: string | null
  /**
   * Regra de negócio: apenas serviços com preço fixo entram no simulador de
   * pacotes e no cálculo de desconto progressivo. VLK01 (gratuito) e os
   * serviços "sob consulta" ficam de fora.
   */
  inSimulator: boolean
  methodology: string[]
  benefits: string[]
  features: string[]
}

export const SERVICE_CATALOG: CatalogService[] = [
  {
    code: 'VLK01',
    id: 'diagnostico-documental-inicial',
    name: 'Diagnóstico documental inicial',
    family: 'Pesquisa documental',
    shortDescription:
      'Orientação inicial e gratuita sobre a situação documental do imóvel e os próximos passos.',
    fullDescription:
      'Ponto de entrada gratuito da Velkor: entendemos seu caso, o perfil da operação (comprar, vender, alugar ou regularizar) e indicamos quais serviços fazem sentido para o seu momento, sem compromisso.',
    iconName: 'FileSearch',
    profiles: ['comprar', 'vender', 'alugar', 'regularizar'],
    pricingType: 'gratuito',
    price: 0,
    priceLabel: 'Gratuito',
    deadline: 'Imediato',
    inSimulator: false,
    methodology: [
      'Você responde 3 perguntas sobre o seu caso',
      'Identificamos o perfil da operação e a documentação já disponível',
      'Indicamos os serviços Velkor compatíveis com a etapa atual',
    ],
    benefits: [
      'Sem custo e sem compromisso',
      'Clareza sobre o que falta antes de contratar qualquer serviço',
      'Ponto de partida para montar seu pacote no simulador',
    ],
    features: ['Diagnóstico guiado em 3 perguntas', 'Recomendação de próximos passos', 'Gratuito'],
  },
  {
    code: 'VLK02',
    id: 'pesquisa-previa-de-imoveis',
    name: 'Pesquisa prévia de imóveis',
    family: 'Pesquisa documental',
    shortDescription: 'Levantamento inicial da situação do imóvel antes de avançar na negociação.',
    fullDescription:
      'Levantamento da matrícula, proprietários e eventuais restrições preliminares do imóvel, para embasar a decisão de avançar ou não com a negociação.',
    iconName: 'Search',
    profiles: ['comprar', 'regularizar'],
    pricingType: 'fixo',
    price: 299,
    priceLabel: 'R$ 299,00',
    deadline: '3 a 7 dias úteis',
    inSimulator: true,
    methodology: [
      'Levantamento da matrícula atual do imóvel',
      'Identificação de proprietários e histórico recente',
      'Relatório inicial de pontos de atenção',
    ],
    benefits: [
      'Segurança para decidir se avança na negociação',
      'Base para pedir os demais serviços documentais',
      'Entrega rápida, antes de qualquer compromisso financeiro maior',
    ],
    features: ['Levantamento de matrícula', 'Identificação de proprietários', 'Relatório inicial'],
  },
  {
    code: 'VLK03',
    id: 'certidao-de-matricula-e-onus',
    name: 'Certidão de matrícula e ônus',
    family: 'Pesquisa documental',
    shortDescription: 'Emissão da certidão atualizada de matrícula e ônus do imóvel.',
    fullDescription:
      'Solicitação e organização da certidão de matrícula com ônus reais e pessoais reipersecutórios, para confirmar a real situação registral do imóvel.',
    iconName: 'FileText',
    profiles: ['comprar', 'vender', 'regularizar'],
    pricingType: 'fixo',
    price: 249,
    priceLabel: 'R$ 249,00',
    deadline: '2 a 5 dias úteis',
    inSimulator: true,
    methodology: [
      'Solicitação da certidão junto ao Cartório de Registro de Imóveis',
      'Conferência de ônus, penhoras e restrições registradas',
      'Entrega organizada no seu painel digital',
    ],
    benefits: [
      'Confirmação oficial da situação registral',
      'Identificação de ônus antes de fechar negócio',
      'Documento pronto para uso em outras etapas',
    ],
    features: ['Emissão junto ao cartório', 'Conferência de ônus', 'Entrega digital'],
  },
  {
    code: 'VLK04',
    id: 'dossie-de-certidoes',
    name: 'Dossiê de certidões',
    family: 'Pesquisa documental',
    shortDescription: 'Conjunto completo de certidões organizadas em um único dossiê.',
    fullDescription:
      'Reunião das principais certidões pessoais e do imóvel (matrícula, ônus, ações, distribuidores) em um dossiê único, organizado e com controle de validade.',
    iconName: 'FileStack',
    profiles: ['comprar', 'vender', 'regularizar'],
    pricingType: 'fixo',
    price: 999,
    priceLabel: 'R$ 999,00',
    deadline: '7 a 15 dias úteis',
    inSimulator: true,
    methodology: [
      'Mapeamento das certidões necessárias para o caso',
      'Solicitação junto aos órgãos e cartórios competentes',
      'Organização do dossiê com controle de prazos de validade',
    ],
    benefits: [
      'Um único pacote organizado em vez de certidões avulsas',
      'Controle de validade de cada certidão',
      'Documentação pronta para negociação ou financiamento',
    ],
    features: ['Certidões pessoais e do imóvel', 'Controle de validade', 'Dossiê único'],
  },
  {
    code: 'VLK05',
    id: 'itbi-organizacao-e-acompanhamento',
    name: 'ITBI: organização e acompanhamento',
    family: 'Compra e venda',
    shortDescription: 'Organização da guia de ITBI e acompanhamento do pagamento junto ao município.',
    fullDescription:
      'Levantamento da base de cálculo, emissão da guia de ITBI e acompanhamento administrativo até a confirmação de pagamento junto à prefeitura. A guia é sempre paga pelo cliente diretamente ao município.',
    iconName: 'Landmark',
    profiles: ['comprar'],
    pricingType: 'fixo',
    price: 350,
    priceLabel: 'R$ 350,00',
    deadline: '3 a 10 dias úteis',
    inSimulator: true,
    methodology: [
      'Levantamento da base de cálculo junto à prefeitura',
      'Emissão da guia de ITBI',
      'Acompanhamento até a confirmação do pagamento',
    ],
    benefits: [
      'Evita atraso no registro por pendência de ITBI',
      'Guia calculada e emitida corretamente',
      'Acompanhamento até a confirmação municipal',
    ],
    features: ['Cálculo da base do ITBI', 'Emissão da guia', 'Acompanhamento municipal'],
  },
  {
    code: 'VLK06',
    id: 'escritura-publica-organizacao-documental',
    name: 'Escritura pública: organização documental',
    family: 'Compra e venda',
    shortDescription: 'Organização da documentação para lavratura da escritura em tabelionato.',
    fullDescription:
      'Organização e conferência da documentação das partes e do imóvel exigida para a lavratura da escritura pública, com acompanhamento administrativo junto ao tabelionato. O ato de lavratura é privativo do tabelião.',
    iconName: 'BookOpen',
    profiles: ['comprar'],
    pricingType: 'sob-consulta',
    price: null,
    priceLabel: 'Sob consulta',
    deadline: 'Conforme análise do caso',
    inSimulator: false,
    methodology: [
      'Conferência da documentação das partes e do imóvel',
      'Organização do dossiê exigido pelo tabelionato',
      'Acompanhamento administrativo até a lavratura',
    ],
    benefits: [
      'Documentação organizada antes de ir ao tabelionato',
      'Menos idas e vindas por exigência documental',
      'Acompanhamento administrativo ponta a ponta',
    ],
    features: [
      'Conferência documental das partes',
      'Organização para o tabelionato',
      'Acompanhamento administrativo',
    ],
  },
  {
    code: 'VLK07',
    id: 'acompanhamento-do-registro-do-titulo',
    name: 'Acompanhamento do registro do título',
    family: 'Compra e venda',
    shortDescription: 'Protocolo e acompanhamento do registro da escritura na matrícula.',
    fullDescription:
      'Protocolo do título junto ao Registro de Imóveis e acompanhamento das exigências até a efetivação do registro na matrícula, com prazo dependente do cartório.',
    iconName: 'FileCheck',
    profiles: ['comprar'],
    pricingType: 'fixo',
    price: 699,
    priceLabel: 'R$ 699,00',
    deadline: 'Conforme prazo do cartório',
    inSimulator: true,
    methodology: [
      'Protocolo do título no Registro de Imóveis competente',
      'Acompanhamento de exigências registrais',
      'Confirmação do registro na matrícula',
    ],
    benefits: [
      'Acompanhamento ativo em vez de espera silenciosa',
      'Resposta rápida a exigências do cartório',
      'Confirmação formal do registro concluído',
    ],
    features: ['Protocolo no cartório', 'Gestão de exigências', 'Confirmação de registro'],
  },
  {
    code: 'VLK08',
    id: 'transferencia-de-matricula-e-titularidade',
    name: 'Transferência de matrícula e titularidade',
    family: 'Pós-compra',
    shortDescription: 'Acompanhamento da transferência de titularidade em casos específicos.',
    fullDescription:
      'Organização documental para transferência de titularidade em situações que exigem análise específica (sucessão, doação, partilha, entre outras), com requisitos que variam conforme o caso.',
    iconName: 'FileSignature',
    profiles: ['comprar', 'vender'],
    pricingType: 'sob-consulta',
    price: null,
    priceLabel: 'Sob consulta',
    deadline: 'Conforme análise do caso',
    inSimulator: false,
    methodology: [
      'Análise do caso e dos requisitos aplicáveis',
      'Organização da documentação necessária',
      'Acompanhamento administrativo até a atualização da matrícula',
    ],
    benefits: [
      'Orientação adequada ao tipo específico de transferência',
      'Documentação organizada antes do protocolo',
      'Acompanhamento até a conclusão',
    ],
    features: ['Análise de requisitos', 'Organização documental', 'Acompanhamento administrativo'],
  },
  {
    code: 'VLK09',
    id: 'atualizacao-de-iptu-e-condominio',
    name: 'Atualização de IPTU e condomínio',
    family: 'Pós-compra',
    shortDescription: 'Atualização cadastral de IPTU e condomínio após a transação.',
    fullDescription:
      'Atualização cadastral do IPTU junto à prefeitura e do cadastro de titularidade junto ao condomínio, garantindo que cobranças futuras cheguem ao responsável correto.',
    iconName: 'Building2',
    profiles: ['comprar', 'alugar'],
    pricingType: 'fixo',
    price: 490,
    priceLabel: 'R$ 490,00',
    deadline: '10 a 20 dias úteis',
    inSimulator: true,
    methodology: [
      'Atualização cadastral junto à prefeitura (IPTU)',
      'Atualização junto à administradora do condomínio',
      'Confirmação de que os dados foram atualizados',
    ],
    benefits: [
      'Evita cobranças em nome do proprietário anterior',
      'Reduz risco de multas por cadastro desatualizado',
      'Processo conduzido pela Velkor junto aos dois órgãos',
    ],
    features: ['Atualização de IPTU', 'Atualização junto ao condomínio', 'Confirmação de dados'],
  },
  {
    code: 'VLK10',
    id: 'gestao-mensal-de-obrigacoes',
    name: 'Gestão mensal de obrigações',
    family: 'Gestão recorrente',
    shortDescription: 'Acompanhamento mensal de IPTU, condomínio, seguros e demais obrigações.',
    fullDescription:
      'Acompanhamento recorrente dos vencimentos de IPTU, condomínio, seguros e demais obrigações do imóvel, com alertas e organização de guias e boletos no seu painel.',
    iconName: 'Repeat',
    profiles: ['comprar', 'alugar'],
    pricingType: 'mensal',
    price: 390,
    priceLabel: 'R$ 390,00/mês',
    deadline: 'Início imediato',
    inSimulator: true,
    methodology: [
      'Cadastro das obrigações recorrentes do imóvel',
      'Acompanhamento mensal de vencimentos',
      'Alertas e organização de guias e boletos no painel',
    ],
    benefits: [
      'Menos risco de esquecer um vencimento',
      'Guias e boletos organizados em um só lugar',
      'Alertas antes e depois do vencimento',
    ],
    features: ['Acompanhamento mensal', 'Alertas de vencimento', 'Organização de guias e boletos'],
  },
  {
    code: 'VLK11',
    id: 'gestao-de-pagamentos-e-vencimentos',
    name: 'Gestão de pagamentos e vencimentos',
    family: 'Gestão recorrente',
    shortDescription: 'Controle de vencimentos e comprovantes de pagamento do imóvel.',
    fullDescription:
      'Controle de vencimentos e conferência dos comprovantes de pagamento enviados por você. A Velkor organiza e avisa; o pagamento em si é sempre feito pelo cliente diretamente ao credor.',
    iconName: 'Wallet',
    profiles: ['comprar', 'alugar'],
    pricingType: 'mensal',
    price: 290,
    priceLabel: 'R$ 290,00/mês',
    deadline: 'Início imediato',
    inSimulator: true,
    methodology: [
      'Cadastro dos vencimentos recorrentes do imóvel',
      'Aviso prévio de cada vencimento',
      'Conferência do comprovante enviado por você',
    ],
    benefits: [
      'Controle centralizado de vencimentos',
      'Conferência de comprovantes em um só lugar',
      'Histórico organizado por operação',
    ],
    features: ['Controle de vencimentos', 'Avisos prévios', 'Conferência de comprovantes'],
  },
  {
    code: 'VLK12',
    id: 'dossie-para-financiamento',
    name: 'Dossiê para financiamento',
    family: 'Compra e venda',
    shortDescription: 'Organização da documentação exigida por bancos para financiamento.',
    fullDescription:
      'Organização completa da documentação do imóvel e das partes exigida pelas instituições financeiras para análise de financiamento habitacional.',
    iconName: 'FileSpreadsheet',
    profiles: ['comprar'],
    pricingType: 'fixo',
    price: 1500,
    priceLabel: 'R$ 1.500,00',
    deadline: '10 a 20 dias úteis',
    inSimulator: true,
    methodology: [
      'Levantamento dos requisitos do banco financiador',
      'Organização da documentação do imóvel e das partes',
      'Entrega do dossiê pronto para análise bancária',
    ],
    benefits: [
      'Menos idas e vindas na análise do banco',
      'Documentação organizada conforme exigência bancária',
      'Acompanhamento até a entrega final',
    ],
    features: ['Levantamento de exigências bancárias', 'Organização documental', 'Dossiê completo'],
  },
  {
    code: 'VLK13',
    id: 'conferencia-documental-e-relatorio-de-riscos',
    name: 'Conferência documental e relatório de riscos',
    family: 'Análise e riscos',
    shortDescription: 'Conferência da documentação e relatório administrativo de riscos.',
    fullDescription:
      'Conferência cruzada de certidões e documentos do imóvel e das partes, com entrega de relatório administrativo apontando riscos documentais identificados. Não substitui parecer jurídico.',
    iconName: 'ShieldCheck',
    profiles: ['comprar', 'vender'],
    pricingType: 'fixo',
    price: 899,
    priceLabel: 'R$ 899,00',
    deadline: '5 a 12 dias úteis',
    inSimulator: true,
    methodology: [
      'Conferência cruzada de certidões e documentos',
      'Identificação de inconsistências e pendências',
      'Entrega de relatório administrativo de riscos',
    ],
    benefits: [
      'Visão organizada dos riscos documentais',
      'Base para decidir com mais segurança',
      'Relatório entregue no seu painel',
    ],
    features: ['Conferência cruzada', 'Identificação de pendências', 'Relatório de riscos'],
  },
  {
    code: 'VLK14',
    id: 'conferencia-administrativa-de-contratos',
    name: 'Conferência administrativa de contratos',
    family: 'Contratos',
    shortDescription: 'Conferência administrativa de contratos de locação ou venda.',
    fullDescription:
      'Conferência administrativa de cláusulas essenciais e documentos anexos de contratos de locação ou venda, verificando completude e consistência com a documentação do imóvel.',
    iconName: 'ScrollText',
    profiles: ['alugar', 'comprar'],
    pricingType: 'fixo',
    price: 450,
    priceLabel: 'R$ 450,00',
    deadline: '3 a 7 dias úteis',
    inSimulator: true,
    methodology: [
      'Conferência das cláusulas essenciais do contrato',
      'Verificação de anexos e documentos citados',
      'Relatório de pontos de atenção administrativos',
    ],
    benefits: [
      'Contrato revisado antes da assinatura',
      'Pontos de atenção organizados por escrito',
      'Mais segurança administrativa na negociação',
    ],
    features: ['Conferência de cláusulas', 'Checagem de anexos', 'Relatório de pontos de atenção'],
  },
  {
    code: 'VLK15',
    id: 'certidao-de-testamento',
    name: 'Certidão de testamento',
    family: 'Pesquisa documental',
    shortDescription: 'Emissão da certidão de existência de testamento.',
    fullDescription:
      'Solicitação da certidão de existência ou inexistência de testamento junto ao órgão competente, útil em processos de sucessão e regularização patrimonial.',
    iconName: 'ScrollText',
    profiles: ['regularizar'],
    pricingType: 'fixo',
    price: 190,
    priceLabel: 'R$ 190,00',
    deadline: '5 a 10 dias úteis',
    inSimulator: true,
    methodology: [
      'Solicitação junto ao órgão competente',
      'Acompanhamento da emissão',
      'Entrega organizada no seu painel',
    ],
    benefits: [
      'Documento essencial para processos de sucessão',
      'Solicitação conduzida pela Velkor',
      'Entrega digital organizada',
    ],
    features: ['Solicitação junto ao órgão competente', 'Acompanhamento', 'Entrega digital'],
  },
  {
    code: 'VLK16',
    id: 'baixa-de-hipoteca-ou-alienacao-fiduciaria',
    name: 'Baixa de hipoteca ou alienação fiduciária',
    family: 'Pós-compra',
    shortDescription: 'Acompanhamento da baixa de gravame após a quitação do financiamento.',
    fullDescription:
      'Organização documental e acompanhamento administrativo da baixa de hipoteca ou alienação fiduciária após a quitação, junto à instituição financeira e ao Registro de Imóveis.',
    iconName: 'Lock',
    profiles: ['vender', 'regularizar'],
    pricingType: 'sob-consulta',
    price: null,
    priceLabel: 'Sob consulta',
    deadline: 'Conforme análise do caso',
    inSimulator: false,
    methodology: [
      'Confirmação da quitação junto à instituição financeira',
      'Organização do termo de quitação e demais documentos',
      'Protocolo da baixa no Registro de Imóveis',
    ],
    benefits: [
      'Matrícula livre de gravame após a quitação',
      'Acompanhamento junto ao banco e ao cartório',
      'Documentação organizada para o protocolo',
    ],
    features: ['Confirmação de quitação', 'Organização documental', 'Protocolo de baixa'],
  },
  {
    code: 'VLK17',
    id: 'triagem-documental-pre-lance-de-leilao',
    name: 'Triagem documental pré-lance de leilão',
    family: 'Leilões',
    shortDescription: 'Análise administrativa do edital antes de dar um lance em leilão.',
    fullDescription:
      'Levantamento de matrícula, ônus e débitos vinculados ao imóvel do edital, para apoiar a decisão antes de participar do leilão.',
    iconName: 'Gavel',
    profiles: ['arrematar'],
    pricingType: 'fixo',
    price: 890,
    priceLabel: 'R$ 890,00',
    deadline: '3 a 7 dias úteis',
    inSimulator: true,
    methodology: [
      'Levantamento da matrícula do imóvel em edital',
      'Verificação de ônus e débitos vinculados (IPTU, condomínio)',
      'Relatório de pontos de atenção antes do lance',
    ],
    benefits: [
      'Decisão mais segura sobre participar ou não do leilão',
      'Identificação antecipada de débitos vinculados',
      'Relatório entregue antes da data do leilão',
    ],
    features: ['Levantamento de matrícula', 'Verificação de débitos', 'Relatório pré-lance'],
  },
  {
    code: 'VLK18',
    id: 'dossie-documental-pos-arrematacao',
    name: 'Dossiê documental pós-arrematação',
    family: 'Leilões',
    shortDescription: 'Organização documental após a arrematação em leilão.',
    fullDescription:
      'Organização da documentação necessária após a arrematação (carta de arrematação, guias, certidões) e acompanhamento administrativo até o registro.',
    iconName: 'FileArchive',
    profiles: ['arrematar'],
    pricingType: 'fixo',
    price: 1290,
    priceLabel: 'R$ 1.290,00',
    deadline: '15 a 30 dias úteis',
    inSimulator: true,
    methodology: [
      'Organização da carta de arrematação e documentos correlatos',
      'Levantamento de guias e certidões necessárias',
      'Acompanhamento administrativo até o registro',
    ],
    benefits: [
      'Documentação organizada logo após a arrematação',
      'Acompanhamento até o registro do bem',
      'Menos risco de perder prazos pós-leilão',
    ],
    features: ['Organização pós-arrematação', 'Levantamento de guias e certidões', 'Acompanhamento até o registro'],
  },
  {
    code: 'VLK19',
    id: 'regularizacao-documental-urbana',
    name: 'Regularização documental urbana',
    family: 'Regularização',
    shortDescription: 'Organização documental para regularização de imóveis urbanos.',
    fullDescription:
      'Organização documental para regularização de construções e usos urbanos (averbação, habite-se, CND de obra, entre outros), conforme os requisitos do caso.',
    iconName: 'CheckSquare',
    profiles: ['regularizar'],
    pricingType: 'sob-consulta',
    price: null,
    priceLabel: 'Sob consulta',
    deadline: 'Conforme análise do caso',
    inSimulator: false,
    methodology: [
      'Diagnóstico da pendência de regularização',
      'Levantamento dos requisitos junto à prefeitura',
      'Organização documental e acompanhamento do protocolo',
    ],
    benefits: [
      'Plano claro do que precisa ser regularizado',
      'Acompanhamento junto à prefeitura',
      'Documentação organizada para cada etapa',
    ],
    features: ['Diagnóstico da pendência', 'Levantamento de requisitos', 'Acompanhamento do protocolo'],
  },
  {
    code: 'VLK20',
    id: 'documentacao-e-regularizacao-rural',
    name: 'Documentação e regularização rural',
    family: 'Regularização rural',
    shortDescription: 'Organização documental para regularização de imóveis rurais.',
    fullDescription:
      'Organização documental para regularização de imóveis rurais (CCIR, CAR, ITR, georreferenciamento, entre outros), conforme os requisitos do caso e, quando necessário, com apoio de parceiro técnico.',
    iconName: 'Sprout',
    profiles: ['regularizar'],
    pricingType: 'sob-consulta',
    price: null,
    priceLabel: 'Sob consulta',
    deadline: 'Conforme análise do caso',
    inSimulator: false,
    methodology: [
      'Diagnóstico da situação documental do imóvel rural',
      'Levantamento dos requisitos junto aos órgãos competentes',
      'Organização documental e acompanhamento do processo',
    ],
    benefits: [
      'Plano claro do que precisa ser regularizado',
      'Acompanhamento junto aos órgãos rurais competentes',
      'Apoio de parceiro técnico quando exigido pelo caso',
    ],
    features: ['Diagnóstico rural', 'Levantamento de requisitos', 'Acompanhamento do processo'],
  },
  {
    code: 'VLK21',
    id: 'certificado-digital',
    name: 'Certificado digital',
    family: 'Soluções digitais',
    shortDescription: 'Apoio na emissão do certificado digital necessário para assinaturas.',
    fullDescription:
      'Orientação e apoio administrativo na emissão do certificado digital junto a uma certificadora credenciada, usado para assinar documentos e acessar serviços eletrônicos.',
    iconName: 'KeyRound',
    profiles: ['comprar', 'vender', 'alugar', 'regularizar'],
    pricingType: 'fixo',
    price: 180,
    priceLabel: 'R$ 180,00',
    deadline: '2 a 5 dias úteis',
    inSimulator: true,
    methodology: [
      'Orientação sobre o tipo de certificado necessário',
      'Agendamento junto à certificadora credenciada',
      'Acompanhamento até a emissão',
    ],
    benefits: [
      'Processo orientado do início ao fim',
      'Certificado pronto para assinatura de documentos',
      'Menos dúvida sobre qual certificado escolher',
    ],
    features: ['Orientação sobre o tipo de certificado', 'Agendamento com certificadora', 'Acompanhamento da emissão'],
  },
  {
    code: 'VLK22',
    id: 'gestao-documental-para-empresas',
    name: 'Gestão documental para empresas',
    family: 'Velkor Corporate',
    shortDescription: 'Gestão documental de carteira de imóveis para empresas e incorporadoras.',
    fullDescription:
      'Gestão documental contínua da carteira de imóveis de construtoras, incorporadoras e holdings, com escopo e condições definidos conforme o volume e a complexidade da carteira.',
    iconName: 'Building',
    profiles: [],
    pricingType: 'sob-consulta',
    price: null,
    priceLabel: 'Sob consulta',
    deadline: 'Conforme análise do caso',
    inSimulator: false,
    methodology: [
      'Diagnóstico da carteira de imóveis da empresa',
      'Definição do escopo e das condições de atendimento',
      'Gestão documental contínua da carteira',
    ],
    benefits: [
      'Ponto único de gestão documental da carteira',
      'Escopo dimensionado para o volume da empresa',
      'Relatórios periódicos de acompanhamento',
    ],
    features: ['Diagnóstico de carteira', 'Escopo sob medida', 'Gestão contínua'],
  },
]

export function getServiceByCode(code: string): CatalogService | undefined {
  return SERVICE_CATALOG.find((s) => s.code === code)
}

export function getServiceById(id: string): CatalogService | undefined {
  return SERVICE_CATALOG.find((s) => s.id === id)
}

export const SERVICE_FILTERS: { label: string; value: ServiceProfile | 'sob-consulta' | 'todas' }[] = [
  { label: 'Todas as soluções', value: 'todas' },
  { label: 'Comprar', value: 'comprar' },
  { label: 'Vender', value: 'vender' },
  { label: 'Alugar', value: 'alugar' },
  { label: 'Arrematar', value: 'arrematar' },
  { label: 'Regularizar', value: 'regularizar' },
  { label: 'Sob consulta', value: 'sob-consulta' },
]

export function filterServices(
  filter: ServiceProfile | 'sob-consulta' | 'todas',
): CatalogService[] {
  if (filter === 'todas') return SERVICE_CATALOG
  if (filter === 'sob-consulta') return SERVICE_CATALOG.filter((s) => s.pricingType === 'sob-consulta')
  return SERVICE_CATALOG.filter((s) => s.profiles.includes(filter))
}

/**
 * Desconto progressivo por quantidade de serviços com preço fixo
 * selecionados no simulador. VLK01 (gratuito) e serviços "sob consulta"
 * nunca entram nesta contagem.
 */
export const DISCOUNT_TIERS: { min: number; max: number; percent: number }[] = [
  { min: 2, max: 2, percent: 3 },
  { min: 3, max: 3, percent: 5 },
  { min: 4, max: 4, percent: 7 },
  { min: 5, max: 5, percent: 10 },
  { min: 6, max: 6, percent: 15 },
  { min: 7, max: Infinity, percent: 20 },
]

export function getDiscountPercent(eligibleCount: number): number {
  const tier = DISCOUNT_TIERS.find((t) => eligibleCount >= t.min && eligibleCount <= t.max)
  return tier ? tier.percent : 0
}

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
