# Module: AI Integration Role

## Goal

Connect the application to an AI model and make answers traceable to the project notes provided as evidence.

## Role boundary

Own `packages/ai/`: model-provider adapter, prompt templates, source selection or retrieval, and AI evaluation cases. Coordinate the service interface with the API owner and sample data with the database owner. Keep API keys and provider details out of the UI.

## Small AI-first feature

The application’s main value is answering project questions using project sources. For this MVP, retrieve a few relevant text notes and ask the model to answer only from those notes. Include the source IDs and titles in the response. If the notes do not support an answer, the assistant should say that the evidence is insufficient.

For a small sample dataset, start with keyword matching or include all short notes. Add embeddings and vector search only when evaluation shows the simple approach is not sufficient.

## Hands-on steps

1. Define the backend interface, for example `IAiAnswerService`, with a provider-independent request and response.
2. Add a provider adapter configured through server-side secrets.
3. Build a prompt that separates instructions, user question, and source text.
4. Treat source text as data, not instructions. Do not give the model unrestricted database access or tools for this exercise.
5. Return the answer, evidence status, and source references.
6. Add a small evaluation set of at least ten questions with expected sources.
7. Review answer support, citation correctness, and insufficient-evidence behavior.
8. Open a pull request linking the feature plan and API contract.

## Codex prompt

> Read `AGENTS.md`, `docs/roles.md`, the approved AI service contract, and feature plan. Work only in `packages/ai/`. Implement the provider adapter and prompt for answering from supplied project notes. Return an evidence status and the source IDs/titles provided. Keep credentials in server-side configuration. Add a fake implementation for automated tests and an evaluation set covering supported questions, multi-source questions, missing evidence, and cross-project isolation. Do not give the model direct database access or add tools that take actions. Run the relevant checks and explain the prompt and limitations for human review.

## Verify your work

- The AI layer receives only sources selected for the requested project.
- An answer includes references to the supplied sources.
- Unsupported questions return an insufficient-evidence result.
- Tests can substitute a fake AI service and do not require credentials.
- Model timeouts and malformed responses are handled.
- The ten-question evaluation records expected evidence and observed results.

## What you learned

You learned to make the AI capability the application’s central workflow while keeping model access bounded, testable, and tied to evidence.
