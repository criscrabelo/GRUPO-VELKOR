import { supabase } from './supabase'

export type EventoFunil = 'visita' | 'diagnostico_iniciado' | 'diagnostico_concluido' | 'pacote_montado'

/**
 * Registra um evento real de funil (visita, diagnóstico iniciado/concluído,
 * pacote montado). Anônimo — sem identificador de usuário, IP ou cookie.
 * Dispara e esquece: uma falha aqui nunca deve quebrar a experiência do
 * visitante nem aparecer como erro na tela.
 */
export function registrarEvento(tipo: EventoFunil): void {
  supabase
    .from('eventos_funil')
    .insert({ tipo })
    .then(({ error }) => {
      if (error) console.warn('Falha ao registrar evento de funil:', error.message)
    })
}
