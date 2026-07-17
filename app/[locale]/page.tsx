import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { HeroCarousel } from '@/components/sections/HeroCarousel';
import { Preloader } from '@/components/motion/Preloader';
import { PillarsMarquee } from '@/components/sections/PillarsMarquee';
import {
  WelcomeTeaser,
  BookShowcaseHome,
  PastorTeaser,
  DevotionalTeaser,
  VisitTeaser,
} from '@/components/sections/HomeTeasers';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '',
    title: locale === 'en' ? 'Home' : 'Inicio',
    description:
      locale === 'en'
        ? 'A church with a fresh message to bless you. Home of the book “Comenzando Mi Viaje” by Pastor José Pichardo — Blessing House, Freeport NY.'
        : 'Una iglesia con un mensaje fresco para bendecirte. Hogar del libro “Comenzando Mi Viaje” del Pastor José Pichardo — Blessing House, Freeport NY.',
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Preloader />
      <HeroCarousel />
      <PillarsMarquee />
      <BookShowcaseHome />
      <PastorTeaser />
      <DevotionalTeaser />
      <WelcomeTeaser />
      <VisitTeaser />
    </>
  );
}
