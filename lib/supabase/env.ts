/**
 * Configuración de Supabase (server-only en la práctica).
 *
 * El sitio funciona SIN Supabase: si faltan las variables, la captura de
 * analíticas y el portal quedan inactivos (no rompen el build ni el sitio).
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
// service_role: SOLO servidor. Nunca se expone al cliente.
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
// Correo del admin del portal (el usuario "Pichardo" se mapea a este correo).
export const PORTAL_ADMIN_EMAIL = process.env.PORTAL_ADMIN_EMAIL ?? '';

/** ¿Están las claves públicas + service_role presentes? (captura + lectura) */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

/** ¿Podemos escribir/leer con service_role server-side? */
export function isAdminConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}
