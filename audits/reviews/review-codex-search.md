# PR Review — feature/codex-search

**Reviewer:** Claude · **Date:** 2026-06-28 · **Decision:** ✅ APPROVED → merged into `dev`
**Tasks covered:** X-012 (AI search bar + form)
**Pending on next branch:** X-013 (suggestion chips + filters)

---

## Files changed (all within Codex ownership)
`components/forms/SearchForm.tsx` · `sections/SearchBar.tsx` · `app/page.tsx` · `tests/e2e/home.spec.ts` · `types/lucide-react.d.ts` · `package.json` · `package-lock.json` · `codex/tasks.md`

`plan.md` and `audits/reviews/review-codex-header-hero.md` appear in the diff only because they were added to `dev` after the branch point — **Codex did not edit them**. Verified via `git merge-base`. **File ownership: CLEAN.**

---

## Gate results

| Gate | Result | Evidence |
|---|---|---|
| 3 File Ownership | ✅ Pass | No Claude-owned files edited by Codex |
| 4 Design Consistency | ✅ Pass | All token classes; no hardcoded hex |
| 5 Code Quality | ✅ Pass | No console.log; no unsafe HTML; strict TS; `useId()` for stable IDs |
| 7 Accessibility | ✅ Pass | Full aria coverage; error announcement; status announcement; focus ring |
| 9 Test | ✅ Pass | E2E tests: render, mode toggle, keyboard submit, placeholder change |
| 10 Security | ✅ Pass | No secrets; Zod validation on all inputs; no dangerouslySetInnerHTML |

---

## Detailed findings

**✅ Form validation (Zod):** `searchSchema` enforces `mode` as enum, `query` as string `min(3)/max(140)/trim()`. Error messages match `docs/ux-copy.md §15` global copy. `zodResolver` wired to React Hook Form. ✅

**✅ Accessible form structure:**
- `<Label htmlFor={queryId}>` with `sr-only` — labelled but hidden. ✅
- `aria-invalid={Boolean(errors.query)}` + `aria-describedby={errorId}` on input — correct pattern. ✅
- Error `<p role="alert">` — announced immediately on validation failure. ✅
- Status `<p role="status" id={statusId}>` + `aria-describedby={statusId}` on form — search result announced to screen readers. ✅
- `useId()` for all IDs — React 18+ stable, SSR-safe. ✅

**✅ Mode toggle:** `aria-pressed` on each mode button; correct `type="button"` (no accidental form submit); hidden `<input type="hidden">` carries mode value to form. State updates trigger re-validation cleanly. ✅

**✅ Icon buttons:** All have `aria-label` + `title` + `aria-hidden` on icon SVG. Matches `docs/ux-copy.md §2` icon labels exactly. ✅

**⚠️ Minor — icon button touch targets:** Mode buttons are `h-11` (44px) ✅. Icon buttons (mic, waveform, submit, add) are `size-10` (40px) — slightly under the 44px plan spec. WCAG 2.2 AA minimum is 24px so no compliance failure, but note for a future pass if needed.

**✅ SearchBar section:** `<section aria-labelledby="search-title">` with visually hidden `<h2>` — excellent landmark pattern, no visual clutter. Overlaps hero via `-mt-16 z-10 relative`. ✅

**✅ Design tokens:** `border-line`, `bg-surface`, `shadow-raised`, `rounded-xl`, `bg-bg-soft`, `rounded-pill`, `focus-within:ring-accent`, `bg-ink text-on-ink`, `text-ink-700`, `focus-visible:ring-accent` — all from design system, no hardcoded values. ✅

**✅ Copy accuracy:** Placeholders for all 3 modes match `docs/ux-copy.md §2` word-for-word. Button labels match. ✅

**✅ New dependencies:** `zod@^4.4.3`, `react-hook-form@^7.80.0`, `@hookform/resolvers@^5.4.0` — all listed in `plan.md §2`, reputable, necessary. ✅

**✅ `types/lucide-react.d.ts`:** Windows-safe type shim for lucide-react. Acceptable workaround for known TS resolution issue on Windows. ✅

**✅ Tests (E2E):** Two tests — (1) render check for hero + search elements + aria-pressed state + placeholder; (2) mode switch → fill → Enter → status message assertion. Both use accessible selectors. ✅

---

## Not yet done (next branch)
- **X-013** — Suggestion chips (`data/suggestions.ts`, `data/filters.ts`, `components/ui/Chip.tsx`) — to follow on the same or a new `feature/codex-search` branch.

---

## Verdict
**APPROVED.** Merge `feature/codex-search` → `dev`.
