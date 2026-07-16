import Link from "next/link";
import ReactMarkdown from "react-markdown";

// Shared shell for the legal/policy pages (Privacy, Terms, Cookies, Disclaimer).
// Server Component: ReactMarkdown renders the body at build time, so these pages
// ship as static HTML with zero client JS. Content is passed as markdown.
export function LegalDoc({
  title,
  lead,
  updated,
  markdown,
}: {
  title: string;
  lead: string;
  updated: string;
  markdown: string;
}) {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb reveal"><Link href="/">Home</Link> / {title}</p>
          <p className="eyebrow reveal">Legal</p>
          <h1 className="reveal">{title}</h1>
          <p className="page-hero__lead reveal">{lead}</p>
          <p className="prose__meta reveal">Last updated: {updated}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose reveal">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </section>
    </main>
  );
}
