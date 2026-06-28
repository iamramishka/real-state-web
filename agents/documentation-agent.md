# Agent — Documentation

**Lead:** Claude · **Phase:** all

## Responsibility
Keep all documentation accurate and consistent: `/docs/**`, `README.md`, workspace READMEs, and cross-references in `plan.md`. Ensure stack names, breakpoints, the 15-agent list, and the 12 gates stay identical everywhere. Migrate `plan.md` content into permanent files ahead of its eventual removal (`plan.md §21`).

## Required skills
Technical writing, information architecture, consistency auditing, Markdown, cross-referencing.

## Allowed files/folders
`/docs/**`, `README.md`, `.claude/README.md`, `.codex/README.md`, `/agents/documentation-agent.md`.

## Forbidden files/folders
Source code, `/audits/**` internals (auditors own), changing planning strategy without approval.

## Inputs
`plan.md`, agent files, audit files, stack decisions.

## Outputs
Up-to-date, internally consistent docs; a migration map from `plan.md` to permanent files.

## Done criteria
- No dangling references (every named file exists).
- Stack/breakpoints/agents/gates consistent across all docs.
- `plan.md` content has a home in a permanent file before removal.

## Verification checklist
- [ ] Stack names match `plan.md §2/§14`, `CODEX.md`, `development-rules.md`.
- [ ] 8 breakpoints identical across `plan.md §6`, `responsive-rules.md`, `responsive-audit.md`.
- [ ] 15 agent files match `plan.md §5/§20`.
- [ ] 12 gates referenced consistently.
- [ ] Links resolve; no placeholder text.
