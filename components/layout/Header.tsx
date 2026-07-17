'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/navigation';
import { LocaleSwitcher } from './LocaleSwitcher';
import { site } from '@/lib/config';
import { NAV_ITEMS } from '@/lib/nav';

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Bloquea el scroll del body con el menú móvil abierto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeMenu = () => setOpen(false);
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-gold-500/20 bg-midnight/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      {/* Scrim superior SIEMPRE presente → texto legible sobre el hero claro */}
      {!scrolled && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-midnight/70 via-midnight/25 to-transparent"
        />
      )}

      <div className="container-x relative z-20 flex h-16 items-center justify-between md:h-20">
        {/* Marca */}
        <Link href="/" aria-label={t('brandAria')} className="group flex items-center gap-3">
          {/* Medallón crema con el emblema JP — específico del header */}
          <Image
            src="/logo-jpichardo-header.png"
            alt="JPichardo Ministries"
            width={56}
            height={56}
            priority
            className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-105 md:h-12 md:w-12"
          />
          <span className="hidden items-center leading-none min-[360px]:flex">
            <span className="whitespace-nowrap font-display text-sm font-semibold tracking-tightish text-gold-300 sm:text-lg">
              {site.ministry}
            </span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={isActive(item.href)}
              className={`nav-link font-label text-[0.72rem] font-medium uppercase tracking-wide2 transition-colors ${
                isActive(item.href) ? 'text-gold-400' : 'text-bone/85 hover:text-gold-400'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t('close') : t('menu')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/30 bg-midnight/40 text-gold-400 backdrop-blur-sm transition-colors hover:bg-gold-500/10 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menú móvil full-screen premium */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-10 h-[100dvh] overflow-y-auto bg-midnight lg:hidden"
          >
            <nav className="container-x flex min-h-full flex-col justify-center gap-1 py-24">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex items-center gap-4 border-b border-white/5 py-5 font-display text-3xl font-semibold tracking-tightish transition-colors ${
                      isActive(item.href) ? 'text-gold-400' : 'text-bone hover:text-gold-400'
                    }`}
                  >
                    <span className="font-label text-sm font-medium text-gold-500/70">
                      0{i + 1}
                    </span>
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
