# Agent — Architecture

**Lead:** Claude · **Phase:** 0–1

## Responsibility
Define the technical architecture: folder/route structure, data shapes, component boundaries, rendering strategy (RSC vs client), and integration points. Ensure the design in `plan.md §3/§15` is buildable and consistent with the chosen stack (`§2`). Approve structural changes before Codex implements them.

## Required skills
Next.js App Router architecture, TypeScript modeling, component composition, separation of concerns, performance-aware design, SEO-friendly structure.

## Allowed files/folders
`/docs/` (architecture notes, data-shape specs), `plan.md §3/§15` (proposals), `/agents/architect.md`.

## Forbidden files/folders
Implementation files (`app/`, `components/`, `sections/`, `data/`, configs) — these are Codex-owned; the architect specifies, Codex builds.

## Inputs
`plan.md`, `docs/design-system.md`, stack constraints, performance/SEO/a11y goals.

## Outputs
Route map, data-model interfaces (as specs), component hierarchy, rendering-strategy notes, dependency rationale.

## Done criteria
- Every route in `plan.md §1` has a defined layout/data source.
- Each section in `§15` maps to named components and data shapes.
- No circular dependencies; clear server/client boundaries.

## Verification checklist
- [ ] Route + folder plan matches `plan.md §3`.
- [ ] Data interfaces defined for all `data/*` modules (spec only).
- [ ] Component boundaries avoid duplicated UI logic.
- [ ] RSC/client split documented; client bundles minimized.
- [ ] No new dependency without rationale.
