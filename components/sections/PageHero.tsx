import type { ReactNode } from 'react';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Hero secundario para páginas interiores, con marco editorial dorado
 * y fondo navy con veladura sutil.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  foil = true,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  foil?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      {/* Fondo */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy-900" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 0%, rgba(30,58,95,0.55), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-16 -z-10 mx-auto h-[1px] max-w-4xl bg-gradient-to-r from-transparent via-gold-500/30 to-transparent"
      />

      <div className="container-x text-center">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <GoldDivider className="my-5" />
          <h1
            className={`mx-auto max-w-4xl font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl ${
              foil ? 'text-foil' : 'text-cream-50'
            }`}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-6 max-w-2xl font-serif text-xl italic text-cream-50/75 md:text-2xl">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
