// Fonte única de verdade do catálogo Velkor (VLK01–VLK22), diagnóstico e
// simulador de pacotes. Portado literalmente de design_handoff_velkor/data.md
// (extração do protótipo de alta fidelidade aprovado). Qualquer alteração de
// nome, preço, prazo ou regra deve ser feita aqui.

export type ServiceProfile = 'comprar' | 'vender' | 'alugar' | 'arrematar' | 'regularizar'

export interface CatalogService {
  id: string
  code: string
  familia: string
  nome: string
  desc: string
  inclui: string
  prazo: string
  perfis: ServiceProfile[]
  gratuito?: boolean
  consulta?: boolean
  mensal?: boolean
  preco?: number
  /** Rota da página de detalhe do serviço, quando existir (ex.: VLK04). */
  detalhe?: string
}

export const SERVICOS: CatalogService[] = [
  {
    id: 'vlk01',
    code: 'VLK01',
    familia: 'Diagnóstico',
    nome: 'Diagnóstico documental inicial',
    desc: 'Ponto de entrada gratuito: identifique seu perfil e o caminho documental recomendado.',
    inclui: 'Diagnóstico de 3 perguntas e recomendação de próximos passos',
    gratuito: true,
    prazo: 'Imediato',
    perfis: ['comprar', 'vender', 'alugar', 'arrematar', 'regularizar'],
  },
  {
    id: 'vlk02',
    code: 'VLK02',
    familia: 'Pesquisa documental',
    nome: 'Pesquisa prévia de imóveis',
    desc: 'Um primeiro mapa documental para orientar sua próxima decisão.',
    inclui: 'Levantamento inicial e lista de pendências encontradas',
    preco: 299,
    prazo: '3 a 7 dias úteis',
    perfis: ['comprar', 'regularizar'],
  },
  {
    id: 'vlk03',
    code: 'VLK03',
    familia: 'Pesquisa documental',
    nome: 'Certidão de matrícula e ônus',
    desc: 'Veja a situação registral do imóvel antes de avançar.',
    inclui: 'Matrícula atualizada e leitura dos ônus registrados',
    preco: 249,
    prazo: '2 a 5 dias úteis',
    perfis: ['comprar', 'regularizar'],
  },
  {
    id: 'vlk04',
    code: 'VLK04',
    familia: 'Pesquisa documental',
    nome: 'Dossiê de certidões',
    desc: 'Certidões do imóvel, comprador e vendedor organizadas.',
    inclui: 'Solicitação, conferência e organização das certidões',
    preco: 999,
    prazo: '7 a 15 dias úteis',
    perfis: ['comprar', 'vender', 'regularizar'],
    detalhe: '/servicos/dossie-de-certidoes',
  },
  {
    id: 'vlk05',
    code: 'VLK05',
    familia: 'Compra e venda',
    nome: 'ITBI: organização e acompanhamento',
    desc: 'Acompanhamento da guia e das etapas administrativas.',
    inclui: 'Emissão da guia, conferência do cálculo e controle do prazo',
    preco: 350,
    prazo: '3 a 10 dias úteis',
    perfis: ['comprar', 'regularizar'],
  },
  {
    id: 'vlk06',
    code: 'VLK06',
    familia: 'Compra e venda',
    nome: 'Escritura pública: organização documental',
    desc: 'Preparação e conferência dos documentos exigidos pelo tabelionato.',
    inclui: 'Checklist do tabelionato e organização das exigências',
    consulta: true,
    prazo: 'Definido na análise do caso',
    perfis: ['comprar', 'vender'],
  },
  {
    id: 'vlk07',
    code: 'VLK07',
    familia: 'Compra e venda',
    nome: 'Acompanhamento do registro do título',
    desc: 'Protocolo, acompanhamento e atualização do andamento.',
    inclui: 'Protocolo, acompanhamento de exigências e retorno no painel',
    preco: 699,
    prazo: 'Conforme prazo do cartório',
    perfis: ['comprar', 'vender', 'regularizar'],
  },
  {
    id: 'vlk08',
    code: 'VLK08',
    familia: 'Pós-compra',
    nome: 'Transferência de matrícula e titularidade',
    desc: 'Organização da transmissão de titularidade após o negócio concluído.',
    inclui: 'Leitura da matrícula, exigências do registro e acompanhamento',
    consulta: true,
    prazo: 'Definido na análise do caso',
    perfis: ['comprar', 'vender', 'regularizar'],
  },
  {
    id: 'vlk09',
    code: 'VLK09',
    familia: 'Pós-compra',
    nome: 'Atualização de IPTU e condomínio',
    desc: 'Organização das solicitações, boletos, taxas e comprovantes.',
    inclui: 'Solicitação de transferência e controle dos comprovantes',
    preco: 490,
    prazo: '10 a 20 dias úteis',
    perfis: ['comprar', 'vender'],
  },
  {
    id: 'vlk10',
    code: 'VLK10',
    familia: 'Gestão recorrente',
    nome: 'Gestão mensal de obrigações',
    desc: 'Painel com IPTU, condomínio, seguros, guias, prazos e comprovantes.',
    inclui: 'Acompanhamento contínuo de prazos e comprovantes',
    preco: 390,
    prazo: 'Início imediato',
    perfis: ['alugar', 'vender', 'regularizar'],
    mensal: true,
  },
  {
    id: 'vlk11',
    code: 'VLK11',
    familia: 'Gestão recorrente',
    nome: 'Gestão de pagamentos e vencimentos',
    desc: 'Controle contínuo de guias, boletos, prazos e comprovantes.',
    inclui: 'Controle de vencimentos e conferência dos comprovantes',
    preco: 290,
    prazo: 'Início imediato',
    perfis: ['alugar', 'regularizar'],
    mensal: true,
  },
  {
    id: 'vlk12',
    code: 'VLK12',
    familia: 'Compra e venda',
    nome: 'Dossiê para financiamento',
    desc: 'Documentos conferidos e organizados para a instituição financeira.',
    inclui: 'Checklist do banco, conferência e dossiê final digital',
    preco: 1500,
    prazo: '10 a 20 dias úteis',
    perfis: ['comprar'],
  },
  {
    id: 'vlk13',
    code: 'VLK13',
    familia: 'Análise e riscos',
    nome: 'Conferência documental e relatório de riscos',
    desc: 'Relatório com risco baixo, médio ou alto e próximos passos.',
    inclui: 'Relatório de risco documental e recomendação de próximos passos',
    preco: 899,
    prazo: '5 a 12 dias úteis',
    perfis: ['comprar', 'vender', 'alugar', 'regularizar'],
  },
  {
    id: 'vlk14',
    code: 'VLK14',
    familia: 'Contratos',
    nome: 'Conferência administrativa de contratos',
    desc: 'Leitura administrativa de cláusulas, prazos, valores e anexos.',
    inclui: 'Conferência administrativa e lista de pontos de atenção',
    preco: 450,
    prazo: '3 a 7 dias úteis',
    perfis: ['alugar', 'comprar', 'vender'],
  },
  {
    id: 'vlk15',
    code: 'VLK15',
    familia: 'Pesquisa documental',
    nome: 'Certidão de testamento',
    desc: 'Consulta necessária em inventários, partilhas e transmissões por sucessão.',
    inclui: 'Solicitação na central de serviços e entrega da certidão',
    preco: 190,
    prazo: '5 a 10 dias úteis',
    perfis: ['comprar', 'vender', 'regularizar'],
  },
  {
    id: 'vlk16',
    code: 'VLK16',
    familia: 'Pós-compra',
    nome: 'Baixa de hipoteca ou alienação fiduciária',
    desc: 'Organização documental para liberar o gravame na matrícula.',
    inclui: 'Exigências do credor, protocolo da averbação e acompanhamento',
    consulta: true,
    prazo: 'Definido na análise do caso',
    perfis: ['vender', 'regularizar'],
  },
  {
    id: 'vlk17',
    code: 'VLK17',
    familia: 'Leilões',
    nome: 'Triagem documental pré-lance de leilão',
    desc: 'Edital, matrícula, ocupação e custos para decidir com clareza.',
    inclui: 'Leitura do edital, matrícula, ocupação e estimativa de custos',
    preco: 890,
    prazo: '3 a 7 dias úteis',
    perfis: ['comprar', 'arrematar'],
  },
  {
    id: 'vlk18',
    code: 'VLK18',
    familia: 'Leilões',
    nome: 'Dossiê documental pós-arrematação',
    desc: 'Organização das etapas documentais depois do lance vencedor.',
    inclui: 'Mapa de etapas, exigências, prazos e dossiê final',
    preco: 1290,
    prazo: '15 a 30 dias úteis',
    perfis: ['comprar', 'regularizar', 'arrematar'],
  },
  {
    id: 'vlk19',
    code: 'VLK19',
    familia: 'Regularização',
    nome: 'Regularização documental urbana',
    desc: 'Diagnóstico e condução das providências para regularizar o imóvel.',
    inclui: 'Diagnóstico e condução documental; projeto técnico à parte',
    consulta: true,
    prazo: 'Definido na análise do caso',
    perfis: ['regularizar'],
  },
  {
    id: 'vlk20',
    code: 'VLK20',
    familia: 'Regularização rural',
    nome: 'Documentação e regularização rural',
    desc: 'Documentação específica de imóveis rurais e seus cadastros.',
    inclui: 'Levantamento cadastral e condução documental',
    consulta: true,
    prazo: 'Definido na análise do caso',
    perfis: ['regularizar'],
  },
  {
    id: 'vlk21',
    code: 'VLK21',
    familia: 'Soluções digitais',
    nome: 'Certificado digital',
    desc: 'Apoio na obtenção do certificado usado em atos e assinaturas digitais.',
    inclui: 'Orientação e acompanhamento da emissão; custo da certificadora à parte',
    preco: 180,
    prazo: '2 a 5 dias úteis',
    perfis: ['comprar', 'vender', 'alugar', 'regularizar'],
  },
  {
    id: 'vlk22',
    code: 'VLK22',
    familia: 'Velkor Corporate',
    nome: 'Gestão documental para empresas',
    desc: 'Carteira imobiliária monitorada com relatórios, alertas e permissões.',
    inclui: 'Escopo, usuários e periodicidade definidos na proposta',
    consulta: true,
    mensal: true,
    prazo: 'Definido na proposta',
    perfis: ['regularizar', 'alugar', 'vender'],
  },
]

export interface CatalogFilter {
  key: 'todos' | ServiceProfile | 'consulta'
  label: string
}

export const FILTROS: CatalogFilter[] = [
  { key: 'todos', label: 'Todas as soluções' },
  { key: 'comprar', label: 'Comprar' },
  { key: 'vender', label: 'Vender' },
  { key: 'alugar', label: 'Alugar' },
  { key: 'arrematar', label: 'Arrematar' },
  { key: 'regularizar', label: 'Regularizar' },
  { key: 'consulta', label: 'Sob consulta' },
]

export function filterServicos(filter: CatalogFilter['key']): CatalogService[] {
  if (filter === 'todos') return SERVICOS
  if (filter === 'consulta') return SERVICOS.filter((s) => s.consulta)
  return SERVICOS.filter((s) => s.perfis.includes(filter))
}

export function getServicoById(id: string): CatalogService | undefined {
  return SERVICOS.find((s) => s.id === id)
}

// ---------------------------------------------------------------------------
// Diagnóstico (3 perguntas)
// ---------------------------------------------------------------------------

export interface DiagnosticoOpcao {
  label: string
  v: string
}

export interface DiagnosticoPergunta {
  q: string
  opcoes: DiagnosticoOpcao[]
}

export const PERGUNTAS: DiagnosticoPergunta[] = [
  {
    q: 'Você quer comprar, vender, alugar, arrematar ou regularizar um imóvel?',
    opcoes: [
      { label: 'Comprar', v: 'comprar' },
      { label: 'Vender', v: 'vender' },
      { label: 'Alugar', v: 'alugar' },
      { label: 'Arrematar', v: 'arrematar' },
      { label: 'Regularizar', v: 'regularizar' },
    ],
  },
  {
    q: 'Você já possui a matrícula e os documentos principais?',
    opcoes: [
      { label: 'Sim, tenho tudo em mãos', v: 'tudo' },
      { label: 'Tenho parte dos documentos', v: 'parte' },
      { label: 'Não tenho nenhum', v: 'nada' },
      { label: 'Não sei dizer', v: 'duvida' },
    ],
  },
  {
    q: 'Qual é o seu próximo passo ideal?',
    opcoes: [
      { label: 'Saber se posso avançar com segurança', v: 'avancar' },
      { label: 'Organizar certidões e prazos', v: 'organizar' },
      { label: 'Contratar e acompanhar a operação', v: 'contratar' },
      { label: 'Entender os custos envolvidos', v: 'custos' },
    ],
  },
]

export const PERFIS: Record<ServiceProfile, { titulo: string; resumo: string }> = {
  comprar: {
    titulo: 'Perfil: comprador',
    resumo:
      'Sua prioridade é confirmar se a documentação do imóvel e das partes permite avançar sem risco.',
  },
  vender: {
    titulo: 'Perfil: vendedor',
    resumo:
      'Sua prioridade é deixar certidões, matrícula e pendências prontas para não travar a negociação.',
  },
  alugar: {
    titulo: 'Perfil: locação',
    resumo:
      'Sua prioridade é contrato, dossiê, garantias e a gestão contínua das obrigações do imóvel.',
  },
  regularizar: {
    titulo: 'Perfil: regularização',
    resumo: 'Sua prioridade é mapear a situação atual do imóvel e definir a ordem das providências.',
  },
  arrematar: {
    titulo: 'Perfil: arrematação',
    resumo:
      'Sua prioridade é analisar o edital e a matrícula antes do lance, e organizar a documentação depois de arrematar.',
  },
}

export const PASSOS: Record<string, string> = {
  avancar: 'Começar pela pesquisa documental do imóvel e pela análise de risco antes de assumir compromisso.',
  organizar: 'Começar pelo dossiê de certidões, com controle de validade e prazos no painel.',
  contratar: 'Montar o pacote com os serviços da sua etapa e abrir o processo no painel.',
  custos: 'Montar o pacote no simulador para ver o valor dos serviços Velkor antes de decidir.',
}

// ---------------------------------------------------------------------------
// Simulador de pacotes — desconto progressivo
// ---------------------------------------------------------------------------

export const FAIXAS: [number, number][] = [
  [2, 3],
  [3, 5],
  [4, 7],
  [5, 10],
  [6, 15],
  [7, 20],
]

/** Percentual de desconto para N serviços elegíveis selecionados (gratuitos e sob consulta nunca contam). */
export function pctDesconto(n: number): number {
  let p = 0
  for (const [q, v] of FAIXAS) if (n >= q) p = v
  return p
}

export function brl(v: number): string {
  const [i, d] = v.toFixed(2).split('.')
  return 'R$ ' + i.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + d
}

/** Rótulo de preço pronto para exibição. */
export function precoLabel(s: CatalogService): string {
  if (s.gratuito) return 'Gratuito'
  if (s.consulta) return 'Sob consulta'
  if (s.preco === undefined) return 'Sob consulta'
  return brl(s.preco) + (s.mensal ? '/mês' : '')
}

/** Um serviço entra no cálculo de desconto do simulador apenas se tiver preço fixo (não gratuito, não sob consulta). */
export function isElegivelParaDesconto(s: CatalogService): boolean {
  return !s.gratuito && !s.consulta && typeof s.preco === 'number'
}
