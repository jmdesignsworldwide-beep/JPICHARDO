'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { Lock, User, Loader2 } from 'lucide-react';
import { loginAction } from '@/app/portal/actions';

const MESSAGES: Record<string, string> = {
  invalid: 'Usuario o contraseña incorrectos.',
  rate_limited: 'Demasiados intentos. Espera unos minutos.',
  unconfigured: 'El portal aún no está configurado. Contacta al administrador.',
};

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      // Éxito → el server action hace redirect (navega). Error → devuelve estado.
      const res = await loginAction(formData);
      if (res?.error) setError(res.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4 text-left">
      <div>
        <label htmlFor="username" className="mb-1.5 block font-label text-[0.7rem] uppercase tracking-label text-gold-400">
          Usuario
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-400/70" />
          <input
            id="username"
            name="username"
            autoComplete="username"
            required
            className="w-full rounded-xl border border-gold-500/25 bg-navy-900/60 py-3 pl-11 pr-4 text-cream-50 outline-none transition-colors placeholder:text-cream-50/40 focus:border-gold-400/60"
            placeholder="Pichardo"
          />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block font-label text-[0.7rem] uppercase tracking-label text-gold-400">
          Contraseña
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-400/70" />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-xl border border-gold-500/25 bg-navy-900/60 py-3 pl-11 pr-4 text-cream-50 outline-none transition-colors placeholder:text-cream-50/40 focus:border-gold-400/60"
            placeholder="••••••••"
          />
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-200/90">
          {MESSAGES[error] ?? 'Error.'}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-shine flex w-full items-center justify-center gap-2 rounded-full bg-hero-gold px-8 py-3.5 font-label text-xs font-semibold uppercase tracking-wide2 text-navy-900 shadow-gold transition-all hover:-translate-y-0.5 disabled:opacity-70"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Entrar'}
      </button>
    </form>
  );
}
