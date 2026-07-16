import { notFound } from 'next/navigation';

/**
 * Catch-all dentro de [locale]: cualquier ruta no reconocida dispara el
 * not-found localizado (app/[locale]/not-found.tsx). Patrón recomendado por
 * next-intl para evitar el conflicto de "root layout" del not-found global.
 */
export default function CatchAll() {
  notFound();
}
