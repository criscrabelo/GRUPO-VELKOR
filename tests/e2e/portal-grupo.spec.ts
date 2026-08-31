import { test, expect } from '@playwright/test'

test.describe('Portal do Grupo Velkor e novas páginas (handoff v2)', () => {
  test('portal na raiz mostra as duas divisões e leva para cada uma', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: 'Bem-vindo ao Grupo Velkor.' })).toBeVisible()
    await expect(page.getByRole('img', { name: 'Grupo Velkor' })).toBeVisible()
    await expect(page.getByText('Escolha a solução que corresponde ao seu momento.')).toBeVisible()

    // Chips das divisões ("Consórcios" também aparece no título do card,
    // então a busca é restrita aos chips arredondados).
    for (const chip of ['Certidões', 'ITBI', 'Registro', 'Leilões', 'Auto', 'Residencial', 'Vida', 'Consórcios']) {
      await expect(page.locator('span.rounded-full', { hasText: chip })).toBeVisible()
    }

    await page.getByRole('link', { name: /Acessar Soluções Imobiliárias/ }).click()
    await expect(page).toHaveURL(/\/imobiliaria$/)
    await expect(
      page.getByRole('heading', { name: /Documentação imobiliária organizada/ }),
    ).toBeVisible()
  })

  test('logo da landing volta ao portal do grupo', async ({ page }) => {
    await page.goto('/imobiliaria')
    await page.getByRole('link', { name: 'Voltar ao Grupo Velkor' }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('heading', { name: 'Bem-vindo ao Grupo Velkor.' })).toBeVisible()
  })

  test('página da Velkor Seguros mostra o aviso de construção e o contato', async ({ page }) => {
    await page.goto('/seguros')

    await expect(
      page.getByRole('heading', {
        name: 'Proteção para o que você conquistou. Planejamento para o que vem.',
      }),
    ).toBeVisible()
    await expect(page.getByText(/site desta divisão está em construção/)).toBeVisible()

    const whatsapp = page.getByRole('link', { name: /WhatsApp \(12\) 99664-1194/ })
    await expect(whatsapp).toHaveAttribute('href', 'https://wa.me/5512996641194')

    await page.getByRole('link', { name: '← Grupo Velkor' }).click()
    await expect(page).toHaveURL(/\/$/)
  })

  test('card do VLK04 na landing linka para a página do serviço', async ({ page }) => {
    await page.goto('/imobiliaria#solucoes')

    const cardVlk04 = page.locator('.rounded-card', { hasText: 'VLK04' })
    await cardVlk04.getByRole('link', { name: 'Ver página do serviço →' }).click()

    await expect(page).toHaveURL(/\/servicos\/dossie-de-certidoes$/)
    await expect(page.getByRole('heading', { name: 'Dossiê de certidões', level: 1 })).toBeVisible()
  })

  test('página do Dossiê de certidões mostra preço, prazo e seções do handoff', async ({ page }) => {
    await page.goto('/servicos/dossie-de-certidoes')

    // Preço e prazo vêm do catálogo (VLK04: R$ 999,00, 7 a 15 dias úteis).
    await expect(page.getByText('R$ 999,00')).toBeVisible()
    await expect(page.getByText('7 a 15 dias úteis')).toBeVisible()

    await expect(page.getByRole('heading', { name: 'O que está incluído' })).toBeVisible()
    await expect(page.getByText(/O que não está incluído:/)).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Como funciona' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Perguntas frequentes' })).toBeVisible()

    // CTA volta para a seção Soluções da landing.
    await page
      .getByRole('link', { name: 'Selecionar este serviço' })
      .first()
      .click()
    await expect(page).toHaveURL(/\/imobiliaria#solucoes$/)
  })

  test('portal não tem rolagem horizontal no mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })
})
