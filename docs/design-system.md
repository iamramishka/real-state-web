# Design System — Nordhaven

> Inspired by `design.webp` (premium real-estate landing). **Inspiration only — never copied.** Brand is original.
> This is a **specification** for Codex to implement as Tailwind tokens + components. Claude/UI-UX owns this file; Codex consumes it.

---

## 1. Brand
- **Working name:** **Nordhaven** (premium, calm, trustworthy). *Final name pending human approval — alternatives: Lumera, Havenly, Marleau, Northrop Estates.*
- **Voice:** confident, warm, editorial, premium — never salesy.
- **Logo concept:** wordmark in display weight + simple geometric monogram ("N" in a soft-rounded square). Mono/duotone; works on light and dark.
- **Tagline direction:** "Discover a place to call home." (rephrase originally for hero — see copy guidance §9.)

## 2. Design principles
1. **Whitespace is a feature** — generous breathing room, calm density.
2. **Photography carries the color** — UI stays largely monochrome; homes provide warmth.
3. **One clear action per section** — conversion-focused.
4. **Soft, premium surfaces** — rounded corners, low-spread shadows, subtle borders.
5. **Consistency over novelty** — reuse tokens and components everywhere.

## 3. Color tokens
Neutral-led palette with one restrained accent. Implement as CSS variables + Tailwind theme.

| Token | Value (proposed) | Use |
|---|---|---|
| `--ink` | `#0B0B0C` | primary text, primary buttons |
| `--ink-700` | `#26262A` | secondary text on light |
| `--muted` | `#6B6B72` | meta text, captions |
| `--line` | `#E7E7E4` | borders, dividers |
| `--surface` | `#FFFFFF` | cards, nav |
| `--bg` | `#F6F6F4` | page background (warm off-white) |
| `--bg-soft` | `#F0EFEC` | alternating section background |
| `--accent` | `#1F6F5C` (deep emerald) | links, focus, primary CTA accent |
| `--accent-soft` | `#E8F1EE` | accent tint backgrounds |
| `--on-ink` | `#FFFFFF` | text on dark surfaces |
| map greens/blues | photographic | map section only |

> **Accent is a pending decision:** deep emerald `#1F6F5C` (default) vs warm gold `#B08947`. Pick one and lock it. Contrast must pass AA on chosen surfaces.

**Contrast rule:** body text ≥ 4.5:1; large text/UI ≥ 3:1. Verify `--muted` on `--bg` (darken if it fails).

## 4. Typography
- **Display/Headings:** a geometric grotesque (e.g. **Sora** or **Plus Jakarta Sans**) via `next/font` (self-hosted). Tight tracking on large sizes (`-0.02em`).
- **Body/UI:** **Inter** via `next/font`.
- **Scale (clamp for fluid sizing):**

| Token | Size (clamp) | Use |
|---|---|---|
| `display-1` | `clamp(2.5rem, 6vw, 4.5rem)` | hero headline |
| `h1` | `clamp(2rem, 4vw, 3rem)` | section titles |
| `h2` | `clamp(1.5rem, 3vw, 2rem)` | sub-sections |
| `h3` | `1.25rem` | card titles |
| `body` | `1rem` / `1.0625rem` | paragraphs |
| `small` | `0.875rem` | meta/captions |
| `xs` | `0.75rem` | labels/eyebrows |

- Line-height: headings `1.05–1.15`; body `1.6`. Max paragraph width ~`65ch`.

## 5. Spacing, radius, shadow, layout
- **Spacing scale:** 4-based (`4,8,12,16,24,32,48,64,96`). Section vertical padding `clamp(64px, 10vh, 128px)`.
- **Container:** max-width `1280px`, gutter `clamp(16px, 5vw, 64px)`.
- **Radius:** `sm 8px`, `md 12px`, `lg 16px`, `xl 20px` (cards), `pill 9999px`.
- **Shadow:** `soft = 0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.06)`; `raised` for floating search card slightly stronger.
- **Borders:** `1px solid var(--line)` on cards/inputs.
- **Grid:** 12-col desktop; card grids `1 → 2 → 3 (→4 agents)`.

## 6. Motion (Framer Motion)
- Subtle, fast, purposeful: fade/slide-up reveals (`y: 12→0`, `opacity 0→1`, `~0.4s`, ease-out).
- Stagger card grids (`0.05s`). Hover lifts (`y:-2`, shadow up).
- **Always** honor `prefers-reduced-motion` → disable transforms, keep opacity only.

## 7. Component anatomy (specs for Codex)
**Navbar** — logo left; centered links (Buy · Sell · Rent · Agents · News); "Contact us" pill (ink bg, white text) right. Sticky, condenses on scroll. < md → hamburger + slide-over (focus-trapped).

**Hero** — left: `display-1` headline (2 lines) + short supporting paragraph (top-right on desktop); full-bleed luxury home image (`next/image`, `priority`). Overlapping floating search card at the bottom.

**AI search bar** (floating card, `raised` shadow) — row 1: segmented toggle **Buy / Sell / Rent**. Row 2: leading `+` icon, text input (placeholder e.g. "House with great natural light near good schools"), trailing **mic**, **waveform**, and circular **submit (↑)** button (ink). Fully labelled; Enter submits.

**Suggestion chips** — pill row of conversational queries; horizontal scroll < md; each focusable; `aria-label` describes the query.

**Filter chips** — pill toggles (New to Market · Most Viewed · Open Houses · Price Drop · Luxury · Sold). `aria-pressed`.

**Property card** — image (16:10, rounded `lg`), price (`h3`, bold), title, address (`muted`), meta row with **beds / baths / sqft** icons (lucide), CTA "View details". Hover lift.

**Agent card** — avatar (rounded), name, agency, star rating (with visible numeric + `aria-label`), contact link.

**News/Article card** — image, title, date (`<time>`), optional excerpt. Reused for news + trends.

**Map + listing split** — left: result count + "Save search" + scrollable list of compact property cards; right: map with pins. < lg → list-first, map behind a toggle. Map must have a text/list alternative.

**Feature band ("Smarter way to sell")** — left: heading + bullet list + "Learn more"; right: image. Stacks < md.

**Discovery trio** — three image cards: Search Neighborhoods · New Homes · Agent Directory, each with a CTA.

**CTA band** — ink or accent background, short headline + primary button. One action only.

**Footer** — brand + columns (Company, Buy, Sell, Resources, Legal) + social; secure external links (`rel="noopener noreferrer"`); newsletter input (validated).

## 8. States (every interactive component)
default · hover · focus-visible (accent ring) · active · disabled · loading (skeleton) · empty (friendly message + action) · error (inline, announced).

## 9. UX copy guidance
- Headlines: evocative + benefit-led, original (do not reuse the reference's exact wording).
- Buttons: action verbs ("Explore homes", "Talk to an agent", "Get a valuation").
- Microcopy: reassuring, concrete. Avoid jargon. Sentence case.
- Suggestion chips: natural questions a buyer asks ("Family home near good schools?", "Walkable to cafés?", "Has a backyard?").

## 10. Accessibility & responsive ties
- Targets ≥ 44px; visible focus everywhere; contrast per §3.
- Verify every component on all 8 breakpoints (`docs/responsive-rules.md`).
- Icons decorative → `aria-hidden`; meaningful icons → labelled.

## 11. Do / Don't
- ✅ Reuse tokens + components; keep it calm and premium.
- ✅ Let photography provide color; keep UI neutral.
- ❌ Don't copy the reference layout, brand, or copy.
- ❌ Don't hardcode colors/spacing; don't introduce a second accent.
- ❌ Don't use low-quality stock or break the grid.
