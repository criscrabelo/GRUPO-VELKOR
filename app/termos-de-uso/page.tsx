import type { Metadata } from 'next'
import { LegalLayout } from '@/components/legal/LegalLayout'

export const metadata: Metadata = {
  title: 'Termos de Uso (rascunho) — Velkor Soluções Imobiliárias',
  robots: { index: false, follow: false },
}

export default function TermosDeUsoPage() {
  return (
    <LegalLayout titulo="Termos de Uso" atualizadoEm="30 de agosto de 2026">
      <p>
        Estes Termos de Uso regulam o acesso e uso do site e da área do cliente da{' '}
        <strong>Velkor Soluções Imobiliárias</strong> (&quot;Velkor&quot;). Ao usar o site, fazer o
        diagnóstico ou acessar a área do cliente, você concorda com estes termos.
      </p>

      <h2>1. O que a Velkor é e não é</h2>
      <p>
        A Velkor presta serviços de pesquisa, conferência e organização documental de imóveis e das
        partes envolvidas, gestão administrativa de prazos, guias, boletos e comprovantes, e
        acompanhamento administrativo junto a cartórios e órgãos públicos.
      </p>
      <p>A Velkor não presta e não substitui:</p>
      <ul>
        <li>Parecer jurídico, peça processual ou representação legal.</li>
        <li>Corretagem imobiliária, laudo de engenharia ou de arquitetura.</li>
        <li>Pagamento de guias, taxas ou boletos em nome do cliente — o pagamento é sempre feito pelo cliente, diretamente ao órgão competente.</li>
        <li>Dispensa de qualquer exigência de cartórios ou órgãos públicos.</li>
      </ul>
      <p>
        Quando um serviço exigir um ato privativo de profissional habilitado, ele será executado
        por profissional ou parceiro técnico, informado ao cliente antes da execução.
      </p>

      <h2>2. Diagnóstico gratuito</h2>
      <p>
        O diagnóstico de três perguntas é uma orientação inicial gratuita, não constitui orçamento
        fechado nem parecer sobre o seu caso, e não substitui a conferência documental contratada.
      </p>

      <h2>3. Catálogo e preços</h2>
      <p>
        Os serviços, preços e prazos exibidos no site referem-se exclusivamente aos honorários e à
        execução da Velkor. Taxas oficiais, custas de cartório, ITBI, emolumentos, guias, boletos e
        custos de certificadora não estão incluídos e são pagos pelo cliente diretamente ao órgão
        competente. Serviços marcados como &quot;sob consulta&quot; dependem de análise do caso e
        não têm valor fixo publicado.
      </p>
      <p>
        Prazos estimados podem variar conforme etapas que dependem de cartórios, prefeituras,
        órgãos públicos ou instituições financeiras, cujo tempo de resposta não está sob o
        controle da Velkor.
      </p>

      <h2>4. Cadastro e acesso</h2>
      <p>
        O acesso à área do cliente e ao painel administrativo é feito por e-mail e um código de
        acesso de uso único, válido por tempo limitado. Você é responsável por manter o acesso ao
        seu e-mail seguro e por não compartilhar o código recebido com terceiros.
      </p>

      <h2>5. Envio de documentos</h2>
      <p>
        Documentos e dados sensíveis devem ser enviados exclusivamente pelo painel do cliente,
        nunca por WhatsApp, e-mail ou pela Kora. O envio de cada documento exige seu aceite
        explícito quanto ao tratamento daquele arquivo, conforme detalhado na{' '}
        <a href="/politica-de-privacidade" className="text-teal-action underline">
          Política de Privacidade
        </a>
        .
      </p>

      <h2>6. Limitação de responsabilidade</h2>
      <p>
        A Velkor não garante prazo de conclusão de atos praticados por cartórios, prefeituras,
        órgãos públicos ou instituições financeiras, nem o resultado de análises feitas por esses
        órgãos. A Velkor também não se responsabiliza por informações incorretas ou incompletas
        fornecidas pelo cliente, nem por atrasos decorrentes de pendências não resolvidas pelo
        cliente dentro do prazo informado.
      </p>

      <h2>7. Propriedade intelectual</h2>
      <p>
        O conteúdo do site, marca, logotipo e materiais são de propriedade da Velkor e não podem
        ser reproduzidos sem autorização prévia.
      </p>

      <h2>8. Alterações destes termos</h2>
      <p>
        Estes termos podem ser atualizados a qualquer momento. A data no topo desta página indica
        a versão mais recente.
      </p>

      <h2>9. Foro</h2>
      <p>
        <mark>A definir, com apoio jurídico: comarca de foro para resolução de eventuais
        controvérsias (recomenda-se o foro do domicílio do consumidor, conforme o Código de Defesa
        do Consumidor, quando aplicável).</mark>
      </p>
    </LegalLayout>
  )
}
