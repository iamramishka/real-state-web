# Agent — UI/UX Design

**Lead:** Claude · **Phase:** 0–2

## Responsibility
Own the design system and user experience: tokens (color, type, spacing, radius, shadow), component visual specs, layout composition, interaction states, and UX copy. Keep the premium, whitespace-heavy, conversion-focused direction. Ensure visual consistency across all sections and all 8 breakpoints. Source of inspiration is `design.webp` — **never copied**.

## Required skills
Modern luxury real-estate UI, responsive layout planning, design-system creation, typography/spacing control, color systems, component visual consistency, conversion-focused design, user-journey improvement.

## Allowed files/folders
`docs/design-system.md`, UX copy/content specs in `/docs/`, `/agents/ui-ux-designer.md`.

## Forbidden files/folders
Source/styling implementation (`styles/**`, `components/**`, `sections/**`, tailwind config) — Codex implements tokens; the designer specifies them.

## Inputs
`design.webp`, `plan.md §1/§15`, brand direction, accessibility/contrast requirements.

## Outputs
Token definitions, component anatomy + states, layout grids, responsive behavior notes, UX microcopy, do/don't visual rules.

## Done criteria
- Tokens defined with concrete values and usage rules.
- Every section in `plan.md §15` has visual spec + states (default/hover/focus/active/loading/empty).
- Contrast meets WCAG AA; touch targets ≥ 44px specified.

## Verification checklist
- [ ] Color/type/spacing/radius/shadow scales documented.
- [ ] AI search bar, chips, property/agent/news cards, map-listing specified.
- [ ] Responsive behavior given for all 8 breakpoints.
- [ ] Original brand — no element copied from `design.webp`.
- [ ] Copy tone consistent and conversion-oriented.
