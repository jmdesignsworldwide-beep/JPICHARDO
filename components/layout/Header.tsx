'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { Logo } from '@/components/brand/Logo';
import { LocaleSwitcher } from './LocaleSwitcher';
import { site } from '@/lib/config';
import { NAV_ITEMS } from '@/lib/nav';

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    // Diferimos la lectura inicial fuera del cuerpo del efecto (evita
    // setState síncrono en el efecto) y capturamos el estado ya scrolleado.
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // El menú móvil se cierra al pulsar un enlace (ver onClick), no vía efecto.
  const closeMenu = () => setOpen(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-gold-500/15 bg-navy-900/85 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link href="/" aria-label={t('brandAria')} className="flex items-center gap-3">
          <Logo size={40} />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-lg tracking-wide text-foil">
              {site.name}
            </span>
            <span className="font-label text-[0.55rem] uppercase tracking-label text-silver/70">
              {site.ministry}
            </span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={isActive(item.href)}
              className={`nav-link font-label text-[0.78rem] font-medium uppercase tracking-wide2 transition-colors ${
                isActive(item.href) ? 'text-gold-400' : 'text-cream-50/80 hover:text-gold-400'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          {/* Botón menú móvil */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t('close') : t('menu')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/25 text-gold-400 transition-colors hover:bg-gold-500/10 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menú móvil premium */}
      <div
        className={`overflow-hidden border-t border-gold-500/10 bg-navy-900/95 backdrop-blur-lg transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container-x flex flex-col py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              data-active={isActive(item.href)}
              className={`flex items-center justify-between border-b border-white/5 py-3.5 font-label text-sm uppercase tracking-wide2 transition-colors ${
                isActive(item.href) ? 'text-gold-400' : 'text-cream-50/85'
              }`}
            >
              {t(item.key)}
              <span className="h-1.5 w-1.5 rotate-45 bg-gold-500/60" aria-hidden />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
