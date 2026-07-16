import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ArrowRight, Quote, Facebook, Instagram, Music2, LinkIcon, MapPin } from 'lucide-react';
import { Section, SectionLabel, SectionTitle } from '@/components/ui/Section';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink, ButtonAnchor } from '@/components/ui/Button';
import { OrnamentFrame } from '@/components/ui/OrnamentFrame';
import { PastorPortrait } from '@/components/brand/PastorPortrait';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { NumberTicker } from '@/components/motion/NumberTicker';
import { JsonLd } from '@/components/seo/JsonLd';
import { pastorJsonLd } from '@/lib/jsonld';
import { site } from '@/lib/config';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pastor.meta' });
  return buildMetadata({
    locale,
    path: '/pastor',
    title: t('title'),
    description: t('description'),
  });
}

export default async function PastorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd data={pastorJsonLd} />
      <PastorHero />
      <Bio />
      <StatBand />
      <Ministry />
      <BookTeaser />
      <MinistryConnect />
    </>
  );
}

function StatBand() {
  const t = useTranslations('pastor.stat');
  return (
    <Section tone="navy">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-label text-[0.72rem] uppercase tracking-label text-gold-400">
          {t('since')}
        </p>
        <NumberTicker
          value={2002}
          className="mt-2 block font-display text-6xl leading-none text-foil-shimmer md:text-7xl"
        />
        <p className="mx-auto mt-4 max-w-md text-cream-50/65">{t('caption')}</p>
      </Reveal>
    </Section>
  );
}

function PastorHero() {
  const t = useTranslations('pastor.hero');
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40">
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy-900" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 0%, rgba(30,58,95,0.5), transparent 70%)',
        }}
      />
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="mx-auto w-full max-w-sm">
          <OrnamentFrame className="p-3">
            <div className="overflow-hidden rounded-2xl shadow-book ring-1 ring-gold-500/25">
              <PastorPortrait className="block w-full" />
            </div>
          </OrnamentFrame>
        </Reveal>

        <Reveal delay={0.1} className="text-center lg:text-left">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h1 className="mt-4 font-display text-5xl leading-none text-foil md:text-6xl">
            {t('title')}
          </h1>
          <GoldDivider className="my-6 justify-center lg:justify-start" />
          <p className="font-serif text-xl italic text-cream-50/80 md:text-2xl">
            {t('subtitle')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Bio() {
  const t = useTranslations('pastor.bio');
  const paragraphs = t.raw('paragraphs') as string[];
  return (
    <Section tone="navy-deep">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <SectionLabel>{t('label')}</SectionLabel>
          <GoldDivider className="my-6" />
        </Reveal>
        <div className="mt-4 space-y-6">
          {paragraphs.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 0.06} className="text-lg leading-relaxed text-cream-50/80">
              {p}
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Ministry() {
  const t = useTranslations('pastor.ministry');
  return (
    <Section tone="navy">
      <Reveal>
        <OrnamentFrame className="mx-auto max-w-3xl px-6 py-12 text-center sm:px-12">
          <div className="mx-auto w-56 overflow-hidden rounded-2xl bg-cream-50 p-4 shadow-book ring-1 ring-gold-500/25 sm:w-64">
            <BrandLogo className="h-auto w-full" width={340} />
          </div>
          <SectionLabel className="mt-6 block">{t('label')}</SectionLabel>
          <SectionTitle className="mt-3" foil>
            {t('title')}
          </SectionTitle>
          <GoldDivider className="my-6" />
          <p className="mx-auto max-w-2xl text-lg text-cream-50/75">{t('body')}</p>
        </OrnamentFrame>
      </Reveal>
    </Section>
  );
}

function BookTeaser() {
  const t = useTranslations('pastor.bookTeaser');
  return (
    <Section tone="navy-deep">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="mx-auto w-56 sm:w-64">
          <Image
            src="/libro-mockup-3d.png"
            alt="Libro Comenzando Mi Viaje — mockup 3D"
            width={1024}
            height={1536}
            sizes="256px"
            className="h-auto w-full drop-shadow-[0_24px_36px_rgba(0,0,0,0.5)]"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Quote className="h-8 w-8 text-gold-500/60" />
          <SectionLabel className="mt-4 block">{t('label')}</SectionLabel>
          <SectionTitle className="mt-3">{t('title')}</SectionTitle>
          <p className="mt-5 max-w-lg text-lg text-cream-50/75">{t('body')}</p>
          <div className="mt-8">
            <ButtonLink href="/libro">
              {t('cta')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function MinistryConnect() {
  const t = useTranslations('pastor.connect');
  const socials = [
    { href: site.social.facebook, label: t('facebook'), Icon: Facebook },
    { href: site.social.instagram, label: t('instagram'), Icon: Instagram },
    { href: site.social.tiktok, label: t('tiktok'), Icon: Music2 },
    { href: site.social.linktree, label: t('linktree'), Icon: LinkIcon },
  ];
  return (
    <Section tone="navy">
      <Reveal className="mx-auto max-w-3xl text-center">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle className="mt-4">{t('title')}</SectionTitle>
        <GoldDivider className="my-6" />
        <p className="mx-auto max-w-xl text-cream-50/75">{t('body')}</p>
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-3">
        {socials.map(({ href, label, Icon }) => (
          <ButtonAnchor key={label} href={href} variant="secondary" aria-label={label}>
            <Icon className="h-4 w-4" />
            {label}
          </ButtonAnchor>
        ))}
      </Reveal>

      <Reveal delay={0.16} className="mt-8 flex justify-center">
        <ButtonLink href="/visitanos">
          <MapPin className="h-4 w-4" />
          {t('visitCta')}
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
