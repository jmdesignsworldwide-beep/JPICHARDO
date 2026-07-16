/**
 * Rayos de luz de amanecer tenues (densidad baja) que laten lentamente.
 * CSS puro, evoca la luz filtrándose en un santuario — nunca meteoros.
 */
export function LightRays({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="light-rays" />
    </div>
  );
}
