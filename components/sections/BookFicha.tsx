import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { BookOpen, CheckCircle2, Tablet, Book, Quote, Download, ShoppingCart } from 'lucide-react';
import { BookMockup } from '@/components/brand/BookMockup';
import { TrackedAnchor } from '@/components/analytics/TrackedAnchor';
import { Section, SectionLabel, SectionTitle } from '@/components/ui/Section';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { Reveal } from '@/components/ui/Reveal';
import { ChaptersGrid } from '@/components/sections/ChaptersGrid';
import { BookCta } from '@/components/sections/BookCta';
import type { BookConfig } from '@/lib/books';

/**
 * Ficha completa de UN libro (data-driven). Se usa en la página de detalle
 * /libros/[slug]. Lee el contenido del namespace i18n del libro (book / book2).
 */
export function BookFicha({ book, flip = false }: { book: BookConfig; flip?: boolean }) {
  const t = useTranslations(book.ns);
  const synopsis = t.raw('synopsis.paragraphs') as string[];
  const idealItems = t.raw('idealFor.items') as string[];

  return (
    <Section tone={flip ? 'navy-deep' : 'navy'}>
      {/* Cabecera: portada 3D + título/subtítulo/gancho/CTA */}
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal from="scale" className={flip ? 'lg:order-last' : ''}>
          <BookMockup src={book.fichaHero ?? book.cover} alt={t('hero.title')} priority />
        </Reveal>
        <Reveal delay={0.1} className="text-center lg:text-left">
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          <h1 className="mt-4 font-display text-[clamp(1.8rem,4vw,3rem)] font-bold uppercase leading-[1.06] tracking-tightish text-foil-shimmer">
            {t('hero.title')}
          </h1>
          <p className="mt-4 font-display text-lg font-normal tracking-tightish text-bone/90 md:text-xl">
            {t('hero.subtitle')}
          </p>
          <p className="mt-2 font-label text-xs uppercase tracking-label text-gold-400">
            {t('hero.author')}
          </p>
          <p className="mt-6 font-serif text-xl italic text-gold-300">“{t('hero.hook')}”</p>
          <figure className="mt-6 border-l-2 border-gold-500/40 pl-4 text-left">
            <blockquote className="font-serif text-lg italic text-cream-50/80">
              “{t('hero.verse')}”
            </blockquote>
            <figcaption className="mt-1 font-label text-[0.65rem] uppercase tracking-label text-gold-400">
              {t('hero.verseRef')}
            </figcaption>
          </figure>
          <div className="mt-8 flex justify-center lg:justify-start">
            <BookCta
              align="start"
              available={book.available}
              amazonUrl={book.amazonUrl}
              slug={book.slug}
              ebookOnly={book.formatStatus.ebook && !book.formatStatus.paperback && !book.formatStatus.hardcover}
            />
          </div>

          {/* Adelanto gratis (Capítulo 1) — descarga directa del PDF */}
          {book.preview && (
            <div className="mt-6 flex flex-col items-center lg:items-start">
              <a
                href={book.preview}
                download
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-gold-500/50 px-6 py-3 font-label text-[0.7rem] font-semibold uppercase tracking-wide2 text-gold-400 transition-all duration-300 hover:border-gold-400 hover:bg-gold-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
              >
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                {t('preview.label')}
              </a>
              <p className="mt-2 max-w-xs text-sm text-cream-50/55">{t('preview.hint')}</p>
            </div>
          )}
        </Reveal>
      </div>

      {/* Sinopsis */}
      <div className="mx-auto mt-16 max-w-3xl">
        <Reveal className="text-center">
          <SectionLabel>{t('synopsis.label')}</SectionLabel>
          <GoldDivider className="my-6" />
        </Reveal>
        {t.has('synopsis.lead') && (
          <Reveal className="mb-8 text-center">
            <p className="font-serif text-2xl italic leading-snug text-foil md:text-3xl">
              {t('synopsis.lead')}
            </p>
          </Reveal>
        )}
        <div className="space-y-6">
          {synopsis.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 0.06} className="text-lg leading-relaxed text-cream-50/80">
              {p}
            </Reveal>
          ))}
        </div>
        {t.has('synopsis.closing') && (
          <Reveal className="mt-10">
            <blockquote className="rounded-2xl border border-gold-500/25 bg-navy-800/50 p-7 text-center font-serif text-lg italic leading-relaxed text-cream-50/90 shadow-book sm:p-9 sm:text-xl">
              “{t('synopsis.closing')}”
            </blockquote>
          </Reveal>
        )}
      </div>

      {/* Estructura / capítulos */}
      <div className="mt-16">
        <Reveal className="text-center">
          <SectionLabel>{t('chapters.label')}</SectionLabel>
          <SectionTitle className="mt-4">{t('chapters.title')}</SectionTitle>
          <GoldDivider className="my-6" />
        </Reveal>
        <div className="mt-8">
          {book.chaptersLayout === 'grid12' ? <ChaptersGrid /> : <BookParts ns={book.ns} />}
        </div>
      </div>

      {/* Formatos y precios */}
      <FormatsBlock book={book} />

      {/* Ideal para */}
      <div className="mx-auto mt-16">
        <Reveal className="text-center">
          <SectionLabel>{t('idealFor.label')}</SectionLabel>
          <SectionTitle className="mt-4">{t('idealFor.title')}</SectionTitle>
          <GoldDivider className="my-6" />
        </Reveal>
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
          {idealItems.map((item, i) => (
            <Reveal
              key={item}
              delay={i * 0.06}
              className="flex items-center gap-3 rounded-xl border border-gold-500/15 bg-navy-800/50 p-5"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-400" />
              <span className="text-cream-50/85">{item}</span>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Frases del libro (opcional, solo si el libro las define) */}
      {t.has('quotes.items') && <BookQuotes ns={book.ns} />}

      {/* Galería del libro */}
      <FichaGallery
        images={book.gallery}
        title={t('hero.title')}
        layout={book.galleryLayout}
        coverSrc={book.cover}
      />
    </Section>
  );
}

/* Frases destacadas del libro (opcional) — citas elegantes en tarjetas */
function BookQuotes({ ns }: { ns: 'book' | 'book2' }) {
  const t = useTranslations(ns);
  const items = t.raw('quotes.items') as string[];
  return (
    <div className="mx-auto mt-16">
      <Reveal className="text-center">
        <SectionLabel>{t('quotes.label')}</SectionLabel>
        <SectionTitle className="mt-4">{t('quotes.title')}</SectionTitle>
        <GoldDivider className="my-6" />
      </Reveal>
      <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-3">
        {items.map((q, i) => (
          <Reveal
            key={i}
            from="scale"
            delay={i * 0.08}
            className="glass flex h-full flex-col rounded-2xl p-7"
          >
            <Quote className="h-7 w-7 shrink-0 text-gold-400" aria-hidden />
            <p className="mt-4 font-serif text-lg italic leading-relaxed text-cream-50/85">
              “{q}”
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* Capítulos en 3 partes (libro 2) */
function BookParts({ ns }: { ns: 'book' | 'book2' }) {
  const t = useTranslations(ns);
  const parts = t.raw('chapters.parts') as { label: string; title: string; body: string }[];
  return (
    <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
      {parts.map((p, i) => (
        <Reveal
          key={p.label}
          from="scale"
          delay={i * 0.08}
          className="glass flex h-full flex-col rounded-2xl p-7"
        >
          <span className="font-label text-[0.7rem] uppercase tracking-label text-gold-400">
            {p.label}
          </span>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tightish text-foil">
            {p.title}
          </h3>
          <p className="mt-3 text-cream-50/75">{p.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* Formatos y precios (data-driven): 3 tarjetas con ícono + precio por formato */
function FormatsBlock({ book }: { book: BookConfig }) {
  const t = useTranslations(`${book.ns}.formats`);
  const usd = (n: number) =>
    `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const cards = [
    { key: 'ebook', price: book.prices.ebook, Icon: Tablet },
    { key: 'paperback', price: book.prices.paperback, Icon: Book },
    { key: 'hardcover', price: book.prices.hardcover, Icon: BookOpen },
  ] as const;

  return (
    <div className="mx-auto mt-16 max-w-4xl">
      <Reveal className="text-center">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle className="mt-4">{t('title')}</SectionTitle>
        <GoldDivider className="my-6" />
      </Reveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {cards.map(({ key, price, Icon }, i) => {
          // Disponibilidad por formato (data-driven): con link a Amazon o "Próximamente".
          const ebookAvailable = book.formatStatus[key] && !!book.amazonUrl;
          const comingSoon = !book.formatStatus[key];
          return (
            <Reveal
              key={key}
              from="scale"
              delay={i * 0.08}
              className={`glass flex h-full flex-col items-center rounded-2xl p-8 text-center ${
                ebookAvailable ? 'ring-1 ring-gold-400/40' : ''
              }`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/5 text-gold-400">
                <Icon className="h-6 w-6" strokeWidth={1.6} />
              </span>
              <h3 className="mt-5 font-display text-xl">{t(`${key}.name`)}</h3>
              <p className="mt-1 text-sm text-cream-50/60">{t(`${key}.caption`)}</p>
              <p className="mt-4 font-display text-3xl font-bold text-foil">{usd(price)}</p>

              {ebookAvailable && (
                <>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-3 py-1 font-label text-[0.6rem] uppercase tracking-wide2 text-gold-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                    {t('statusAvailable')}
                  </span>
                  <TrackedAnchor
                    event={{ type: 'amazon', bookSlug: book.slug }}
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 inline-flex items-center gap-2 rounded-full bg-hero-gold px-5 py-2.5 font-label text-[0.68rem] font-semibold uppercase tracking-wide2 text-navy-900 shadow-gold transition-all hover:-translate-y-0.5"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    {t('buy')}
                  </TrackedAnchor>
                </>
              )}
              {comingSoon && (
                <span className="mt-3 inline-flex items-center rounded-full border border-cream-50/15 px-3 py-1 font-label text-[0.6rem] uppercase tracking-wide2 text-cream-50/45">
                  {t('statusSoon')}
                </span>
              )}
            </Reveal>
          );
        })}
      </div>
      <p className="mt-6 text-center font-label text-[0.7rem] uppercase tracking-label text-cream-50/50">
        {t('note')}
      </p>
    </div>
  );
}

/* Dimensiones reales para la galería destacada (evita distorsión/recorte) */
const GALLERY_DIMS: Record<string, [number, number]> = {
  '/libro-foto-2.png': [1024, 1536],
  '/libro-foto-3.png': [1086, 1448],
  '/comenzando-portada.png': [500, 500],
};

/* Galería de fotos del libro — 'featured' (grande/medio/pequeño) o 'grid' (3 iguales) */
function FichaGallery({
  images,
  title,
  layout,
  coverSrc,
}: {
  images: string[];
  title: string;
  layout: 'featured' | 'grid';
  /** portada 3D transparente: recibe el panel cremita de fondo si aparece */
  coverSrc?: string;
}) {
  if (layout === 'featured') {
    // Reparto de anchos según cuántas imágenes haya (equilibrado con 2).
    const spans =
      images.length === 2
        ? ['col-span-12 sm:col-span-6', 'col-span-12 sm:col-span-6']
        : ['col-span-12 sm:col-span-5', 'col-span-7 sm:col-span-4', 'col-span-5 sm:col-span-3'];
    return (
      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-12 items-end gap-4 sm:gap-6">
        {images.map((src, i) => {
          const [w, h] = GALLERY_DIMS[src] ?? [1024, 1400];
          // El mockup transparente necesita fondo claro; el resto va sin panel.
          const cream = src === coverSrc;
          return (
            <Reveal key={src} from="scale" delay={i * 0.1} className={spans[i] ?? 'col-span-4'}>
              <div
                className={`group overflow-hidden rounded-2xl border border-gold-500/20 shadow-book ring-1 ring-gold-500/15 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-gold ${
                  cream ? 'bg-[#F3EEE3] p-3' : ''
                }`}
              >
                <Image
                  src={src}
                  alt={`${title} — imagen ${i + 1}`}
                  width={w}
                  height={h}
                  sizes="(max-width: 640px) 92vw, 40vw"
                  className={`h-auto w-full transition-transform duration-500 group-hover:scale-[1.04] ${
                    cream ? 'drop-shadow-[0_16px_28px_rgba(0,0,0,0.35)]' : ''
                  }`}
                />
              </div>
            </Reveal>
          );
        })}
      </div>
    );
  }

  return (
    <div className="mx-auto mt-16 grid max-w-4xl grid-cols-3 gap-3 sm:gap-4">
      {images.map((src, i) => (
        <Reveal
          key={src}
          from="scale"
          delay={i * 0.1}
          className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-gold-500/20 bg-navy-900/60 shadow-book ring-1 ring-gold-500/15 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-gold"
        >
          <Image
            src={src}
            alt={`${title} — foto ${i + 1}`}
            fill
            sizes="(max-width: 768px) 33vw, 260px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
        </Reveal>
      ))}
    </div>
  );
}
