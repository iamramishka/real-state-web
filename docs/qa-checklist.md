# QA Checklist

> Master QA plan for functional, responsive, cross-browser, a11y, and build verification. Owner: QA Engineer. Feeds gates §10.6/§10.7/§10.9 and the audit files.

## How to run
```bash
npm run lint && npm run typecheck   # static gates
npm run test                        # Vitest unit
npm run test:e2e                    # Playwright e2e + responsive viewports
npm run test:a11y                   # axe accessibility
npm run build                       # production build verification
```
Attach results + screenshots as evidence in the relevant `audits/*` file.

## 1. Functional
- [ ] Navbar links route correctly (Buy/Sell/Rent/Agents/News).
- [ ] AI search bar: typing + Enter submits; Buy/Sell/Rent toggle changes mode.
- [ ] Suggestion chips populate/trigger a search.
- [ ] Filter chips toggle and reflect state (`aria-pressed`).
- [ ] Property cards link to detail; "View details" works.
- [ ] Map pins correspond to listings; list/map toggle works on mobile.
- [ ] Agent cards link to agent; ratings render.
- [ ] News/article cards link to content; dates render.
- [ ] CTA button performs its action.
- [ ] Footer links work; external links open safely; newsletter validates.
- [ ] Contact/sell-enquiry forms validate + submit (happy + error paths).

## 2. Responsive (see `docs/responsive-rules.md`)
- [ ] Every section verified at 320/375/425/768/1024/1280/1440/1920.
- [ ] No horizontal scroll anywhere.
- [ ] Touch targets ≥ 44px; no overlap/clipping.
- [ ] Images scale; type uses clamp; grids reflow.

## 3. Cross-browser
- [ ] Chromium, Firefox, WebKit render consistently.
- [ ] Fonts/icons load; no layout drift between engines.

## 4. Accessibility (see `audits/accessibility-audit.md`)
- [ ] axe: 0 serious/critical.
- [ ] Full keyboard operability; visible focus; logical order.
- [ ] Contrast AA; labelled controls; alt text; reduced-motion honored.

## 5. Content & UI quality
- [ ] No placeholder lorem where real content is expected.
- [ ] No low-quality images; consistent card anatomy.
- [ ] Design tokens used; consistent across sections.
- [ ] Loading / empty / error states present and styled.

## 6. Performance smoke (full audit in `audits/performance-audit.md`)
- [ ] Lighthouse ≥ 90 mobile; LCP/CLS/INP within thresholds.
- [ ] Hero LCP image `priority`; no major CLS.

## 7. SEO smoke (full audit in `audits/seo-audit.md`)
- [ ] Per-route title/description; one `<h1>`.
- [ ] Sitemap + robots reachable.

## 8. Build verification
- [ ] `npm run build` succeeds with no notable warnings.
- [ ] No `console.log` in output; no TS/lint errors.
- [ ] Deploy preview (Vercel) loads with no console errors.

## Bug report format
```
Title: <concise summary>
Severity: blocker | major | minor | trivial
Section / component: <where>
Breakpoint / browser: <e.g. 375px / WebKit>
Steps to reproduce: 1) … 2) … 3) …
Expected vs actual: …
Evidence: <screenshot/log>
Owner to fix: <engineer> (QA does not fix in the same task)
```

## Sign-off
QA signs off a section only when sections 1–8 above pass for that section. Record sign-off + evidence; hand bugs to the owning engineer.
