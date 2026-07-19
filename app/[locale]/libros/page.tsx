import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { BookCard } from '@/components/sections/BookCard';
import { NewsletterSignup } from '@/components/sections/NewsletterSignup';
import { BOOKS } from '@/lib/books';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'books.meta' });
  return buildMetadata({
    locale,
    path: '/libros',
    title: t('title'),
    description: t('description'),
  });
}

export default async function LibrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <LibraryHero />
      <Section tone="navy">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
          {BOOKS.map((book, i) => (
            <BookCard key={book.id} book={book} delay={i * 0.1} />
          ))}
        </div>
      </Section>
      <NewsletterSignup source="libros" />
    </>
  );
}

function LibraryHero() {
  const t = useTranslations('books.hero');
  return <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} foil />;
}
