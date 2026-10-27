# Module: Team Harness and Planning

## Goal

Prepare a repository so a team can direct AI coding agents safely and work in parallel without losing shared context or stepping on each other’s changes.

## Key idea

AI-first development starts with clear context and plans. The agent should know the product, boundaries, conventions, test commands, role folders, and approved contracts before it writes application code.

## Minimum repository structure

```text
/
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── apps/
│   ├── api/
│   └── web/
├── packages/
│   ├── db/
│   ├── ai/
│   └── contracts/
├── docs/
│   ├── idea.md
│   ├── proposal.md
│   ├── architecture.md
│   ├── execution-plan.md
│   ├── roles.md
│   ├── dependencies.md
│   ├── adr/
│   └── planning/
├── skills/
└── .github/
    ├── workflows/
    ├── CODEOWNERS
    └── pull_request_template.md
```

Use the repository’s existing conventions if the project already has a structure. `AGENTS.md` should explain the project, how to run checks, coding conventions, role-owned folders, and the rule to read `docs/planning/` before coding. `CLAUDE.md` can point Claude users to shared project guidance.

## Week 1 hands-on steps

1. Write `docs/idea.md` with the user, problem, and one-sentence outcome.
2. Write `docs/proposal.md` with the MVP scope and explicit exclusions.
3. Write `docs/architecture.md` with the web, API, database, and AI flow.
4. Write `docs/roles.md` and `docs/dependencies.md`.
5. Create `AGENTS.md`, `CLAUDE.md`, a pull request template, and `CODEOWNERS`.
6. Protect `main`: require pull requests, at least one review, and prohibit direct pushes.
7. Add GitHub Actions checks for lint, tests, and build. Add secret scanning or the organization’s approved equivalent.
8. Create `docs/planning/` and write a plan for each feature before implementation.
9. Review and approve the repository foundation before application feature coding begins.

## Plan template

Each `docs/planning/<feature>.md` should include:

- User problem and expected behavior.
- Scope and exclusions.
- UI, API, data, and AI changes that may be needed.
- Contracts and dependencies.
- Acceptance criteria and test plan.
- Role owner and reviewer.
- Open questions and risks.

Changes to scope or contracts should be proposed through a pull request so the team can review and approve them.

## Suggested base skills or reusable prompts

Create short reusable instructions for: an architecture decision record (ADR), a new API endpoint, a database migration, a web component, and a pull request review. Each should require the agent to read the plan, stay in its role boundary, run relevant checks, and explain its result.

## Codex prompt

> Help me prepare the repository harness for this four-week AI-first training project. Inspect the existing repository first. Draft the required project documentation and agent instructions, then propose the branch protection and CI checklist. Do not write application feature code. Keep each document short, identify assumptions, and show the files for human review before calling the foundation complete.

## Foundation gate checklist

- A new agent can understand the repository from root instructions and `docs/`.
- Feature plans exist in `docs/planning/` before implementation.
- Role ownership and cross-layer dependencies are clear.
- `main` requires pull requests and review.
- CI runs at least lint, tests, and build.
- Secrets are kept out of Git.

## What you learned

You learned how repository instructions, docs as code, feature plans, and protected review flows give AI agents the context and boundaries to work productively.
