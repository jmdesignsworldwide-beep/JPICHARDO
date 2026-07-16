'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type Status = 'idle' | 'sending' | 'success' | 'error' | 'rate_limited';
type FieldErrors = Partial<Record<'name' | 'email' | 'phone' | 'message', string>>;

export function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  // Marca de tiempo de montaje (se fija tras render para no llamar a una
  // función impura durante el render — regla react-hooks/purity).
  const mountedAt = useRef<number | null>(null);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // Validación de UI (solo UX; el servidor es la autoridad — Fort Knox).
  function validate(fd: FormData): FieldErrors {
    const next: FieldErrors = {};
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const message = String(fd.get('message') || '').trim();
    if (name.length < 2 || name.length > 80) next.name = t('validation.name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160)
      next.email = t('validation.email');
    // Teléfono opcional: solo se valida si el usuario escribió algo.
    if (phone && (!/^[+\d][\d\s().-]{5,}$/.test(phone) || phone.length > 40))
      next.phone = t('validation.phone');
    if (message.length < 10 || message.length > 1000)
      next.message = t('validation.message');
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const found = validate(fd);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          message: fd.get('message'),
          website: fd.get('website'), // honeypot
          ts: mountedAt.current ?? Date.now(),
        }),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
        return;
      }
      if (res.status === 429) {
        setStatus('rate_limited');
        return;
      }
      setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="glass flex flex-col items-center rounded-2xl p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-gold-400" />
        <h3 className="mt-4 font-display text-2xl">{t('successTitle')}</h3>
        <p className="mt-2 text-cream-50/75">{t('success')}</p>
      </div>
    );
  }

  const inputBase =
    'w-full rounded-lg border bg-navy-900/60 px-4 py-3 text-cream-50 placeholder:text-cream-50/40 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400/60';

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot (Fort Knox #6): oculto para humanos, tentador para bots. */}
      <div aria-hidden className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="website">No completar este campo</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="mb-1.5 block font-label text-[0.7rem] uppercase tracking-wide2 text-gold-400">
          {t('name')}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={80}
          autoComplete="name"
          placeholder={t('namePlaceholder')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={`${inputBase} ${errors.name ? 'border-red-400/60' : 'border-gold-500/20'}`}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-sm text-red-300">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block font-label text-[0.7rem] uppercase tracking-wide2 text-gold-400">
          {t('email')}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={160}
          autoComplete="email"
          placeholder={t('emailPlaceholder')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={`${inputBase} ${errors.email ? 'border-red-400/60' : 'border-gold-500/20'}`}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-sm text-red-300">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block font-label text-[0.7rem] uppercase tracking-wide2 text-gold-400">
          {t('phone')}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          maxLength={40}
          autoComplete="tel"
          placeholder={t('phonePlaceholder')}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          className={`${inputBase} ${errors.phone ? 'border-red-400/60' : 'border-gold-500/20'}`}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1.5 text-sm text-red-300">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block font-label text-[0.7rem] uppercase tracking-wide2 text-gold-400">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={1000}
          placeholder={t('messagePlaceholder')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${inputBase} resize-y ${errors.message ? 'border-red-400/60' : 'border-gold-500/20'}`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-red-300">
            {errors.message}
          </p>
        )}
      </div>

      {(status === 'error' || status === 'rate_limited') && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-lg border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{status === 'rate_limited' ? t('rateLimited') : t('error')}</span>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={status === 'sending'} size="lg">
          {status === 'sending' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('sending')}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {t('submit')}
            </>
          )}
        </Button>
        <p className="max-w-xs text-xs text-cream-50/50">{t('privacy')}</p>
      </div>
    </form>
  );
}
