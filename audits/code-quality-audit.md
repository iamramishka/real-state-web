# Code Quality Audit

**Responsible agent:** GitHub Reviewer · **Gate:** §10.5 Code Quality
**Required evidence:** lint log, typecheck log, test results, changed-files diff, file-size/complexity notes.

| # | What to check | How to check | Pass criteria | Status |
|---|---|---|---|---|
| 1 | Lint | `npm run lint` | 0 errors; no disabled rules | ☐ |
| 2 | Types | `npm run typecheck` | 0 errors; no `any`/`@ts-ignore` | ☐ |
| 3 | Tests | `npm run test` | All pass; meaningful coverage | ☐ |
| 4 | Build | `npm run build` | Succeeds, no warnings of note | ☐ |
| 5 | File size | Review | Components < ~200 lines; focused | ☐ |
| 6 | Naming | Review | Consistent, descriptive | ☐ |
| 7 | Duplication | Review | No duplicated UI logic; reused components | ☐ |
| 8 | Folder structure | Compare to `plan.md §3` | Files in correct folders | ☐ |
| 9 | Reusable data | Review | Content in `data/**`, not hardcoded | ☐ |
| 10 | Comments | Review | Purposeful; no dead/commented code | ☐ |
| 11 | Error handling | Review | Errors handled; no silent failures | ☐ |
| 12 | No console logs | grep `console.` | None in production code | ☐ |
| 13 | Ownership | `git diff --name-only dev...HEAD` | Only owned files changed | ☐ |

**Fail =** any lint/type/test/build failure, ignored errors, duplicated logic, console logs, or cross-owner edits.
