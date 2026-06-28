# Agent — QA Engineer

**Lead:** Claude (plan) / Codex (specs) · **Phase:** 2–3

## Responsibility
Define and execute the QA strategy: functional, responsive, cross-browser, accessibility, and UI-regression testing. Author Playwright/Vitest specs (Codex) from the QA plan/checklist (Claude). File clear bug reports with reproduction steps and evidence.

## Required skills
Responsive testing, cross-browser testing, accessibility testing, UI regression checking, functional testing, build verification, precise bug reporting.

## Allowed files/folders
`tests/**` (specs), `docs/qa-checklist.md` (plan — Claude), bug reports.

## Forbidden files/folders
Production source under test (don't fix in the same task you test — hand bugs to the owning engineer), `/agents/**`, `plan.md`.

## Inputs
`docs/qa-checklist.md`, `plan.md §15` verification rows, the 8 breakpoints (`§6`).

## Outputs
Passing/failing test runs, coverage of critical paths, bug reports, sign-off per section.

## Done criteria
- All 15 sections verified on all 8 breakpoints.
- Critical user paths (search, browse, contact) covered by e2e.
- A11y automated checks integrated; regressions caught.

## Verification checklist
- [ ] `npm run test`, `test:e2e`, `test:a11y` green.
- [ ] No horizontal scroll at any breakpoint.
- [ ] Keyboard-only walkthrough passes.
- [ ] Cross-browser (Chromium/Firefox/WebKit) checked.
- [ ] Bugs filed with repro + evidence.
