import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Instagram, Music2, LinkIcon, BookOpenText, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section, SectionLabel, SectionTitle } from '@/components/ui/Section';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonAnchor } from '@/components/ui/Button';
import { DevotionalGrid } from '@/components/sections/DevotionalGrid';
import { site } from '@/lib/config';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'devotional.meta' });
  return buildMetadata({
    locale,
    path: '/devocional',
    title: t('title'),
    description: t('description'),
  });
}

export default async function DevotionalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <DevHero />
      <Intro />
      <AboutDev />
      <Gallery />
      <Follow />
      <FollowCta />
    </>
  );
}

function FollowCta() {
  const t = useTranslations('devotional.cta');
  return (
    <Section tone="navy-deep">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Sparkles className="mx-auto h-8 w-8 text-gold-400" />
        <SectionTitle className="mt-5" foil>
          {t('title')}
        </SectionTitle>
        <p className="mx-auto mt-5 max-w-xl text-cream-50/75">{t('body')}</p>
        <div className="mt-8 flex justify-center">
          <ButtonAnchor href={site.social.linktree}>
            <LinkIcon className="h-4 w-4" />
            {t('button')}
          </ButtonAnchor>
        </div>
      </Reveal>
    </Section>
  );
}

function DevHero() {
  const t = useTranslations('devotional.hero');
  return (
    <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')}>
      {/* Logo Devocional Biblia Abierta (DBA) */}
      <div className="mx-auto w-40 overflow-hidden rounded-2xl shadow-book ring-1 ring-gold-500/25 sm:w-48">
        <Image
          src="/logo-devocional.png"
          alt="Devocional Biblia Abierta"
          width={400}
          height={400}
          sizes="192px"
          className="h-auto w-full"
        />
      </div>
    </PageHero>
  );
}

function Intro() {
  const t = useTranslations('devotional.intro');
  return (
    <Section tone="navy">
      <Reveal className="mx-auto max-w-3xl text-center">
        <BookOpenText className="mx-auto h-8 w-8 text-gold-400" />
        <SectionLabel className="mt-5 block">{t('label')}</SectionLabel>
        <GoldDivider className="my-6" />
        <p className="text-lg leading-relaxed text-cream-50/80">{t('body')}</p>
      </Reveal>
    </Section>
  );
}

function AboutDev() {
  const t = useTranslations('devotional.about');
  return (
    /* BORRADOR - pendiente aprobación pastor */
    <Section tone="navy-deep">
      <Reveal className="mx-auto max-w-3xl text-center">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle className="mt-4" foil>
          {t('title')}
        </SectionTitle>
        <GoldDivider className="my-6" />
        <p className="text-lg leading-relaxed text-cream-50/80">{t('body')}</p>
      </Reveal>
    </Section>
  );
}

function Follow() {
  const t = useTranslations('devotional.follow');
  const links = [
    {
      href: site.social.instagram,
      Icon: Instagram,
      label: t('instagram'),
      handle: site.devotional.instagramHandle,
      meta: '',
    },
    {
      href: site.social.tiktok,
      Icon: Music2,
      label: t('tiktok'),
      handle: site.devotional.tiktokHandle,
      meta: `${site.devotional.tiktokFollowers} ${t('followers')}`,
    },
    {
      href: site.social.linktree,
      Icon: LinkIcon,
      label: t('linktree'),
      handle: 'linktr.ee/Blessing_House',
      meta: '',
    },
  ];

  return (
    <Section tone="navy-deep">
      <Reveal className="text-center">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle className="mt-4">{t('title')}</SectionTitle>
        <GoldDivider className="my-6" />
      </Reveal>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {links.map(({ href, Icon, label, handle, meta }, i) => (
          <Reveal key={label} delay={i * 0.08}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col items-center rounded-2xl border border-gold-500/20 bg-navy-900/60 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-gold"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-hero-gold text-navy-900 transition-transform group-hover:scale-105">
                <Icon className="h-7 w-7" />
              </span>
              <span className="mt-5 font-display text-2xl">{label}</span>
              <span className="mt-1 text-sm text-gold-400">{handle}</span>
              {meta && <span className="mt-1 text-xs text-cream-50/60">{meta}</span>}
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Gallery() {
  const t = useTranslations('devotional.follow');
  // Publicaciones reales del Devocional Biblia Abierta (/devocional-1..10.jpg).
  return (
    <Section tone="navy">
      <Reveal className="mb-8 text-center">
        <SectionLabel>{t('label')}</SectionLabel>
      </Reveal>
      <DevotionalGrid count={10} columns={4} />
    </Section>
  );
}
