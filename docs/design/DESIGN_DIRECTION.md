# Patel Accounting & Legal Services — Design Direction

**Single source of truth for all UI decisions.** No component, page, or token may contradict this document. If a design choice isn't covered here, it must be *derived* from these principles, not invented against them.

Brand personality: **trustworthy · premium · modern · editorial · black & white · minimalist**, credible to both startups and established businesses.

Status: Design Direction (v1). Homepage IA is finalized separately. **No section UI is designed yet** — this defines the language only.

---

## 1. Overall Design Philosophy

**What users should feel**
- **Reassured** — "these people are serious, careful, and won't let me make a mistake."
- **Respected** — the restraint signals we value the client's intelligence and time.
- **Confident** — clarity everywhere; nothing hidden, nothing loud, nothing gimmicky.
- **Grounded** — a firm with history (est. 2006), not a here-today startup.

**What the site must communicate**
- Competence and compliance rigor (accounting + legal are trust-first purchases).
- Longevity and human accountability — real people, real office, real credentials.
- Modern capability — the firm is current, digital, and easy to work with.

**What it must avoid**
- Any hint of "template," "cheap," or "hype."
- Visual noise that competes with the message.
- Salesy pressure. Trust converts here, not urgency banners.

> **North star:** *Editorial gravitas.* Think a respected print journal or a heritage law firm's letterhead — timeless, precise, quietly premium.

---

## 2. Visual Style

Ranked by how much each drives the language:

| Style | Weight | Why |
|---|---|---|
| **Editorial** | ★★★★★ | Type-and-whitespace-led composition is the core. It reads as authoritative, considered, and human — the exact register a legal/accounting client wants. |
| **Minimal** | ★★★★★ | Every removed element increases trust. Minimalism = confidence; a firm sure of its worth doesn't shout. |
| **Luxury** | ★★★★☆ | Not gold-and-marble luxury — *restraint luxury*: generous space, fine hairlines, precise typography. Premium through discipline. |
| **Modern** | ★★★★☆ | Current layout mechanics (asymmetry, clean grid, subtle motion) keep it from feeling dated or stuffy — important for startup clients. |
| **Corporate** | ★★☆☆☆ | Present only as *structure and rigor* (grid, consistency, professionalism). We reject corporate blandness, stock imagery, and safe-but-forgettable layouts. |

**The synthesis:** an *editorial, minimal* skin with *luxury restraint* and *modern* mechanics — corporate only in its discipline, never its personality.

---

## 3. Layout System

**Grid**
- 12-column grid, 24px gutters (desktop). Content is composed on this grid but may sit asymmetrically within it (editorial, not boxed-symmetric).
- Prose/reading columns capped at **68ch** for readability regardless of container width.

**Container widths (tokens)**
- `--container-prose`: 720px — long-form text, forms.
- `--container-content`: 1200px — default section content.
- `--container-wide`: 1440px — media-forward / full-bleed inner bound.
- Full-bleed sections (hero, trust band, CTA band) span 100% with content constrained to one of the above.

**Section spacing (vertical)**
- Between major sections: `clamp(80px, 10vw, 160px)`.
- Never let two sections touch without this breathing room. White space is a feature, not a gap to fill.

**Vertical rhythm — 8px base scale**
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`
All margins/padding/gaps snap to this scale. No arbitrary values.

**Alignment rules**
- **Left-aligned by default.** Editorial reading pattern.
- **Never justify** body text.
- **Center** only: short section eyebrows/labels, the pre-footer CTA band, and standalone single-line statements. Never center multi-line paragraphs.
- Consistent left margin across stacked sections creates a vertical "spine" the eye follows.

---

## 4. Typography

Built on the fonts already loaded in the project — no new dependencies.

**Font pairing**
- **Display / Headings — `Fraunces`** (serif, optical, supports italic). Carries all editorial gravitas. Use roman for authority; use *italic* sparingly for warmth/emphasis in headlines (per the Lex & Co. reference).
- **Body / UI — `Libre Franklin`** (humanist sans). Clean, neutral, highly legible for dense legal/financial copy.
- **Eyebrows / labels / data — `Spline Sans Mono`** (monospace). ALL-CAPS, letter-spaced overlines and small data tags. This is the "modern editorial" signature.

**Heading scale** (responsive via `clamp`)
| Token | Font | Size | Use |
|---|---|---|---|
| Display | Fraunces | `clamp(2.5rem, 5vw, 4.5rem)` (40–72px) | Hero H1 |
| H1 | Fraunces | `clamp(2.25rem, 4vw, 3.5rem)` (36–56px) | Page titles |
| H2 | Fraunces | `clamp(1.75rem, 3vw, 2.75rem)` (28–44px) | Section titles |
| H3 | Fraunces | `1.5rem` (24px) | Sub-sections, card titles |
| H4 | Libre Franklin | `1.25rem` (20px) | Minor headings |

**Body sizes**
- Body-L: `1.125rem` (18px) — intro paragraphs, lead copy.
- Body: `1rem` (16px) — default.
- Small: `0.875rem` (14px) — captions, meta.
- Eyebrow: `0.75rem` (12px) Spline Mono, uppercase, `letter-spacing: 0.14em`.

**Font weights**
- Fraunces: 300–400 for large display (light = luxury), 500 for smaller headings. Avoid heavy/black weights.
- Libre Franklin: 400 body, 500 emphasis, 600 buttons/labels. Never 700+ for long text.
- Spline Mono: 400–500.

**Line heights**
- Display: `1.05`  ·  Headings: `1.15`  ·  Body: `1.65`  ·  Small: `1.5`  ·  Eyebrow: `1`.

---

## 5. Color System

**Philosophy:** true black & white reads harsh and fatiguing at scale. We use a **warm monochrome** — near-black ink and off-white paper — which *is* black & white to the eye but premium and easy to read. Color is created by **contrast and inversion**, not hue.

**Neutral scale (the entire palette)**
| Token | Hex | Where used |
|---|---|---|
| `--ink-900` | `#14120E` | Primary text; dark ("inverted") section backgrounds. |
| `--ink-700` | `#3A362F` | Secondary text, subheads on light. |
| `--ink-500` | `#6B655B` | Muted text, captions, placeholders. |
| `--line-200` | `#E3DED3` | Hairlines, card borders, dividers. |
| `--paper-100` | `#FAF8F2` | Raised surfaces / cards on the page. |
| `--paper-000` | `#F5F2EA` | Default page background (warm off-white). |
| `--white` | `#FFFFFF` | Reserved: crisp card fills, text on dark. |

- **Primary:** `--ink-900` (text + dark sections) on `--paper-000`. This pairing *is* the brand.
- **Secondary:** `--ink-700` / `--ink-500` for hierarchy within text.
- **Neutral:** `--line-200`, `--paper-100` for structure and surface separation.

**Accent — recommendation: none (monochrome).**
The strongest, most premium choice is to stay purely monochrome and let *inversion* (dark sections) be the "accent." 
- **Optional, tightly-controlled exception:** a single warm metallic — **Brass `#A9854A`** — used on **≤5%** of any view: small link underlines, an eyebrow tick, an icon hairline. **Never** for button fills, large text, or backgrounds. If in doubt, leave it out. Requires Design Director sign-off per use.

**Contrast is inherent** — monochrome with these values clears WCAG AA everywhere by construction (see §12).

---

## 6. Buttons

Shared: `--radius-sm` (8px), font Libre Franklin 600, generous hit area, transition 180ms ease-out. Optional trailing arrow `↗`/`→` as an editorial detail.

| Variant | Default | Hover | Use |
|---|---|---|---|
| **Primary** | `--ink-900` fill, `--paper-000` text, 8px radius, padding `16px 28px`, no shadow | bg → `--ink-700`; arrow nudges +2px right | The one clear action per view (Book a Consultation). |
| **Secondary** | Transparent, `1px --ink-900` border, `--ink-900` text | fills `--ink-900`, text → `--paper-000` | Alternate action (Explore Services). |
| **Ghost / text** | No bg/border, `--ink-900` text, animated underline (grows L→R) | underline completes; arrow nudges | In-flow links (Read more, View all), nav items. |

Rules: **one primary button per viewport**. On dark sections, invert (paper fill / ink text). No gradient fills, no glow, no scale-bounce on hover.

---

## 7. Cards

Flat and editorial — elevation comes from **border + surface contrast**, not heavy shadow (this also keeps boundaries perceivable for accessibility).

- **Border radius:** `--radius-md` = 12px (cards); media panels `--radius-lg` = 16px.
- **Shadows:** none at rest. Interactive cards may lift on hover only: `0 8px 24px rgba(20,18,14,0.08)`, 200ms. Static cards never cast shadow.
- **Border style:** `1px solid --line-200` hairline — always visible, never invisible.
- **Padding:** 32px desktop / 24px mobile.
- **Elevation model:** default flat on `--paper-000` with `--paper-100`/`--white` fill. **One "anchor" card per group may invert** to `--ink-900` fill / `--paper` text to create focus (per the Lex & Co. pattern). No stacked/nested shadows.

---

## 8. Imagery

**Treatment (non-negotiable):** every image is unified to **grayscale / warm duotone** (ink + paper), consistent high contrast and subtle grain — so mixed sources read as one system. No color photography.

**Recommendations by type**
| Type | Verdict | Where |
|---|---|---|
| **Architecture** (columns, courthouses, clean built form) | ✅ **Primary** | Hero, section dividers — timeless, premium, no stock-people risk. |
| **Statues** (justice/classical, B&W) | ✅ **Primary** | Hero / accent — the editorial signature (à la Aro's David). Use tastefully, not literally on every page. |
| **Founder / team portraits** | ✅ **Yes — authentic** | About/Legacy. Real B&W portraits build human trust nothing else can. Must be real, not stock. |
| **Office** (real, B&W detail shots) | ✅ Supporting | About/Contact — proves the firm is physical and local. |
| **Legal documents / desk macros** (pen, ledger, stamp) | ✅ Accent/texture | Small crops as section texture — reinforces the craft of accounting/legal. |
| Generic business stock, staged handshakes, colorful office scenes | ❌ Never | Instant credibility killer. |

**Priority:** architecture + statues for hero/atmosphere, **real founder/team + office** for trust, document macros for texture.

---

## 9. Iconography

- Library: **`lucide-react`** (already in project). One family only.
- Style: **line, 1.5px stroke, no fill, monochrome `--ink`.** 20–24px default.
- Usage: sparingly — service tiles, process steps, contact/footer, trust markers. Icons *support* text, never replace it.
- Never: filled/duotone/3D icons, colored icons, emoji-as-icon, decorative icon soup.

---

## 10. Motion

Principle: **restraint.** Motion clarifies, never entertains. All durations ease-out; all motion respects `prefers-reduced-motion` (disabled/instant when set).

- **Easing token:** `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Page transitions:** simple opacity fade, ~300ms. No route-level slides or wipes.
- **Hover animations:** 150–200ms — underline grow, arrow nudge (+2px), border/bg tone shift. No scale bounce, no color flash.
- **Scroll reveals:** gentle fade-up (`opacity 0→1`, `translateY 16px→0`), 400–600ms, stagger 60–80ms, **runs once**. Never parallax-heavy, never on every element.

---

## 11. Component Rules

**Navigation** — Sticky, on a solid `--paper-000` bar (never floating over a photo). Wordmark left · text links center/right · one Primary CTA right. Transparent→solid on first scroll. Mobile: hamburger < `md`, full-height sheet. Active link marked by underline, not color alone.

**Hero** — Full-viewport, calm. One Fraunces display headline (may use one italic word), one supporting line (Body-L), one Primary + one Ghost CTA, and one embedded proof stat. B&W architecture/statue imagery. Never a carousel, never competing CTAs.

**Service cards** — Equal weight (no arbitrary highlights). 12px radius, hairline border, icon + H3 title + one-line description + ghost link. Grid of all services visible at once. Hover: subtle lift only.

**Trust sections** — Inverted (`--ink-900`) band = the mid-page "serious" beat. Verifiable credentials/certifications/logos in a clean row. Monochrome logos. No fabricated badges; every mark must be real.

**Testimonials** — 3-up flat cards, `--paper-100` fill, hairline border, large Fraunces quote glyph, quote in Body-L, **name + role always shown** (attribution = trust). Optional carousel for overflow; arrows, no autoplay.

**Forms** — Labels always visible (never placeholder-as-label). `--paper` field, hairline border, ink text; focus = 2px `--ink-900` ring, offset 2px. Inline validation messages in text (not color-only). Generous 44px+ targets. Honeypot for spam (already implemented server-side).

**Footer** — Grounded `--ink-900` base. Wordmark + Company/Services/Contact columns + full NAP (name/address/phone) for local SEO + optional enquiry/newsletter capture. Quiet, organized, complete.

---

## 12. Accessibility (WCAG 2.1 AA minimum)

- **Contrast:** ≥4.5:1 body, ≥3:1 large text/UI. Monochrome tokens are chosen to pass by construction; verify any brass use manually.
- **Focus:** visible `focus-visible` ring (2px `--ink-900`, 2px offset) on every interactive element. Never remove outlines without replacement.
- **Targets:** ≥44×44px tap targets.
- **Semantics:** real HTML landmarks (`header/nav/main/footer`), one `h1` per page, ordered heading levels.
- **Never rely on color alone** to convey state (use text/icon/underline too).
- **Images:** meaningful `alt`; decorative images `alt=""`.
- **Motion:** honor `prefers-reduced-motion`.
- **Forms:** programmatic labels, error text tied to fields, keyboard-operable.

---

## 13. Responsive Design

Mobile-first. Breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280`.
- **Container padding:** 20px (mobile) → 24px → 40px (≥lg).
- **Type:** all display/heading sizes use `clamp()` — fluid, no jarring jumps.
- **Grid:** 12-col → collapses to 2-col (tablet) → 1-col (mobile). Cards stack full-width.
- **Section spacing:** `clamp()` scales the vertical rhythm down on small screens.
- **Nav:** hamburger sheet < `md`.
- **Images:** `max-width:100%`, art-directed crops for portrait mobile where needed.
- Test the reading column stays ≤68ch and never causes horizontal scroll.

---

## 14. What We Must NEVER Do

- ❌ Bright/vibrant gradients or gradient text
- ❌ Glassmorphism / frosted blur panels
- ❌ Floating blobs, orbs, or random decorative shapes
- ❌ Neon or saturated accent colors
- ❌ AI-generated illustrations or 3D mascots
- ❌ Generic startup vector graphics (rocket ships, abstract people, isometric scenes)
- ❌ Color photography or staged stock handshakes
- ❌ Heavy drop shadows / skeuomorphic elevation
- ❌ More than the three approved typefaces
- ❌ Any chromatic accent beyond the optional ≤5% brass (with sign-off)
- ❌ Pure `#000` on pure `#FFF` (harsh; use the warm monochrome tokens)
- ❌ Auto-playing carousels, parallax overload, bouncy/scale hover effects
- ❌ Centered multi-line body paragraphs; justified text
- ❌ Emoji as UI icons; mixed icon families
- ❌ Urgency/hype patterns (countdtimers, "limited spots", flashing banners)

---

*This document governs every subsequent UI decision. Update it deliberately and version it; do not diverge from it ad hoc.*
