# Performance Audit

**Responsible agent:** Performance Auditor · **Gate:** §10.11 Performance
**Required evidence:** Lighthouse reports (mobile + desktop), bundle-analyzer output, CWV metrics table.

| # | What to check | How to check | Pass criteria | Status |
|---|---|---|---|---|
| 1 | Lighthouse Performance | `npm run lighthouse` | ≥ 90 (mobile) | ☐ |
| 2 | LCP | Lighthouse/field | < 2.5s | ☐ |
| 3 | CLS | Lighthouse/field | < 0.1 | ☐ |
| 4 | INP | Lighthouse/field | < 200ms | ☐ |
| 5 | Home JS bundle | `npm run analyze` | < ~200KB gzip | ☐ |
| 6 | Image optimization | Inspect `next/image` usage | AVIF/WebP, correct `sizes` | ☐ |
| 7 | LCP image priority | Inspect hero | `priority` set; preloaded | ☐ |
| 8 | Fonts | Inspect `next/font` | Self-hosted; no CLS | ☐ |
| 9 | Client components | Review `"use client"` | Minimized; server-first | ☐ |
| 10 | Unused dependencies | Analyzer + review | None shipped | ☐ |
| 11 | Caching/static | Build output | Static where possible | ☐ |
| 12 | Animations | Review Framer Motion | GPU-friendly; reduced-motion respected | ☐ |

**Fail =** Lighthouse < 90, any CWV threshold exceeded, oversized bundle, or unoptimized images/fonts.
