import { useTranslations } from 'next-intl';
import {
  Instagram,
  Music2,
  ArrowRight,
  Clock,
  MapPin,
  Home as HomeIcon,
} from 'lucide-react';
import { Section, SectionLabel, SectionTitle } from '@/components/ui/Section';
import { ButtonLink, ButtonAnchor } from '@/components/ui/Button';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { Reveal } from '@/components/ui/Reveal';
import { OrnamentFrame } from '@/components/ui/OrnamentFrame';
import { Card } from '@/components/ui/Card';
import { PastorPortrait } from '@/components/brand/PastorPortrait';
import { PhotoShowcase } from '@/components/sections/PhotoShowcase';
import { site } from '@/lib/config';

/* ── Bienvenida ─────────────────────────────────────────── */
export function WelcomeTeaser() {
  const t = useTranslations('home.welcome');
  return (
    <Section tone="navy">
      <Reveal className="mx-auto max-w-3xl text-center">
        <OrnamentFrame className="px-6 py-10 sm:px-12">
          <SectionLabel>{t('eyebrow')}</SectionLabel>
          <SectionTitle className="mt-4" foil>
            {t('title')}
          </SectionTitle>
          <GoldDivider className="my-6" />
          <p className="font-serif text-2xl italic leading-relaxed text-cream-50/90 md:text-3xl">
            “{t('tagline')}”
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-cream-50/70">{t('body')}</p>
          <div className="mt-8">
            <ButtonLink href="/nosotros" variant="secondary">
              {t('cta')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </OrnamentFrame>
      </Reveal>
    </Section>
  );
}

/* ── El Pastor (teaser) ─────────────────────────────────── */
export function PastorTeaser() {
  const t = useTranslations('home.pastor');
  return (
    <Section tone="navy-deep">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-last lg:order-first">
          <SectionLabel>{t('eyebrow')}</SectionLabel>
          <SectionTitle className="mt-4">{t('title')}</SectionTitle>
          <GoldDivider className="my-6 ml-0 justify-start" />
          <p className="max-w-lg text-lg text-cream-50/75">{t('body')}</p>
          <div className="mt-8">
            <ButtonLink href="/pastor">
              {t('cta')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto w-full max-w-sm">
          <div className="border-beam overflow-hidden rounded-2xl shadow-book ring-1 ring-gold-500/25">
            <PastorPortrait className="block w-full" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── Devocional Biblia Abierta (teaser) ─────────────────── */
export function DevotionalTeaser() {
  const t = useTranslations('home.devotional');
  return (
    <Section tone="navy">
      <Reveal>
        <Card hover={false} className="overflow-hidden !p-0">
          <div className="grid gap-8 p-8 md:grid-cols-[1.3fr_1fr] md:items-center md:p-12">
            <div>
              <SectionLabel>{t('eyebrow')}</SectionLabel>
              <SectionTitle className="mt-4 !text-3xl md:!text-4xl">
                {t('title')}
              </SectionTitle>
              <p className="mt-5 max-w-lg text-cream-50/75">{t('body')}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonAnchor href={site.social.instagram} variant="secondary" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </ButtonAnchor>
                <ButtonAnchor href={site.social.tiktok} variant="secondary" aria-label="TikTok">
                  <Music2 className="h-4 w-4" />
                  TikTok
                </ButtonAnchor>
                <ButtonLink href="/devocional" variant="ghost">
                  {t('cta')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </ButtonLink>
              </div>
            </div>

            {/* Mosaico ilustrativo de estilo (composición de diseño) */}
            <div className="grid grid-cols-3 gap-2" aria-hidden>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center rounded-lg border border-gold-500/20 bg-gradient-to-br from-navy-600/40 to-navy-900 text-gold-500/60"
                >
                  <span className="font-serif text-xs italic">
                    {['Sal', 'Pro', 'Jn', 'Fil', 'Rom', 'Is'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}

/* ── El libro (showcase con foto real) ──────────────────── */
export function BookShowcaseHome() {
  const t = useTranslations('home.bookShowcase');
  const tc = useTranslations('common');
  return (
    <Section tone="navy">
      <Reveal className="mx-auto mb-10 max-w-2xl text-center">
        <SectionLabel>{t('eyebrow')}</SectionLabel>
        <SectionTitle className="mt-4" foil>
          {t('title')}
        </SectionTitle>
        <GoldDivider className="my-6" />
        <p className="text-cream-50/75">{t('body')}</p>
      </Reveal>

      <PhotoShowcase
        src="/libro-en-estante.png"
        alt="Una mano toma el libro Comenzando Mi Viaje de una estantería — tu primer paso hacia una fe firme."
        width={1122}
        height={1402}
      />

      <div className="mt-8 flex justify-center">
        <ButtonLink href="/libro">
          {tc('knowTheBook')}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </ButtonLink>
      </div>
    </Section>
  );
}

/* ── Visítanos (teaser) ─────────────────────────────────── */
export function VisitTeaser() {
  const t = useTranslations('home.visit');
  const ts = useTranslations('visit.schedule');
  return (
    <Section tone="navy-deep">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <SectionLabel>{t('eyebrow')}</SectionLabel>
          <SectionTitle className="mt-4">{t('title')}</SectionTitle>
          <GoldDivider className="my-6 justify-start" />
          <p className="max-w-lg text-lg text-cream-50/75">{t('body')}</p>
          <div className="mt-8">
            <ButtonLink href="/visitanos">
              {t('cta')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="grid gap-4 sm:grid-cols-2">
          <Card>
            <Clock className="h-6 w-6 text-gold-400" />
            <p className="mt-3 font-label text-[0.65rem] uppercase tracking-label text-gold-400">
              {ts('sunday.day')}
            </p>
            <p className="mt-1 font-display text-2xl">{ts('sunday.time')}</p>
            <p className="mt-1 text-sm text-cream-50/65">{ts('sunday.name')}</p>
          </Card>
          <Card>
            <HomeIcon className="h-6 w-6 text-gold-400" />
            <p className="mt-3 font-label text-[0.65rem] uppercase tracking-label text-gold-400">
              {ts('thursday.day')}
            </p>
            <p className="mt-1 font-display text-2xl">{ts('thursday.time')}</p>
            <p className="mt-1 text-sm text-cream-50/65">{ts('thursday.name')}</p>
          </Card>
          <Card className="sm:col-span-2">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-400" />
              <p className="text-sm text-cream-50/80">{site.address.full}</p>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
