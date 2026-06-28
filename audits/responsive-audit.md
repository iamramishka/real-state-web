# Responsive Audit

**Responsible agent:** QA Engineer · **Gate:** §10.6 Responsive
**Required evidence:** screenshots at all 8 breakpoints per section, Playwright viewport run logs.

## Required breakpoints (must match `plan.md §6` and `docs/responsive-rules.md`)

| Token | Width | Target |
|---|---|---|
| xs | 320px | small mobile |
| sm | 375px | standard mobile |
| ms | 425px | large mobile |
| md | 768px | tablet |
| lg | 1024px | small laptop |
| xl | 1280px | desktop |
| 2xl | 1440px | large desktop |
| 3xl | 1920px | full HD |

## Checks (run for every section in `plan.md §15`)

| # | What to check | How to check | Pass criteria | Status |
|---|---|---|---|---|
| 1 | No horizontal scroll | Resize to each breakpoint | `scrollWidth ≤ clientWidth` | ☐ |
| 2 | Navbar → hamburger < md | Visual + keyboard | Menu toggles, focus-trapped | ☐ |
| 3 | Hero text/image reflow | Visual | Stacks cleanly; readable | ☐ |
| 4 | Search bar usability on mobile | Interaction | Controls reachable, tappable | ☐ |
| 5 | Card grids reflow 1→2→3(→4) | Visual | No overlap/clipping | ☐ |
| 6 | Map/listing collapses < lg | Visual | List-first with map toggle | ☐ |
| 7 | Touch targets ≥ 44px | Measure | Meets minimum | ☐ |
| 8 | Type scales with clamp() | Visual | No overflow/truncation | ☐ |
| 9 | Images responsive | Inspect `sizes` | Correct sizes; no overflow | ☐ |
| 10 | Cross-browser | Chromium/Firefox/WebKit | Layout consistent | ☐ |

**How:** `npm run test:e2e` (Playwright projects per viewport) + manual spot checks.
**Fail =** horizontal scroll, overlap, unreachable controls, or broken layout at any breakpoint.
