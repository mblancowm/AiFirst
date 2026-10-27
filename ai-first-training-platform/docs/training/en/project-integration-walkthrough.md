# Step-by-step example: prepare and build a knowledge base

This walkthrough accompanies module 00. It shows how to build a simple knowledge base web app from scratch in four weeks. The minimum is to insert fictional articles with a form and list the saved articles. Update and delete are the only optional project extensions. Search, AI answers, and other features are outside this training's scope. Do not connect real documents.

## The small idea

A team member needs to save and view instructions. The app lets someone insert a practice article with a title and content, and list the saved articles. Start with those two fields and one screen. Do not connect real documents.

## Step 1: prepare the team's repository

Each group creates a new Git repository for its app; this walkthrough and the course site's code are learning materials, not a codebase to copy. In the new repository, create `README.md` and `AGENTS.md` at the root. When you set up the project with the approved stack, write the real install, start, and check commands in README. If a tool is missing or a command fails, save the message and ask for help; do not guess at commands.

Choose who coordinates product, web, API, data, and QA. Each owner can use Codex or Claude to create their area's files, including Markdown documents, and another person reviews the suggestions before they are included.

## Step 2: save the project agreements

Update or create these files, depending on what already exists:

| Path | Example content for this project |
| --- | --- |
| `docs/product/brief.md` | User: a new team member. Need: save and view an instruction. First version: insert fictional articles and list them. Out of scope: real documents, login, external connections, and AI features inside the product. |
| `docs/product/acceptance-criteria.md` | I can insert an article with a title and content; it appears in the list; after refreshing the page it is still saved. If a required field is missing, I see a message and it is not saved. Update/delete are optional. |
| `docs/backlog/01-first-workflow.md` | One small task to create the insert form or list from scratch; likely files, owner, reviewer, and how to check it. |
| `docs/team/assignments.md` | Who coordinates product, web, API, and data; who coordinates QA each week. |
| `docs/delivery/handoff.md` | Status, startup, demo, results, limits, and next task for another team. |
| `docs/architecture/capstone-overview.md` | A diagram `user → web → API → database` with one sentence about each part. |
| `docs/api/contracts.md` | Example article sent by the form, save response, and list returned by the API. |
| `docs/data/model.md` | An articles table with an ID, title, and content. All records are fictional. |

You do not need to create every folder at once. Create a folder when you are ready to save its first file. Keep README and AGENTS in this new repository up to date; do not make copies such as `README-final.md`.

## Step 3: understand the code structure

The team starts with a new repository. With your role assigned, ask Codex or Claude to first suggest a minimum structure of code and Markdown documents; review the plan before asking it to create files. Check that the app supports insert and list; do not copy the course site's files. For example:

```text
my-app/
├── README.md                   # how to install, start, and check the app
├── AGENTS.md                   # purpose, map, and rules for AI
├── package.json                # commands and dependencies
├── apps/web/src/
│   ├── pages/index.tsx         # page with the form and list
│   └── api.ts                  # page requests to the API
├── apps/api/src/
│   ├── app.ts                  # insert and list routes
│   └── db/
│       ├── schema.ts           # articles table
│       └── seed.ts             # a few fictional articles
└── docs/
    ├── brief.md
    └── acceptance-criteria.md

```

A **screen** shows information and controls. The **API** receives a request and returns a response. A **schema** describes how data is organized. **Seed data** is fictional example data. A **migration** applies a database change in an orderly way.

## Step 4: agree on an example before coding

Write two simple examples together in `docs/api/contracts.md`:

```text
Insert: the screen sends a title and content; the API saves the article and confirms it was saved.
List: the screen asks for saved articles; the API returns a list. If there are no articles yet, it returns an empty list and the screen shows a clear message.
If a required field is missing, the screen displays a clear message and the API does not save the article.
```

The example is an agreement, not an instruction to create a new route without checking what already exists. The AI should locate the current route and explain how it would connect to this agreement.

## Step 5: assign roles and divide the work

Record the owners in `docs/team/assignments.md`. In a team of four, assign product/coordination, web, API, and data to one person each. In a team of three, one person coordinates product, one web, and the third API and data. QA is shared: a different person coordinates testing each week. The person implementing a change does not review it alone.

For this example:

1. **Product/coordination** uses Codex or Claude to draft the brief, criteria, and first Markdown tasks; confirms with the team that the four-week scope is inserting and listing articles.
2. **API and data** agree on the minimum article fields and, with the assistant, prepare the contract and `docs/data/model.md`. In a team of three, one person can coordinate both areas.
3. **Web** uses the assistant to plan and create the page with a form and list, and updates any affected screen documentation.
4. **Data** prepares a table and a few fictional articles; **API** implements insert and list using the contract. Both check that code and Markdown agree.
5. The person coordinating **QA** that week uses the assistant to suggest cases, tests someone else's change, records what they observed, and helps prepare the demo.

After the contract is approved, web can proceed with the example while API and data complete the real response. Product keeps the scope small, and everyone checks that the parts use the same format.

## Step 6: build and review in order

- Start with the new repository and use Codex or Claude to create the minimum structure; the team reviews and explains every code and Markdown file.
- Prepare the table and a few fictional articles for the demo.
- Implement the API to insert an article and return the list.
- Create the page with a form and list; connect them to the API.
- Check insert, empty list, success/error messages, and that the record is still there after refreshing the page.
- If there is time after insert and list are verified, add update or delete with their own criteria. Do not add search or AI features to the app during this training.
- Run only commands that exist in the README and write down the result you observed.
- Record what changed, what is missing, and how to repeat the demo in `docs/delivery/handoff.md`.

## Transfer test: can another team continue?

Before wrapping up, give a clean copy of the repository to someone who did not participate in development. The original team observes and takes notes but does not dictate instructions.

The new person should be able to:

1. Find the root and follow the README to install and start the application.
2. Read the brief and criteria, insert an article, and demonstrate that it appears in the list.
3. Find the screen, API, contract, and data in the folder map.
4. Run the listed checks and understand the recorded results and limits.
5. Find a pending task in the handoff and explain which files it might change.

If they get stuck, the original team improves the README, AGENTS, map, backlog, or handoff where needed. When a new team changes the contract, data model, or structure, it should review affected areas, update tests, and record the reason for the decision. This lets the project change without depending on its original authors.
