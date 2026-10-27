# Start here: prepare and build an AI-first project

The course's goal is for each team to choose a project idea and learn, step by step, to build a web app and its project documents from scratch using Codex or Claude. Each person uses the assistant for their role to understand the work, plan and create code and Markdown files, and explain errors. The team agrees on what to build, reviews changes, and checks each part; AI helps, but people make decisions and own the result.

This is a self-guided course for beginner to intermediate learners, with no required instructor or live sessions. It does not assume experience with programming, Git, or building applications. It starts with guided steps and basic ideas, then builds toward helping the team plan, build, review, and deliver a small first version. Each module explains the terms it uses and guides you through a small practice change.

The course takes four weeks for teams of 3–4 people, with 2–8 hours of work per person each week. Each team chooses one project idea and builds it throughout the course. Use fictional data.

## What you will build

The minimum deliverable is a web app the team builds from scratch in a new repository. It must let someone **insert** (create/save) records and **list** (view) the saved records on screen, using practice data stored in a database. To finish in four weeks, choose one type of record, a few fields, and one screen. **Updating and deleting are optional improvements.** Each participant completes and explains at least one AI-assisted change; the team delivers a demonstrable app and documentation another person can use to run and continue it.

| Project | Suggested minimum app |
| --- | --- |
| **Appointment scheduler** | Insert practice appointments and list the saved appointments. |
| **Knowledge base** | Insert fictional articles and list them. |
| **Support inbox** | Insert fictional tickets and list them. |

The [knowledge base walkthrough](project-integration-walkthrough.md) is one example. Each team builds its application from scratch and can choose another proposal. Finish inserting and listing first; add updating or deleting only if there is time. Do not connect real systems or use customer documents, tickets, or data.

## If this is your first application

You do not need to know React, APIs, or databases before you start. Follow the modules in order, work with a partner, and ask Codex or Claude to explain each file and change in simple words. Accept only changes that you and another team member can explain.

Start with one small task. You do not need to build a complete application all at once: first agree on what it should do, then build one part and check together that it works.

## Roles for a team of 3 or 4

Each person has a primary area, but the team works together and reviews one another's changes. With four people, assign one person each to product/coordination, web, API, and data. With three, combine API and data. QA does not belong to just one person: rotate who coordinates testing each week and always ask someone other than the author to review a change. Adding AI to the application is optional; no one needs to own it unless it solves a project need.

| Role | Main responsibility | Common files |
| --- | --- | --- |
| **Product and coordination** | Uses Codex or Claude to draft and update the brief, criteria, and tasks; the team agrees on priorities and scope. | `docs/product/brief.md`, `docs/product/acceptance-criteria.md`, `docs/backlog/` |
| **Web / interface** | Uses the assistant to build the page, insert form, and list, and explain or update related documentation. | `apps/web/`, screen documentation if needed |
| **API / backend** | Uses the assistant to build insert and list operations, validate requests, and maintain the documented contract. | `apps/api/src/`, `packages/contracts/`, `docs/api/contracts.md` |
| **Data / database** | Uses the assistant to define the table and fields, prepare fictional data, and document the data model. | `apps/api/src/db/`, `apps/api/drizzle/`, `docs/data/model.md` |
| **QA / testing** | Uses the assistant to prepare cases and checklists; runs checks and records only observed results. Coordination rotates weekly. | `docs/qa/`, web and API tests, `docs/delivery/handoff.md` |

Record assignments in `docs/team/assignments.md`. The [role guide](../../roles.en.md) explains what each area does and how to coordinate week by week.

## Prepare the project for the next team

Think about someone receiving the repository without having attended your meetings. They should be able to install it, start it, understand what it does, and choose the next task by reading the project.

- Keep working requirements and commands in `README.md`, starting from the correct root folder.
- Keep the current map, rules, and stack in `AGENTS.md`.
- Save agreements, contracts, and decisions in `docs/`; do not leave the only explanation in chats or in someone's memory.
- Keep small next tasks in the backlog, with criteria and likely files.
- In the handoff, record the current state, known limits, checks and their actual results, and next steps. When changing a feature, review its criteria, contracts, and tests first; update the documentation in the same change.
- Assign a backup person to each area and update the map when the team changes.

In week 4, module 04 asks another person or team to continue from the instructions without the original team dictating the steps. Record where they get stuck and improve the documentation.

## Basic terms

| Term | Simple meaning |
| --- | --- |
| **Repository** | The project folder and its change history. |
| **Git** | The tool that keeps a history of project changes. |
| **Branch** | A separate workspace for working on a task. |
| **Commit** | A saved point in the work, with a short description. |
| **Pull request** | A proposal for someone else to review changes before they join the main work. |
| **File path** | The address of a file. For example, `docs/product/brief.md` is inside `docs`, then `product`. |
| **Screen** | What a person sees and uses in the application. |
| **API** | The doorway a screen uses to request or save information. |
| **Database** | Where an application stores information. |
| **Contract** | An agreement about what information one part sends and another receives. |
| **Criterion** | A visible result that helps us decide whether a feature is ready. |
| **CRUD** | Four actions: create, read, update, and delete. This course requires insert and list; update and delete are optional. |
| **Test** | A repeatable check to see whether something works. |
| **Coding assistant** | Codex or Claude can explain the repository, suggest or edit code and Markdown files. The team reviews and decides what to accept. |

If you see a new term, ask the assistant to explain it in one sentence and point to an example file. You do not need to memorize the glossary.

## Four-week path

| Week | Module | Team work | Files and evidence |
| --- | --- | --- | --- |
| 1 · Choose and set up | [00 · Project folders and setup](00-team-harness.md) | Choose a proposal, assign roles, create a new repository, and build the project structure from scratch with Codex or Claude. | `README.md`, `AGENTS.md`, brief, insert/list criteria, map, first task, and first branch. |
| 2 · Store and view data | [03 · Data](03-database.md) and [02 · API](02-backend.md) | Create a simple table and agree how to insert a record and list saved records. | Schema, database change, fictional data, two API operations, and tests. |
| 3 · Build the screen | [01 · Screen](01-ui.md) | Create the insert form and show the list connected to the API. | Simple page, form, list, messages, and screen tests. |
| 3 · Develop with AI | [05 · Work with Codex or Claude](05-ai-assisted-development.md) | Practice a complete assistant workflow: context, plan, small change, verification, review, and explanation. | One code or Markdown change per person, with a reviewed diff and observed evidence. |
| 4 · Review and deliver | [04 · QA and delivery](04-qa.md) | Check that insert and list work end to end, review pull requests, and prepare a demo another team can repeat. Update/delete are optional. | Tested minimum features, updated README, reviewed pull request, handoff, and transfer test. |

## How to build the app and its documents with Codex or Claude

Codex can work with an open repository in the editor and lets you review changes beside the code; see the [official Codex IDE guide](https://learn.chatgpt.com/docs/ide). Claude can be used for the same workflow. Each person works from their assigned role in the team's new repository, not from the course site's code.

The site's **AI Tutor** helps with lessons and offers explanations or hints based on the module. To create or change project files, use Codex or Claude with the team's repository open. If the tutor does not have an approved provider available, copy the module's contextual prompt into the approved assistant. The team's app does not need built-in AI: Codex or Claude is used to develop the project.

1. **Choose the project and assign roles.** Each task needs an owner, a reviewer, and a list of files that might change.
2. **Open the team's repository.** Before asking for changes, ask Codex or Claude to explain the structure and read `README.md`, `AGENTS.md`, and the project's Markdown files.
3. **Ask for a plan from your role.** Say whether you are working on product, web, API, data, or QA. Ask it to identify both code files and `.md` files to create or update. At first, ask for a plan without editing files.
4. **Approve the plan and build a small task.** After reviewing the plan, ask for help implementing only that task from scratch. Update related documents as part of the same work.
5. **Review with another person.** Read the diff, ask for an explanation of each file, and keep only changes you can explain. Someone other than the author reviews the change.
6. **Check and save the work.** Follow the README commands, try the feature, and record actual results. Use a branch and Git to save progress.

Example first prompt:

> We are a beginner team and chose [appointment scheduler / knowledge base / support inbox]. My role is [role]. We are building this repository from scratch. Read the current files; if README.md, AGENTS.md, or project documentation is missing, suggest what to create. Our minimum app inserts one record and lists it using fictional data. Based on my role, suggest which code and Markdown files I should create or update, what each should contain, and one small task to start with. Do not edit anything yet. Do not add update or delete. Explain in simple words and wait for the team to review the plan.

Every team member uses Codex or Claude from their assigned role to plan and build the project, including its Markdown files. The goal is for the team to understand each change, review it, and decide what to accept; the app does not need an AI feature.

## Learning and work rhythm

As you work through each module, follow five steps: **learn** a short idea, **observe** a worked example, **practice** a project task for your role, **check** the result with a checkpoint, and **record** the artifact and what you learned. The schedule is flexible; each person distributes their 2–8 weekly hours.

For each project task, every role follows the same cycle: **define** the result, **plan** and identify files, **build** a small change, **verify** it with evidence, **review** it with another person, and **deliver** it with a summary. Product, API, data, QA, and handoff Markdown files are part of what the team creates and maintains. Saving reusable prompts or skills is optional.

## Project tools

You do not need to memorize these; each module introduces them when needed:

- **React and Vike** help display pages and screens.
- **TypeScript** helps find mistakes in code.
- **Bun** starts the application and manages packages.
- **Hono** organizes API routes.
- **Drizzle and SQLite** help describe and store data during local practice; an approved shared deployment uses PostgreSQL.
- **Zod** checks that data has the agreed format.

## Limits

Use fictional data only. Do not create your own authentication, publish this practice version, or add external connections or AI services without approval. Team members are responsible for reviewing changes suggested by AI.

For examples of responsibilities, see the [role guide](../../roles.en.md). Each module includes a goal, files to prepare, a guided exercise, a prompt you can paste into Codex or Claude, and a team review.
