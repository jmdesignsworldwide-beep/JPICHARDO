import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Facebook, Instagram, Music2, LinkIcon } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/brand/Logo';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { site } from '@/lib/config';
import { NAV_ITEMS } from '@/lib/nav';

export function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');

  const socials = [
    { href: site.social.facebook, label: 'Facebook', Icon: Facebook },
    { href: site.social.instagram, label: 'Instagram', Icon: Instagram },
    { href: site.social.tiktok, label: 'TikTok', Icon: Music2 },
    { href: site.social.linktree, label: 'Linktree', Icon: LinkIcon },
  ];

  return (
    <footer className="border-t border-gold-500/15 bg-ink-950 text-cream-50">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <Logo size={44} />
              <div className="leading-none">
                <p className="font-display text-lg text-foil">{site.name}</p>
                <p className="font-label text-[0.55rem] uppercase tracking-label text-silver/70">
                  {site.ministry}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs font-serif text-lg italic text-cream-50/75">
              {t('tagline')}
            </p>
          </div>

          {/* Explora */}
          <nav aria-label={t('explore')}>
            <h3 className="font-label text-[0.7rem] font-semibold uppercase tracking-label text-gold-400">
              {t('explore')}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream-50/70 transition-colors hover:text-gold-400"
                  >
                    {tn(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Horarios */}
          <div>
            <h3 className="font-label text-[0.7rem] font-semibold uppercase tracking-label text-gold-400">
              {t('schedule')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream-50/70">
              <li>{t('sundayShort')}</li>
              <li>{t('thursdayShort')}</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-label text-[0.7rem] font-semibold uppercase tracking-label text-gold-400">
              {t('contact')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-cream-50/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <span>{site.address.full}</span>
              </li>
              <li>
                <a href={`tel:${site.phoneHref}`} className="flex items-center gap-2.5 transition-colors hover:text-gold-400">
                  <Phone className="h-4 w-4 shrink-0 text-gold-500" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 break-all transition-colors hover:text-gold-400">
                  <Mail className="h-4 w-4 shrink-0 text-gold-500" />
                  {site.email}
                </a>
              </li>
            </ul>

            <h3 className="mt-6 font-label text-[0.7rem] font-semibold uppercase tracking-label text-gold-400">
              {t('followUs')}
            </h3>
            <div className="mt-3 flex gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/25 text-cream-50/80 transition-all hover:border-gold-400 hover:text-gold-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <GoldDivider className="my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-cream-50/50 sm:flex-row sm:text-left">
          <p>
            © {site.name}. {t('rights')}
          </p>
          {/* Crédito de diseño */}
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>
              {t('credit')}{' '}
              <span className="font-label uppercase tracking-wide2 text-gold-400">
                {site.designer.name}
              </span>
            </span>
            <span className="hidden text-gold-500/40 sm:inline">·</span>
            <a href={`mailto:${site.designer.email}`} className="transition-colors hover:text-gold-400">
              Email
            </a>
            <a href={site.designer.whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-400">
              WhatsApp
            </a>
            <a href={site.designer.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-400">
              Instagram
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
