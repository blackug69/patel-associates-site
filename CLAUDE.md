# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The line above is not decoration: this is **Next.js 16.2.10**, which has breaking
> changes from older versions. Read the relevant guide in
> `node_modules/next/dist/docs/` before writing routing/rendering code.

## Commands

```bash
npm run dev     # Next dev server at http://localhost:3000
npm run build   # Production build — also the primary correctness gate (type errors + static-param generation)
npm run start    # Serve the production build
npm run lint    # ESLint (eslint-config-next)
```

There is **no test framework** — this is a static content site, and adding one is
considered a YAGNI violation (see `docs/superpowers/plans/`). Verification for any
change is: `npm run build` + `npm run lint` + a dev-server render check at the affected route.

## Architecture

Marketing site for an Ahmedabad accounting/legal firm. Next.js App Router under
`src/`, React 19, TypeScript (`@/*` → `src/*`), Tailwind v4. Nearly everything is a
static Server Component; only navigation and the contact form are client components.

**Content is typed TypeScript data, not a CMS.** The two source-of-truth modules:
- `src/lib/services.ts` — the `services` array + `getService(slug)`. This single array
  drives the homepage services grid, the footer, `ServiceIcon`, AND generates every
  `/services/[slug]` page via `generateStaticParams`. Add/rename a service here and it
  propagates everywhere; the icon map in `src/components/service-icon.tsx` must be kept
  in sync (keyed by slug).
- Per-page content (WHY, INDUSTRIES, TESTIMONIALS, FAQs) is inlined as `const` arrays at
  the top of the page file (see `src/app/page.tsx`).

**Dynamic route typing (Next 16):** params are async. Copy the exact style in
`src/app/services/[slug]/page.tsx` — `{ params }: { params: Promise<{ slug: string }> }`
then `const { slug } = await params;`. Do not use a `PageProps` helper.

**Layout:** `src/app/layout.tsx` wraps every page with `SiteNav`, `SiteFooter`, and
`ScrollReveals`. `<html>` is hardcoded `data-theme="light"`.

## Styling — read before touching CSS

This is deliberately **not** a utility-first Tailwind project. Almost all styling lives
in hand-written classes in `src/app/globals.css` (e.g. `.section`, `.card`, `.hero__grid`,
`.page-hero`). Reuse those classes; add new CSS only when none fits.

Key non-obvious decisions, all load-bearing:
- **Tailwind runs WITHOUT Preflight.** The `@layer theme, base, components, utilities`
  order in `globals.css` is intentional so the bespoke `base` reset wins over utilities
  where needed. Because there's no Preflight reset, components must explicitly undo UA
  styles (e.g. `<Button>` sets `no-underline` and an explicit font-family — see the note
  in `src/components/ui/button.tsx`).
- **Design tokens are CSS custom properties** (warm-monochrome: `--ink-900`, `--paper-0`,
  `--line`, serif/sans/mono font stacks, `--s1..--s9` spacing scale, `--ease`). Use tokens,
  never raw hex or ad-hoc spacing.
- **Dark sections** use the `.on-dark` class, which flips colors via unlayered override
  rules (they beat the layered utility colors by cascade). `<Button>` variants invert
  automatically inside `.on-dark`.
- **Fonts** (Fraunces / Libre Franklin / Spline Sans Mono) are declared as CSS font stacks,
  NOT via `next/font/google`, so builds never block on the Google Fonts CDN.

`docs/design/DESIGN_DIRECTION.md` is the binding design spec (editorial, minimal, warm
monochrome, no color, no heavy shadows). Consult it before making visual choices.

## Conventions

- All buttons render through `@/components/ui/button` `<Button>` (shadcn + CVA). Only
  `primary` and `outline` variants exist. Use `asChild` to render as a `next/link`.
- Icons: `lucide-react` only, `strokeWidth={1.5}`, monochrome.
- Images: plain `<img>` with `{/* eslint-disable-next-line @next/next/no-img-element */}`,
  never `next/image`.
- Placeholder copy must be on-brand (tax/accounting/legal), never lorem ipsum; pages
  heavy on placeholders carry a `<p className="placeholder-note reveal">`.
- Scroll-reveal animation: add `reveal` to a class list; `ScrollReveals` adds `is-in` on
  intersection and respects `prefers-reduced-motion`.
- Firm phone `98254 42028` links as `tel:+919825442028`; "Book a Consultation" → `/contact`.

## Contact form

`src/app/actions.ts` `submitEnquiry` is a `"use server"` Server Action used by
`patel-contact-form.tsx` via `useActionState`. It validates server-side, has a honeypot
(`company` field), and sends via Resend **only if `RESEND_API_KEY` is set** — otherwise
it logs the enquiry with `console.info` so the flow still works locally.
`whatsapp-button.tsx` IS wired (rendered sitewide in `src/app/(site)/layout.tsx`).
(Note: `src/components/contact-form.tsx` exists but is not currently wired into any page.)
