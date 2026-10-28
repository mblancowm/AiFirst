# 05 · Develop with Codex or Claude

> Week 3 · 2 hours · Main focus: use a coding assistant on real project tasks

In this course, Codex or Claude helps the team build the application and its documentation. The app itself does not need an AI feature. Each person uses the assistant in their role and remains responsible for understanding, reviewing, and checking what they accept.

## Learning objective

Complete a small task with a coding assistant: provide context, ask for a plan, review the plan, make a change, check it, and explain the result.

## Before you start

- Open the team's repository, not the course website repository.
- Have the agreed task, its criteria, `README.md`, `AGENTS.md`, and related files available.
- Use fictional data only; do not share keys, personal information, or real data.
- Work on one small task at a time. Do not ask the assistant to build the whole app in one instruction.

## The Codex or Claude workflow

1. **Describe the task.** Explain the result the user needs, your role, the acceptance criteria, and what is out of scope.
2. **Ask it to inspect and plan.** Point to relevant files or ask it to find them. First request a plan and file list; do not ask for edits yet.
3. **Review the plan.** Confirm it matches the files, team stack, and criteria. Ask about terms you do not understand and agree on the change with another person.
4. **Implement one small part.** Ask it to change only the agreed files and update related Markdown if the change requires it.
5. **Check the result.** Review the diff. Run relevant checks from the README, confirm visible behavior, and record only observed results.
6. **Ask for an explanation.** Ask what changed, how the data flows, and what limits remain. Each person should be able to explain their own change.
7. **Save and hand off.** Follow the team's Git workflow, request human review, and complete the pull request handoff: criterion, changed files/decisions, checks and observed results, limits, and next step.

## Files it can help create or maintain

This depends on the task. It can help with code and Markdown documentation, for example:

- Product: `docs/product/brief.md`, acceptance criteria, and backlog.
- Web: components, forms, lists, and screen documentation.
- API: routes, validation, and `docs/api/contracts.md`.
- Data: schema, migration, and `docs/data/model.md`.
- QA and delivery: repeatable cases, observed results, and `docs/delivery/handoff.md`.

Do not create files just because they appear in an example. Ask the assistant to inspect the repository and explain why each file is needed.

## Step-by-step exercise

Choose a real task from your role that helps complete insert and list for one record:

1. Write the expected result and how you will know it works.
2. Give the task to the assistant and ask for inspection and a plan without edits.
3. Share the plan with the team. Clarify the changes before approving them.
4. Ask it to implement only that task and review the diff.
5. Run the relevant checks and record what happened.
6. Update related documents and present the change to another person for review. Complete the change handoff in the pull request: purpose, decision, actual check results, limits, and next step.

## Starter prompt for Codex or Claude

> I am [product / web / API / data / QA] on a beginner team. We are building an app from scratch that inserts one type of record and lists saved records. Task: [describe one small part]. Criteria: [paste the agreed criteria]. Limits: use fictional data; do not add update, delete, or AI features to the app. Inspect `README.md`, `AGENTS.md`, and related files. Do not edit anything yet. Suggest a short plan, the files that already exist, and the files to create or update, explaining why each change is needed. Wait for the team to review the plan.

## Result and team review

Each participant completes and explains at least one code or Markdown change made with Codex or Claude. Another person reviews the diff and evidence. The app keeps the agreed scope: insert and list; update or delete are optional, and an AI feature inside the app is not required.
