import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Section, SectionLabel, SectionTitle } from '@/components/ui/Section';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { Reveal } from '@/components/ui/Reveal';
import { BookFicha } from '@/components/sections/BookFicha';
import { BookCard } from '@/components/sections/BookCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { bookJsonLd } from '@/lib/jsonld';
import { BOOKS, type BookConfig } from '@/lib/books';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return BOOKS.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const book = BOOKS.find((b) => b.slug === slug);
  if (!book) return {};
  const t = await getTranslations({ locale, namespace: `${book.ns}.meta` });
  return buildMetadata({
    locale,
    path: `/libros/${slug}`,
    title: t('title'),
    description: t('description'),
  });
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const book = BOOKS.find((b) => b.slug === slug);
  if (!book) notFound();
  const others = BOOKS.filter((b) => b.slug !== slug);
  const th = await getTranslations({ locale, namespace: `${book.ns}.hero` });
  return (
    <>
      {book.ns === 'book' && <JsonLd data={bookJsonLd} />}
      {book.banner && <BookBanner src={book.banner} alt={`${th('title')} — banner`} />}
      <BookFicha book={book} />
      {others.length > 0 && <OtherBooks others={others} />}
    </>
  );
}

/* Banda de encabezado a todo el ancho — se muestra completa (sin recortar). */
function BookBanner({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full bg-navy-900 pt-16 md:pt-20">
      <Image
        src={src}
        alt={alt}
        width={1942}
        height={809}
        sizes="100vw"
        priority
        className="h-auto w-full"
      />
    </div>
  );
}

function OtherBooks({ others }: { others: BookConfig[] }) {
  const t = useTranslations('books');
  return (
    <Section tone="navy-deep">
      <Reveal className="text-center">
        <SectionLabel>{t('alsoLabel')}</SectionLabel>
        <SectionTitle className="mt-4">{t('alsoTitle')}</SectionTitle>
        <GoldDivider className="my-6" />
      </Reveal>
      <div className="mx-auto mt-8 grid max-w-4xl gap-8 sm:grid-cols-2">
        {others.map((book, i) => (
          <BookCard key={book.id} book={book} delay={i * 0.1} />
        ))}
      </div>
    </Section>
  );
}
