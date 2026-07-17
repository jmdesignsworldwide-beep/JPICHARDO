import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { BookOpen, CheckCircle2, Tablet, Smartphone, Monitor } from 'lucide-react';
import { BookMockup } from '@/components/brand/BookMockup';
import { Section, SectionLabel, SectionTitle } from '@/components/ui/Section';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { Reveal } from '@/components/ui/Reveal';
import { PillarsBand } from '@/components/sections/PillarsBand';
import { ChaptersGrid } from '@/components/sections/ChaptersGrid';
import { BookCta } from '@/components/sections/BookCta';
import { GoldParticles } from '@/components/motion/GoldParticles';
import { PhotoShowcase } from '@/components/sections/PhotoShowcase';
import { JsonLd } from '@/components/seo/JsonLd';
import { bookJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'book.meta' });
  return buildMetadata({
    locale,
    path: '/libro',
    title: t('title'),
    description: t('description'),
  });
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd data={bookJsonLd} />
      <BookHero />
      <BookBanner />
      <Synopsis />
      <BookShowcase />
      <BookPhotos />
      <ChaptersSection />
      <PillarsBand tone="navy-deep" />
      <IdealFor />
      <Formats />
      <FinalCta />
    </>
  );
}

function BookBanner() {
  // Banda de encabezado del libro — imagen COMPLETA sin recortar, responsive.
  return (
    <Section tone="navy">
      <Reveal className="mx-auto max-w-5xl">
        <Image
          src="/libro-banner.png"
          alt="Comenzando Mi Viaje — Fundamentos para la Vida Cristiana, por el Pastor José Pichardo"
          width={1942}
          height={809}
          sizes="(max-width: 1024px) 92vw, 1024px"
          priority
          className="h-auto w-full rounded-2xl border border-gold-500/20 shadow-book ring-1 ring-gold-500/15"
        />
      </Reveal>
    </Section>
  );
}

function BookPhotos() {
  const t = useTranslations('home.bookShowcase');
  return (
    <Section tone="navy-deep">
      <Reveal className="mb-8 text-center">
        <SectionLabel>{t('galleryLabel')}</SectionLabel>
      </Reveal>
      <div className="mx-auto grid max-w-5xl grid-cols-12 items-end gap-4 sm:gap-6">
        {/* Grande (izq): marco JPichardo con brújula — "Adquiere tu libro hoy" */}
        <Reveal from="scale" className="col-span-12 sm:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-gold-500/20 shadow-book ring-1 ring-gold-500/15">
            <Image
              src="/libro-foto-2.png"
              alt="Comenzando Mi Viaje — Disponible en Amazon, adquiere tu libro hoy"
              width={1024}
              height={1536}
              sizes="(max-width: 640px) 92vw, 40vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
        {/* Medio: Amazon con fondo negro y cremita */}
        <Reveal from="scale" delay={0.08} className="col-span-7 sm:col-span-4">
          <div className="overflow-hidden rounded-2xl border border-gold-500/20 shadow-book ring-1 ring-gold-500/15">
            <Image
              src="/libro-foto-3.png"
              alt="Comenzando Mi Viaje — Disponible en Amazon"
              width={1086}
              height={1448}
              sizes="(max-width: 640px) 55vw, 32vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
        {/* Pequeño (der): el libro sobre fondo cremita */}
        <Reveal from="scale" delay={0.16} className="col-span-5 sm:col-span-3">
          <div className="overflow-hidden rounded-2xl border border-gold-500/20 bg-[#F3EEE3] p-3 shadow-book ring-1 ring-gold-500/15">
            <Image
              src="/libro-portada-transparent.png"
              alt="Portada de Comenzando Mi Viaje"
              width={818}
              height={1024}
              sizes="(max-width: 640px) 40vw, 24vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Formats() {
  const t = useTranslations('book.formats');
  return (
    <Section tone="navy">
      <Reveal className="text-center">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle className="mt-4">{t('title')}</SectionTitle>
        <GoldDivider className="my-6" />
      </Reveal>
      <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
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
    </Section>
  );
}

function BookShowcase() {
  return (
    <Section tone="navy-deep">
      <PhotoShowcase
        src="/devocional-biblia-diario.png"
        alt="Biblia abierta y un diario con una reflexión sobre el discipulado, junto a una taza de café — el crecimiento espiritual que acompaña Comenzando Mi Viaje."
        width={941}
        height={1672}
      />
    </Section>
  );
}

function ChaptersSection() {
  const t = useTranslations('book.chapters');
  return (
    <Section tone="navy-deep">
      <Reveal className="text-center">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle className="mt-4">{t('title')}</SectionTitle>
        <GoldDivider className="my-6" />
      </Reveal>
      <div className="mt-10">
        <ChaptersGrid />
      </div>
    </Section>
  );
}

function BookHero() {
  const t = useTranslations('book.hero');
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36">
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-sky opacity-90" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy-veil" />
      <GoldParticles className="-z-10" />
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-first lg:order-last">
          <BookMockup />
        </Reveal>
        <Reveal delay={0.1} className="text-center lg:text-left">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h1 className="mt-4 font-display text-[clamp(2.3rem,8vw,5.5rem)] font-bold uppercase leading-[1.04] tracking-tightish text-foil-shimmer">
            {t('title')}
          </h1>
          <p className="mt-4 font-display text-2xl font-normal tracking-tightish text-bone/90 md:text-3xl">
            {t('subtitle')}
          </p>
          <p className="mt-2 font-label text-xs uppercase tracking-label text-gold-400">
            {t('support')} · {t('author')}
          </p>
          <p className="mt-6 font-serif text-xl italic text-gold-300">
            “{t('hook')}”
          </p>
          <figure className="mt-6 border-l-2 border-gold-500/40 pl-4 text-left">
            <blockquote className="font-serif text-lg italic text-cream-50/80">
              “{t('verse')}”
            </blockquote>
            <figcaption className="mt-1 font-label text-[0.65rem] uppercase tracking-label text-gold-400">
              {t('verseRef')}
            </figcaption>
          </figure>
          <div className="mt-8 flex justify-center lg:justify-start">
            <BookCta align="start" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Synopsis() {
  const t = useTranslations('book.synopsis');
  const th = useTranslations('book.hero');
  const paragraphs = t.raw('paragraphs') as string[];
  return (
    <Section tone="navy">
      <Reveal className="mx-auto max-w-3xl text-center">
        {/* Gancho grande antes de la sinopsis */}
        <p className="font-serif text-3xl italic leading-tight text-gold-300 md:text-4xl">
          “{th('hook')}”
        </p>
        <GoldDivider className="my-7" />
        <SectionLabel>{t('label')}</SectionLabel>
      </Reveal>
      <div className="mx-auto mt-4 max-w-3xl space-y-6">
        {paragraphs.map((p, i) => (
          <Reveal as="p" key={i} delay={i * 0.08} className="text-lg leading-relaxed text-cream-50/80">
            {p}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function IdealFor() {
  const t = useTranslations('book.idealFor');
  const items = t.raw('items') as string[];
  return (
    <Section tone="navy">
      <Reveal className="text-center">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle className="mt-4">{t('title')}</SectionTitle>
        <GoldDivider className="my-6" />
      </Reveal>
      <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
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
    </Section>
  );
}

function FinalCta() {
  const t = useTranslations('book.cta');
  return (
    <Section tone="navy-deep">
      <Reveal className="mx-auto max-w-2xl text-center">
        <BookOpen className="mx-auto h-8 w-8 text-gold-400" />
        <SectionTitle className="mt-5" foil>
          {t('title')}
        </SectionTitle>
        <p className="mx-auto mt-5 max-w-xl text-cream-50/75">{t('body')}</p>
        <div className="mt-8 flex justify-center">
          <BookCta />
        </div>
      </Reveal>
    </Section>
  );
}
