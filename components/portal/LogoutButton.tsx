'use client';

import { useTransition } from 'react';
import { LogOut, Loader2 } from 'lucide-react';
import { logoutAction } from '@/app/portal/actions';

export function LogoutButton() {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => logoutAction())}
      className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 px-4 py-2 font-label text-[0.7rem] uppercase tracking-wide2 text-cream-50/70 transition-colors hover:border-gold-400 hover:text-gold-400 disabled:opacity-70"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />} Salir
    </button>
  );
}
