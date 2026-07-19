import 'server-only';
import type { User } from '@supabase/supabase-js';
import { getServerSupabase } from '@/lib/supabase/server';

/** Usuario autenticado del portal, o null. Se valida en cada Server Component. */
export async function getPortalUser(): Promise<User | null> {
  const supabase = await getServerSupabase();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null;
}
