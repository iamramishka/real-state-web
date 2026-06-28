You are an expert AI Project Architect, Product Manager, Senior Software Engineer, UI/UX Designer, QA Engineer, Cyber Security Reviewer, GitHub Workflow Manager, and Multi-Agent Development Coordinator.

I need to build a modern premium real estate website inspired by the 2 layout references I provided.

Design direction:
- Premium real estate landing website
- Clean white-space-heavy UI
- Luxury home hero image
- Large search experience
- Buy / Sell / Rent / Agents / News navigation
- Featured homes
- Homes for you
- Property listing + map section
- Agents section
- Real estate news
- Trends / tips / blog
- CTA and footer
- Fully responsive modern design

Important:
Do not copy the reference design exactly.
Use it only as inspiration.
Create an original, professional, high-quality real estate website with similar premium quality.

Your FIRST task is NOT coding.

Create a complete `plan.md` file from A to Z for the full project development process.

The project will be developed using Claude and Codex together. The plan must divide tasks clearly so Claude and Codex do not conflict, do not edit the same files at the same time, and can work independently using GitHub worktrees.

Do not start building the website until all planning files are complete and approved.

==================================================
1. PROJECT OVERVIEW
==================================================

In `plan.md`, include:

- Website purpose
- Target users
- Business goal
- Main pages
- Main features
- Design direction from the provided real estate layouts
- UX goals
- UI goals
- Performance goals
- SEO goals
- Accessibility goals
- Security goals
- Responsive design goals
- Expected final user experience

Main website sections:

- Header / Navbar
- Hero section with luxury real estate image
- AI-style search bar
- Suggested search chips
- Buy / Sell / Rent filters
- Explore homes section
- Featured homes
- Homes for you
- Property listing with map layout
- Smarter way to sell section
- Neighborhood discovery section
- Agent section
- Real estate news section
- Trends / tips / property inspiration section
- CTA section
- Footer

==================================================
2. RECOMMENDED TECH STACK
==================================================

Recommend and document the best tech stack.

Include:

- Frontend framework
- Styling system
- Component strategy
- Animation library if needed
- Icon library
- Image handling
- Form handling
- Validation
- Data handling
- Testing tools
- Linting tools
- Formatting tools
- Type checking
- Security scanning tools
- Accessibility testing tools
- Performance testing tools
- Deployment option

Preferred direction:
- Next.js or React-based modern frontend
- TypeScript
- Tailwind CSS
- Reusable components
- Static data first unless backend is needed
- SEO-friendly structure
- Mobile-first responsive design

==================================================
3. FOLDER STRUCTURE
==================================================

Create a professional folder structure.

Include folders for:

- app / pages / routes
- components
- components/ui
- components/cards
- components/forms
- sections
- layouts
- data
- hooks
- utils
- lib
- styles
- assets/images
- assets/icons
- tests
- docs
- security
- audits
- claude
- codex
- agents
- worktrees
- public

Also include:

- `plan.md`
- `CLAUDE.md`
- `CODEX.md`
- `.claude/`
- `.codex/`
- `/claude/tasks.md`
- `/codex/tasks.md`
- `/agents/`
- `/audits/`
- `/docs/`

Explain what each folder and file is used for.

==================================================
4. CLAUDE AND CODEX SETUP
==================================================

Prepare clear instructions for:

- `/claude/`
- `/codex/`
- global `CLAUDE.md`
- global `CODEX.md`
- `.claude/`
- `.codex/`
- agent-specific instruction files
- task allocation files
- review files
- audit files

Rules:

- Claude focuses on planning, architecture, documentation, design system, UX copy, review planning, and QA checklist generation.
- Codex focuses on implementation, refactoring, bug fixing, testing, performance improvement, and security fixes.
- Claude and Codex must never work on the same file at the same time.
- Every task must define file ownership.
- Every task must define verification commands.
- Every task must be independently executable.

==================================================
5. MULTI-AGENT ROLE ALLOCATION
==================================================

Define these agents properly:

1. Project Manager Agent
2. Architecture Agent
3. UI/UX Design Agent
4. Frontend Software Engineer Agent
5. Component Engineer Agent
6. Data/Content Engineer Agent
7. QA Engineer Agent
8. GitHub Worktree Controller Agent
9. GitHub Reviewer Agent
10. Merger Review Agent
11. Security Scanner Agent
12. Performance Audit Agent
13. Accessibility Audit Agent
14. SEO Audit Agent
15. Documentation Agent

For each agent include:

- Responsibility
- Required skills
- Allowed files/folders
- Forbidden files/folders
- Inputs
- Outputs
- Done criteria
- Verification checklist

==================================================
6. REQUIRED SKILLS MATRIX
==================================================

Add a full skills matrix for all agents.

Cyber Security Skills:

- Secure frontend development
- Dependency vulnerability scanning
- Secret scanning
- XSS prevention
- Input validation
- Safe form handling
- Environment variable protection
- Secure external links
- Safe image source handling
- Security headers awareness
- Package audit and risk review
- AI-generated code security review
- AI security scanning before merge
- Avoiding exposed API keys
- Avoiding unsafe user input rendering
- Avoiding malicious dependency usage

UI/UX Design Skills:

- Modern real estate website UI design
- Luxury / minimal visual style
- Layout composition
- Typography hierarchy
- Color system
- Component spacing
- Button and card design
- Hero section design
- Search bar UI design
- Property card UI design
- Map/listing UI design
- Agent section UI
- News/blog section UI
- CTA design
- Visual consistency checking
- Conversion-focused design
- User journey improvement

Responsive Design Skills:

- Mobile-first design
- Desktop, laptop, tablet, and mobile layouts
- Responsive navbar
- Responsive hero image and text
- Responsive property card grid
- Responsive map/listing layout
- Responsive spacing and typography
- Touch-friendly buttons
- Avoid horizontal scrolling
- Cross-browser layout checking
- Responsive image handling

Required responsive breakpoints:

- 320px small mobile
- 375px standard mobile
- 425px large mobile
- 768px tablet
- 1024px small laptop
- 1280px desktop
- 1440px large desktop
- 1920px full HD screen

Every UI section must be verified on all above screen sizes before approval.

Agent skill examples:

Security Scanner Agent skills:
- Cyber security audit
- Dependency audit
- Secret scanning
- XSS prevention
- Secure frontend review
- Safe form validation
- AI-generated code security review

UI/UX Design Agent skills:
- Modern luxury real estate UI design
- Responsive layout planning
- Design system creation
- Typography and spacing control
- Component visual consistency
- User journey improvement

QA Engineer Agent skills:
- Responsive testing
- Cross-browser testing
- Accessibility testing
- UI regression checking
- Functional testing
- Build verification
- Bug reporting

Frontend Software Engineer skills:
- Responsive frontend implementation
- Component-based development
- Clean code
- Accessibility-friendly HTML
- SEO-friendly structure
- Performance optimization

==================================================
7. CLAUDE VS CODEX TASK ALLOCATION
==================================================

Divide work clearly.

Claude tasks:

- Project architecture planning
- Design system planning
- Component planning
- Page and section breakdown
- UX copywriting
- Documentation
- Agent instructions
- Review checklist creation
- Audit checklist creation
- QA plan creation
- Security planning
- SEO planning
- Accessibility planning

Codex tasks:

- Project setup
- Component implementation
- Page implementation
- Styling implementation
- Responsive implementation
- Unit tests
- Refactoring
- Bug fixes
- Performance improvement
- Security fixes
- Build verification

Rules:

- Claude must not directly implement production code unless assigned.
- Codex must not change planning strategy without approval.
- Claude and Codex must not edit the same file in the same task.
- Every file must have one active owner.
- All task handoffs must include files touched, commands run, test result, and next step.

==================================================
8. GITHUB WORKTREE METHOD
==================================================

Add a complete GitHub worktree development method.

Include:

- Main branch
- Dev branch
- Feature branches
- Claude worktree
- Codex worktree
- Review worktree
- Merge worktree
- Naming conventions
- Worktree folder paths
- Commands for creating worktrees
- Commands for checking status
- Commands for switching branches
- Commands for merging
- Commands for deleting finished worktrees
- Rules to prevent conflicts

Example branches:

- `main`
- `dev`
- `feature/claude-design-system`
- `feature/codex-header-hero`
- `feature/codex-property-cards`
- `review/ui-review`
- `merge/release-prep`

Example worktrees:

- `../worktrees/claude-design`
- `../worktrees/codex-frontend`
- `../worktrees/review`
- `../worktrees/merge`

Include real example commands.

==================================================
9. GITHUB REVIEWER AND MERGER REVIEW
==================================================

Explain how GitHub Reviewer works.

Important rule:
The GitHub Reviewer can be another AI model, but it must only review. It must not directly merge.

Reviewer responsibilities:

- Check code quality
- Check security
- Check accessibility
- Check responsiveness
- Check SEO
- Check performance
- Check design consistency
- Check folder structure
- Check coding rules
- Check test results

Reviewer must:

- Leave comments
- Create a review report
- Identify risks
- Request changes when needed
- Not overwrite implementation
- Not merge directly

Merger Review Agent:

- Reviews all reports
- Confirms all checks passed
- Confirms no file ownership conflict
- Confirms no unresolved comments
- Confirms build passes
- Makes final merge recommendation

Merge only after all checks pass.

==================================================
10. AI VERIFICATION SYSTEM
==================================================

Add a strict AI verification process.

Include these gates:

1. Comprehension Gate
2. Planning Gate
3. File Ownership Gate
4. Design Consistency Gate
5. Code Quality Gate
6. Responsive Gate
7. Accessibility Gate
8. SEO Gate
9. Test Gate
10. Security Gate
11. Performance Gate
12. Final Merge Gate

For each gate include:

- Purpose
- Required evidence
- Pass criteria
- Fail criteria
- Responsible agent
- Commands or checks required

==================================================
11. QUALITY STANDARDS
==================================================

Include standards for:

- Clean code
- Reusable components
- Small files
- Naming conventions
- Folder organization
- Responsive design
- Accessibility
- SEO
- Performance
- Security
- Maintainability
- Comments
- Error handling
- Loading states
- Empty states
- Form validation
- Image optimization
- Design consistency
- Content consistency
- Cross-browser support

==================================================
12. CODING RULES
==================================================

Include clear coding rules:

- Do not create large messy files
- Keep components small and focused
- Use consistent naming
- Avoid duplicated UI logic
- Use reusable data arrays
- Use semantic HTML
- Use accessible labels
- Use alt text for images
- Avoid hardcoded repeated content
- Avoid unnecessary dependencies
- Do not expose secrets
- Do not commit `.env`
- Do not edit generated lock files unless needed
- Run checks before every commit
- Do not bypass lint errors
- Do not ignore TypeScript errors
- Do not leave console logs in production
- Do not use unsafe HTML rendering unless reviewed
- Do not break mobile layout
- Do not use low-quality images

==================================================
13. THINGS TO AVOID
==================================================

Include:

- Copying the reference layout exactly
- Editing files owned by another agent
- Mixing Claude and Codex tasks
- Starting code without reading `plan.md`
- Large unreviewed changes
- Skipping tests
- Skipping security checks
- Ignoring mobile design
- Ignoring accessibility
- Ignoring SEO
- Using low-quality placeholder images
- Breaking design consistency
- Creating fake backend if not needed
- Overengineering
- Adding unnecessary packages
- Hiding failed checks
- Deleting files without approval

==================================================
14. DEVELOPMENT COMMANDS
==================================================

Add commands for:

- Installing dependencies
- Starting dev server
- Building
- Linting
- Formatting
- Testing
- Security audit
- Type checking
- Previewing production build
- Running accessibility checks if available
- Running performance checks if available

Include command examples based on the recommended tech stack.

==================================================
15. DESIGN IMPLEMENTATION PLAN
==================================================

Break the website into sections:

1. Header/Navbar
2. Hero section with luxury home image
3. AI-style search bar
4. Suggested search chips
5. Property category filter
6. Featured homes
7. Homes for you
8. Property listing with map layout
9. Smarter way to sell section
10. Neighborhood section
11. Agent section
12. Real estate news section
13. Trends/tips/blog section
14. CTA section
15. Footer

For each section include:

- Purpose
- UI details
- Responsive behavior
- Data needed
- Components needed
- Responsible agent
- Files to edit
- Files not to edit
- Verification checklist

==================================================
16. SECURITY AND AI SECURITY SCANNING
==================================================

Include:

- Dependency audit
- Secret scanning
- Input validation
- XSS prevention
- Safe external links
- Image source safety
- Form validation
- Environment variable rules
- Package trust review
- AI-generated code security review
- Security checklist before merge

Security rules:

- Never expose API keys
- Never commit `.env`
- Never trust user input
- Avoid unsafe HTML injection
- Validate forms
- Use safe external link attributes
- Review all third-party packages
- Run security audit before merge

==================================================
17. AUDITS
==================================================

Create audit checklists for:

- UI audit
- Responsive audit
- Accessibility audit
- SEO audit
- Performance audit
- Security audit
- Code quality audit
- Final release audit

Each audit must include:

- What to check
- How to check
- Responsible agent
- Required evidence
- Pass/fail status

==================================================
18. ACCOUNTABILITY SYSTEM
==================================================

Add a task accountability table format.

Each task must track:

- Task ID
- Task name
- Task owner
- Agent
- Branch name
- Worktree path
- Files touched
- Status
- Commands run
- Test results
- Reviewer
- Approval status
- Merge status
- Notes

Use a clear markdown table.

==================================================
19. HOW TO WORK WITH ME
==================================================

Add instructions for how Claude and Codex should communicate with me:

- Ask before major design changes
- Show file plan before editing
- Explain what will be changed
- Give short progress updates
- Provide commands to run
- Report errors clearly
- Never hide failed checks
- Ask confirmation before deleting files
- Ask confirmation before large refactors
- Always provide next step
- Do not start implementation before planning approval

==================================================
20. FINAL SUPPORT FILES TO CREATE
==================================================

After creating `plan.md`, also create these planning/support files:

- `CLAUDE.md`
- `CODEX.md`
- `.claude/README.md`
- `.codex/README.md`
- `/claude/tasks.md`
- `/codex/tasks.md`
- `/agents/project-manager.md`
- `/agents/architect.md`
- `/agents/ui-ux-designer.md`
- `/agents/software-engineer.md`
- `/agents/component-engineer.md`
- `/agents/data-content-engineer.md`
- `/agents/qa-engineer.md`
- `/agents/github-worktree-controller.md`
- `/agents/github-reviewer.md`
- `/agents/merger-review.md`
- `/agents/security-scanner.md`
- `/agents/performance-auditor.md`
- `/agents/accessibility-auditor.md`
- `/agents/seo-auditor.md`
- `/agents/documentation-agent.md`
- `/audits/ui-audit.md`
- `/audits/responsive-audit.md`
- `/audits/security-audit.md`
- `/audits/performance-audit.md`
- `/audits/accessibility-audit.md`
- `/audits/seo-audit.md`
- `/audits/code-quality-audit.md`
- `/audits/final-release-audit.md`
- `/docs/design-system.md`
- `/docs/worktree-strategy.md`
- `/docs/development-rules.md`
- `/docs/security-rules.md`
- `/docs/responsive-rules.md`
- `/docs/qa-checklist.md`

Each file must contain useful instructions, not empty placeholder text.

==================================================
21. IMPORTANT RULE ABOUT plan.md
==================================================

Do not delete `plan.md` immediately.

Use `plan.md` as the master coordination document during setup.

Only after all tasks, agent files, Claude files, Codex files, audit files, and documentation files are fully created and verified, create a section called:

“Safe To Remove plan.md Later”

In that section, explain:

- `plan.md` can be removed only after all permanent instruction files are created.
- All important information must be copied into the correct permanent files before removal.
- The Project Manager Agent and Merger Review Agent must approve removal.
- Do not remove it during early development.

==================================================
22. FINAL RESPONSE FORMAT
==================================================

When finished, give me:

1. List of files created
2. Short explanation of how Claude should start
3. Short explanation of how Codex should start
4. First 5 development tasks
5. Commands I should run next
6. Any risks or missing requirements

Do not start building the website until the planning files are complete and approved.