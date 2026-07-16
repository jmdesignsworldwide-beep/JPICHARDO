import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { HomeHero } from '@/components/sections/HomeHero';
import { PillarsBand } from '@/components/sections/PillarsBand';
import {
  WelcomeTeaser,
  PastorTeaser,
  DevotionalTeaser,
  VisitTeaser,
} from '@/components/sections/HomeTeasers';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
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

export default function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);

  return (
    <>
      <HomeHero />
      <PillarsBand />
      <WelcomeTeaser />
      <PastorTeaser />
      <DevotionalTeaser />
      <VisitTeaser />
    </>
  );
}
