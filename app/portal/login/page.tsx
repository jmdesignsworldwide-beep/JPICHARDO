import { redirect } from 'next/navigation';
import Image from 'next/image';
import { LoginForm } from '@/components/portal/LoginForm';
import { getPortalUser } from '@/lib/portal/auth';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export const dynamic = 'force-dynamic';

export default async function PortalLoginPage() {
  const configured = isSupabaseConfigured();
  if (configured) {
    const user = await getPortalUser();
    if (user) redirect('/portal');
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl border border-gold-500/20 bg-navy-800/50 p-8 text-center shadow-book ring-1 ring-gold-500/10 sm:p-10">
        <div className="mx-auto mb-6 w-20 overflow-hidden rounded-2xl ring-1 ring-gold-500/20">
          <Image src="/logo-jpichardo-header.png" alt="JPichardo Ministries" width={96} height={96} className="h-auto w-full" />
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tightish text-foil-shimmer">Portal privado</h1>
        <p className="mt-2 text-sm text-cream-50/60">JPichardo Ministries · Analíticas</p>

        {configured ? (
          <LoginForm />
        ) : (
          <p className="mt-8 rounded-xl border border-gold-500/20 bg-navy-900/50 p-4 text-sm text-cream-50/70">
            El portal aún no está configurado. Falta conectar Supabase (ver
            <span className="text-gold-400"> PORTAL_SETUP.md</span>).
          </p>
        )}
      </div>
    </main>
  );
}
