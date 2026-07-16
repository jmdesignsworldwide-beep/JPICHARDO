/**
 * Línea divisoria dorada fina con adorno central (motivo del libro).
 */
export function GoldDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/70 sm:w-24" />
      <span className="relative flex h-2 w-2 rotate-45 items-center justify-center">
        <span className="h-2 w-2 rotate-0 bg-gradient-to-br from-gold-400 to-gold-600" />
      </span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/70 sm:w-24" />
    </div>
  );
}
