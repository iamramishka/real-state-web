# Claude Task Queue (Planning · Docs · Design · Content · QA Checklists)

> Claude pulls from this queue. Every task declares **owner**, **allowed/forbidden files**, and **verification**. One active owner per file. See `plan.md §7`, `§18`.

## Legend
Status: `todo` → `in_progress` → `in_review` → `approved` → `done` (or `blocked`).

## Active / Backlog

| ID | Task | Status | Allowed files | Forbidden files | Verification |
|---|---|---|---|---|---|
| C-001 | Author master `plan.md` (22 sections) | done | `plan.md` | source code | Sections 1–22 present, consistent |
| C-002 | Author `CLAUDE.md` / `CODEX.md` | done | `CLAUDE.md`, `CODEX.md` | source code | Ownership + rules complete |
| C-003 | Author 15 agent role files | done | `agents/**` | source code | All 8 fields per file |
| C-004 | Author 8 audit checklists | done | `audits/**` | source code | What/How/Owner/Evidence/Pass-fail |
| C-005 | Author 6 docs references | done | `docs/**` | source code | Design system + rules complete |
| C-006 | Finalize brand name + accent color | done | `docs/design-system.md` | source code | Nordhaven + #1F6F5C locked |
| C-007 | Write UX copy for all 15 sections | done | `docs/ux-copy.md` | `sections/**` | Copy complete, all 15 sections |
| C-008 | Define typed data shapes (spec only) | done | `docs/data-shapes.md` | `data/**` (Codex implements) | 10 modules, all interfaces complete |
| C-009 | Maintain accountability table | ongoing | `plan.md §18` | source code | Table reflects live status |
| C-010 | Review + merge Codex PRs (feature→dev) | ongoing | review reports, git merge | implementation files | Gates green → Claude merges |
| C-011 | Final release merge (dev→main) | pending Phase 3 | git merge main, audits | — | final-release-audit pass → Claude merges |

## Handoff log
- C-001…C-005 completed in Phase 0 planning run.
- C-006: `docs/design-system.md` updated — brand locked as **Nordhaven**, accent locked as `#1F6F5C`.
- C-007: `docs/ux-copy.md` created — full UX copy for all 15 sections + global/system copy + tone guide.
- C-008: `docs/data-shapes.md` created — 10 TypeScript interface modules + Codex implementation rules.
- C-009: `plan.md §18` accountability table updated with live Phase 0 results + Phase 1 task rows.
- **Phase 0 planning is complete.** All Claude planning tasks done. Awaiting human approval to begin Phase 1 (build). Next Claude task after approval: C-010 (PR reviews) once Codex opens first PR.
- **C-010 ongoing:** X-001–X-016 reviewed and merged into `dev`.
  - X-001–X-003 (setup): `audits/reviews/review-codex-setup.md` · merged 2026-06-28
  - X-004 (tokens): `audits/reviews/review-codex-tokens.md` · merged 2026-06-28
  - X-010–X-011 (header + hero): `audits/reviews/review-codex-header-hero.md` · merged 2026-06-28
  - X-012 (search form): `audits/reviews/review-codex-search.md` · merged 2026-06-28
  - X-013 (chips + filters): `audits/reviews/review-codex-chips-x013.md` · merged 2026-06-29
  - X-014–X-015 (property cards + sections): `audits/reviews/review-codex-property-cards-x014-x015.md` · merged 2026-06-29
  - X-016 (map + listing): `audits/reviews/review-codex-map-x016.md` · merged 2026-06-29
  - **Next to review:** X-017 (feature/codex-sell — FeatureBand) once Codex adds commits.
