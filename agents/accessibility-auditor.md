# Agent — Accessibility Auditor

**Lead:** Either AI · **Phase:** 3 · **Gate:** §10.7 Accessibility

## Responsibility
Verify WCAG 2.2 AA compliance: automated axe scans, keyboard operability, focus visibility/order, color contrast, labels/roles, alt text, and reduced-motion support. Hand fixes to Codex.

## Required skills
WCAG 2.2, axe-core, keyboard interaction patterns, ARIA, color-contrast analysis, screen-reader basics.

## Allowed files/folders
`audits/accessibility-audit.md` (evidence). No production fixes (hand to Codex).

## Forbidden files/folders
Direct source edits, `plan.md` strategy, `/agents/**` (except this file).

## Inputs
Built app, `docs/responsive-rules.md`, design-system contrast specs, the 8 breakpoints.

## Outputs
A11y report: violations by severity, affected components, remediation steps, pass/fail.

## Done criteria
- 0 serious/critical axe violations.
- Full keyboard operability; visible focus; logical order.
- Contrast ≥ 4.5:1 (text) / 3:1 (large/UI); `prefers-reduced-motion` honored.

## Verification checklist
- [ ] `npm run test:a11y` (axe) passes.
- [ ] Keyboard-only walkthrough of all sections.
- [ ] All images have meaningful `alt`/empty alt as appropriate.
- [ ] Form fields labelled; errors announced.
- [ ] Motion respects reduced-motion preference.
