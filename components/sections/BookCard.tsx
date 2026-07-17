import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/ui/Reveal';
import type { BookConfig } from '@/lib/books';

/**
 * Tarjeta premium de un libro para la biblioteca visual y las recomendaciones.
 * Portada + título + subtítulo corto + CTA → página de detalle /libros/[slug].
 */
export function BookCard({ book, delay = 0 }: { book: BookConfig; delay?: number }) {
  const t = useTranslations(book.ns);
  const tc = useTranslations('common');

  return (
    <Reveal from="scale" delay={delay} className="h-full">
      <Link
        href={`/libros/${book.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-gold-500/15 bg-navy-800/40 p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-400/50 hover:shadow-gold sm:p-8"
      >
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[220px]">
          <Image
            src={book.cover}
            alt={t('hero.title')}
            fill
            sizes="220px"
            className="object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <h3 className="mt-6 font-display text-xl font-bold uppercase leading-[1.12] tracking-tightish text-foil-shimmer sm:text-2xl">
          {t('hero.title')}
        </h3>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-cream-50/70">
          {t('hero.subtitle')}
        </p>
        <span className="mt-auto inline-flex items-center justify-center gap-2 pt-6 font-label text-[0.7rem] font-semibold uppercase tracking-wide2 text-gold-400">
          {tc('knowTheBook')}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}
