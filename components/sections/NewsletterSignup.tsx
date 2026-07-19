'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Check, Loader2 } from 'lucide-react';
import { Section, SectionLabel, SectionTitle } from '@/components/ui/Section';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

/**
 * Captura VOLUNTARIA de correo ("avísame cuando salga el libro"). El correo se
 * guarda solo porque la persona lo deja por voluntad propia. Honeypot anti-bot;
 * validación real en el servidor (/api/subscribe).
 */
export function NewsletterSignup({ source = 'libros' }: { source?: string }) {
  const t = useTranslations('newsletter');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (state === 'loading' || state === 'done') return;
    setState('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, locale, source, website }),
      });
      setState(res.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  }

  return (
    <Section tone="navy-deep">
      <Reveal className="mx-auto max-w-xl text-center">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle className="mt-4" foil>
          {t('title')}
        </SectionTitle>
        <GoldDivider className="my-6" />
        <p className="text-cream-50/75">{t('body')}</p>

        {state === 'done' ? (
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-6 py-3 font-label text-xs uppercase tracking-wide2 text-gold-300">
            <Check className="h-4 w-4" />
            {t('success')}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            {/* Honeypot oculto */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              aria-hidden
            />
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-400/70" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('placeholder')}
                aria-label={t('placeholder')}
                className="w-full rounded-full border border-gold-500/25 bg-navy-900/60 py-3 pl-11 pr-4 text-cream-50 outline-none transition-colors placeholder:text-cream-50/40 focus:border-gold-400/60"
              />
            </div>
            <Button type="submit" size="lg" disabled={state === 'loading'}>
              {state === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : t('button')}
            </Button>
          </form>
        )}
        {state === 'error' && <p className="mt-4 text-sm text-red-300/80">{t('error')}</p>}
      </Reveal>
    </Section>
  );
}
