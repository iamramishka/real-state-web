# PR Review — feature/codex-map (X-016)

**Reviewer:** Claude · **Date:** 2026-06-29 · **Decision:** ✅ APPROVED → merged into `dev`
**Tasks covered:** X-016 (map + listing split view)

---

## Files changed (all within Codex ownership)
`components/MapView.tsx` · `sections/MapListing.tsx`
Updated: `app/page.tsx`

No Claude-owned files touched. **File ownership: CLEAN.**

---

## Gate results

| Gate | Result | Evidence |
|---|---|---|
| 3 File Ownership | ✅ Pass | Only Codex-owned paths; no plan/docs/agents/audits touched |
| 4 Design Consistency | ✅ Pass | All token classes; no hardcoded hex; grid layout matches design |
| 5 Code Quality | ✅ Pass | No console.log; no unsafe HTML; `"use client"` scoped to MapListing |
| 6 Responsive | ✅ Pass | Mobile: list/map toggle; desktop: split grid `lg:grid-cols-[...]` |
| 7 Accessibility | ✅ Pass | Map `role="group"` + sr-only alternative; list `role="list/listitem"`; toggle `aria-pressed` |
| 9 Test | ✅ Pass | No new tests added; covered by existing property card E2E + axe suite |
| 10 Security | ✅ Pass | No secrets; no dangerouslySetInnerHTML; no external links without rel |

---

## Detailed findings

**✅ MapView — accessible placeholder:** `role="group"` with `aria-label="Map of property listings. Use the list below for an accessible alternative."` and `aria-describedby="map-alternative"` pointing to `<p class="sr-only">` that explains the list cards contain the same data. Pattern correctly provides a non-visual alternative without hiding useful information. ✅

**✅ Map price pins:** Each pin is a `<Link>` with `aria-label="${price} — ${property.address}. Tap to view details."` — full context for screen reader users. `focus-visible:ring-2 focus-visible:ring-accent` ✅. `rounded-pill bg-ink text-on-ink shadow-raised` — correct design tokens for dark pill labels. ✅

**✅ Coordinate-based positioning:** `getPosition()` normalises lat/lng to percentage positions within a 76% bounding box (12%–88% range) — prevents pins touching the edges. Handles single-property edge case (`|| 1` guard on zero ranges). ✅

**✅ MapListing — mobile toggle:** `"use client"` scoped to `MapListing.tsx`. Toggle button: `type="button"`, `aria-pressed={mobileView === "map"}`, icon `aria-hidden="true"`, label changes between "Show map" / "Show list". `cn()` used for conditional `hidden lg:grid` / `hidden lg:block` — clean approach. ✅

**✅ Result label:** `${listingProperties.length} Homes for sale` — rendered both as visible `<h2>` and as `aria-label` on the list `<div role="list">` — screen readers get count context. ✅

**✅ Scrollable list:** `lg:max-h-[48rem] lg:overflow-y-auto lg:pr-2` — sidebar list scrolls independently of the sticky map; `lg:items-stretch` keeps map column full height. ✅

**✅ Landscape card layout:** `PropertyCard` receives `className="lg:grid-cols-[minmax(12rem,0.42fr)_minmax(0,0.58fr)]"` + `lg:[&_>a]:rounded-l-xl lg:[&_>a]:rounded-tr-none` + `lg:[&_img]:h-full` — image left, content right on large screens. Clean Tailwind arbitrary selector usage, no direct DOM manipulation. ✅

**✅ Section accessibility:** `<section aria-labelledby="listing-map-title">` with `<h2 id="listing-map-title">`. Eyebrow text `"Browse with context"` in `text-accent` — decorative label above heading, correct heading hierarchy. ✅

**✅ Save search button:** `aria-label="Save this search"` — button has accessible name even without adjacent label. Placeholder action for future implementation. ✅

**⚠️ Minor — no new E2E test for map section (not blocking):** The existing property card tests and axe suite cover accessibility. A dedicated toggle test (similar to filter chip test pattern) would be a good addition in a future pass. Not required for this merge.

**⚠️ Note — feature/codex-sell:** This branch (`feature/codex-map`) is the base for `feature/codex-sell`. Checked: `git log feature/codex-sell ^feature/codex-map` returns empty — no X-017 commits yet. Codex must add the FeatureBand (smarter-way-to-sell) work before that branch is reviewable.

---

## Verdict
**APPROVED.** Merge `feature/codex-map` → `dev`.
