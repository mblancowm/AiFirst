import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MarkdownDocument } from "./MarkdownDocument";

describe("MarkdownDocument", () => {
  test("renders headings, fenced code, and GitHub-style tables safely", () => {
    const markup = renderToStaticMarkup(
      <MarkdownDocument
        markdown={
          '## Resultado\n\n| Capa | Tecnología |\n| --- | --- |\n| API | Hono |\n\n```ts\nconst answer = "ok";\n```\n\n<script>alert("x")</script>\n\n[link inseguro](javascript:alert(1))'
        }
      />,
    );
    expect(markup).toContain("<h2>Resultado</h2>");
    expect(markup).toContain("<table>");
    expect(markup).toContain("const answer");
    expect(markup).not.toContain("<script");
    expect(markup).not.toContain("javascript:");
  });
});
