// Renders a schema.org JSON-LD block. Escapes `<` to `<` so a stray
// "</script>" in any (possibly admin-entered) string can't break out of the
// script element — the recommended hardening for inline JSON-LD, which must
// stay valid JSON (so an HTML sanitizer is not applicable here).
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
