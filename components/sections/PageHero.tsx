import type { ReactNode } from 'react';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/motion/TextReveal';
import { AuroraBackground } from '@/components/motion/AuroraBackground';
import { LightRays } from '@/components/motion/LightRays';
import { GoldParticles } from '@/components/motion/GoldParticles';

/**
 * Hero secundario para páginas interiores, con marco editorial dorado,
 * aurora/rayos de luz sutiles y título revelado palabra por palabra.
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
  const titleClass = `mx-auto max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tightish sm:text-5xl md:text-6xl ${
    foil ? 'text-foil-shimmer' : 'text-cream-50'
  }`;

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      {/* Fondo navy + aurora/rayos que respiran (tenues) */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-navy-900" />
      <AuroraBackground className="-z-10 opacity-50" />
      <LightRays className="-z-10 opacity-70" />
      <GoldParticles className="-z-10" />
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
          <h1 className={titleClass}>
            {typeof title === 'string' ? <TextReveal text={title} /> : title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-6 max-w-2xl font-display text-lg text-cream-50/75 md:text-xl">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
