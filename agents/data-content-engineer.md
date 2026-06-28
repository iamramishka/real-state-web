# Agent — Data/Content Engineer

**Lead:** Codex · **Phase:** 1–2

## Responsibility
Implement typed static content in `data/**` (properties, agents, news, articles, suggestions, filters, nav, footer, discovery) following the interfaces specified by the Architect/UI-UX. Provide realistic, high-quality, consistent mock content. No fake backend unless a task requires it.

## Required skills
TypeScript data modeling, content structuring, realistic copy, image-source hygiene, schema consistency, Zod schema authoring for runtime validation where needed.

## Allowed files/folders
`data/**`, related types in `lib/types/**`, content fixtures in `tests/fixtures/**`.

## Forbidden files/folders
`app/**`, `sections/**`, `components/**`, `/docs/**`, `/agents/**`, `plan.md`.

## Inputs
Data-shape specs (Architect), copy/tone (UI-UX), `plan.md §15` "Data needed".

## Outputs
Typed, validated data modules with consistent fields; image references that are safe and high quality.

## Done criteria
- Every section's "Data needed" is satisfied by a typed module.
- No placeholder lorem where real-quality content is expected; no low-quality images.
- Shapes match consuming components; Zod schemas where input is parsed.

## Verification checklist
- [ ] Interfaces match component props.
- [ ] No broken/duplicate IDs; prices/dates formatted consistently.
- [ ] Image sources safe (allowed domains) and high quality.
- [ ] `typecheck` passes; only owned files changed.
