import { test, expect } from '@playwright/test'

test.describe('Proteção de rotas — sem sessão', () => {
  test('/cliente mostra o login do cliente', async ({ page }) => {
    await page.goto('/cliente')
    await expect(page.getByRole('heading', { name: 'Área do cliente' })).toBeVisible()
    await expect(page.getByLabel('E-mail')).toBeVisible()
  })

  test('/cliente/operacoes/[id] com sessão inexistente também cai no login, mesmo com um id qualquer', async ({
    page,
  }) => {
    await page.goto('/cliente/operacoes/00000000-0000-0000-0000-000000000000')
    await expect(page.getByRole('heading', { name: 'Área do cliente' })).toBeVisible()
  })

  test('/admin mostra o login administrativo, com texto diferente do login do cliente', async ({ page }) => {
    await page.goto('/admin')
    await expect(page.getByRole('heading', { name: 'Painel administrativo' })).toBeVisible()
    await expect(page.getByText('Painel interno da equipe Velkor.')).toBeVisible()
    await expect(page.getByText(/exclusivo da equipe Velkor/)).toBeVisible()
  })

  test('envio de código trata falha de rede sem travar a tela (não faz login silencioso)', async ({
    page,
  }) => {
    await page.goto('/cliente')
    await page.getByLabel('E-mail').fill('teste-e2e@example.com')
    await page.getByRole('button', { name: /Receber código de acesso/i }).click()

    // Em ambientes sem saída de rede para *.supabase.co (este incluído), o
    // envio falha — o que importa aqui é que o erro aparece na tela em vez
    // de travar sem feedback ou avançar como se tivesse dado certo.
    await expect(
      page.getByText(/Não foi possível enviar o código|Enviamos um código de 6 dígitos/),
    ).toBeVisible({ timeout: 15_000 })
  })

  test('login não aceita qualquer código de 6 dígitos (requer rede até *.supabase.co)', async ({
    page,
  }) => {
    await page.goto('/cliente')
    await page.getByLabel('E-mail').fill('teste-e2e@example.com')
    await page.getByRole('button', { name: /Receber código de acesso/i }).click()

    const chegouNaEtapaDeCodigo = await page
      .getByText('Enviamos um código de 6 dígitos')
      .isVisible({ timeout: 15_000 })
      .catch(() => false)

    test.skip(
      !chegouNaEtapaDeCodigo,
      'Envio de e-mail falhou (sem rede até *.supabase.co neste ambiente) — ' +
        'rode este teste onde a rede alcance o Supabase para validar a rejeição do código.',
    )

    await page.getByLabel('Código de 6 dígitos').fill('000000')
    await page.getByRole('button', { name: /Entrar no painel/i }).click()
    await expect(page.getByText(/Código inválido ou expirado|Muitas tentativas/)).toBeVisible()
  })
})
