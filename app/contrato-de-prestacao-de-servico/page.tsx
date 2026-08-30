import type { Metadata } from 'next'
import { LegalLayout } from '@/components/legal/LegalLayout'

export const metadata: Metadata = {
  title: 'Contrato de Prestação de Serviço (rascunho) — Velkor Soluções Imobiliárias',
  robots: { index: false, follow: false },
}

export default function ContratoDePrestacaoDeServicoPage() {
  return (
    <LegalLayout titulo="Contrato de Prestação de Serviço" atualizadoEm="30 de agosto de 2026">
      <p>
        Este documento estabelece as condições gerais aplicáveis a qualquer serviço contratado
        através do site da <strong>Velkor Soluções Imobiliárias</strong> (&quot;Velkor&quot;,
        &quot;Contratada&quot;) pelo cliente identificado no momento da contratação
        (&quot;Contratante&quot;). Ele é complementar aos{' '}
        <a href="/termos-de-uso" className="text-teal-action underline">
          Termos de Uso
        </a>{' '}
        e à{' '}
        <a href="/politica-de-privacidade" className="text-teal-action underline">
          Política de Privacidade
        </a>
        .
      </p>
      <p>
        <mark>
          A definir, com apoio jurídico: forma de aceite digital deste contrato no momento da
          contratação (ex.: checkbox com registro de data/hora e identificação do aceitante), hoje
          ainda não implementada no checkout do site.
        </mark>
      </p>

      <h2>1. Objeto</h2>
      <p>
        O objeto deste contrato é a prestação, pela Contratada, do(s) serviço(s) especificamente
        selecionado(s) pelo Contratante no catálogo oficial da Velkor no momento da contratação,
        com o escopo, prazo estimado e valor descritos naquele momento.
      </p>

      <h2>2. Obrigações da Contratada</h2>
      <ul>
        <li>
          Executar o serviço contratado conforme o escopo descrito no catálogo, com diligência e
          dentro do prazo estimado informado, ressalvadas as variações decorrentes de terceiros
          (cartórios, prefeituras, órgãos públicos e instituições financeiras).
        </li>
        <li>Manter o Contratante informado sobre o andamento da operação pelo painel do cliente.</li>
        <li>Registrar pendências, atribuindo claramente a responsabilidade a cada parte.</li>
        <li>Conferir os documentos enviados pelo Contratante e aprovar ou devolver com justificativa.</li>
        <li>Entregar o dossiê digital final ao término do serviço contratado.</li>
      </ul>

      <h2>3. Obrigações do Contratante</h2>
      <ul>
        <li>Fornecer, dentro do prazo informado, os documentos e informações necessários à execução do serviço.</li>
        <li>
          Pagar diretamente ao órgão ou instituição competente quaisquer taxas oficiais, custas de
          cartório, ITBI, emolumentos, guias, boletos ou custos de terceiros associados ao
          serviço — a Contratada nunca paga essas taxas em nome do Contratante.
        </li>
        <li>Enviar comprovantes de pagamento e demais documentos exclusivamente pelo painel do cliente.</li>
        <li>Manter atualizados seus dados de contato para recebimento de notificações.</li>
      </ul>

      <h2>4. Preço e forma de pagamento</h2>
      <p>
        O valor do serviço é o exibido no catálogo no momento da contratação, referente
        exclusivamente aos honorários da Velkor.{' '}
        <mark>
          A definir: forma de pagamento e gateway a ser integrado ao checkout (ainda não
          implementado), condições de parcelamento, emissão de recibo ou nota fiscal, e política de
          reembolso/cancelamento.
        </mark>
      </p>

      <h2>5. Prazo</h2>
      <p>
        O prazo estimado de execução é o informado no catálogo para o serviço contratado, contado
        a partir do recebimento de toda a documentação necessária do Contratante. Prazos que
        dependem de terceiros seguem o tempo próprio desses órgãos.
      </p>

      <h2>6. Rescisão</h2>
      <p>
        <mark>
          A definir, com apoio jurídico: condições de rescisão antecipada por qualquer das partes,
          reembolso proporcional quando aplicável, e tratamento de serviços de gestão recorrente
          (mensais) já iniciados.
        </mark>
      </p>

      <h2>7. Confidencialidade e proteção de dados</h2>
      <p>
        Os documentos e dados do Contratante são tratados conforme a{' '}
        <a href="/politica-de-privacidade" className="text-teal-action underline">
          Política de Privacidade
        </a>
        , com acesso restrito ao titular e à equipe responsável pela operação.
      </p>

      <h2>8. Disposições gerais</h2>
      <p>
        Este contrato é regido pelas leis brasileiras.{' '}
        <mark>A definir, com apoio jurídico: foro de eleição para dirimir controvérsias.</mark>
      </p>
    </LegalLayout>
  )
}
