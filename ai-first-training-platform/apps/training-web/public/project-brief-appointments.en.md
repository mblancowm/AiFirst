# Project brief: Appointment list

## Purpose

Build a small app from scratch to record fictional appointments and view saved appointments. The team uses Codex or Claude as a coding assistant; the app itself does not need AI features.

## Required scope

The first version includes only what is needed to insert and list records:

- One record type: appointment.
- A short form with a fictional name, service, and date.
- Save each appointment in the local SQLite database.
- Show saved appointments in a simple list.
- Validate required fields and show clear messages.

There is no need to check availability or prevent two appointments from using the same date.

## Acceptance criteria

1. A person can save an appointment with a name, service, and date.
2. The appointment appears in the list after it is saved.
3. The appointment remains in the list after refreshing the page.
4. If a required field is missing, show a message and do not save the record.
5. Another teammate can clone the repository, start the app, and demo insert and list by following the README.

## Optional extensions

Only after all required criteria are complete and reviewed, the team may add update and/or delete for appointments. Each extension needs its own criteria and checks; it must not put the minimum flow at risk.

## Out of scope

- Availability calendars, scheduling rules, or duplicate-booking prevention.
- Cancellations, reminders, notifications, or external calendars.
- Real customer data, payments, accounts, and external integrations.
- An AI feature inside the app.

## Stack and AI use

Use the stack taught in the course: React + TypeScript + Vike for the UI; Bun + Hono for the API; Drizzle + SQLite for data; and Zod for input validation. Codex or Claude helps the team plan, create, and review code and Markdown files. The team understands and approves the changes.

## Work by role

- **Product / design:** define the fields, brief, and acceptance criteria.
- **Frontend:** build the form, list, and visible messages from scratch.
- **Backend / API:** create the operations to save an appointment and return the list; validate input.
- **Data:** create one appointments table with a few fields and the needed migration.
- **QA / review:** check insert, list, persistence, validation, and the README instructions.

On a small team, one person may cover more than one role.

## Four-week plan

1. **Choose and prepare:** create the Git repository, assign roles, agree on fields and criteria, and prepare the project's starter files.
2. **Save data:** create the table, migration, and API operations to insert and list.
3. **Build the screen:** connect the form and list to the API; each person delivers and explains one AI-assisted change.
4. **Review and deliver:** check the full flow, review changes with Git, update the README, and leave a handoff for another team.

## Five-minute demo

Save a fictional appointment, show it in the list, refresh the page, and confirm it remains. Try to submit the form without a required field and show the message. Explain what the team built with AI assistance and how someone else can continue the project.
