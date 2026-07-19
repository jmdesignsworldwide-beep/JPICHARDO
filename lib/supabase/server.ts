import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from './env';

/**
 * Cliente Supabase server-side ligado a las cookies de la petición — se usa
 * SOLO para la sesión de Auth del portal (login / getUser / password / logout).
 * Todo el tráfico a Supabase ocurre en el servidor: el navegador nunca conecta
 * con Supabase, por lo que la CSP `connect-src 'self'` permanece intacta.
 *
 * Devuelve null si Supabase no está configurado.
 */
export async function getServerSupabase(): Promise<SupabaseClient | null> {
  if (!isSupabaseConfigured()) return null;
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // `set` solo funciona en Server Actions / Route Handlers. En Server
          // Components de solo lectura se ignora (la sesión se refresca en
          // acciones), evitando el error de escritura de cookies.
        }
      },
    },
  });
}
