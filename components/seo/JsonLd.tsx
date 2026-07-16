/**
 * Inserta un bloque JSON-LD (structured data). El contenido es SIEMPRE
 * estático (definido en lib/jsonld.ts), nunca input de usuario, por lo que
 * el uso de dangerouslySetInnerHTML aquí es seguro. Un <script type="application/
 * ld+json"> no es JS ejecutable; la CSP con 'unsafe-inline' en script-src lo permite.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
