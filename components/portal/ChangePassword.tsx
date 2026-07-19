'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { KeyRound, Check, Loader2, ChevronDown } from 'lucide-react';
import { changePasswordAction, type PasswordState } from '@/app/portal/actions';

const MESSAGES: Record<string, string> = {
  mismatch: 'Las contraseñas no coinciden.',
  weak: 'Usa al menos 8 caracteres.',
  unauth: 'Sesión expirada. Vuelve a entrar.',
  failed: 'No se pudo actualizar. Intenta de nuevo.',
};

export function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<PasswordState>({});
  const [pending, startTransition] = useTransition();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;
    setState({});
    startTransition(async () => {
      const res = await changePasswordAction(formData);
      setState(res);
      if (res.ok) form.reset();
    });
  }

  return (
    <div className="glass rounded-2xl p-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 font-label text-[0.7rem] uppercase tracking-label text-gold-400">
          <KeyRound className="h-4 w-4" /> Cambiar contraseña
        </span>
        <ChevronDown className={`h-4 w-4 text-gold-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Nueva contraseña"
            className="w-full rounded-xl border border-gold-500/25 bg-navy-900/60 px-4 py-2.5 text-cream-50 outline-none focus:border-gold-400/60"
          />
          <input
            name="confirm"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Confirmar contraseña"
            className="w-full rounded-xl border border-gold-500/25 bg-navy-900/60 px-4 py-2.5 text-cream-50 outline-none focus:border-gold-400/60"
          />
          {state.error && <p className="text-sm text-red-200/90">{MESSAGES[state.error]}</p>}
          {state.ok && (
            <p className="flex items-center gap-1.5 text-sm text-gold-300">
              <Check className="h-4 w-4" /> Contraseña actualizada.
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-5 py-2 font-label text-xs uppercase tracking-wide2 text-gold-300 transition-colors hover:bg-gold-500/10 disabled:opacity-70"
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Actualizar'}
          </button>
        </form>
      )}
    </div>
  );
}
