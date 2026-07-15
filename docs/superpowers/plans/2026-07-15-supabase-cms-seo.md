# Supabase CMS + CRM + SEO — Implementation Plan

> Supersedes the Insights/Team portions of `2026-07-13-nav-pages.md`. That plan
> built content as static TS; this one makes content Supabase-backed and
> admin-editable. Results/FAQ from the old plan are folded in here as DB content.

**Branch:** `supa`
**Date:** 2026-07-15
**Decisions locked:** Supabase is the single backend (Sanity parked). **All
collection content is admin-editable** (user chose "everything"). SEO is the
top priority. Design stays strictly within `docs/design/DESIGN_DIRECTION.md`
(editorial, minimal, warm-monochrome) — no new design language.

---

## 0. Blockers / prerequisites

1. **Supabase MCP access is still denied** (`list_tables` → "access denied,
   token scoped to a different organization"). The running MCP server holds the
   old token. **Fully restart Claude Code / reconnect the Supabase MCP** so it
   reloads the corrected token. Nothing in Phase 1+ that touches the schema can
   run until `list_tables` succeeds.
2. **Production domain** — needed for `metadataBase`, canonical URLs, sitemap,
   and JSON-LD `url`. Set `NEXT_PUBLIC_SITE_URL` env var. Using
   `https://www.patelaccounting.in` as placeholder until confirmed.
3. **Env vars** (`.env.local`, and Vercel project settings):
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public read via RLS)
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only; admin writes / never shipped to client)
   - `NEXT_PUBLIC_SITE_URL`
   - existing `RESEND_API_KEY` (kept — email notification on new lead)

## Dependencies to add (minimal)

- `@supabase/supabase-js`, `@supabase/ssr` — official SSR/cookie auth for App Router.
- `react-markdown` — render post bodies stored as Markdown. (Skipped a full rich-text
  editor; admin writes Markdown in a textarea. Add a WYSIWYG only if the client asks.)

Nothing else. No CMS lib, no ORM (Supabase client is enough), no form lib.

---

## Content model (what's dynamic vs in-code)

**Dynamic (Supabase, admin-editable) — "collections that grow/change":**
`leads`, `posts`, `team_members`, `testimonials`, `faqs`, `services`, `case_studies`.

**Stays in-code (structural microcopy, editing it is a design act, not content
entry):** hero headline, "Why choose us" bullets, "Industries we serve" list,
the 3 process steps, nav/footer labels.

> This is the one deliberate boundary. "Everything" is honored for all *content
> collections*; homepage structural copy stays in code because DB-ifying single
> strings buys nothing and adds admin clutter. If the client truly wants to edit
> hero/why/industries text, add a `site_content` key→value table later — cheap to
> add, not worth pre-building. (`ponytail:` boundary — upgrade to site_content
> table if the client asks to edit homepage prose.)

---

## Schema (public schema; all tables RLS-enabled)

```
leads
  id uuid pk default gen_random_uuid()
  created_at timestamptz default now()
  name text not null
  phone text not null
  email text
  service text            -- free text or service slug
  message text not null
  status text default 'new'   -- new | contacted | closed  (admin pipeline)
  source text default 'website'

posts                      -- Insights / blog
  id uuid pk
  slug text unique not null
  title text not null
  category text not null
  excerpt text not null
  body text not null         -- Markdown
  cover_url text
  seo_title text             -- optional metadata overrides
  seo_description text
  published boolean default false
  published_at timestamptz
  created_at, updated_at timestamptz

team_members
  id uuid pk
  name text not null
  role text not null
  bio text
  photo_url text
  is_leadership boolean default false   -- founders vs team grid
  sort_order int default 0
  published boolean default true

testimonials
  id uuid pk
  quote text not null
  author_name text not null
  author_role text            -- "Founder · Acme Traders"
  rating int                  -- 1..5, powers Review/AggregateRating schema
  sort_order int default 0
  published boolean default true

faqs
  id uuid pk
  question text not null
  answer text not null
  category text not null       -- GST | Income Tax | Accounting | Registration | General
  sort_order int default 0
  published boolean default true

services                     -- replaces src/lib/services.ts
  id uuid pk
  slug text unique not null
  title text not null
  lead text not null
  overview text[]              -- paragraphs
  included jsonb not null      -- [{name, desc}]
  faqs jsonb not null          -- [{q, a}]
  icon text not null           -- lucide icon name (mapped in service-icon.tsx)
  sort_order int default 0
  published boolean default true

case_studies                 -- Results page
  id uuid pk
  title text not null
  situation text not null
  action text not null
  outcome text not null
  sort_order int default 0
  published boolean default true
```

**RLS policies (pattern):**
- Public (anon) read: `published = true` on all content tables. No public read on `leads`.
- Public insert on `leads` only (contact form) — validated server-side; honeypot already exists.
- Authenticated (admin) full read/write on everything.
- Writes on content tables: authenticated only.

> Seed migration ports the existing `services.ts` (5 rows) and the client doc's
> team/FAQs/testimonials so the site renders identically on first load.

---

## Phased build (each phase independently shippable + build-verified)

### Phase 1 — Leads (highest value, smallest surface)
The current form loses leads if email fails. Fix first.
- `leads` table + RLS (public insert, admin read).
- `src/lib/supabase/server.ts` + `client.ts` (@supabase/ssr helpers).
- Wire `submitEnquiry` (`src/app/actions.ts`): **insert into `leads` first**
  (durable record), then send the Resend email as a best-effort notification.
  Insert failure = user-facing error; email failure = logged, lead still saved.
- Verify: submit form → row appears in Supabase → email still sends when key set.

### Phase 2 — SEO foundation (independent of CMS; do early)
- `src/app/sitemap.ts` — static routes + published post/service slugs from Supabase.
- `src/app/robots.ts` — allow all, `disallow: /admin`, link sitemap.
- `metadataBase` + default OpenGraph/title template in `layout.tsx`.
- JSON-LD `LocalBusiness` (AccountingService) sitewide in `layout.tsx`: NAP,
  geo, `openingHours` Mo–Sa 10–19, `sameAs`, phones.
- Wire the **existing** `whatsapp-button.tsx` into `layout.tsx` (persistent float)
  + confirm header/hero `tel:` CTA. (Conversion mechanic from research.)
- Add `[service] in Ahmedabad` phrasing to service `generateMetadata` titles + H1s.
- Verify: `npm run build`, view source for schema, Rich Results Test.

### Phase 3 — Content tables + seed migration
- `apply_migration` for all content tables + RLS + seed data (via MCP).
- `generate_typescript_types` → `src/lib/supabase/types.ts`.
- `get_advisors` (security + performance) after migration; fix any RLS/index flags.

### Phase 4 — Public pages read from Supabase
Convert reads; keep the exact existing markup/classes (design unchanged).
- `services.ts` → Supabase-backed loader; `service-icon.tsx` maps `icon` string →
  lucide component with a sensible fallback (handles new services gracefully).
- Homepage services grid, footer, `/services`, `/services/[slug]` read from DB.
- `/team` reads `team_members`; `/insights` + `/insights/[slug]` (blog, Markdown
  via react-markdown); `/results` reads `case_studies`; `/faq` reads `faqs`;
  testimonials section reads `testimonials`.
- Caching: `cacheComponents` is OFF, so classic model — `export const revalidate`
  on these routes + `generateStaticParams` for `[slug]` routes. Admin saves call
  `revalidatePath()` for instant updates. (No Cache Components migration — YAGNI.)
- Rewire nav/footer to real routes (`/services`, `/insights`, `/results`, `/faq`)
  per the old nav-pages plan Task 6.
- Verify each route renders from DB; HTML contains content (server-rendered, not
  client-fetched — the SEO-critical rule).

### Phase 5 — Admin (`/admin`)
- Supabase Auth (email/password) for the 2 principals. `middleware.ts` guards
  `/admin/*` (redirect unauthenticated to `/admin/login`).
- CRUD screens reusing `globals.css` (forms per DESIGN_DIRECTION §11): Leads
  (list + status), Posts, Team, Testimonials, FAQs, Services, Case studies.
- Image upload → Supabase Storage bucket (`public`) for `cover_url`/`photo_url`.
- Each save action does the write then `revalidatePath` of affected public routes.
- Verify: log in, create a post → appears at `/insights` within the revalidate window.

### Phase 6 — Structured-data polish
- `Service` schema per `/services/[slug]`, `Article` per post, `FAQPage` on `/faq`,
  `Review` + `AggregateRating` from `testimonials`, `BreadcrumbList` on detail pages.
- Verify all pass Google Rich Results Test.

---

## Verification (no test framework — per CLAUDE.md)
Per phase: `npm run build` (types + static params) + `npm run lint` + dev-server
render check at the affected route. For Supabase: `get_advisors` after every
migration; confirm RLS blocks anon writes to content tables and anon reads of `leads`.

## Security notes (not to be simplified away)
- Service-role key server-only; never in a client component or `NEXT_PUBLIC_`.
- `leads`: anon INSERT only, never SELECT (no public lead harvesting).
- Keep the existing honeypot + server-side validation before insert.
- Admin behind auth + middleware; `robots.ts` disallows `/admin`.
```
