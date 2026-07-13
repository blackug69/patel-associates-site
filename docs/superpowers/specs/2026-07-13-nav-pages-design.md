# Design: New nav pages (Services, Results, Insights, FAQ)

**Date:** 2026-07-13
**Status:** Approved for planning

## Goal

Add four new pages to the Patel Accounting & Legal Services site and wire them into
navigation, converting the Services entry from a homepage anchor into a real page.
All content that is not yet real ships as **meaningful, on-brand placeholder** content
(like the existing Team members and Testimonials) — clearly labeled as replaceable,
never lorem ipsum.

## Context

- Next.js **16.2.10**, App Router, `src/` layout. Verified: async awaited `params`,
  `generateStaticParams`, `generateMetadata`, `next/link`, and Server-Component-by-default
  are all current v16 conventions and already used in `services/[slug]/page.tsx`. None of
  v16's breaking changes (proxy, next/image, caching APIs) touch this static content work.
- Content lives in typed data arrays. Shared-across-routes data goes in `src/lib/`
  (`services.ts`); single-page data is inlined in the page (`team/page.tsx`).
- Pages reuse a shared CSS system in `globals.css`: `page-hero`, `section`, `section-head`,
  `card`, `services__grid`, `faq__list`/`faq__item`, `cta-strip`, `prose`, `breadcrumb`,
  `stat`, `reveal`, `placeholder-note`, `photo-ph`.
- All buttons go through the shadcn `<Button>` component, warm-monochrome variants only
  (`primary`, `outline`). Never introduce other button styles.
- Plain `<img>` is used throughout (with eslint-disable), not `next/image`. New pages follow suit.

## Scope

### 1. Services → real page (`/services`)

- **New:** `src/app/services/page.tsx`.
- `page-hero` (eyebrow "What we do", heading, lead) + intro, then the full grid of all
  services rendered from the `services` array in `src/lib/services.ts` using the existing
  `card` / `services__grid` markup (same as homepage `#services`) — **no data duplication**.
  Each card links to its existing `/services/[slug]` detail page.
- Closes with the shared `cta-strip` (Book a Consultation + Call).
- `metadata` export with title/description.

### 2. Results (`/results`) — single page

- **New:** `src/app/results/page.tsx`.
- `page-hero` + a grid of meaningful case-study cards. Data inlined in the page (single
  route). Each card: a short **situation → what we did → outcome**. Placeholder but
  realistic and tax/accounting-relevant, e.g.:
  - Cleared a disputed GST notice for a manufacturer with no penalty.
  - Registered a startup and set up its books within three weeks.
  - Restructured a professional's filings to reduce tax outgo legitimately.
- A row of headline stat tiles reusing the `.stat` pattern (e.g. Years, Clients served,
  On-time filing rate) — placeholder numbers.
- One `placeholder-note` marking results as illustrative until real, named outcomes are added.
- Closes with `cta-strip`. `metadata` export.

### 3. Insights (`/insights` + `/insights/[slug]`)

- **New:** `src/lib/insights.ts` — a typed `posts` array + `getPost(slug)`, mirroring
  `services.ts`. Post type: `{ slug, title, category, date, excerpt, body: string[] }`.
  3–4 realistic articles on genuinely useful topics, e.g.:
  - "GST return due dates you shouldn't miss"
  - "LLP vs Private Limited: choosing your structure"
  - "What to do when an income-tax notice arrives"
- **New:** `src/app/insights/page.tsx` — index listing post cards (title, category, date,
  excerpt, "Read more →" to the detail page).
- **New:** `src/app/insights/[slug]/page.tsx` — full article using `page-hero` + `prose` +
  `breadcrumb` + `cta-strip`. Uses `generateStaticParams` and `generateMetadata`, copying
  the **exact typing style** of `services/[slug]/page.tsx` (`params: Promise<{ slug: string }>`,
  awaited) for consistency — not the newer `PageProps` helper.
- One `placeholder-note` on the index marking articles as samples until real posts are published.

### 4. FAQ (`/faq`)

- **New:** `src/app/faq/page.tsx`.
- `page-hero` + questions grouped by topic (GST, Income Tax, Accounting, Registration,
  General) using the existing `faq__list` / `faq__item` `<details>` markup. Data inlined
  (single route), drawing on the homepage FAQ plus a few more per group.
- Homepage FAQ section (`page.tsx` `#faq`) stays as a short teaser; add a "See all FAQs →"
  link to `/faq`.
- Closes with `cta-strip`. `metadata` export.

### Navigation & footer

- **`src/components/site-nav.tsx`** — `LINKS` becomes, all top-level:
  `Home · Services · Team · Results · Insights · Contact`.
  Drop the `/#about` and `/#services` anchors. `/services` is now a real route so
  `isActive` highlighting works normally. Keep the "Book a Consultation" button.
- **`src/components/site-footer.tsx`** — Company column becomes
  About (`/#about`) · Team · Results · Insights · Contact; add an FAQ link. Services
  column unchanged. Bottom "Privacy · Terms" left as-is.

### Link rewiring (`/#services` → `/services`)

- `src/app/page.tsx`: hero "View Services" button → `/services`.
- `src/app/services/[slug]/page.tsx`: breadcrumb "Services" link and "All Services"
  button → `/services`.
- Homepage `#services` section itself stays (one-page scroll still works).

## Files

**New**
- `src/app/services/page.tsx`
- `src/app/results/page.tsx`
- `src/app/insights/page.tsx`
- `src/app/insights/[slug]/page.tsx`
- `src/app/faq/page.tsx`
- `src/lib/insights.ts`

**Edited**
- `src/components/site-nav.tsx` (LINKS array)
- `src/components/site-footer.tsx` (Company column + FAQ link)
- `src/app/page.tsx` ("View Services" link; "See all FAQs" link)
- `src/app/services/[slug]/page.tsx` (breadcrumb + "All Services" links)
- `src/app/globals.css` (minimal new classes only where existing ones don't fit —
  e.g. post cards, result cards; match existing tokens and naming)

## Non-goals / YAGNI

- No CMS, MDX, or external data source — typed TS arrays only, matching the codebase.
- No real client names, numbers, or published articles (placeholders only, this pass).
- No Privacy/Terms page work beyond the existing footer text.
- No redesign of existing pages; reuse the current visual system.

## Success criteria

- Nav shows all six items and highlights the active page.
- `/services`, `/results`, `/insights`, `/insights/[slug]`, `/faq` all render, are
  statically generated, and link correctly to/from each other and `/contact`.
- No `/#services` links remain except the homepage's own in-page section.
- `next build` succeeds with no type errors; lint passes.
- All buttons render via `<Button>`; no new visual styles introduced.
