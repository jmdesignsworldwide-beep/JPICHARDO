import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Clock, Home as HomeIcon, MapPin, Phone, Mail, Facebook, Navigation } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section, SectionLabel, SectionTitle } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonAnchor } from '@/components/ui/Button';
import { ContactForm } from '@/components/sections/ContactForm';
import { Faq } from '@/components/sections/Faq';
import { site, MAPS_EMBED_SRC, MAPS_LINK } from '@/lib/config';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'visit.meta' });
  return buildMetadata({
    locale,
    path: '/visitanos',
    title: t('title'),
    description: t('description'),
  });
}

export default async function VisitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <VisitHero />
      <ChurchBrand />
      <Schedule />
      <Location />
      {/* BORRADOR - pendiente aprobación pastor */}
      <Faq />
      <ContactSection />
    </>
  );
}

function VisitHero() {
  const t = useTranslations('visit.hero');
  // "Blessing House" queda junto en su propia línea (salto controlado + nowrap).
  return (
    <PageHero
      eyebrow={t('eyebrow')}
      title={
        <>
          {t('title')}
          <br />
          <span className="whitespace-nowrap">Blessing House</span>
        </>
      }
      subtitle={t('subtitle')}
    />
  );
}

function ChurchBrand() {
  // SOLO aquí: logo azul real de Blessing House Church (la iglesia física).
  // El logo ya incluye el wordmark "BLESSING HOUSE CHURCH", por eso no se
  // repite el título en texto.
  const t = useTranslations('visit.church');
  return (
    <Section tone="navy">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionLabel>{t('label')}</SectionLabel>
        <div className="mx-auto mt-6 w-full max-w-xs overflow-hidden rounded-2xl border border-gold-500/20 shadow-book ring-1 ring-gold-500/15">
          <Image
            src="/blessing-house.png"
            alt={t('logoAlt')}
            width={1254}
            height={1254}
            sizes="320px"
            className="h-auto w-full"
          />
        </div>
        <GoldDivider className="my-7" />
        <p className="mx-auto max-w-xl text-lg text-cream-50/80">{t('body')}</p>
        {/* BORRADOR - pendiente aprobación pastor */}
        <div className="mx-auto mt-12 max-w-md border-t border-gold-500/15 pt-10 pb-2">
          <p className="font-label text-[0.7rem] uppercase tracking-label text-gold-400">
            {t('pastorsLabel')}
          </p>
          <p className="mt-4 font-display text-xl font-semibold tracking-tightish text-bone md:text-2xl">
            {t('pastorsNames')}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

function Schedule() {
  const t = useTranslations('visit.schedule');
  return (
    <Section tone="navy">
      <Reveal className="text-center">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle className="mt-4">{t('title')}</SectionTitle>
        <GoldDivider className="my-6" />
      </Reveal>
      <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
        <Reveal>
          <Card className="h-full">
            <Clock className="h-7 w-7 text-gold-400" />
            <p className="mt-4 font-label text-[0.7rem] uppercase tracking-label text-gold-400">
              {t('sunday.day')}
            </p>
            <p className="mt-1 font-display text-4xl text-foil">{t('sunday.time')}</p>
            <p className="mt-2 text-cream-50/70">{t('sunday.name')}</p>
          </Card>
        </Reveal>
        <Reveal delay={0.08}>
          <Card className="h-full">
            <HomeIcon className="h-7 w-7 text-gold-400" />
            <p className="mt-4 font-label text-[0.7rem] uppercase tracking-label text-gold-400">
              {t('thursday.day')}
            </p>
            <p className="mt-1 font-display text-4xl text-foil">{t('thursday.time')}</p>
            <p className="mt-2 text-cream-50/70">{t('thursday.name')}</p>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

function Location() {
  const t = useTranslations('visit.location');
  return (
    <Section tone="navy-deep">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionLabel>{t('label')}</SectionLabel>
          <SectionTitle className="mt-4">{t('title')}</SectionTitle>
          <GoldDivider className="my-6 justify-start" />
          <div className="flex items-start gap-3 text-lg text-cream-50/80">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-400" />
            <p>{site.address.full}</p>
          </div>
          <div className="mt-6">
            <ButtonAnchor href={MAPS_LINK} variant="secondary">
              <Navigation className="h-4 w-4" />
              {t('directions')}
            </ButtonAnchor>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-gold-500/20 shadow-book">
            <iframe
              title={t('mapTitle')}
              src={MAPS_EMBED_SRC}
              className="h-[340px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function ContactSection() {
  const t = useTranslations('visit.contactInfo');
  const tf = useTranslations('contact');

  const items = [
    { Icon: Phone, label: t('phone'), value: site.phone, href: `tel:${site.phoneHref}`, external: false },
    { Icon: Mail, label: t('email'), value: site.email, href: `mailto:${site.email}`, external: false },
    { Icon: Facebook, label: t('facebook'), value: 'blessinghouse07', href: site.social.facebook, external: true },
  ];

  return (
    <Section tone="navy">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Datos de contacto */}
        <Reveal>
          <SectionLabel>{t('label')}</SectionLabel>
          <GoldDivider className="my-6 justify-start" />
          <ul className="space-y-4">
            {items.map(({ Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-4 rounded-xl border border-gold-500/15 bg-navy-800/50 p-4 transition-all hover:border-gold-400/40 hover:shadow-gold"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-label text-[0.62rem] uppercase tracking-label text-gold-400">
                      {label}
                    </span>
                    <span className="block truncate text-cream-50/85">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Formulario Fort Knox - Tanda 5 (ya construido: Zod + rate limit + honeypot) */}
        <Reveal delay={0.1}>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <SectionLabel>{tf('label')}</SectionLabel>
            <h2 className="mt-3 font-display text-3xl">{tf('title')}</h2>
            <p className="mt-2 text-cream-50/70">{tf('body')}</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
