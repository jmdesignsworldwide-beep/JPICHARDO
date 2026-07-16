import { useTranslations } from 'next-intl';
import { Cross, Anchor, Compass, Sprout, Heart } from 'lucide-react';
import { PILLARS, type Pillar } from '@/lib/config';
import { Marquee } from '@/components/motion/Marquee';

const ICONS: Record<Pillar, typeof Cross> = {
  fe: Cross,
  esperanza: Anchor,
  proposito: Compass,
  crecimiento: Sprout,
  comunion: Heart,
};

/**
 * Cinta lenta con los 5 pilares (Fe · Esperanza · Propósito · Crecimiento ·
 * Comunión). Movimiento contemplativo, da vida sin ruido.
 */
export function PillarsMarquee() {
  const t = useTranslations('pillars');
  return (
    <section className="relative border-y border-gold-500/15 bg-navy-800 py-6">
      <Marquee durationSeconds={40}>
        {PILLARS.map((pillar) => {
          const Icon = ICONS[pillar];
          return (
            <span key={pillar} className="mx-10 inline-flex items-center gap-3">
              <Icon className="h-5 w-5 text-gold-400" strokeWidth={1.6} />
              <span className="font-label text-sm uppercase tracking-label text-cream-50/85">
                {t(pillar)}
              </span>
              <span className="ml-10 h-1.5 w-1.5 rotate-45 bg-gold-500/50" aria-hidden />
            </span>
          );
        })}
      </Marquee>
    </section>
  );
}
