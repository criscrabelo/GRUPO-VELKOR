import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  // Não interrompe o build (ex.: CI, ou uma etapa de build que roda antes da
  // injeção de variáveis de ambiente): sem essas variáveis reais, qualquer
  // chamada de autenticação ou dado falha em tempo de execução com um erro
  // de rede claro, em vez de derrubar o build inteiro numa página que só
  // usa o Supabase no navegador.
  console.warn(
    'NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY não definidas — ' +
      'usando valores de placeholder. Login e dados não vão funcionar até configurar o .env.local (ou as variáveis de ambiente de produção) de verdade.',
  )
}

export const supabase = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_PUBLISHABLE_KEY || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  },
)
