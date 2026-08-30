# Velkor Soluções Imobiliárias — Documentação Técnica e Funcional

**Versão:** 30 de agosto de 2026
**Repositório:** `criscrabelo/GRUPO-VELKOR` · branch de desenvolvimento `claude/velkor-solucoes-audit-p9t25e`
**Estado geral:** plataforma parcialmente funcional. Tudo que está implementado é real (banco, autenticação, upload, permissões); tudo que ainda não existe está marcado como pendente — nada é simulado ou fingido.

---

## 1. Visão geral

Site e plataforma da Velkor Soluções Imobiliárias: documentação imobiliária organizada, acompanhada, sem burocracia e 100% digital. O projeto foi **reconstruído do zero** em Next.js a partir do protótipo aprovado no Claude Design (`design_handoff_velkor/`), substituindo integralmente o app Vite/Skip anterior, que tinha três catálogos de preço divergentes, prova social fictícia e credencial de admin no código-fonte.

### Proposta central (preservada em todo o site)

> "Documentação imobiliária organizada, acompanhada, sem burocracia e 100% digital."

### Benefício (preservado)

> "Mais clareza, menos deslocamentos e acompanhamento de cada etapa em um só lugar."

---

## 2. Stack técnica

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 15.5.24 (App Router), React 19, TypeScript |
| Estilo | Tailwind CSS 3.4 com tokens de design do handoff |
| Tipografia | Source Serif 4 (títulos) + Libre Franklin (texto), via `next/font` |
| Banco / Auth / Storage | Supabase — projeto `dbsxznwcnibdwxmvjghb`, região `us-east-1` (EUA) |
| Testes | Vitest (unitários) + Playwright (end-to-end) |
| CI | GitHub Actions (`.github/workflows/ci.yml`) |

### Tokens de design (tailwind.config.ts)

Paleta extraída do logotipo oficial, conforme o handoff: teal institucional `#144C55`, teal profundo `#0F3A42`, teal de ação `#14646F`, ciano de marca `#2FB6DC`, ciano claro `#9DE5F8`, fundo `#F6FAFA`, bordas `#E4EDEE`, textos `#10282D`/`#4E6A6F`/`#5C7A80`, sucesso `#0E6C5F`, atenção `#8A5A0C`/`#FFFBF3`/`#F0E2C6`. Breakpoints do design: nav vira hambúrguer abaixo de **1080px** (`nav:`), grids empilham abaixo de **940px** (`grid-stack:`). Foco visível global: outline 3px ciano.

### Marca

- `public/brand/velkor-logo.png` — logotipo oficial (1230×350, fundo transparente). **Sempre altura fixa + largura automática; nunca esticar** (componente `VelkorLogo`).
- `public/brand/kora-avatar.png` — avatar da Kora (440×440), reservado para quando a Kora for implementada.
- `public/favicon.ico` — símbolo "V" recortado do logotipo oficial (16/32/48px).
- `public/og-image.png` — cartão de compartilhamento 1200×630 (logo branco sobre teal + tagline), referenciado em `og:image`/`twitter:image`.

---

## 3. Rotas

| Rota | O quê | Acesso |
|---|---|---|
| `/` | Landing completa: hero, diagnóstico, por que a Velkor, como funciona, soluções (catálogo com filtros), simulador de pacote, limites/FAQ, contato, rodapé | Pública |
| `/cliente` | Área do cliente: login por e-mail + código, visão geral com KPIs e lista de operações | Sessão de cliente |
| `/cliente/operacoes/[id]` | Detalhe da operação: pendências (com você / com a Velkor), envio de documento, histórico, vencimentos | Sessão + RLS (só a própria operação) |
| `/cliente/dossie` | Dossiê digital: tabela de documentos com download real (link temporário de 60s) | Sessão + RLS |
| `/admin` | Painel administrativo: KPIs, abas Operações / Clientes / Funil, aprovar/devolver pendências | Sessão + registro ativo em `equipe_velkor` |
| `/politica-de-privacidade` | **Rascunho** de Política de Privacidade | Pública (noindex, não linkada) |
| `/termos-de-uso` | **Rascunho** de Termos de Uso | Pública (noindex, não linkada) |
| `/contrato-de-prestacao-de-servico` | **Rascunho** de contrato | Pública (noindex, não linkada) |

As três páginas legais têm banner fixo "Rascunho — pendente de revisão jurídica" e **não estão linkadas no rodapé** (que mostra "em preparação") de propósito, até um advogado revisar. Toda lacuna que exige decisão jurídica/de negócio está destacada em `<mark>` âmbar dentro do texto.

---

## 4. Catálogo oficial VLK01–VLK22

**Fonte única de verdade: `lib/catalog.ts`** — portado literalmente do `data.md` do handoff. Landing, simulador e (futuramente) checkout e Kora consomem este arquivo. Alterar preço/prazo/nome aqui atualiza tudo.

### Regras de negócio implementadas e testadas

- **VLK01** (Diagnóstico documental inicial): gratuito, nunca entra no simulador nem no desconto. CTA "Começar diagnóstico".
- **Sob consulta** (fora do simulador e do desconto, CTA "Pedir orçamento"): **VLK06, VLK08, VLK16, VLK19, VLK20, VLK22**.
- **Mensais**: VLK10 (R$ 390,00/mês) e VLK11 (R$ 290,00/mês) — exibidos com "/mês".
- **Desconto progressivo** (só sobre serviços de preço fixo/mensal): 2 → 3% · 3 → 5% · 4 → 7% · 5 → 10% · 6 → 15% · 7+ → 20%.
- Nota em Soluções, no simulador e no rodapé: taxas oficiais, custas de cartório, ITBI, emolumentos, guias e boletos de terceiros **não** estão inclusos e são pagos pelo cliente diretamente ao órgão.
- Filtros: Todas · Comprar · Vender · Alugar · Arrematar · Regularizar · Sob consulta.

### Diagnóstico (3 perguntas)

Perguntas, perfis (comprador/vendedor/locação/regularização/arrematação) e próximos passos vêm de `PERGUNTAS`/`PERFIS`/`PASSOS` em `lib/catalog.ts`, idênticos ao handoff. "Ver meu caminho recomendado" aplica o filtro do perfil na seção Soluções. Aviso exibido: orientação inicial e gratuita, não substitui a conferência contratada. As respostas **não são persistidas** — existem só na memória do navegador.

---

## 5. Banco de dados (Supabase)

Projeto: `dbsxznwcnibdwxmvjghb` (organização criscrabelo's Org, região us-east-1). Todas as tabelas com **RLS habilitada**. Migrações aplicadas via MCP (nomes abaixo em ordem).

### Tabelas

| Tabela | Conteúdo | Quem lê | Quem escreve |
|---|---|---|---|
| `operacoes` | Operação do cliente: nome, família, serviços, progresso %, responsável, valor, e-mail do cliente (denormalizado) | Cliente (as próprias) · Equipe (todas) | Equipe (update) |
| `pendencias` | Pendência da operação: nome, nota, responsável (`cliente`/`velkor`), status (`aberta`/`em_conferencia`/`resolvida`/`devolvida`) | Cliente (as próprias) · Equipe | Cliente (só aberta/devolvida → em_conferencia, nas próprias) · Equipe (aprovar/devolver) |
| `documentos` | Documento: nome, origem (`velkor`/`cliente`), status, caminho no Storage | Cliente (os próprios) · Equipe | Cliente (insert: só na própria operação, origem `cliente`, status `em_conferencia`) |
| `historico_eventos` | Linha do tempo da operação (título, autor, data) | Cliente (o próprio) · Equipe | Cliente (insert: só autor `Cliente`, própria operação) · Equipe (insert) |
| `vencimentos` | Vencimentos da operação (nome, responsável, data, urgente) | Cliente (os próprios) · Equipe | — (admin ainda não cria; pendente) |
| `equipe_velkor` | Papéis da equipe: `admin`/`operador`/`leitura`, ativo | Cada um o próprio registro | — (só via SQL/dashboard por ora) |
| `eventos_funil` | Funil anônimo: `visita`/`diagnostico_iniciado`/`diagnostico_concluido`/`pacote_montado` — **sem user id, IP ou cookie** | Equipe | Qualquer visitante (insert) |

### Funções

`is_staff()` e `staff_role()` — `security definer`, usadas dentro das políticas de RLS; `EXECUTE` revogado de `anon` e `PUBLIC` (apenas `authenticated`). Advisor de segurança do Supabase: sem achados além dos dois avisos intencionais sobre essas funções.

### Storage

Bucket privado **`documentos-clientes`**: limite 10 MB por arquivo, tipos `application/pdf`, `image/jpeg`, `image/png` (bloqueio no servidor, não só no frontend). Caminho: `{user_id}/{operacao_id}/{timestamp}-{nome}`. Políticas em `storage.objects`: cada cliente só insere/lê dentro da própria pasta. Download via `createSignedUrl` (60 segundos).

### Regras derivadas (nunca campos)

- **Etiqueta da operação para o cliente** (`tagOperacao`): Concluída (nenhuma pendência não-resolvida) · Aguardando você (pendência do cliente aberta/devolvida) · Em andamento.
- **Situação no admin** (`tagOperacaoAdmin`): Concluída · Conferir envio (algo em conferência) · Travada com o cliente · Em andamento. "Fora do prazo" **não existe ainda** — depende de tabela de SLA por serviço, não implementada (o filtro aparece desabilitado com nota no admin).

### Segurança validada por teste direto no banco (transação com rollback)

- Fluxo completo de upload do cliente passa (insert documento + pendência → em_conferencia + histórico).
- Cliente **não** consegue marcar pendência como `resolvida` (erro 42501).
- Cliente A **não** consegue anexar documento na operação do cliente B (erro 42501).

---

## 6. Autenticação e papéis

- **Login sem senha** (cliente e equipe): e-mail → código de 6 dígitos (Supabase Auth OTP). Limite de 5 tentativas de código; cooldown de 60s para reenvio; "usar outro e-mail". Código incorreto é rejeitado de verdade.
- **Autorização do admin é por papel, não por login separado**: quem loga em `/admin` sem registro ativo em `equipe_velkor` vê "Acesso restrito" e nenhum dado.
- Sessão persistida em `localStorage` (auto-refresh de token).

### ⚠️ Configuração manual pendente no Supabase Dashboard

1. **Template de e-mail**: Authentication → Email Templates → Magic Link → incluir a variável `{{ .Token }}` no corpo. Sem isso, o Supabase envia um link clicável em vez do código de 6 dígitos que a tela pede.
2. **Primeiro membro da equipe**: a pessoa loga uma vez em `/admin` com o e-mail dela (isso cria a conta), e então o `user_id` resultante é inserido em `equipe_velkor`:

```sql
insert into public.equipe_velkor (user_id, nome, papel)
select id, 'Nome da Pessoa', 'admin' from auth.users where email = 'email@dominio.com.br';
```

---

## 7. Fluxo integrado cliente ↔ admin (real, ponta a ponta)

1. Equipe cria operação e pendências (por ora via SQL; interface de criação é pendência futura).
2. Cliente loga em `/cliente`, vê a operação, abre o detalhe e clica **Enviar** numa pendência sua.
3. Modal: dropzone (PDF/JPG/PNG ≤ 10 MB, validado também no bucket) + **aceite de LGPD obrigatório** (botão desabilitado sem arquivo E aceite). No envio: arquivo → Storage; documento registrado (`em_conferencia`); pendência → `em_conferencia`; evento no histórico. Se o registro falhar, o arquivo órfão é removido do Storage e o erro aparece na tela — nenhuma falha é silenciosa.
4. Admin vê a operação como **"Conferir envio"**, expande e clica **Aprovar** (pendência → `resolvida`) ou **Devolver** (→ `devolvida`, nota "Devolvido ao cliente para novo envio"). Ambos gravam no histórico com o nome de quem agiu.
5. Cliente vê o novo status; se devolvida, o botão **Enviar** reaparece.
6. Documentos aparecem no **dossiê digital** com download real; cada download é registrado no histórico.

---

## 8. Funil de conversão (real, começa do zero)

O protótipo original tinha números de funil **inventados**; aqui não. `lib/analytics.ts` registra eventos anônimos reais: visita, diagnóstico iniciado, diagnóstico concluído, pacote montado — cada etapa conta **no máximo 1 vez por carregamento de página** (guardas contra StrictMode, "refazer" e cliques repetidos). "Operação contratada" = contagem real da tabela `operacoes`. A aba Funil do admin mostra as contagens com % de conversão por etapa e a receita por família de serviço (soma real do campo `valor`). Indicadores de impacto do protótipo (horas economizadas etc.) **não são exibidos** — exigiriam marcos por operação que não são coletados, e não estimamos números sem base.

---

## 9. Testes e CI

### Comandos

```bash
pnpm dev          # desenvolvimento
pnpm build        # build de produção
pnpm typecheck    # TypeScript
pnpm lint         # ESLint
pnpm test         # 34 testes unitários (Vitest) — < 1s
pnpm test:e2e     # 12 testes end-to-end (Playwright; builda e sobe o servidor sozinho)
```

### Cobertura

- **Unitários** (`tests/unit/`): integridade dos 22 códigos VLK (ordem, sem ausência/duplicidade), regras de gratuito/sob consulta/mensal, elegibilidade de desconto, faixas de desconto, cálculo de pacote real (R$ 1.547,00 → 5% → R$ 1.469,65), formatação BRL, filtros, e as derivações de status cliente/admin. **Um destes testes encontrou e travou um bug real** (operação "em conferência" aparecendo como "Concluída").
- **E2E** (`tests/e2e/`): catálogo e filtros, diagnóstico completo (incl. voltar/refazer e filtro aplicado), simulador com valores exatos na tela e recálculo ao remover, ausência de botão "Adicionar" em gratuitos/sob consulta, menu mobile sem rolagem horizontal, e guardas de rota (todas as rotas protegidas caem no login sem sessão). 1 teste (rejeição de código de login) se autopula onde não há rede até `*.supabase.co`.
- **CI**: todo push e PR rodam typecheck → lint → unitários → build → e2e, com relatório do Playwright publicado como artefato em caso de falha. Usa placeholders de env (nunca segredos — roda em qualquer push).

---

## 10. Variáveis de ambiente

Arquivo local: `.env.local` (não versionado; `.env.example` é o template).

| Variável | O quê |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://dbsxznwcnibdwxmvjghb.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Chave publicável (`sb_publishable_...`) — segura para frontend; a segurança real é o RLS |

Sem essas variáveis o **build não quebra** (usa placeholders com aviso no console), mas login e dados só funcionam com os valores reais. Nenhuma chave secreta existe no frontend nem no repositório.

---

## 11. O que está pronto vs. pendente

### ✅ Real e funcionando

- Landing completa (catálogo VLK01–22, diagnóstico, simulador com desconto correto, limites/FAQ, contato)
- Login por e-mail + código (cliente e equipe), com proteção de rotas
- Modelo de dados completo com RLS validada (isolamento entre clientes provado por teste)
- Upload real de documentos com aceite LGPD, e conferência (aprovar/devolver) no admin
- Dossiê digital com download real e registro no histórico
- Painel admin: KPIs derivados, abas Operações/Clientes/Funil
- Funil de conversão real e anônimo
- SEO básico: title/description/OG/twitter card com imagem da marca, JSON-LD, canonical, robots.txt, sitemap.xml, favicon da marca
- 46 testes automatizados + CI

### ⏳ Pendente — depende de credencial/decisão externa

| Item | Depende de |
|---|---|
| **Kora** (assistente IA — prompt pronto no handoff, `KORA_SISTEMA`) | Chave de API da Anthropic (o time técnico vai providenciar) |
| **Checkout real** (pagamento, PIX, cartão, recibo, webhook) | Escolha e credenciais do gateway |
| **Integração Sienge** (toda compra deve ir para o Sienge — pedido registrado) | Credenciais de API do Sienge |
| Template de e-mail com `{{ .Token }}` | Ação manual no Supabase Dashboard (seção 6) |
| Primeiro admin em `equipe_velkor` | Uma pessoa logar em `/admin` + SQL da seção 6 |
| Textos jurídicos definitivos | Revisão por advogado (rascunhos prontos; lacunas marcadas em âmbar) |
| Deploy/domínio | Decisão de hospedagem (Vercel etc.) — **nada foi publicado** |

### ⏳ Pendente — desenvolvimento futuro (sem bloqueio externo)

- Interface do admin para **criar** operações, pendências e vencimentos (hoje só por SQL)
- Contratação pela landing criando operação automaticamente (depende do checkout)
- Tabela de **SLA por serviço** → habilitar filtro "Fora do prazo"
- Notificações (e-mail/WhatsApp) de vencimento e mudança de status
- Gestão recorrente (IPTU/condomínio/seguros) — estrutura de vencimentos existe, falta o fluxo
- Dossiê final em PDF; upload pela equipe; exportação de relatórios; redistribuição de carteira
- Antivírus e versionamento no upload

---

## 12. Decisões de produto herdadas do handoff (mantidas)

1. Login sem senha, por código de 6 dígitos no e-mail.
2. O cliente paga guias/boletos direto ao órgão e anexa o comprovante; a Velkor **nunca** paga em nome do cliente.
3. Pendências sempre têm dono explícito (você / a Velkor).
4. Serviços sob consulta não entram no simulador, para não gerar expectativa de preço.
5. O diagnóstico não é orçamento — aviso explícito na tela.
6. Documentos e dados sensíveis só entram pelo painel — nunca por WhatsApp, e-mail ou Kora.
7. Aceite de LGPD é **por envio de documento**, não consentimento único.
8. Nenhuma métrica, depoimento ou cliente fictício em lugar nenhum do site (a empresa está em constituição; o rodapé diz isso).

---

## 13. Histórico de trabalho (resumo dos commits)

1. `fix(security)` — removida credencial de admin do código-fonte do app antigo; textos enganosos de pagamento corrigidos.
2. `feat(catalog)` — catálogo único VLK01–22 (app antigo tinha 3 catálogos divergentes).
3. `feat` — **reconstrução do zero em Next.js** (landing + diagnóstico + simulador), Supabase novo.
4. `feat(auth)` — login real por e-mail + código.
5. `feat(cliente)` — modelo de dados real do painel do cliente.
6. `feat(upload)` — upload real (Storage privado + aceite LGPD).
7. `feat(admin)` — painel administrativo com papéis e aprovar/devolver.
8. `test` — 34 unitários + e2e; pegou bug real de status.
9. `ci` — pipeline GitHub Actions; corrigiu build sem env vars.
10. `feat(cliente)` — dossiê digital com download real.
11. `feat(admin)` — abas Clientes e Funil, com funil real (não fictício).
12. `docs(legal)` — rascunhos jurídicos com lacunas marcadas.
13. `fix` — revisão geral: **upload estava bloqueado por RLS** (corrigido e provado), og-image/favicon eram do template Skip (substituídos pela marca), robots/sitemap desatualizados, eventos de funil duplicados, e mais 6 itens menores.

---

## 14. Limitação conhecida do ambiente de desenvolvimento desta sessão

O sandbox onde este trabalho foi feito **não alcança `*.supabase.co` pelo navegador** (política de rede do ambiente, não um defeito do código). Por isso, tudo que exige essa rede — envio real do e-mail de código, leitura das tabelas pelo navegador, upload de arquivo de ponta a ponta pela interface — foi validado por caminhos alternativos (schema, políticas e fluxos testados diretamente no banco via MCP, incluindo testes negativos de segurança), mas **deve ser reconferido no primeiro ambiente com rede aberta** (homologação ou produção). O restante (build, testes, interface, cálculos) foi validado integralmente aqui.
