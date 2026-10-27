# Team skills and prompts

This reference helps a small project team use AI assistants during planning, implementation, review, and handoff. Adapt the examples to the repository's approved stack, rules, and data policy.

## Shared working rules

- Read the README, AGENTS instructions, task, and relevant contract before changing files.
- Ask AI to inspect first and propose a file plan. Reuse existing files when possible.
- One person owns each change; another person reviews it.
- Use fictional data in practice. Never paste credentials, secrets, customer data, or personal information into a prompt.
- Do not claim a check passed unless you ran it and observed the result.
- AI suggestions are drafts. The team is responsible for understanding, checking, and accepting each change.

## Useful routines for every role

### Clarify a request

Ask for the expected result, included and excluded scope, observable criteria, assumptions, and questions that block the work. Do not edit files yet.

### Inspect and plan

Ask AI to read repository instructions and inspect the related workflow without editing. Request a short plan with existing files to update, new files only when needed, dependencies, risks, and checks. A person reviews the plan before implementation.

### Implement a small approved change

Give AI the approved task and criteria. Ask it to change only what is needed, validate inputs and outputs at the boundary, preserve shared contracts, and report actual commands and results. Review the diff.

### Diagnose a problem

Compare expected and observed behavior. Reproduce the problem, follow data through the affected layers, check logs without secrets, and compare explanations against evidence. Do not hide a failure or weaken a test.

### Review a change

Compare the diff to the plan and criteria. Look for behavior defects, error cases, privacy and security issues, schema or contract changes, and regressions. Record actionable findings with location, scenario, evidence, and impact. A person decides whether to approve.

### Prepare a handoff

Record the current state, how to install and start the project, demo steps, actual checks and results, known limits, and next tasks with likely files. Include a backup person for each area.

## Role examples

- Product and coordination: maintain the brief, acceptance criteria, priority, and task breakdown.
- Frontend: build accessible screens and show loading, success, empty, and error states using the agreed API format.
- Backend / API: validate requests and responses, follow shared contracts, and return clear errors.
- Data / database: explain the data model, prepare fictional seed data, review migrations, and check project isolation.
- QA / cross-review: connect criteria to repeatable checks and review a change made by someone else.
- AI development workflow: every role uses Codex or Claude to plan, create, review, and explain its code and Markdown changes. The capstone app does not need a built-in AI feature.

## Starter prompts

### Before editing

> Do not edit files. Read the README and AGENTS instructions. Explain what the project currently does in this area. Turn the request into an expected result, scope, observable criteria, assumptions, and blocking questions. Identify relevant existing files and any contract or data impact. Do not invent commands or requirements.

### Make a plan

> Inspect the related workflow without editing. Propose an ordered plan. For each step, list files to update and any new file only if needed, explain its purpose and minimum contents, and identify what can happen in parallel. Include risks and checks. Leave the plan for human approval.

### Implement an approved task

> Implement only this approved task: [link]. Criteria: [list]. Follow the README, AGENTS instructions, shared contracts, and approved stack. Keep the change small and use fictional data. Review the diff and report commands you actually ran and the results you observed. Do not expand scope.

### Review a change

> Review this diff against the approved plan and criteria. Check behavior, edge cases, privacy, security, contracts, and likely regressions. For each actionable issue, include file and location, scenario, evidence, impact, and a suggested correction. Do not modify or approve the change.

### Prepare a handoff

> Draft a handoff using information in the repository. Include current state, install and startup commands from the README, demo steps, relevant file paths, checks and actual results, known limits, and next tasks. Mark information you cannot confirm. Do not invent results.

## Approved program stack

- Web: React, strict TypeScript, Vike (`vike-react`), and integrated Vite.
- API: Bun + Hono; validate shared contracts with Zod.
- Data: Drizzle ORM, local SQLite, and PostgreSQL only in an approved shared environment.
- AI: use Codex or Claude as a development assistant. Do not add a product AI service to the capstone app.
- UI data: Tailwind CSS, TanStack Query, and native `fetch`; use Zustand only if Context is not enough.
- Shared access: the organization-provided SSO gateway. The local demo does not create accounts or custom authentication.

Before defining a project-specific routine, read AGENTS instructions, contracts, and existing patterns. Record the approved technology and version, folder responsibilities, shared formats, actual development and validation commands, and security and data limits.
