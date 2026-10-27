# 02 · Connect the application to the API

> Week 2 · 2 hours · Main focus: API

The API connects the screen to the database. For the minimum scope, it lets the screen **insert a record** and **get the list of saved records**. Updating and deleting are additional operations only if there is time.

## Before you start: how information travels

Think of the API as a service window between the screen and the data. The screen sends a **request**; the API returns a **response**. The app needs two actions: receive the form fields and save a record, then return a list to show on the page. The **contract** shows a simple example of what is sent and received.

In this project, Hono helps define routes and Zod checks that data has the expected format. Practice with fictional data and ask AI to explain the request and response in simple words.

## What you will learn

- Describe an operation with an input and output example.
- Find the contract, route, and test files.
- Check data before saving it or sending a response.
- Use AI to prepare a small change and review each file.

## Files you will create or update

| Example file | What it should include |
| --- | --- |
| **`docs/api/contracts.md`** | Example for inserting a record, requesting the list, and possible errors. |
| **`packages/contracts/src/index.ts`** | Shared format for the record and list, if the project uses this package. |
| **`apps/api/src/app.ts`** | Routes that receive a record and return the list. |
| **`apps/api/src/app.test.ts`** | Checks for insert, list, and rejecting invalid data. |

If the repository already has these files, update them. AI should say what it would change and why.

## Step-by-step exercise

1. Write an example of what the screen sends to insert a record and an example of the list the API returns.
2. Agree on required fields across web, API, and data so each part uses the same format.
3. Validate incoming data. If a required field is missing, return a clear message and do not save the record.
4. Implement one insert operation and one list operation with Hono. If something goes wrong, the API returns a simple error without internal details.
5. Add tests for inserting a valid record, receiving the list, and rejecting invalid data.
6. If the minimum works and there is time, agree on and add update or delete as optional operations.

## Prompt for Codex or Claude

> I am responsible for API/backend on a beginner team. Read README.md, AGENTS.md, the brief, and the data model. This API is being built from scratch. Propose the minimum files for inserting a record and returning the list; include `docs/api/contracts.md` if needed and explain each file's purpose. Wait for the team to review the plan. Then implement those two operations with the agreed format, validate incoming data, and add tests for insert and list. Do not add update or delete yet. Report the commands you ran and their actual results; explain the changes.

## Result and team review

The screen and API share the same format. The reviewer can insert a valid record, see it in the list, and check that invalid data is not saved. Update and delete are optional.
