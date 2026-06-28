# PR Review — feature/codex-search (X-013)

**Reviewer:** Claude · **Date:** 2026-06-29 · **Decision:** ✅ APPROVED → merged into `dev`
**Tasks covered:** X-013 (suggestion chips + filter chips)

---

## Files changed (all within Codex ownership)
`components/ui/Chip.tsx` · `data/filters.ts` · `data/suggestions.ts`
Updated: `sections/SearchBar.tsx` · `tests/e2e/home.spec.ts`

No Claude-owned files touched. **File ownership: CLEAN.**

---

## Gate results

| Gate | Result | Evidence |
|---|---|---|
| 3 File Ownership | ✅ Pass | Only Codex-owned paths; no plan/docs/agents/audits touched |
| 4 Design Consistency | ✅ Pass | All token classes; no hardcoded hex |
| 5 Code Quality | ✅ Pass | No console.log; no unsafe HTML; `"use client"` scoped correctly |
| 7 Accessibility | ✅ Pass | `role="group"` landmarks; `aria-pressed` on filters; `role="status"` announcement |
| 9 Test | ✅ Pass | New E2E test covers keyboard activation + aria-pressed toggle |
| 10 Security | ✅ Pass | No secrets; no dangerouslySetInnerHTML |

---

## Detailed findings

**✅ Chip component:** `"use client"` scoped to `Chip.tsx` only. Base `Chip` wraps `<button type="button">` — prevents accidental form submit. Accepts all `ButtonHTMLAttributes`, so consumers can pass `aria-label`, `aria-pressed`, `onClick` freely. Two variants (`suggestion`, `filter`) both use design tokens exclusively: `border-line`, `bg-surface`, `text-ink-700`, `hover:border-accent`, `border-ink`, `bg-ink`, `text-on-ink`, `bg-bg-soft`, `rounded-pill`, `focus-visible:ring-accent`. ✅

**✅ SuggestionChipRow:** `role="group" aria-label="Suggested searches"` — correct landmark pattern. Each chip gets `aria-label="${label} — tap to search"` (matches ux-copy.md §2 pattern). Status: `<p role="status" aria-label="Suggestion status">` announces selected query to screen readers; empty string when idle (clean). Horizontal scroll on mobile with `overflow-x-auto` and wrapping on `md:` — correct responsive pattern. ✅

**✅ FilterChipRow:** `role="group" aria-label="Property filters"` ✅. Each filter chip: `aria-pressed={isActive}` + `type="button"` ✅. Toggle logic with `Set<string>` is clean and immutable-safe. Default active state seeded from `item.defaultActive` — none active by default in current data (all false), which is intentional. ✅

**✅ Suggestion data (suggestions.ts):** 8 items — matches ux-copy.md §2 "8 suggestion chips" spec. `mode` field typed as `SearchSuggestionMode` for future filtering by search mode. Labels and queries match the conversational/AI copy tone in ux-copy.md. ✅

**✅ Filter data (filters.ts):** 6 categories (New to market, Most viewed, Open houses, Price drop, Luxury, Sold). `PropertyCategory` union type correctly constrains values. Labels match the filter-chip row in ux-copy.md §5. ✅

**✅ SearchBar.tsx:** RSC (no `"use client"`) — can safely import client components `SuggestionChipRow` and `FilterChipRow` since they have their own client boundary. Layout: `grid gap-5` stacking form → suggestions → filters. ✅

**✅ Tests:** New "search chips are keyboard accessible and filters toggle" test verifies: chip activatable via Enter key, `role="status"` announcement content, filter `aria-pressed` toggles on Enter and Space. All selectors use accessible names. ✅

**⚠️ Minor — UX gap (not blocking):** Clicking a suggestion chip updates the `selectedQuery` status but does not populate the `SearchForm` input. Chips are purely presentational at this stage. Acceptable for X-013 — wire-up is a future enhancement (X-013 task scope is chips/data layer only).

**⚠️ Minor — type duplication (not blocking):** `PropertyCategory` is defined in both `data/filters.ts` and `data/properties.ts` (X-014). They match, but are not shared via import. Note for a future types consolidation pass.

---

## Verdict
**APPROVED.** Merge `feature/codex-search` → `dev`.
