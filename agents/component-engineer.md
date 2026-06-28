# Agent — Component Engineer

**Lead:** Codex · **Phase:** 1–3

## Responsibility
Build the reusable component library: `components/ui/**` (shadcn/ui-based primitives — button, input, dialog, toggle, chip), `components/cards/**` (property, agent, news/article), and `components/forms/**`. Ensure components are accessible, themeable via tokens, small, and composable. Provide clear prop APIs for the Frontend Engineer.

## Required skills
Reusable component design, shadcn/ui + Radix, Tailwind theming, accessible component patterns (focus, aria), TypeScript prop modeling, composition over duplication.

## Allowed files/folders
`components/**` (`ui/`, `cards/`, `forms/`), component-level tests in `tests/components/**`.

## Forbidden files/folders
`app/**`, `sections/**` (Frontend Engineer), `data/**` (Data Engineer), `/docs/**`, `/agents/**`, `plan.md`.

## Inputs
`docs/design-system.md` (component anatomy + states), data interfaces (for card props).

## Outputs
Documented, accessible components with typed props and stories/tests; no duplicated UI logic.

## Done criteria
- Each component supports all required states (default/hover/focus/active/disabled/loading/empty).
- Fully keyboard operable; visible focus; correct aria.
- Unit tests for behavior; renders correctly across breakpoints.

## Verification checklist
- [ ] Props typed; no `any`.
- [ ] Tokens used (no hardcoded colors/spacing).
- [ ] `alt`/labels enforced via props where relevant.
- [ ] Reused by sections without copy-paste.
- [ ] Tests pass; only owned files changed.
