import { describe, expect, test } from "bun:test";
import type { CourseModule } from "./types";
import { getModuleNeighbors, moduleIdForMarkdownLink } from "./navigation";

const moduleFixture = (id: string): CourseModule => ({
  id,
  week: 1,
  title: id,
  tagline: "",
  summary: "",
  objective: "",
  minutes: 120,
  markdown: "",
  sections: [],
  completed: false,
  reflection: "",
  completedAtUtc: null,
});

describe("module navigation", () => {
  const modules = [moduleFixture("one"), moduleFixture("two"), moduleFixture("three")];

  test("returns previous and next items in sequence", () => {
    const neighbors = getModuleNeighbors(modules, "two");
    expect(neighbors.previous?.id).toBe("one");
    expect(neighbors.next?.id).toBe("three");
  });

  test("handles first, last, and missing module IDs", () => {
    const first = getModuleNeighbors(modules, "one");
    expect(first.previous).toBeNull();
    expect(first.next?.id).toBe("two");
    const last = getModuleNeighbors(modules, "three");
    expect(last.previous?.id).toBe("two");
    expect(last.next).toBeNull();
    const missing = getModuleNeighbors(modules, "missing");
    expect(missing.previous).toBeNull();
    expect(missing.next?.id).toBe("one");
  });

  test("maps curriculum Markdown links to lesson IDs", () => {
    expect(moduleIdForMarkdownLink("../training/03-database.md")).toBe("semana-2-datos");
    expect(moduleIdForMarkdownLink("https://example.com")).toBeNull();
  });
});
