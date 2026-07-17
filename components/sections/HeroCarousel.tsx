'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { BookOpen, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { BookMockup } from '@/components/brand/BookMockup';
import { ButtonLink } from '@/components/ui/Button';
import { AuroraBackground } from '@/components/motion/AuroraBackground';
import { LightRays } from '@/components/motion/LightRays';
import { Spotlight } from '@/components/motion/Spotlight';
import { GoldParticles } from '@/components/motion/GoldParticles';
import { BOOKS } from '@/lib/books';

type Slide = {
  titleTop: string;
  titleBottom: string;
  subtitle: string;
  hook: string;
  cta: string;
};

const ROTATE_MS = 5500;

/**
 * Hero rotativo del Inicio — alterna entre los libros del autor (data-driven
 * desde BOOKS). Auto-rota, flechas + puntos manuales (pausan el auto-rotado),
 * transición suave. Respeta prefers-reduced-motion (sin auto-rotado; estático).
 */
export function HeroCarousel() {
  const t = useTranslations('home.hero');
  const th = useTranslations('home');
  const tnav = useTranslations('home.heroNav');
  const tc = useTranslations('common');
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const slides = th.raw('heroSlides') as Slide[];
  const count = Math.min(slides.length, BOOKS.length);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  // Auto-rotado (pausado con reduce-motion, interacción o un solo libro).
  useEffect(() => {
    if (reduce || paused || count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearInterval(id);
  }, [reduce, paused, count]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  const go = useCallback(
    (dir: number) => {
      setIndex((i) => (i + dir + count) % count);
      setPaused(true);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => setPaused(false), 12000);
    },
    [count],
  );

  const slide = slides[index] ?? slides[0];
  const book = BOOKS[index] ?? BOOKS[0];

  if (!slide || !book) return null;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Atmósfera (compartida entre slides) */}
      <motion.div
        aria-hidden
        style={{ y: reduce ? 0 : bgY }}
        className="absolute inset-0 -z-20 bg-hero-sky"
      />
      <AuroraBackground className="-z-20 opacity-80" />
      <LightRays className="-z-10" />
      <GoldParticles className="-z-10" />
      <Spotlight />
      <div
        aria-hidden
        className="absolute inset-x-0 top-[8%] -z-10 mx-auto h-[46vh] w-[46vh] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(252,231,190,0.55), rgba(243,183,107,0.15), transparent 72%)',
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy-veil" />

      <motion.div
        style={{ y: reduce ? 0 : contentY }}
        className="container-x relative grid items-center gap-12 pt-28 pb-24 md:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8"
      >
        {/* Texto (swap por slide) */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow"
          >
            {t('eyebrow')}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="mt-4 font-display text-[clamp(2.4rem,8vw,6.5rem)] font-bold uppercase leading-[1.04] tracking-tightish">
                <span className="block font-normal text-bone/95">{slide.titleTop}</span>
                <span className="block text-foil-shimmer">{slide.titleBottom}</span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl font-display text-2xl font-normal tracking-tightish text-bone/90 md:text-3xl lg:mx-0">
                {slide.subtitle}
              </p>

              <p className="mt-4 font-serif text-2xl italic text-gold-400 md:text-3xl">
                “{slide.hook}”
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <ButtonLink href="/libro" size="lg">
                  <BookOpen className="h-4 w-4" />
                  {slide.cta}
                </ButtonLink>
                <ButtonLink href="/visitanos" variant="secondary" size="lg">
                  <MapPin className="h-4 w-4" />
                  {tc('visitUs')}
                </ButtonLink>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Verso al pie (compartido) */}
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

        {/* Libro protagonista (swap por slide) */}
        <div className="order-first flex flex-col items-center lg:order-last">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={reduce ? false : { opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <BookMockup
                priority
                src={book.cover}
                alt={`${slide.titleTop} ${slide.titleBottom} — ${t('eyebrow')}`}
              />
            </motion.div>
          </AnimatePresence>

          {/* Controles del carrusel */}
          {count > 1 && (
            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={tnav('prev')}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/40 text-gold-300 transition-colors hover:border-gold-400 hover:bg-gold-500/10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: count }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setIndex(i);
                      setPaused(true);
                      if (resumeTimer.current) clearTimeout(resumeTimer.current);
                      resumeTimer.current = setTimeout(() => setPaused(false), 12000);
                    }}
                    aria-label={`${tnav('goto')} ${i + 1}`}
                    aria-current={i === index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? 'w-7 bg-gold-400' : 'w-2 bg-gold-500/40 hover:bg-gold-500/70'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={tnav('next')}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/40 text-gold-300 transition-colors hover:border-gold-400 hover:bg-gold-500/10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
