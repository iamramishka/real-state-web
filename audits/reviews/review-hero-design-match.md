# PR Review — Hero section design match (full-bleed image + floating search card + suggestion chips)

**Reviewer:** Claude · **Date:** 2026-06-30 · **Decision:** ✅ APPROVED → merge
**Task:** Align hero section with `design.webp` reference — full-bleed image, floating search card overlapping the image bottom, suggestion chips.
**Implemented by:** Claude under **explicit human assignment** ("yes implement"), overriding default Codex ownership of `sections/**` and `components/**`. Same-author note: change is build-verified, typecheck-clean, and code-reviewed at medium effort.

---

## Files changed

| File | Change |
|---|---|
| `sections/Hero.tsx` | Full rewrite — new layout: white text zone → full-bleed image → `SearchForm` anchored `absolute bottom-0` |
| `components/forms/SearchForm.tsx` | Additive — new optional `suggestions` prop + chip row rendering |

No new dependencies. No data-file changes (consumed existing `data/suggestions.ts`).

---

## Standards applied

- **Brand guardrail honored:** `design.webp` is inspiration for layout treatment only. Wordmark, copy, and brand stay original Nordhaven.
- **RSC boundary preserved:** `Hero.tsx` remains a Server Component; `SearchForm` is already `"use client"`. No `"use client"` added to Hero.
- **Existing SearchForm reused:** chips added via prop (`suggestions?: readonly SearchSuggestion[]`) — no duplicate search logic.
- **Tokens only:** `shadow-raised`, `bg-bg-soft`, `hover:bg-line`, `rounded-pill`, `text-ink-700` — all mapped in `styles/globals.css`. No hardcoded hex.

---

## Gate results

| Gate | Result | Evidence |
|---|---|---|
| 4 Design Consistency | ✅ | Token-only; `shadow-raised` = `globals.css:83`; chip colors from palette |
| 5 Code Quality | ✅ | `typecheck` 0 errors; `lint` 0 warnings (`--max-warnings=0`); build compiled in 41 s |
| 6 Responsive | ✅ | Image: `h-[380px] sm:h-[440px] md:h-[520px] lg:h-[600px]`; text zone single-col < lg; chips `overflow-x-auto shrink-0` on mobile |
| 7 Accessibility | ✅ | `h1` preserved; image `alt` preserved; chips `role="group"` + `aria-label`; chips `type="button"` (won't submit form); accent focus ring on chips |
| 9 Build | ✅ | `✓ Generating static pages (6/6)`; route `/` = 8.99 kB (+0.17 kB from chip render — expected) |
| 10 Security | ✅ | No new deps, no unsafe HTML, no secrets, no `dangerouslySetInnerHTML` |

---

## Code review (medium effort) — findings: **none**

**Verified items (refuted as risks):**

- **`absolute` reference point:** outer `<div className="relative">` is the positioning context; the image wrapper (`relative h-[…] overflow-hidden`) is a sibling/child relationship that does not affect the absolute card — `overflow-hidden` only clips its own children, not a sibling's absolutely-positioned descendant. ✅
- **Image `fill` parent:** the inner `<div className="relative h-[380px]…">` provides the required `position: relative` + explicit height for `fill`. ✅
- **Chip `type="button"` inside `<form>`:** chips do not trigger form submission. `setQuery` + `setErrorMessage("")` + `setStatusMessage("")` correctly reset form state. ✅
- **`visibleSuggestions` filter logic:** `!s.mode || s.mode === "all" || s.mode === selectedMode` — exhaustive for `SearchSuggestionMode = "buy" | "rent" | "sell" | "all"`. Suggestions with no mode or `"all"` always show; mode-specific ones gate correctly as tab changes. ✅
- **`readonly SearchSuggestion[]` prop:** TS allows passing mutable `SearchSuggestion[]` from Hero to the `readonly` prop — no type mismatch. ✅
- **`sizes="100vw"`:** correct for a full-bleed image that spans the viewport at all breakpoints. ✅

**Minor (non-blocking, not findable by lint/TS):**
- Safari hides scrollbars only via `-webkit-scrollbar: none`. The chip row uses `[scrollbar-width:none]` (Firefox) and `[-ms-overflow-style:none]` (IE/Edge legacy). Safari will show the chip scrollbar. Cosmetic only; does not affect usability or a11y. Accepted.

---

## Verdict

**APPROVED.** Merge `feature/hero-design-match` → `dev` → `main`; redeploy.
