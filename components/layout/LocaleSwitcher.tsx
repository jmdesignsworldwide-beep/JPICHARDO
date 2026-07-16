'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

/**
 * Toggle ES/EN. Cambia la ruta con el locale y persiste la preferencia
 * (next-intl guarda la cookie NEXT_LOCALE al navegar).
 */
export function LocaleSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: string) => {
    if (next === locale) return;
    startTransition(() => {
      // pathname aquí ya viene sin el prefijo de locale.
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border border-gold-500/30 bg-navy-800/60 p-0.5 ${className}`}
      role="group"
      aria-label="Idioma / Language"
    >
      {routing.locales.map((lng) => {
        const active = lng === locale;
        return (
          <button
            key={lng}
            type="button"
            onClick={() => switchTo(lng)}
            aria-pressed={active}
            disabled={isPending}
            className={`rounded-full px-3 py-1 font-label text-[0.68rem] font-semibold uppercase tracking-wide2 transition-colors ${
              active
                ? 'bg-hero-gold text-navy-900'
                : 'text-cream-50/70 hover:text-gold-400'
            }`}
          >
            {lng}
          </button>
        );
      })}
    </div>
  );
}
