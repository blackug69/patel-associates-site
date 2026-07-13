# Hero — Corrected Spec

Governed by `DESIGN_DIRECTION.md`. This spec replaces the current hero in `src/app/page.tsx:177–269`. **Spec only — no UI is built from this yet.**

Every decision here traces to a critique finding or a Design Direction rule. Where a value must come from the client (real numbers, real photo), it is marked **[CONFIRM]** and must not be invented.

---

## 1. Intent

| | |
|---|---|
| **Purpose** | State who Patel is and why they can be trusted, in one screen, with *real* evidence — not decoration. |
| **User goal** | "Is this firm credible, relevant to me, and easy to reach?" answered in ~3 seconds. |
| **Business goal** | Capture the high-intent visitor immediately; establish premium, trustworthy positioning. |
| **Primary conversion** | Book a Consultation. |
| **Secondary conversions** | Tap-to-call / WhatsApp (high-intent, low-friction, local). |

---

## 2. What changed from the current hero (traceability)

| Critique finding | Correction in this spec |
|---|---|
| Fake "Compliance Ledger" SaaS card = dishonest + AI-tell | **Removed entirely.** Right column becomes a single real **B&W photograph**. |
| Zero authentic proof | Real founder/office image + real, verified stat(s) + optional real credential line. |
| Off-brand pine + brass | **Warm monochrome only** (§5 tokens). No chromatic accent. |
| Headline over-signals ("clarity" = light + italic + color) | **One** emphasis signal: italic only, same ink color. |
| Weak/vague stats ("6", "All-India") | Replaced with real, credible metrics **[CONFIRM]**; drop filler. |
| No low-friction contact in hero | Add tap-to-call + WhatsApp affordance. |
| Thin vertical spacing, double-framed card | Expanded rhythm; single clean image frame. |
| Redundant in-card feature blocks | Removed (paragraph already carries the message). |
| Decorative divider, pulsing "Live" dot | Removed. |
| Animations possibly not reduced-motion safe | Motion gated by `prefers-reduced-motion` (§10). |

---

## 3. Layout

Asymmetric editorial split (kept — it was the right instinct), on the 12-col grid, `--container-content` (1200px).

```
┌───────────────────────────────────────────────────────────┐
│  [sticky nav — separate component]                          │
│                                                             │
│  EST. 2006 · AHMEDABAD            ┌───────────────────────┐ │
│                                   │                       │ │
│  Your numbers, handled            │   B&W photograph      │ │
│  with clarity.                    │   (founder / office / │ │
│                                   │   architecture)       │ │
│  A legacy accounting & legal      │                       │ │
│  practice keeping you compliant.  │   hairline frame,     │ │
│                                   │   no shadow           │ │
│  [ Book a Consultation ↗ ]        │                       │ │
│  [ View Services ]                │                       │ │
│  Call · WhatsApp                  │                       │ │
│                                   └───────────────────────┘ │
│  ──────────────────────────────                            │
│  18+ yrs        Est. 2006        [real stat]                │
└───────────────────────────────────────────────────────────┘
```

- **Columns (desktop ≥lg):** `~1.1fr / 0.9fr` (text / image). Text leads.
- **Vertical padding:** `clamp(96px, 12vw, 176px)` top/bottom (expanded per critique). Hero should feel expansive.
- **Column gap:** 64px (`--space` scale).
- **No decorative dividers.** Structure comes from whitespace + one hairline under the stat strip.
- **Left column vertical spacing** snapped to the 8px scale: eyebrow → H1 `48px` → paragraph `24px` → CTA row `40px` → stat strip `64px`.

---

## 4. Content & copy

| Element | Content | Notes |
|---|---|---|
| **Eyebrow** | `EST. 2006 · AHMEDABAD` | Spline Mono, caps, `0.14em`. Real, verifiable. Ink-500, **not** brass. |
| **Headline (H1)** | "Your numbers, handled with *clarity*." | *clarity* in **italic only** (Fraunces italic), same `--ink-900`. Keep or refine copy — but the treatment rule is fixed. |
| **Sub-copy** | "A legacy accounting and legal practice keeping individuals, startups, and businesses compliant — GST, income tax, bookkeeping, registration, and advisory, under one trusted roof." | Body-L (18px). Max 68ch. Tightened from current. |
| **Primary CTA** | `Book a Consultation ↗` → `#contact` | Primary button (§6). One per viewport. |
| **Secondary CTA** | `View Services` → `#services` | Secondary/outline button. |
| **Low-friction contact** | `Call +91 …` **[CONFIRM]** · `WhatsApp` | Ghost/text links with line icons (`Phone`, `MessageCircle`), inline under CTAs. Tap-to-call `tel:` + `https://wa.me/…`. |
| **Stat strip** | 3 stats max, left-aligned, top hairline | See below. |

**Stat strip — real only ([CONFIRM] each):**
- `18+` — Years in practice ✅ (real, keep)
- `Est. 2006` — or a second *real* metric (e.g. clients served, returns filed) **[CONFIRM]**
- One more **only if genuinely credible**. **Drop** "6 core service lines" and "All-India digital reach."
- If only one real number exists, show **one** — one true stat beats three padded ones.

---

## 5. Imagery (right column)

Per Design Direction §8 — all grayscale/duotone, unified contrast.

**Priority order:**
1. **Real B&W founder or team-at-work photo** — first choice. Solves the "no human trust" gap directly.
2. **Real B&W office / interior detail** — authentic, local, credible.
3. **B&W architecture / classical statue** — atmospheric fallback if no real photo is available yet.

- Frame: single `1px --line-200` border, `--radius-lg` (16px), **no shadow, no nested bezel**.
- Aspect: ~4:5 portrait or 1:1, art-directed; `object-fit: cover`.
- **Placeholder policy:** if the real asset isn't ready, use a labeled monochrome placeholder (dimensions + intent), **never** a fabricated UI/dashboard.
- `alt`: describes the real subject (e.g. "Founder [name] at the Patel office, Ahmedabad").

---

## 6. Design tokens used

- **Surface:** `--paper-000` background; image frame on `--paper-100`.
- **Text:** H1 `--ink-900`; sub-copy `--ink-700`; eyebrow + stat labels `--ink-500`; stat values `--ink-900`.
- **Type:** H1 Fraunces `clamp(2.5rem, 5vw, 4.5rem)`, weight 400, `line-height 1.05`, `tracking -0.02em`; italic word = Fraunces italic 400 (no weight/color change). Sub-copy Franklin 400, 18px, `line-height 1.65`. Eyebrow Spline Mono 12px caps.
- **Buttons:** §6 — primary (ink fill/paper text) + secondary (outline). Trailing `↗` on primary, nudges +2px on hover.
- **Border/rhythm:** hairline `--line-200`; spacing from the 8px scale only (no magic numbers like `text-[2.7rem]`).

---

## 7. Responsive

- **≥ lg (1024):** two columns `1.1fr / 0.9fr`, image right.
- **md (768–1023):** two columns compress; image may drop to ~40% or move below headline — test which keeps the H1 dominant.
- **< md (mobile):** **stack** — order: eyebrow → H1 → sub-copy → CTAs → contact links → **image** → stat strip. (Image below the fold-fold is fine; message + CTA must be first.)
- Container padding 20 → 24 → 40px. H1 via `clamp()` (no fixed breakpoint jumps).
- Stat strip: 3-col → wraps to stacked rows on narrow screens; keep left hairline/top hairline legible.
- Guarantee no horizontal scroll; reading column ≤68ch.

---

## 8. Motion (§10 — restraint, gated)

- Entrance: gentle fade-up (`opacity 0→1`, `translateY 16px→0`), 400–600ms, ease `cubic-bezier(0.22,1,0.36,1)`, stagger 60–80ms across: eyebrow → H1 → sub-copy → CTAs → stats → image.
- **Must be wrapped in `@media (prefers-reduced-motion: no-preference)`** — reduced-motion users see the final state instantly (fixes the current unguarded `rise`).
- Hover: primary arrow nudge only; no scale/bounce/color flash.

---

## 9. Accessibility checklist (AA)

- Eyebrow/stat labels use `--ink-500` on `--paper-000` (passes AA) — **no brass** (which failed).
- Emphasis word carried by *italic*, not color alone.
- Buttons ≥44px height; visible `focus-visible` ring (2px `--ink-900`, 2px offset).
- Contact links are real, keyboard-focusable, with accessible names ("Call Patel", "Message on WhatsApp"); icons `aria-hidden`.
- Image has meaningful `alt` (or `alt=""` only if purely atmospheric architecture).
- One `<h1>` on the page = this headline.
- Motion honors `prefers-reduced-motion`.

---

## 10. Definition of done

- [ ] No fabricated UI/dashboard anywhere in the hero.
- [ ] Palette is warm monochrome only (no pine/brass).
- [ ] Headline emphasis = italic only, tokenized size.
- [ ] Every stat is real and **[CONFIRM]**ed; filler stats removed.
- [ ] Real B&W image (or honest placeholder) in the right column.
- [ ] Tap-to-call + WhatsApp present and functional.
- [ ] Spacing on the 8px scale; expanded vertical padding.
- [ ] Motion gated by `prefers-reduced-motion`.
- [ ] AA contrast + focus + tap targets verified.
- [ ] Mobile stack order: message + CTA before image.

---

## Open items for you [CONFIRM]

1. **Right-column image:** do you have a real founder/team/office photo, or should we spec the architectural/statue fallback for now?
2. **Real stats:** which numbers are true and defensible? (Years ✅ 18+. Clients/returns/filings? Anything else verifiable?)
3. **Phone/WhatsApp number** for the hero contact links.
4. **Headline copy:** keep "Your numbers, handled with clarity," or refine? (Treatment is fixed regardless.)

---

*Implementation note: this repo runs a non-standard Next.js — per `AGENTS.md`, read `node_modules/next/dist/docs/` before writing any hero code. This document is design intent, not implementation.*
