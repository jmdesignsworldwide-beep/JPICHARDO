'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, MapPin } from 'lucide-react';
import { BookMockup } from '@/components/brand/BookMockup';
import { ButtonLink } from '@/components/ui/Button';
import { AuroraBackground } from '@/components/motion/AuroraBackground';
import { LightRays } from '@/components/motion/LightRays';
import { Spotlight } from '@/components/motion/Spotlight';

export function HomeHero() {
  const t = useTranslations('home.hero');
  const tc = useTranslations('common');
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  // Parallax sutil: el fondo se desplaza más lento que el contenido.
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Fondo amanecer cinematográfico (paleta de la portada) */}
      <motion.div
        aria-hidden
        style={{ y: reduce ? 0 : bgY }}
        className="absolute inset-0 -z-20 bg-hero-sky"
      />
      {/* Aurora que respira + rayos de luz de amanecer (tenues) */}
      <AuroraBackground className="-z-20 opacity-80" />
      <LightRays className="-z-10" />
      {/* Foco de luz que sigue el cursor (sutil) */}
      <Spotlight />
      {/* Sol / halo */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[8%] -z-10 mx-auto h-[46vh] w-[46vh] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(252,231,190,0.55), rgba(243,183,107,0.15), transparent 72%)',
        }}
      />
      {/* Veladura navy inferior para fundir con la siguiente sección */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy-veil" />
      {/* Estrellas/partículas sutiles */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.15]"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 20% 30%, #fff, transparent), radial-gradient(1px 1px at 70% 20%, #fff, transparent), radial-gradient(1px 1px at 40% 70%, #fff, transparent), radial-gradient(1px 1px at 85% 60%, #fff, transparent)',
          backgroundSize: '100% 100%',
        }}
      />

      <motion.div
        style={{ y: reduce ? 0 : contentY }}
        className="container-x relative grid items-center gap-12 pt-28 pb-20 md:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8"
      >
        {/* Texto */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow"
          >
            {t('eyebrow')}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="mt-4 font-display text-[3rem] font-semibold leading-[0.92] tracking-tightish sm:text-6xl md:text-7xl xl:text-8xl"
          >
            <span className="block font-light italic text-bone/95">{t('titleTop')}</span>
            <span className="block text-foil-shimmer">{t('titleBottom')}</span>
          </motion.h1>

          {/* Subtítulo real de la portada (Fraunces itálica, apoyo principal) */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl font-display text-2xl font-light italic text-bone/90 md:text-3xl lg:mx-0"
          >
            {t('subtitle')}
          </motion.p>

          {/* Línea de apoyo (utility) */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="mx-auto mt-4 max-w-lg text-sm text-slate lg:mx-0"
          >
            {t('support')}
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-4 font-display text-xl italic text-gold-400 md:text-2xl"
          >
            “{t('hook')}”
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <ButtonLink href="/libro" size="lg">
              <BookOpen className="h-4 w-4" />
              {tc('knowTheBook')}
            </ButtonLink>
            <ButtonLink href="/visitanos" variant="secondary" size="lg">
              <MapPin className="h-4 w-4" />
              {tc('visitUs')}
            </ButtonLink>
          </motion.div>

          {/* Verso al pie */}
          <motion.figure
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 border-l-2 border-gold-500/40 pl-4 text-left"
          >
            <blockquote className="font-serif text-lg italic text-cream-50/80">
              “{t('verse')}”
            </blockquote>
            <figcaption className="mt-1 font-label text-[0.65rem] uppercase tracking-label text-gold-400">
              {t('verseRef')}
            </figcaption>
          </motion.figure>
        </div>

        {/* Libro protagonista (mockup 3D real) */}
        <div className="order-first lg:order-last">
          <BookMockup priority />
        </div>
      </motion.div>

      {/* Indicador de scroll */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-6 mx-auto flex w-full justify-center"
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-gold-500/40 p-1">
          <span className="h-2 w-1 animate-pulse rounded-full bg-gold-400" />
        </span>
      </div>
    </section>
  );
}
