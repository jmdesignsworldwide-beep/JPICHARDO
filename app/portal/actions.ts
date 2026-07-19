'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getServerSupabase } from '@/lib/supabase/server';
import { PORTAL_ADMIN_EMAIL, isSupabaseConfigured } from '@/lib/supabase/env';
import { rateLimitGeneric, getClientIp } from '@/lib/rate-limit';

// Nombre de usuario visible del portal (se mapea al correo admin de Supabase).
const USERNAME = 'pichardo';

export type LoginState = { error?: 'invalid' | 'unconfigured' | 'rate_limited' };

/**
 * Login del portal. Rate limit por IP; error SIEMPRE genérico (no revela si el
 * usuario existe). Toda la comunicación con Supabase ocurre server-side.
 */
export async function loginAction(formData: FormData): Promise<LoginState> {
  const ip = getClientIp(await headers());
  if (!rateLimitGeneric(`portal-login:${ip}`, 8, 600_000).ok) {
    return { error: 'rate_limited' };
  }

  if (!isSupabaseConfigured() || !PORTAL_ADMIN_EMAIL) return { error: 'unconfigured' };

  const username = String(formData.get('username') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');

  const supabase = await getServerSupabase();
  if (!supabase) return { error: 'unconfigured' };

  // Usuario incorrecto → mismo error genérico que credencial inválida.
  if (username !== USERNAME || password.length < 1) return { error: 'invalid' };

  const { error } = await supabase.auth.signInWithPassword({
    email: PORTAL_ADMIN_EMAIL,
    password,
  });
  if (error) return { error: 'invalid' };

  redirect('/portal');
}

export async function logoutAction(): Promise<void> {
  const supabase = await getServerSupabase();
  if (supabase) await supabase.auth.signOut();
  redirect('/portal/login');
}

export type PasswordState = { ok?: boolean; error?: 'mismatch' | 'weak' | 'unauth' | 'failed' };

/** Cambio de contraseña desde dentro del portal (sesión activa requerida). */
export async function changePasswordAction(formData: FormData): Promise<PasswordState> {
  const supabase = await getServerSupabase();
  if (!supabase) return { error: 'unauth' };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'unauth' };

  const next = String(formData.get('password') ?? '');
  const confirm = String(formData.get('confirm') ?? '');
  if (next.length < 8) return { error: 'weak' };
  if (next !== confirm) return { error: 'mismatch' };

  const { error } = await supabase.auth.updateUser({ password: next });
  if (error) return { error: 'failed' };
  return { ok: true };
}
