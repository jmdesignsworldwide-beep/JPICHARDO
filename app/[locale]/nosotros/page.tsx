import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Target, Eye, Gem, Music4, BookOpen, Send, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section, SectionLabel, SectionTitle } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { DraftBadge } from '@/components/ui/DraftBadge';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about.meta' });
  return buildMetadata({
    locale,
    path: '/nosotros',
    title: t('title'),
    description: t('description'),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <AboutHero />
      <Intro />
      <MissionVisionValues />
      <Functions />
      <AboutCta />
    </>
  );
}

function AboutHero() {
  const t = useTranslations('about.hero');
  return (
    <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('tagline')} />
  );
}

function Intro() {
  const t = useTranslations('about');
  return (
    <Section tone="navy">
      {/* BORRADOR - pendiente aprobación pastor (historia/bienvenida) */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-serif text-2xl italic leading-relaxed text-cream-50/85 md:text-3xl">
          {t('intro')}
        </p>
      </Reveal>
    </Section>
  );
}

function MissionVisionValues() {
  const t = useTranslations('about');
  const values = t.raw('values.items') as string[];
  return (
    <Section tone="navy-deep">
      {/* BORRADOR - pendiente aprobación pastor */}
      <Reveal className="mb-10 flex justify-center">
        <DraftBadge />
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Misión */}
        <Reveal>
          <Card className="h-full">
            <Target className="h-7 w-7 text-gold-400" />
            <h3 className="mt-4 font-label text-[0.72rem] font-semibold uppercase tracking-label text-gold-400">
              {t('mission.label')}
            </h3>
            <p className="mt-3 text-cream-50/80">{t('mission.body')}</p>
          </Card>
        </Reveal>
        {/* Visión */}
        <Reveal delay={0.08}>
          <Card className="h-full">
            <Eye className="h-7 w-7 text-gold-400" />
            <h3 className="mt-4 font-label text-[0.72rem] font-semibold uppercase tracking-label text-gold-400">
              {t('vision.label')}
            </h3>
            <p className="mt-3 text-cream-50/80">{t('vision.body')}</p>
          </Card>
        </Reveal>
        {/* Valores */}
        <Reveal delay={0.16}>
          <Card className="h-full">
            <Gem className="h-7 w-7 text-gold-400" />
            <h3 className="mt-4 font-label text-[0.72rem] font-semibold uppercase tracking-label text-gold-400">
              {t('values.label')}
            </h3>
            <ul className="mt-3 space-y-2">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-2 text-cream-50/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-500" aria-hidden />
                  {v}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

function Functions() {
  const t = useTranslations('about.functions');
  const items = [
    { key: 'worship', Icon: Music4 },
    { key: 'edification', Icon: BookOpen },
    { key: 'evangelism', Icon: Send },
  ] as const;

  return (
    <Section tone="navy">
      <Reveal className="text-center">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle className="mt-4">{t('title')}</SectionTitle>
        <GoldDivider className="my-6" />
        {/* BORRADOR - pendiente aprobación pastor */}
        <div className="flex justify-center">
          <DraftBadge />
        </div>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map(({ key, Icon }, i) => (
          <Reveal key={key} delay={i * 0.08}>
            <Card className="h-full text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/5 text-gold-400">
                <Icon className="h-6 w-6" strokeWidth={1.6} />
              </span>
              <h3 className="mt-5 font-display text-2xl">{t(`items.${key}.title`)}</h3>
              <p className="mt-3 text-cream-50/75">{t(`items.${key}.body`)}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function AboutCta() {
  const t = useTranslations('about.cta');
  return (
    <Section tone="navy-deep">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionTitle foil>{t('title')}</SectionTitle>
        <p className="mx-auto mt-5 max-w-xl text-cream-50/75">{t('body')}</p>
        <div className="mt-8">
          <ButtonLink href="/visitanos">
            {t('button')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
