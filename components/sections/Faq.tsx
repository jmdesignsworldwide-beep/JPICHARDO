'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Section, SectionLabel, SectionTitle } from '@/components/ui/Section';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { Reveal } from '@/components/ui/Reveal';

type Item = { q: string; a: string };

/**
 * Preguntas frecuentes de Visítanos — acordeón premium (expandir/colapsar
 * suave con Framer Motion). Respeta prefers-reduced-motion.
 */
export function Faq() {
  const t = useTranslations('visit.faq');
  const items = t.raw('items') as Item[];
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section tone="navy-deep">
      <Reveal className="text-center">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle className="mt-4">{t('title')}</SectionTitle>
        <GoldDivider className="my-6" />
      </Reveal>

      <div className="mx-auto mt-8 max-w-3xl divide-y divide-gold-500/15 overflow-hidden rounded-2xl border border-gold-500/15 bg-navy-900/50">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-gold-500/[0.04] sm:px-6"
              >
                <span className="font-display text-lg font-medium tracking-tightish text-bone">
                  {it.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="shrink-0 text-gold-400"
                >
                  <Plus className="h-5 w-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 leading-relaxed text-cream-50/75 sm:px-6">{it.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
