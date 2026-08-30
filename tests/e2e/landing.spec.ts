import { test, expect } from '@playwright/test'

test.describe('Landing — catálogo, diagnóstico e simulador', () => {
  test('catálogo mostra os 22 serviços e os filtros funcionam', async ({ page }) => {
    await page.goto('/')

    const filtros = page.getByLabel('Filtrar soluções')
    await expect(filtros.getByRole('button', { name: 'Todas as soluções' })).toBeVisible()

    await filtros.getByRole('button', { name: 'Sob consulta' }).click()
    await expect(page.getByText('6 soluções encontradas')).toBeVisible()

    await filtros.getByRole('button', { name: 'Comprar', exact: true }).click()
    await expect(page.getByText(/soluç(ão|ões) encontrada/)).toBeVisible()
  })

  test('diagnóstico completo aplica o filtro certo em Soluções', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: /Começar diagnóstico gratuito/i }).click()
    const diagnostico = page.locator('#diagnostico')

    await diagnostico.getByRole('button', { name: 'Vender' }).click()
    await diagnostico.getByRole('button', { name: 'Não tenho nenhum' }).click()
    await diagnostico.getByRole('button', { name: 'Organizar certidões e prazos' }).click()

    await expect(diagnostico.getByRole('heading', { name: 'Perfil: vendedor' })).toBeVisible()

    await diagnostico.getByRole('button', { name: /Ver meu caminho recomendado/i }).click()
    await expect(
      page.getByLabel('Filtrar soluções').getByRole('button', { name: 'Vender', exact: true }),
    ).toHaveAttribute('aria-pressed', 'true')
  })

  test('voltar e refazer o diagnóstico funcionam', async ({ page }) => {
    await page.goto('/#diagnostico')
    const diagnostico = page.locator('#diagnostico')

    await diagnostico.getByRole('button', { name: 'Alugar' }).click()
    await expect(diagnostico.getByText('Pergunta 2 de 3')).toBeVisible()

    await diagnostico.getByRole('button', { name: 'Voltar' }).click()
    await expect(diagnostico.getByText('Pergunta 1 de 3')).toBeVisible()

    await diagnostico.getByRole('button', { name: 'Alugar' }).click()
    await diagnostico.getByRole('button', { name: 'Não sei dizer' }).click()
    await diagnostico.getByRole('button', { name: 'Entender os custos envolvidos' }).click()
    await expect(diagnostico.getByRole('heading', { name: 'Perfil: locação' })).toBeVisible()

    await diagnostico.getByRole('button', { name: /Refazer diagnóstico/i }).click()
    await expect(diagnostico.getByText('Pergunta 1 de 3')).toBeVisible()
  })

  test('simulador calcula subtotal, desconto e total corretamente', async ({ page }) => {
    await page.goto('/#solucoes')

    async function adicionar(codigo: string) {
      const card = page.locator('.rounded-card', { hasText: codigo })
      await card.getByRole('button', { name: /Adicionar/i }).click()
    }

    await adicionar('VLK02') // R$ 299,00
    await adicionar('VLK03') // R$ 249,00
    await adicionar('VLK04') // R$ 999,00

    const pacote = page.locator('#pacote')
    await pacote.scrollIntoViewIfNeeded()

    await expect(pacote.getByText('Seu pacote já tem 5% de desconto.')).toBeVisible()
    await expect(pacote.getByText('R$ 1.547,00')).toBeVisible()
    await expect(pacote.getByText('- R$ 77,35')).toBeVisible()
    await expect(pacote.getByText('R$ 1.469,65')).toBeVisible()

    await pacote.getByRole('button', { name: 'Remover Dossiê de certidões do pacote' }).click()
    await expect(pacote.getByText('Seu pacote já tem 3% de desconto.')).toBeVisible()
  })

  test('serviço gratuito e sob consulta não têm botão de adicionar ao pacote', async ({ page }) => {
    await page.goto('/#solucoes')
    const filtros = page.getByLabel('Filtrar soluções')
    await filtros.getByRole('button', { name: 'Sob consulta' }).click()

    const cards = page.locator('#solucoes .grid > div')
    const count = await cards.count()
    expect(count).toBe(6)
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).getByRole('button', { name: /Adicionar/i })).toHaveCount(0)
    }
  })

  test('menu mobile abre e fecha, sem rolagem horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)

    await page.getByRole('button', { name: 'Abrir menu' }).click()
    await expect(page.getByRole('navigation', { name: 'Navegação mobile' })).toBeVisible()
    await page.getByRole('navigation', { name: 'Navegação mobile' }).getByRole('link', { name: 'Soluções' }).click()
    await expect(page.getByRole('navigation', { name: 'Navegação mobile' })).toBeHidden()
  })
})
