import type { Metadata } from 'next'
import { LegalLayout } from '@/components/legal/LegalLayout'

export const metadata: Metadata = {
  title: 'Política de Privacidade (rascunho) — Velkor Soluções Imobiliárias',
  robots: { index: false, follow: false },
}

export default function PoliticaDePrivacidadePage() {
  return (
    <LegalLayout titulo="Política de Privacidade" atualizadoEm="30 de agosto de 2026">
      <p>
        Esta Política de Privacidade descreve como a <strong>Velkor Soluções Imobiliárias</strong>{' '}
        (&quot;Velkor&quot;, &quot;nós&quot;) coleta, usa, armazena e protege os dados pessoais de
        quem visita o site, faz o diagnóstico, contrata um serviço ou acessa a área do cliente,
        em conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais — LGPD).
      </p>

      <h2>1. Quem é o controlador dos dados</h2>
      <p>
        <strong>Velkor Soluções Imobiliárias</strong>, <mark>empresa em constituição — CNPJ a
        definir</mark>, com sede em <mark>endereço a definir</mark>, Taubaté/SP. Contato:{' '}
        <a href="mailto:contato@velkor.com.br" className="text-teal-action underline">
          contato@velkor.com.br
        </a>
        .
      </p>
      <p>
        <mark>
          A definir: nome e contato direto do encarregado pelo tratamento de dados (DPO), conforme
          art. 41 da LGPD.
        </mark>{' '}
        Até lá, qualquer solicitação relativa a esta política pode ser feita pelo e-mail acima.
      </p>

      <h2>2. Quais dados coletamos</h2>
      <ul>
        <li>
          <strong>E-mail</strong>, para criar e autenticar sua conta na área do cliente ou no
          painel administrativo (login por código de acesso, sem senha).
        </li>
        <li>
          <strong>Respostas do diagnóstico</strong> (perfil informado, situação documental, próximo
          passo escolhido). Hoje essas respostas existem apenas na memória do seu navegador
          durante a sessão — não são enviadas nem armazenadas em nosso banco de dados, e são
          perdidas ao atualizar a página.
        </li>
        <li>
          <strong>Documentos que você envia pelo painel</strong> (certidões, comprovantes e
          arquivos correlatos), armazenados em um espaço próprio e restrito, associado à sua conta
          e à operação correspondente. Esses arquivos podem conter dados pessoais e, dependendo do
          documento, dados sensíveis (ex.: CPF, RG, estado civil) — o envio depende do seu aceite
          explícito no momento do upload.
        </li>
        <li>
          <strong>Dados da operação contratada</strong>: nome da operação, serviços incluídos,
          progresso, pendências e histórico de eventos (quem fez o quê e quando, dentro da
          operação).
        </li>
        <li>
          <strong>Métricas de uso agregadas e anônimas</strong> (visitas à landing, início e
          conclusão do diagnóstico, montagem de pacote), sem qualquer identificador de usuário, IP
          ou cookie de rastreamento individual — usadas só para entender o funil de conversão do
          site.
        </li>
        <li>
          <strong>Sessão de autenticação</strong>, mantida no armazenamento local do seu navegador
          (localStorage) para que você não precise inserir o código de acesso a cada visita.
        </li>
      </ul>

      <h2>3. Para que usamos esses dados</h2>
      <ul>
        <li>Autenticar seu acesso e proteger sua conta contra acesso indevido.</li>
        <li>Executar o serviço que você contratou e manter você informado sobre o andamento.</li>
        <li>
          Conferir e processar os documentos que você envia, exclusivamente pela equipe responsável
          pela sua operação.
        </li>
        <li>Cumprir obrigações legais e regulatórias aplicáveis à nossa atividade.</li>
        <li>
          Entender, de forma agregada e anônima, em que etapa do site as pessoas mais desistem, para
          melhorar a experiência.
        </li>
      </ul>
      <p>
        As bases legais aplicadas são a execução de contrato ou de procedimentos preliminares a ele
        (art. 7º, V, LGPD), o consentimento explícito para envio de documentos (art. 7º, I) e, para
        as métricas agregadas e anônimas, o fato de não se tratarem de dados pessoais, já que não
        identificam nenhum indivíduo.
      </p>

      <h2>4. Com quem compartilhamos</h2>
      <p>
        Utilizamos a <strong>Supabase Inc.</strong> como operadora de dados: ela hospeda nosso banco
        de dados, autenticação e armazenamento de arquivos, com infraestrutura na região us-east-1
        (Estados Unidos). Isso caracteriza uma transferência internacional de dados, feita sob as
        salvaguardas contratuais e técnicas oferecidas por esse fornecedor.
      </p>
      <p>
        Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing. Quando um
        serviço exigir um profissional ou parceiro habilitado (ex.: cartório, engenheiro,
        certificadora digital), apenas os dados estritamente necessários para aquela etapa são
        compartilhados, e você é informado antes da execução.
      </p>

      <h2>5. Prazo de guarda e exclusão</h2>
      <p>
        <mark>
          A definir: prazo de retenção dos documentos enviados pelo cliente e dos dados da
          operação após a conclusão do serviço, incluindo o processo de exclusão a pedido do
          titular.
        </mark>{' '}
        Este texto será atualizado assim que o prazo for definido pela empresa, com apoio jurídico.
      </p>

      <h2>6. Seus direitos como titular de dados</h2>
      <p>Conforme o art. 18 da LGPD, você pode solicitar, a qualquer momento:</p>
      <ul>
        <li>Confirmação de que tratamos seus dados, e acesso a eles.</li>
        <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
        <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em excesso.</li>
        <li>Portabilidade dos dados a outro fornecedor de serviço.</li>
        <li>Eliminação dos dados tratados com base no seu consentimento.</li>
        <li>Informação sobre com quem compartilhamos seus dados.</li>
        <li>Revogação do consentimento dado para o envio de documentos.</li>
      </ul>
      <p>
        Para exercer qualquer um desses direitos, entre em contato pelo e-mail informado na seção 1.
      </p>

      <h2>7. Segurança</h2>
      <p>
        O acesso à sua conta é protegido por um código de acesso enviado ao seu e-mail, válido por
        tempo limitado. Os documentos que você envia ficam num espaço de armazenamento restrito,
        acessível apenas a você e à equipe responsável pela sua operação. Nenhum sistema é
        completamente livre de risco; caso identifique uma vulnerabilidade, avise-nos pelo e-mail
        de contato.
      </p>

      <h2>8. Kora (assistente de catálogo)</h2>
      <p>
        Quando disponível no site, a Kora não deve pedir nem receber documentos, número de
        matrícula, CPF, RG, endereço completo ou qualquer outro dado sensível — essas informações
        devem sempre ser enviadas pelo painel do cliente, nunca pelo chat.
      </p>

      <h2>9. Alterações desta política</h2>
      <p>
        Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A data
        no topo desta página indica a versão mais recente.
      </p>
    </LegalLayout>
  )
}
