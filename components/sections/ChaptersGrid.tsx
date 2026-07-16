import { useTranslations } from 'next-intl';
import { CHAPTER_KEYS } from '@/lib/config';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Grid de los 12 capítulos del libro. Tarjetas numeradas con realce
 * dorado al hover.
 */
export function ChaptersGrid() {
  const t = useTranslations('book.chapters');

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CHAPTER_KEYS.map((key, i) => (
        <Reveal
          as="li"
          key={key}
          delay={(i % 3) * 0.06}
          className="group relative overflow-hidden rounded-xl border border-gold-500/15 bg-navy-800/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:bg-navy-600/30 hover:shadow-gold"
        >
          <div className="flex items-center gap-4">
            <span className="font-display text-3xl text-foil">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="h-8 w-px bg-gold-500/30" aria-hidden />
            <span className="font-serif text-lg leading-snug text-cream-50/90">
              {t(`items.${key}`)}
            </span>
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gold-500/5 opacity-0 blur-xl transition-opacity group-hover:opacity-100"
          />
        </Reveal>
      ))}
    </ul>
  );
}
