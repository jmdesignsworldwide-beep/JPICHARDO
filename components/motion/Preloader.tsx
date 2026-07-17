'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

// Módulo-scope: la intro corre en cada CARGA real de la home, pero NO se
// repite en navegación interna (el módulo se reinicia solo al recargar).
let hasPlayed = false;

/**
 * Intro / preloader premium — SOLO en Inicio. Fondo crema con el logo
 * (fade + escala + shimmer + resplandor), luego se desvanece revelando el
 * sitio. El contenido del hero ya está en el DOM detrás (SSR/SEO intactos).
 */
// Easing tipo power2.inOut (SAHOS) — difuminación suave, sin rebote ni lineal.
const EASE_SAHOS = [0.65, 0, 0.35, 1] as const;

export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => !hasPlayed);

  useEffect(() => {
    if (hasPlayed) {
      setShow(false);
      return;
    }
    hasPlayed = true;
    document.body.style.overflow = 'hidden';
    const total = reduce ? 650 : 2000;
    const t = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = '';
    }, total);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, filter: 'blur(0px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.2, ease: 'linear' } }
              : { opacity: 0, filter: 'blur(8px)', transition: { duration: 0.75, ease: EASE_SAHOS } }
          }
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F3EEE3]"
        >
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={
              reduce
                ? { opacity: 0, transition: { duration: 0.2 } }
                : { opacity: 0, scale: 1.03, transition: { duration: 0.45, ease: EASE_SAHOS } }
            }
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[210px] sm:w-[270px]"
          >
            {!reduce && (
              <motion.span
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full blur-3xl"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(201,162,75,0.4), transparent 70%)',
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1.25 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            )}
            <Image
              src="/logo-jpichardo.png"
              alt="JPichardo Ministries"
              width={560}
              height={560}
              priority
              className="h-auto w-full select-none"
            />
            {!reduce && (
              <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <span className="preloader-shimmer" />
              </span>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
