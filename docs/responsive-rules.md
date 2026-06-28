# Responsive Rules

> Mobile-first rules + required breakpoints. Mirrors `plan.md §6`. Owner: UI-UX / QA. Enforced by `audits/responsive-audit.md` (Gate §10.6).

## Required breakpoints (verify every section on ALL 8)

| Token | Width | Target device |
|---|---|---|
| `xs` | **320px** | small mobile |
| `sm` | **375px** | standard mobile |
| `ms` | **425px** | large mobile |
| `md` | **768px** | tablet |
| `lg` | **1024px** | small laptop |
| `xl` | **1280px** | desktop |
| `2xl` | **1440px** | large desktop |
| `3xl` | **1920px** | full HD |

> Map to Tailwind `screens` so utilities exist for each. Design mobile-first: base styles target 320px, then layer `sm: md: lg: …` upward.

## Core rules
1. **Mobile-first:** author base styles for the smallest screen; enhance upward.
2. **No horizontal scroll** at any breakpoint (`scrollWidth ≤ clientWidth`).
3. **Fluid type:** use `clamp()` from the design-system scale; no fixed huge px on mobile.
4. **Fluid spacing:** section padding via `clamp()`; consistent rhythm.
5. **Touch targets ≥ 44×44px**; adequate spacing between tappable items.
6. **Responsive images:** `next/image` with correct `sizes`; never overflow the container.
7. **Grids reflow:** cards `1 → 2 → 3` (agents `→ 4`); no clipping/overlap.
8. **Navbar:** full nav ≥ md; hamburger + focus-trapped slide-over < md.
9. **Map/listing:** side-by-side ≥ lg; list-first with map toggle < lg.
10. **Cross-browser:** verify Chromium, Firefox, WebKit.

## Section-specific behavior (summary of `plan.md §15`)
- **Hero:** text over image stack < md; headline uses `display-1` clamp.
- **Search bar:** controls wrap/stack on mobile; full-width; submit reachable by thumb.
- **Chips/filters:** horizontal scroll < md with momentum; keep focus visible.
- **Feature band / discovery:** two-column ≥ md → stacked < md.
- **Footer:** multi-column ≥ md → stacked accordion-style < md.

## How to verify
- **Automated:** Playwright projects per viewport (`npm run test:e2e`) capturing screenshots + asserting no overflow.
- **Manual:** DevTools device toolbar at each of the 8 widths; check tap targets and readability.
- **Evidence:** screenshots per section per breakpoint attached to `audits/responsive-audit.md`.

## Fail conditions
Any horizontal scroll, overlap/clipping, unreachable control, illegible text, or broken grid at any of the 8 breakpoints.
