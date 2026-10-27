import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

export function MarkdownDocument({
  markdown,
  onInternalLink,
}: {
  markdown: string;
  onInternalLink?: (href: string) => void;
}) {
  return (
    <article className="markdown-document">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          a: ({ href, children }) => {
            const localMarkdown = Boolean(href?.endsWith(".md"));
            return (
              <a
                href={localMarkdown ? "#" : href}
                onClick={
                  localMarkdown
                    ? (event) => {
                        event.preventDefault();
                        if (href) onInternalLink?.(href);
                      }
                    : undefined
                }
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noreferrer" : undefined}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
