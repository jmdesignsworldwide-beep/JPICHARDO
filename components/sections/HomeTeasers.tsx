import Image from 'next/image';
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
import { BookMockup } from '@/components/brand/BookMockup';
import { BookGallery } from '@/components/sections/BookGallery';
import { DevotionalGrid } from '@/components/sections/DevotionalGrid';
import { site } from '@/lib/config';

/* ── Bienvenida ─────────────────────────────────────────── */
export function WelcomeTeaser() {
  const t = useTranslations('home.welcome');
  return (
    <Section tone="navy">
      <Reveal className="mx-auto max-w-3xl text-center">
        <OrnamentFrame className="px-6 py-10 sm:px-12">
          {/* Logo de Blessing House Church (azul) — SOLO en Inicio */}
          <div className="mx-auto mb-7 w-36 overflow-hidden rounded-2xl border border-gold-500/20 shadow-book ring-1 ring-gold-500/15 sm:w-44">
            <Image
              src="/blessing-house.png"
              alt="Blessing House Church"
              width={1254}
              height={1254}
              sizes="180px"
              className="h-auto w-full"
            />
          </div>
          {/* "Bienvenido a casa" + "Blessing House" como una sola unidad
              tipográfica coherente — mismo tamaño y alineación, sin salto brusco */}
          <h2 className="font-display text-3xl font-bold leading-[1.14] tracking-tightish sm:text-4xl">
            <span className="block font-normal text-bone/90">{t('eyebrow')}</span>
            <span className="block text-foil-shimmer">{t('title')}</span>
          </h2>
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
      {/* Dos columnas desde tablet (md); en móvil apila con la foto arriba
          y el texto centrado debajo para que no quede desbalanceado. */}
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">
        <Reveal className="order-last text-center md:order-first md:text-left">
          <SectionLabel>{t('eyebrow')}</SectionLabel>
          <SectionTitle className="mt-4">{t('title')}</SectionTitle>
          <GoldDivider className="my-6 justify-center md:justify-start" />
          <p className="mx-auto max-w-lg text-lg text-cream-50/75 md:mx-0">{t('body')}</p>
          <div className="mt-8 flex justify-center md:justify-start">
            <ButtonLink href="/pastor">
              {t('cta')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto w-full max-w-sm md:mx-0 md:ml-auto">
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
              {/* Logo Devocional Biblia Abierta (DBA) */}
              <div className="mb-4 flex items-center gap-3">
                <Image
                  src="/logo-devocional.png"
                  alt="Devocional Biblia Abierta"
                  width={112}
                  height={112}
                  sizes="64px"
                  className="h-14 w-14 rounded-xl object-cover ring-1 ring-gold-500/20 sm:h-16 sm:w-16"
                />
                <SectionLabel>{t('eyebrow')}</SectionLabel>
              </div>
              <SectionTitle className="!text-3xl md:!text-4xl" foil>
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

            {/* Publicaciones reales del Devocional Biblia Abierta */}
            <DevotionalGrid count={6} columns={3} />
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
      <Reveal className="mx-auto mb-12 max-w-2xl text-center">
        <SectionLabel>{t('eyebrow')}</SectionLabel>
        <SectionTitle className="mt-4" foil>
          {t('title')}
        </SectionTitle>
        <GoldDivider className="my-6" />
        <p className="text-cream-50/75">{t('body')}</p>
      </Reveal>

      {/* Portada real (flotación + tilt 3D) junto a la galería de fotos */}
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <BookMockup />
        </Reveal>
        <Reveal delay={0.1}>
          <SectionLabel>{t('galleryLabel')}</SectionLabel>
          <BookGallery className="mt-5" />
        </Reveal>
      </div>

      {/* Imagen editorial existente (se conserva) */}
      <div className="mt-16">
        <PhotoShowcase
          src="/libro-en-estante.png"
          alt="Una mano toma el libro Comenzando Mi Viaje de una estantería — tu primer paso hacia una fe firme."
          width={1122}
          height={1402}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <ButtonLink href="/libros">
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
