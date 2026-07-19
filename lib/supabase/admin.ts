import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, isAdminConfigured } from './env';

/**
 * Cliente Supabase con service_role — SOLO servidor (`server-only` impide que
 * se importe desde el cliente). Salta RLS, así que se usa exclusivamente en
 * route handlers / server actions ya protegidos. Nunca en el navegador.
 *
 * Devuelve null si Supabase no está configurado (build/preview sin secretos),
 * para que la captura sea un no-op seguro en lugar de romper.
 */
export function getAdminClient(): SupabaseClient | null {
  if (!isAdminConfigured()) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
