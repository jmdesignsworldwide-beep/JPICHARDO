'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link, usePathname } from '@/i18n/navigation';
import { Logo } from '@/components/brand/Logo';
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

      <div className="container-x flex h-16 items-center justify-between md:h-20">
        {/* Marca */}
        <Link href="/" aria-label={t('brandAria')} className="group flex items-center gap-3">
          <span
            className="rounded-full ring-1 ring-gold-500/25 transition-shadow group-hover:ring-gold-400/50"
            style={{ boxShadow: '0 2px 14px rgba(0,0,0,0.35)' }}
          >
            <Logo size={40} />
          </span>
          <span className="hidden items-center leading-none sm:flex">
            <span className="font-display text-lg font-semibold tracking-tightish text-bone">
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
            className="fixed inset-0 top-0 -z-[1] h-[100dvh] bg-midnight/97 backdrop-blur-xl lg:hidden"
          >
            <nav className="container-x flex h-full flex-col justify-center gap-2 pt-20">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex items-baseline gap-3 border-b border-white/5 py-4 font-display text-3xl transition-colors ${
                      isActive(item.href) ? 'text-gold-400' : 'text-bone hover:text-gold-400'
                    }`}
                  >
                    <span className="font-label text-xs text-gold-500/60">
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
