'use client';

import { ShoppingCart } from 'lucide-react';
import { ButtonAnchor } from '@/components/ui/Button';
import { track } from './track';

/** Botón "Comprar en Amazon" que registra el clic (intención de compra) por libro. */
export function TrackedBuyButton({
  href,
  slug,
  label,
}: {
  href: string;
  slug: string;
  label: string;
}) {
  return (
    <ButtonAnchor href={href} size="lg" onClick={() => track({ type: 'amazon', bookSlug: slug })}>
      <ShoppingCart className="h-4 w-4" />
      {label}
    </ButtonAnchor>
  );
}
