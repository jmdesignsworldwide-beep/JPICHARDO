import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Instagram, Music2, LinkIcon, BookOpenText, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section, SectionLabel, SectionTitle } from '@/components/ui/Section';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonAnchor } from '@/components/ui/Button';
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
      <Follow />
      <Gallery />
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
    <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
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
  // Mosaico ilustrativo del estilo del devocional (composición de diseño,
  // no fotos de stock). Cada tarjeta evoca una publicación diaria.
  const refs = [
    'Salmos 23',
    'Proverbios 3:5',
    'Filipenses 4:13',
    'Isaías 40:31',
    'Josué 1:9',
    'Romanos 8:28',
    'Salmos 46:1',
    'Jeremías 29:11',
  ];
  return (
    <Section tone="navy">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {refs.map((r, i) => (
          <Reveal
            key={r}
            delay={(i % 4) * 0.05}
            className="flex aspect-square flex-col items-center justify-center rounded-xl border border-gold-500/15 bg-gradient-to-br from-navy-600/40 via-navy-800 to-navy-900 p-4 text-center"
          >
            <span className="font-label text-[0.55rem] uppercase tracking-label text-gold-400/80">
              Biblia Abierta
            </span>
            <span className="mt-2 font-serif text-lg italic text-cream-50/90">{r}</span>
            <span className="mt-3 h-px w-8 bg-gold-500/40" aria-hidden />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
