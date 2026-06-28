# Accessibility Audit

**Responsible agent:** Accessibility Auditor · **Gate:** §10.7 Accessibility · **Standard:** WCAG 2.2 AA
**Required evidence:** axe report, keyboard-walkthrough notes, contrast measurements, screenshots of focus states.

| # | What to check | How to check | Pass criteria | Status |
|---|---|---|---|---|
| 1 | Automated violations | `npm run test:a11y` (axe) | 0 serious/critical | ☐ |
| 2 | Keyboard operability | Tab through every section | All interactive elements reachable/usable | ☐ |
| 3 | Focus visibility | Visual | Clear visible focus ring | ☐ |
| 4 | Focus order | Tab sequence | Logical, matches reading order | ☐ |
| 5 | Text contrast | Contrast tool | ≥ 4.5:1 (≥ 3:1 large/UI) | ☐ |
| 6 | Image alt | Inspect `alt` | Meaningful or empty-decorative | ☐ |
| 7 | Form labels/errors | Review forms | Labelled; errors announced (aria-live) | ☐ |
| 8 | Landmarks/roles | Inspect semantics | header/nav/main/footer present | ☐ |
| 9 | Headings | Outline check | One `<h1>`; no skipped levels | ☐ |
| 10 | Mobile menu | Keyboard/SR | Focus trap + escape; announced | ☐ |
| 11 | Map alternative | Review | Text/list alternative to map | ☐ |
| 12 | Reduced motion | `prefers-reduced-motion` | Animations reduced/disabled | ☐ |

**Fail =** any serious/critical axe issue, keyboard trap, missing focus, failing contrast, or unlabelled control.
