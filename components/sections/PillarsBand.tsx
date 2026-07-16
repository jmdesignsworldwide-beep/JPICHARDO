import { useTranslations } from 'next-intl';
import { Cross, Anchor, Compass, Sprout, Heart } from 'lucide-react';
import { PILLARS, type Pillar } from '@/lib/config';
import { Reveal } from '@/components/ui/Reveal';

// Iconografía de los pilares de la portada (según Tanda 2):
// Fe · cruz — Esperanza · ancla — Propósito · brújula/timón —
// Crecimiento · brote — Comunión · corazón.
const ICONS: Record<Pillar, typeof Cross> = {
  fe: Cross,
  esperanza: Anchor,
  proposito: Compass,
  crecimiento: Sprout,
  comunion: Heart,
};

/**
 * Banda de pilares: Fe · Esperanza · Propósito · Crecimiento · Comunión.
 * Iconografía recurrente tomada de la portada del libro.
 */
export function PillarsBand({ tone = 'navy-deep' }: { tone?: 'navy-deep' | 'transparent' }) {
  const t = useTranslations('pillars');

  return (
    <section
      className={`relative py-14 ${
        tone === 'navy-deep' ? 'bg-navy-800' : ''
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
      />
      <div className="container-x">
        <ul className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {PILLARS.map((pillar, i) => {
            const Icon = ICONS[pillar];
            return (
              <Reveal as="li" key={pillar} delay={i * 0.08} className="flex flex-col items-center gap-3 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/5 text-gold-400">
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <span className="font-label text-[0.72rem] font-semibold uppercase tracking-label text-cream-50/85">
                  {t(pillar)}
                </span>
              </Reveal>
            );
          })}
        </ul>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
      />
    </section>
  );
}
