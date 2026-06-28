# SEO Audit

**Responsible agent:** SEO Auditor · **Gate:** §10.8 SEO
**Required evidence:** Lighthouse SEO report, metadata table per route, JSON-LD validation output, sitemap/robots checks.

| # | What to check | How to check | Pass criteria | Status |
|---|---|---|---|---|
| 1 | Lighthouse SEO | `npm run lighthouse` | ≥ 95 | ☐ |
| 2 | Title tags | Per-route metadata | Unique, descriptive, < 60 chars | ☐ |
| 3 | Meta descriptions | Per-route metadata | Unique, compelling, < 160 chars | ☐ |
| 4 | Canonical URLs | Inspect head | Correct canonical per route | ☐ |
| 5 | OpenGraph/Twitter | Inspect head | OG + Twitter cards present | ☐ |
| 6 | JSON-LD | Validate structured data | `RealEstateListing`/`Organization`/`BreadcrumbList` valid | ☐ |
| 7 | Headings | Outline | One `<h1>`; logical order | ☐ |
| 8 | Semantic HTML | Inspect | Landmarks + meaningful tags | ☐ |
| 9 | Image alt | Inspect | Descriptive alt text | ☐ |
| 10 | sitemap.xml | Fetch `/sitemap.xml` | Present, complete, valid | ☐ |
| 11 | robots.txt | Fetch `/robots.txt` | Correct; not blocking indexable routes | ☐ |
| 12 | Indexability | Inspect meta robots | No accidental `noindex` | ☐ |

**Fail =** missing/duplicate metadata, invalid JSON-LD, missing sitemap/robots, or noindex on indexable routes.
