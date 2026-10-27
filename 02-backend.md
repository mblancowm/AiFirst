# Module: API and Backend Role

## Goal

Build a small API that validates requests, coordinates database access, and delegates AI work to a separate integration service.

## Role boundary

Own `apps/api/`: HTTP endpoints, request validation, API behavior, dependency injection, and backend tests. Coordinate routes and request/response shapes with the web, database, and AI owners before implementation.

## Starter API contract

| Method and route | Purpose |
|---|---|
| `POST /api/projects` | Create a project |
| `GET /api/projects/{projectId}` | Read the project and source titles |
| `POST /api/projects/{projectId}/sources` | Add a text source |
| `POST /api/projects/{projectId}/ask` | Ask a question using that project’s sources |

Example `ask` response:

```json
{
  "answer": "The response based on the supplied project notes.",
  "sources": [{ "sourceId": 12, "title": "Migration notes" }],
  "hasEnoughEvidence": true
}
```

Put this contract in `packages/contracts/` or document it in OpenAPI before parallel implementation. The exact field names should be agreed by the team in week 1.

## Backend flow

1. Validate the project ID and question.
2. Ask the database layer for notes belonging to that project only.
3. Pass selected notes and the question to an AI service interface.
4. Return the answer and source identifiers/titles.
5. Handle missing projects, insufficient evidence, timeouts, and model errors consistently.

The controller should not contain provider-specific model code. Use an interface such as `IAiAnswerService` so tests can use a fake implementation.

## Implementation steps

1. Inspect existing controllers, dependency injection, persistence, and error handling.
2. Agree the API contract with the web and AI roles.
3. Implement project and source endpoints against the DB package.
4. Implement the `ask` endpoint using the AI service interface.
5. Add validation and consistent error responses.
6. Add unit and API integration tests using a fake AI service.
7. Open a pull request linking the approved feature plan and contract.

## Codex prompt

> Read `AGENTS.md`, `docs/roles.md`, the approved OpenAPI/API contract, data model, and feature plan. Work only in `apps/api/`. Implement the planned endpoints using current project conventions. Retrieve sources only for the requested project, validate input, return source references, and handle insufficient evidence and provider errors. Keep provider-specific code behind `IAiAnswerService`; use a fake in automated tests. Do not add unrelated endpoints or expose credentials. Run backend checks and explain the change for human review.

## Verify your work

- Blank or oversized questions are rejected with a clear validation response.
- A project and source note can be created and read through the API.
- A question about one project never loads another project’s notes.
- The answer response matches the shared contract.
- Missing evidence and model errors are handled explicitly.
- Tests run without model credentials or a live model call.
