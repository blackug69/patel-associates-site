import { cn } from "@/lib/utils";

// Admin-authored HTML. No sanitizer lib installed; content is trusted, but we
// defensively neutralize any closing </script to avoid breaking out of context.
// ponytail: not a real sanitizer — add DOMPurify if untrusted authors ever gain access.
export function PostBody({ html }: { html: string }) {
  const safe = html.replace(/<\/script/gi, "&lt;/script");

  return (
    <div
      className={cn(
        "text-foreground [&_p]:my-3 [&_p]:leading-relaxed",
        "[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-2",
        "[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2",
        "[&_ul]:list-disc [&_ul]:ps-5 [&_ul]:my-3",
        "[&_ol]:list-decimal [&_ol]:ps-5 [&_ol]:my-3",
        "[&_li]:my-1",
        "[&_a]:underline [&_a]:underline-offset-2",
        "[&_blockquote]:border-l-2 [&_blockquote]:ps-4 [&_blockquote]:italic [&_blockquote]:my-4",
        "[&_strong]:font-semibold",
      )}
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
