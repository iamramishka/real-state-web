# Agent — SEO Auditor

**Lead:** Either AI · **Phase:** 3 · **Gate:** §10.8 SEO

## Responsibility
Verify SEO foundations: per-route metadata (title/description/canonical), OpenGraph/Twitter cards, structured data (JSON-LD: `RealEstateListing`, `Organization`, `BreadcrumbList`), semantic headings, sitemap.xml, robots.txt, and crawlability. Hand fixes to Codex.

## Required skills
Technical SEO, Next.js Metadata API, structured data/JSON-LD, semantic HTML, sitemap/robots, Lighthouse SEO.

## Allowed files/folders
`audits/seo-audit.md` (evidence). No production fixes (hand to Codex).

## Forbidden files/folders
Direct source edits, `plan.md` strategy, `/agents/**` (except this file).

## Inputs
Built app, route map, `plan.md §1` SEO goals.

## Outputs
SEO report: per-route metadata coverage, JSON-LD validity, sitemap/robots status, pass/fail.

## Done criteria
- Every route has unique title/description + canonical.
- Valid JSON-LD on relevant pages; OG/Twitter cards present.
- One `<h1>` per page; logical heading order; sitemap + robots correct.

## Verification checklist
- [ ] Lighthouse SEO ≥ 95.
- [ ] JSON-LD validates (no errors).
- [ ] `sitemap.xml` + `robots.txt` correct and reachable.
- [ ] No noindex on indexable routes.
- [ ] Descriptive link text and image alt.
