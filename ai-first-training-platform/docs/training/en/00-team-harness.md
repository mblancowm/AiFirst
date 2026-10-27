# 00 · Choose a project, organize folders, and prepare the workspace

> Week 1 · 2 hours · Everyone participates

In this module, the team chooses a small idea, finds the project root folder, and learns where each kind of work belongs. First agree on the plan and learn the map; then start coding.

## Before you start: simple terms

- A **project** is the work the team builds.
- A **repository** is the main project folder and the history of its changes.
- A **path** is the address of a file. `apps/api/src/app.ts` means: open `apps`, then `api`, then `src`, and then `app.ts` in the team's new repository.
- A **folder** groups related files. A **file** holds one specific thing, such as instructions, a screen, or a test.

If you are working on this course site, start in the folder containing the main `README.md` and `package.json`. That is the repository **root**. Run the README commands from there. You do not need to know React, APIs, or databases to follow the plan; ask for an explanation before changing something you do not understand.

### How to start the course site

1. Open PowerShell or a terminal in the repository folder. The root is the folder where `README.md` and `package.json` appear. If a path contains spaces, put it in quotes when using `cd`:

   ```powershell
   cd "C:\path\to\ai-first-training-platform"
   ```

2. Check that Bun is available:

   ```powershell
   bun --version
   ```

   If the command is not recognized, follow your team's approved installation process and reopen the terminal.

3. From the root, install packages and prepare the database:

   ```powershell
   bun install --frozen-lockfile
   bun run db:migrate
   ```

4. In one terminal, still at the root, start the API:

   ```powershell
   bun run dev:api
   ```

5. Open a second terminal at the same root and start the web app:

   ```powershell
   bun run dev:web
   ```

6. Open `http://127.0.0.1:3000` in a browser. If an error appears, save the message and ask for help; do not run installation inside `apps/` or `docs/` or make up commands.

These commands start the course site. For your team's project, follow that project's own README.

## What you will build

The team builds its app from scratch in a new repository. The minimum is to **insert** records and **list** them on a web page, using fictional data saved in the practice database. Choose one proposal and one type of record.

- **Appointment scheduler:** insert practice appointments and list saved appointments.
- **Knowledge base:** insert fictional articles and list them.
- **Support inbox:** insert fictional tickets and list them.

Start with a few fields, one screen, and one main table. **Updating and deleting are optional**; consider them only after insert and list work. Do not connect calendars, documents, tickets, or real systems.

## Divide the team's work

Roles are areas of responsibility. They do not mean that one person does all the work in that area: their job is to coordinate it and review changes with someone else.

| Area | What it coordinates | Team of 4 | Team of 3 |
| --- | --- | --- | --- |
| **Product and coordination** | Problem, first workflow, criteria, and priorities. | One person. | One person. |
| **Web / interface** | Screens, forms, messages, and accessibility. | One person. | One person. |
| **API / backend** | Requests, responses, validation, and errors. | One person. | Same person coordinating data. |
| **Data / database** | Tables, fields, relationships, and fictional data. | One person. | Same person coordinating API. |
| **QA / testing** | Test cases, review, and evidence. | Rotates weekly across all four people. | Rotates weekly across all three people. |

There is no separate AI role and no required AI feature inside the application. Each person uses Codex or Claude in their assigned area to create code and documents; the team understands and reviews each change before accepting it.

Record who coordinates each area and the QA rotation in `docs/team/assignments.md`. For each task, the owner and reviewer must be different people. See the [role guide](../../roles.en.md) for tasks and weekly order.

## Save and share the work with Git

The team's project should live in a Git repository approved by the organization. Git keeps a history of changes; GitHub, Azure DevOps, or another platform can host the repository and show reviews. Use the platform your team provides. Do not work directly in this course site's folder.

Each team member gets a copy of the repository using the platform's **Clone** option or the command it provides. **Cloning** means bringing a copy of the shared project onto your computer so you can work on it. You do not need to memorize the commands: practice them one at a time and ask someone to explain any word or result you do not understand. Before starting a task, open a terminal in the project root:

```bash
git switch main
git pull
git switch -c feature/short-name
```

`main` is the most common name for the main branch; if the repository uses another name, follow its README. A **branch** is a separate workspace for a task, so your changes do not change the main work yet. Make one small change on your branch and review it:

```bash
git status
git diff
```

If the files and changes look right, save the work as a **commit** (a saved point with a description):

```bash
git add path/to/file
git commit -m "Describe the change"
git push -u origin feature/short-name
```

Then open a **pull request** in the team's platform. Explain which criterion it meets, which files changed, and what checks you ran. Ask another person to review it; the author should not approve their own change. Address comments and follow the repository's rules to merge it into `main`.

Before starting another task, update your main branch with `git switch main` and `git pull`. Do not save passwords, tokens, or real data in Git. Do not change `main` directly or use commands that force a push. Ask for help if a conflict appears and you do not understand it. If your organization uses a different review process, follow it and ask someone to explain it.

## Leave the project ready for someone else

Another team may receive it without knowing the current conversations. Make it easier for them:

1. Record a backup for each area in `docs/team/assignments.md`; that person should know where the files are and how to check the workflow.
2. Update README and AGENTS along with the code when commands, folders, or rules change.
3. Record design decisions in `docs/architecture/` and explain why they were chosen.
4. Leave small tasks, with criteria and likely files, in `docs/backlog/`.
5. Do not rely on someone's computer path, a private key, or an explanation that exists only in a chat.

## Reference folder map for building the app

This map is a guide for a new project, not code to copy from the course site. Create only the folders you need. `docs/training/` belongs to the course site; do not store your team's project there.

```text
my-team-app/                       <- root: start the new project here
├── README.md                      <- what the app does and how to start it
├── AGENTS.md                      <- map, rules, and guide for AI
├── package.json                   <- commands and packages, created when setting up the app
├── bun.lock                       <- versions, generated when installing packages
├── apps/
│   ├── web/                       <- page, form, and list
│   └── api/                       <- insert and list operations
│       └── src/db/                <- table and fictional data
├── packages/
│   └── contracts/                 <- shared data format, if needed
└── docs/
    ├── product/
    │   ├── brief.md               <- who the app is for and what it will do
    │   └── acceptance-criteria.md <- insert/list; optional: update/delete
    ├── api/contracts.md           <- insert and list request/response examples
    ├── data/model.md              <- the record's fields
    ├── team/assignments.md        <- roles and QA rotation
    ├── qa/test-cases.md           <- checks and observed results
    └── delivery/handoff.md        <- how to start, test, and continue the app
```

AI can suggest the structure and create the first files with the approved stack; the team reviews the plan first. **Do not create empty folders.** Names may differ, but keep each file's responsibility clear.

## Where to find and create the files

The course site shows instructions and templates; **it does not contain the team's app starter code**. Each group chooses a proposal, creates a new Git repository, and starts without application code. The coordinator shares the link; each member clones it and opens it in VS Code. Use Codex or Claude as the coding assistant from the new repository. Before writing code, ask it for a plan to create the project structure and Markdown files. Review the plan and build the app foundation with the approved stack. Do not clone or modify the course repository as if it were the group project.

To create or update a file:

1. Clone the team's repository and open it in VS Code. Do not copy the course's source files.
2. Open the repository in Codex or Claude. Ask it to read what exists and explain the project; if README.md or AGENTS.md is missing, ask it to suggest initial content.
3. State your role and ask for a plan for the minimum app and that role's documents: one page to insert and list one type of record. Product, web, API, data, and QA roles also create or update their related Markdown files.
4. Review every proposed path. The assistant should explain its purpose, whether it is being created from scratch, and what it will contain. Remove files or folders not needed for the minimum scope.
5. After approving the plan, ask for help with one small task and with creating or updating related Markdown. Review the diff and explanation before accepting changes. Do not create an empty `package.json` or invent commands; check the real commands and write them in README.
6. Make sure `README.md` and `AGENTS.md` are in the root. Ask for help drafting them and keep them up to date with the code and team agreements.

Files created in the team's repository are shared with Git using the [week 1 workflow](#save-and-share-the-work-with-git). Do not save your project documents under `docs/training/`: that folder contains the course site's lessons.

## Files: what belongs in each one

| File | Create or update | What to write in simple words |
| --- | --- | --- |
| `README.md` | Create in week 1 and update when the app changes | What the application does, requirements, and how to install, start, and check it. Commands must be real commands from the repository. |
| `AGENTS.md` | Create in week 1 and update when structure/rules change | Purpose, folder map, allowed technologies, commands, limits, and how to review AI changes. |
| `package.json` | Generate with the approved method | Commands to start and check the project, plus dependencies. Do not create an empty file or write it by hand. |
| `bun.lock` | Generate when installing packages | Exact package versions. Bun updates it; do not edit by hand. |
| `docs/product/brief.md` | Create if there is none | Who has the problem, what they need, what the first version will do, and what is out of scope. |
| `docs/product/acceptance-criteria.md` | Create if there is none | 3–5 observable results that can be checked. |
| `docs/backlog/01-first-workflow.md` | Create when you agree on the first task | One task, likely files, owner, reviewer, and how to check it. |
| `docs/team/assignments.md` | Create in week 1 | Who coordinates each role, who backs them up, and who coordinates QA each week. |
| `docs/architecture/capstone-overview.md` | Create if you need a map for this project | A simple diagram: screen → API → data. Explain each arrow in one sentence. |
| `docs/api/contracts.md` | Create or update in week 2 | What the screen requests, what the API returns, and what happens on an error. Include fictional examples. |
| `docs/data/model.md` | Create or update in week 2 | What information is stored, its fields, and how it is related. Do not store data the workflow does not need. |
| `docs/qa/test-cases.md` | Create in week 4 | What to prepare, what action to test, what should happen, and what actually happened. |
| `docs/delivery/handoff.md` | Create for delivery | Status, how to start and test, known limits, actual results, and next tasks for whoever continues. |

These documents describe the project. The code that runs the application lives under `apps/` and, if needed, `packages/`. For example, the page might be in `apps/web/`, the API in `apps/api/`, and the shared data format in `packages/contracts/`.

### How to recognize file types

- `.md` stores notes and instructions people can read.
- `.tsx` usually contains a visual React screen or component.
- `.ts` usually contains TypeScript logic, contracts, configuration, or tests.
- `.sql` describes a change that will be applied to the database.
- `package.json` lists commands and dependencies; `bun.lock` records their exact versions.

## Step by step: from idea to first version

1. **Choose the proposal.** Pick the appointment scheduler, knowledge base, or support inbox, and define one type of record with a few fields.
2. **Create the new repository.** Do not start from another app's code. Use Codex or Claude to prepare only the minimum structure with the approved stack; review and explain each file.
3. **Write the brief and criteria.** The minimum is to insert a record and see it in the list. Updating and deleting are optional improvements.
4. **Draw the flow.** A person fills out a form; the web page sends the data to the API; the API saves it to the database; the page shows the updated list.
5. **Agree on the data.** Write simple examples for inserting a record and requesting the list. Keep the fields minimal and data fictional.
6. **Assign roles and split the work.** One person can prepare the database/API, another the screen, while product/QA coordinate and review. Everyone uses Codex or Claude to create their role's files, including Markdown, and understands and reviews changes.
7. **Build and check step by step.** First make insert and list work end to end. If there is time, agree on criteria before adding update or delete.
8. **Check and deliver.** Someone else follows README, starts the app, inserts a record, confirms it appears in the list, and reviews the pull request. Update README and prepare the demo and handoff note.

## Short templates for the first documents

Copy these headings into the files and fill them in together. You do not need to write much.

**`docs/product/brief.md`**

```text
# Project name
## User
## Their problem
## First workflow we will build
## What this version includes
## What is out of scope
```

**`docs/product/acceptance-criteria.md`**

```text
# Acceptance criteria
- When I insert a [record] with the required fields, it appears in the list.
- After refreshing the page, the record is still in the list.
- If a required field is missing, I see a message and the record is not saved.
- Optional: I can update or delete a record.
```

**`docs/team/assignments.md`**

```text
# Team responsibilities
Product and coordination: Person A
Web / interface: Person B
API / backend: Person C
Data / database: Person D (in a team of 3, combine with API)
QA: coordinator rotates each week
For each task, record owner and reviewer; they must be different people.
```

**`docs/backlog/01-first-workflow.md`**

```text
# Task
Problem and expected result:
Files likely to change:
Owner:
Reviewer:
How to check it (README command or manual steps):
```

### `README.md` template

```text
# Application name
Problem it solves:
What I need to install:
How to install dependencies (repository command):
How to start the application (repository command):
How to check that it works:
```

### `AGENTS.md` template

```text
# Project instructions
Purpose and limits:
Folder map:
Approved technologies:
Real commands (same ones explained in README):
Rules for practice data:
How to review and deliver a change:
```

## Prompt for Codex or Claude

> We are a beginner team. We chose [appointment scheduler / knowledge base / support inbox], and my role is [product / web / API / data / QA]. We are building the app from scratch in this new repository. Read the files that already exist; if README.md, AGENTS.md, or a project document is missing, say so. Do not edit anything yet. Explain the root and folder map in simple words. Based on my role, suggest which code and Markdown files to create or update for the minimum: insert one type of record and list saved records using fictional data. For each path, explain its purpose and minimum content. Suggest one small task and a work order; say what needs coordination with other roles. Do not add update or delete. Do not invent commands, change the stack, and wait for the team to review the plan.

## Result and team review

At the end, each person can point to where the project's screen, API, data, instructions, and criteria live. The team has one small first workflow, a reviewed file list, and a task with an owner, reviewer, and way to check it.
