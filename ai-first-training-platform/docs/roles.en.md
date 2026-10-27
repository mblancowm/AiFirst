# Team roles

Roles divide responsibility for preparing, building, and reviewing the project. They are areas of work, not permissions or silos: the team discusses changes and another person reviews each delivery. In a small team, one person may cover more than one role.

Each person uses **Codex or Claude** to help with their role's tasks, both building the app and creating or updating the project's Markdown documents. The owner reviews the plan and changes; the assistant does not make decisions or deliver work on its own.

## Roles and responsibilities

| Role | In simple terms | Responsibilities and common files |
| --- | --- | --- |
| **Product and coordination** | Keeps the problem and next step clear. | Uses Codex or Claude to draft `docs/product/brief.md`, criteria, and tasks. Helps the team agree, prioritizes work, and prepares the demo; the team confirms scope and priorities. |
| **Web / interface** | Builds what a person sees and uses. | Uses the assistant to prepare pages, forms, results, and loading, success, empty, and error messages; checks keyboard and small-screen use. Works mainly in `apps/web/` and updates affected documentation. |
| **API / backend** | Connects the screen to rules and data. | Uses the assistant to agree on requests and responses with web and data; builds routes, validates input, returns clear errors, and documents the contract in `docs/api/contracts.md`. Works mainly in `apps/api/` and coordinates `packages/contracts/`. |
| **Data / database** | Decides how to store the information the workflow needs. | Uses the assistant to define tables and fields, prepare migrations and fictional data, and maintain `docs/data/model.md`. Works mainly in `apps/api/src/db/` and `apps/api/drizzle/`. |
| **QA / testing** | Checks that the project does what the team agreed and records evidence. | Uses the assistant to turn criteria into repeatable steps and prepare checklists; a person runs the checks and records what they observed in `docs/qa/test-cases.md`. Also helps with handoff and the demo. Everyone shares this responsibility; one person coordinates testing each week. |

**Codex or Claude help the team; they are not team members or owners of a change.** The assigned person uses the assistant to understand, plan, create, or update code and Markdown, and explains what they accept. Program leadership or management sets limits and decisions the team cannot make on its own; that is not one of these development roles.

## Form a team of 3 or 4

With four people, assign product/coordination, web, API, and data to one person each. With three, combine API and data. QA is shared: a different person coordinates testing each week, and the person who writes a change does not approve it alone. The product does not need an AI feature. Everyone uses Codex or Claude for work in their role and reviews changes with another person.

For both team sizes, primary roles can stay consistent so each area has a point person. Every member also reviews work in another area and explains at least one change outside their specialty.

## Coordinate across the four weeks

| Week | Coordinator | What the other people do |
| --- | --- | --- |
| **1 · Define** | Product helps the team choose and writes the first draft. | Everyone chooses the workflow, reviews criteria, learns the folders, and agrees on responsibilities. |
| **2 · Agree on data and API** | API and data write the contract and model together. | Product confirms criteria; web prepares the screen using the same data example. Do not change a shared format without notifying its users. |
| **3 · Build and connect** | Web coordinates the visible workflow; API and data help integrate it. | Everyone uses Codex or Claude for tasks in their role, including related Markdown updates. The team reviews the code and documentation. The app does not need a built-in AI feature. |
| **4 · Check and deliver** | Someone who did not do the last task coordinates QA and the demo. | Everyone follows criteria, records results, reviews changes, and updates README and the handoff. |

Record names or initials, primary role, backup, and QA rotation in `docs/team/assignments.md`. For each backlog task, record an owner, a different reviewer, likely files, and how to check the result. Do not assign a task only to “the AI.”

## Change teams without losing continuity

Record one primary and one backup person for each role in `docs/team/assignments.md`. The backup should be able to find the area's files, start the workflow, and explain one basic check. When a person or team changes:

1. The outgoing person updates status, limits, and next work in `docs/delivery/handoff.md`.
2. The incoming person follows README and AGENTS from a clean copy and reviews criteria, the map, and backlog.
3. If they change contracts, data, or architecture, they notify affected areas and update tests and documentation in the same change.
4. The incoming team records new decisions and prepares the next handoff for whoever joins later.

A transfer conversation helps, but it does not replace project files. If a new person needs an explanation they cannot find in the repository, record that gap and document it.

## Shared responsibilities

- Everyone understands the need, criteria, and first-workflow contract.
- The owner proposes a change; someone else reviews it before integration.
- Web, API, and data agree on the format before working in parallel.
- Each person delivers the code and Markdown documents for their role; update related documents when the project changes.
- Before editing, ask the assistant for a plan; the team reviews it and agrees on one small task.
- QA checks what actually happened; it does not report a test it did not run.
- Use fictional data. Do not add credentials, customers, real systems, or external services.
- A role can make suggestions, but affected people agree on shared, scope, or security changes.
