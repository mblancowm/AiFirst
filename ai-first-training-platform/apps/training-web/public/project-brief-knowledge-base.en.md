# Project brief: Knowledge base

## Purpose

Build a small app from scratch to save fictional articles and view the saved articles. The team uses Codex or Claude as a coding assistant; the app itself does not need AI features.

## Required scope for the training MVP

The first version includes only what is needed to insert and list records:

- One record type: article.
- A short form with a title and content.
- Save each article in the local SQLite database.
- Show saved articles in a simple list.
- Validate required fields and show clear messages.

## Acceptance criteria

1. A person can save an article with a title and content.
2. The article appears in the list after it is saved.
3. The article remains in the list after refreshing the page.
4. If a required field is missing, show a message and do not save the record.
5. Another teammate can clone the repository, start the app, and demo insert and list by following the README.

## Optional extensions

Only after all required criteria are complete and reviewed, the team may add update and/or delete for articles. Each extension needs its own criteria and checks; it must not put the minimum flow at risk.

## Out of scope for the four-week MVP

- Search, filters, categories, and file uploads.
- Real internal documents, AI-generated answers, and external search.
- Accounts, production permissions, and external integrations.
- An AI feature inside the app.

## Possible next project increments

These features represent the broader knowledge base workflow in the proposal. They are for after the course MVP, change review, and transfer test are complete; do not add them to the four-week demo.

1. Search fictional articles by text and category.
2. Show the fictional source for each article.
3. Edit articles and check that changes persist.

## Stack and AI use

Use the stack taught in the course: React + TypeScript + Vike for the UI; Bun + Hono for the API; Drizzle + SQLite for data; and Zod for input validation. Codex or Claude helps the team plan, create, and review code and Markdown files. The team understands and approves the changes.

## Work by role

- **Product / design:** define the fields, brief, and acceptance criteria.
- **Frontend:** build the form, list, and visible messages from scratch.
- **Backend / API:** create the operations to save an article and return the list; validate input.
- **Data:** create one articles table with a few fields and the needed migration.
- **QA / review:** check insert, list, persistence, validation, and the README instructions.

On a small team, one person may cover more than one role.

## Four-week plan

1. **Choose and prepare:** create the Git repository, assign roles, agree on fields and criteria, and prepare the project's starter files.
2. **Save data:** create the table, migration, and API operations to insert and list.
3. **Build the screen:** connect the form and list to the API; each person delivers and explains one AI-assisted change.
4. **Review and deliver:** check the full flow, review changes with Git, update the README, and leave a handoff for another team.

## Five-minute demo

Save a fictional article, show it in the list, refresh the page, and confirm it remains. Try to submit the form without a required field and show the message. Explain what the team built with AI assistance and how someone else can continue the project.
