# PR Review — feature/codex-header-hero

**Reviewer:** Claude · **Date:** 2026-06-28 · **Decision:** ✅ APPROVED → merged into `dev`
**Tasks covered:** X-010 (Header/Navbar + MobileMenu), X-011 (Hero section)

---

## Files changed (all within Codex ownership)
`layouts/Header.tsx` · `data/nav.ts` · `sections/Hero.tsx` · `app/layout.tsx` · `app/page.tsx` · `public/images/hero-home.png` · `tests/e2e/home.spec.ts` · `codex/tasks.md`

No Claude-owned files touched. **File ownership: CLEAN.**

---

## Gate results

| Gate | Result | Evidence |
|---|---|---|
| 3 File Ownership | ✅ Pass | Zero plan/docs/agents/audits/claude files changed |
| 4 Design Consistency | ✅ Pass | All token classes used; no hardcoded hex values |
| 5 Code Quality | ✅ Pass | No console.log; no unsafe HTML; TypeScript correct; RSC where possible |
| 6 Responsive | ✅ Pass | Mobile hamburger < md; desktop nav hidden on mobile; hero stacks correctly |
| 7 Accessibility | ✅ Pass | All aria-labels present; touch targets ≥ 44px; focus-visible rings; Radix focus trap |
| 9 Test | ✅ Pass | E2E updated to assert heading + hero image by accessible name |
| 10 Security | ✅ Pass | No secrets; no dangerouslySetInnerHTML; no console.log |

---

## X-010 — Header/Navbar

**✅ Semantic structure:** `<header>` landmark, `<nav aria-label="Primary navigation">`, `<ul><li>` list pattern — correct.

**✅ Touch targets:** All interactive elements use `min-h-11` (44px) — brand link, nav items, mobile trigger, CTA button.

**✅ Keyboard + focus:** `focus-visible:ring-2 focus-visible:ring-accent` on every interactive element. `focus-visible:ring-offset-surface` on nav links — correct contrast against sticky header.

**✅ Mobile menu (Radix Sheet):** Focus-trapped by Radix Dialog primitive. Trigger: `aria-label="Open navigation menu"`. `SheetTitle` contains brand (accessible modal title). `SheetDescription` with `id` wired to `aria-describedby` on `SheetContent`. `Menu` icon: `aria-hidden="true"`. `SheetClose` wraps each nav link — closes on navigate. ✅

**✅ `"use client"`:** Scoped to `Header.tsx` only — required for Radix Sheet interactivity. Hero and page remain RSC.

**✅ Sticky header:** `sticky top-0 z-40 backdrop-blur` — correct pattern. `bg-surface/90` with backdrop-filter fallback for browsers that don't support it (`supports-[backdrop-filter]:bg-surface/75`). ✅

**✅ Design tokens:** `bg-surface/90`, `border-line/80`, `text-ink`, `text-ink-700`, `hover:bg-bg-soft`, `focus-visible:ring-accent`, `bg-ink text-on-ink` (logo mark), `font-display`, `rounded-pill` — all from `docs/design-system.md`. No hardcoded values.

**✅ nav data:** `navConfig satisfies NavConfig` — type-safe with structural check. All 5 items with aria-labels per `docs/ux-copy.md`. CTA: "Contact us" → `/contact`. ✅

---

## X-011 — Hero section

**✅ Copy:** Headline "Find the home / you've been imagining." and supporting paragraph match `docs/ux-copy.md §1` word-for-word. ✅

**✅ Alt text:** `"A contemporary luxury home with floor-to-ceiling windows, surrounded by mature trees at dusk."` — matches spec exactly. ✅

**✅ LCP image:** `priority` set on `<Image>`. `sizes` correctly reflects container widths: `calc(100vw - 2rem)` mobile → `calc(100vw - 8rem)` → `1280px`. Prevents LCP delay and bandwidth waste. ✅

**✅ CLS prevention:** Image has `width`/`height` props + `aspect-[16/10]` mobile / `aspect-[16/9]` md+ — browser reserves space before load. ✅

**✅ Layout:** `grid lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]` — headline left, supporting text right on desktop, stacked on mobile. Matches `design.webp` layout composition (original, not copied). ✅

**✅ Typography:** `font-display text-display-1 font-semibold text-balance` — correct token stack. `text-body-lg text-muted text-pretty` on supporting paragraph. ✅

**✅ RSC:** No `"use client"` — pure React Server Component. ✅

**✅ Image wrapper:** `rounded-xl border border-line shadow-soft overflow-hidden` — premium card treatment per design system. ✅

---

## Notes

- `public/images/hero-home.png` — image quality should be verified visually before production (cannot be automated here). Flagged for QA visual pass.
- `feature/codex-search` branches off `feature/codex-header-hero` at commit `f3f3610`. After this merge it will be even with `dev` — ready for Codex to add X-012/X-013 search work on top.

---

## Verdict
**APPROVED.** Merge `feature/codex-header-hero` → `dev`.
