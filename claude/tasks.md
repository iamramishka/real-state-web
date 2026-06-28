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
| C-006 | Finalize brand name + accent color | todo | `docs/design-system.md` | source code | Human approves name + hex |
| C-007 | Write UX copy for all 15 sections | todo | `docs/design-system.md`, content spec | `sections/**` | Copy reviewed, consistent tone |
| C-008 | Define typed data shapes (spec only) | todo | `docs/` data-shape spec | `data/**` (Codex implements) | Interfaces documented for Codex |
| C-009 | Maintain accountability table | ongoing | `plan.md §18` | source code | Table reflects live status |
| C-010 | Review Codex PRs (comments only) | ongoing | review reports | implementation files | Report per `audits/*` |

## Handoff log
- C-001…C-005 completed in Phase 0 planning run. Next: C-006/C-007 await human input on brand + copy tone.
