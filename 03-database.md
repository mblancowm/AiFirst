# Module: Database Role

## Goal

Design and implement a small relational schema that stores projects and source notes for the Internal Project Knowledge Base.

## Role boundary

Own `packages/db/`: schema, migrations, seed data, and database-focused tests. Coordinate the data model with the API owner before implementation. Use the approved feature plan and do not change shared contracts without a reviewed proposal.

## Starter schema

### `Projects`

| Column | Type | Purpose |
|---|---|---|
| `ProjectId` | int, primary key, identity | Unique project ID |
| `Name` | nvarchar(150), required | Project name |
| `Description` | nvarchar(1000), nullable | Short description |
| `CreatedAt` | datetime2, required | Creation time |

### `ProjectSources`

| Column | Type | Purpose |
|---|---|---|
| `SourceId` | int, primary key, identity | Unique source ID |
| `ProjectId` | int, foreign key to `Projects` | Owning project |
| `Title` | nvarchar(200), required | Display name and citation label |
| `Content` | nvarchar(max), required | Text available as AI evidence |
| `CreatedAt` | datetime2, required | Creation time |

One project has many source notes. Add an index on `ProjectSources.ProjectId`. Decide and document what happens to sources when a project is deleted. Start without embeddings or a separate vector database; the sample dataset is small.

## Week 1 planning work

Before coding, propose the model in `docs/planning/` and review its relationship with the API contract. Agree on identifiers, required fields, limits, and sample records with the API and AI owners.

## Implementation steps

1. Inspect the current database package and migration workflow.
2. Create project and source entities and their relationship.
3. Add a migration using the existing EF Core or SQL-script convention.
4. Add a small seed dataset with one project and two sample notes.
5. Add tests for relationship, required values, and project-scoped reads.
6. Open a pull request with the plan and contract linked.

## Codex prompt

> Read `AGENTS.md`, `docs/roles.md`, the approved data model, and the linked feature plan. Work only in `packages/db/`. Implement the Projects and ProjectSources schema, migration, sample data, and focused tests using existing conventions. Do not add conversation-history or vector tables. If the approved model is unclear or conflicts with the API contract, stop and report the conflict instead of guessing. Run the database checks and summarize the migration impact for review.

## Verify your work

- The migration creates the tables, foreign key, and project index.
- A project can have multiple source notes.
- A source cannot refer to a nonexistent project.
- The seed data can be retrieved by project.
- Database tests do not require a live AI model.

## Pull request review questions

- Does the schema match the approved contract?
- Are nullability, maximum lengths, and delete behavior deliberate?
- Can the API retrieve sources for exactly one project?
- Can a reviewer explain the migration and rollback implications?
