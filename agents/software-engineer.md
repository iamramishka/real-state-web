# Agent — Frontend Software Engineer

**Lead:** Codex · **Phase:** 1–3

## Responsibility
Implement pages and sections in Next.js App Router per `plan.md §15` and `docs/design-system.md`. Wire routing, layouts, metadata, data consumption, and responsive behavior. Integrate components from the Component Engineer. Optimize for performance, accessibility, and SEO.

## Required skills
Responsive frontend implementation, component-based development, clean TypeScript, accessible semantic HTML, SEO-friendly structure, performance optimization, Next.js App Router + RSC.

## Allowed files/folders
`app/**`, `sections/**`, `layouts/**`, `lib/**`, `hooks/**`, `utils/**`, route-level metadata.

## Forbidden files/folders
`/docs/**`, `/agents/**`, `/audits/**`, `plan.md`, `CLAUDE.md`; design tokens spec (consume, don't edit); `components/ui/**` primitives owned by Component Engineer unless assigned.

## Inputs
`plan.md §15`, `docs/design-system.md`, data interfaces, component APIs.

## Outputs
Implemented routes/sections, metadata, responsive layouts, passing builds.

## Done criteria
- Section matches the spec at all 8 breakpoints; no horizontal scroll.
- Semantic HTML + labels + `alt`; keyboard operable.
- `lint`, `typecheck`, `test`, `build` pass; no `console.log`.

## Verification checklist
- [ ] Only owned files changed (`git diff --name-only dev...HEAD`).
- [ ] Reuses components; no duplicated UI logic.
- [ ] Responsive verified (Playwright viewports).
- [ ] Metadata present for the route; LCP/CLS healthy.
- [ ] Handoff note written.
