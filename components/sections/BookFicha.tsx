import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { BookOpen, CheckCircle2, Tablet, Smartphone, Monitor } from 'lucide-react';
import { BookMockup } from '@/components/brand/BookMockup';
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
            <BookCta align="start" available={book.available} amazonUrl={book.amazonUrl} />
          </div>
        </Reveal>
      </div>

      {/* Sinopsis */}
      <div className="mx-auto mt-16 max-w-3xl">
        <Reveal className="text-center">
          <SectionLabel>{t('synopsis.label')}</SectionLabel>
          <GoldDivider className="my-6" />
        </Reveal>
        <div className="space-y-6">
          {synopsis.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 0.06} className="text-lg leading-relaxed text-cream-50/80">
              {p}
            </Reveal>
          ))}
        </div>
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

      {/* Formatos */}
      <FormatsBlock ns={book.ns} />

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

/* Bloque de formatos (namespace-aware) */
function FormatsBlock({ ns }: { ns: 'book' | 'book2' }) {
  const t = useTranslations(`${ns}.formats`);
  return (
    <div className="mx-auto mt-16 max-w-3xl">
      <Reveal className="text-center">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle className="mt-4">{t('title')}</SectionTitle>
        <GoldDivider className="my-6" />
      </Reveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Reveal>
          <div className="glass h-full rounded-2xl p-8">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/5 text-gold-400">
              <BookOpen className="h-6 w-6" strokeWidth={1.6} />
            </span>
            <h3 className="mt-5 font-display text-2xl">{t('print.title')}</h3>
            <p className="mt-3 text-cream-50/75">{t('print.body')}</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="glass h-full rounded-2xl p-8">
            <span className="flex items-center gap-2 text-gold-400">
              <Tablet className="h-6 w-6" strokeWidth={1.6} />
              <Smartphone className="h-6 w-6" strokeWidth={1.6} />
              <Monitor className="h-6 w-6" strokeWidth={1.6} />
            </span>
            <h3 className="mt-5 font-display text-2xl">{t('digital.title')}</h3>
            <p className="mt-3 text-cream-50/75">{t('digital.body')}</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* Dimensiones reales para la galería destacada (evita distorsión/recorte) */
const GALLERY_DIMS: Record<string, [number, number]> = {
  '/libro-foto-2.png': [1024, 1536],
  '/libro-foto-3.png': [1086, 1448],
  '/libro-portada-transparent.png': [818, 1024],
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
