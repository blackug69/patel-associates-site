import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/insights";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Insights · Patel Accounting & Legal Services",
  description:
    "Practical notes on GST, income tax, accounting, and business compliance from the Patel team.",
};

export default function InsightsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow reveal">Insights</p>
          <h1 className="reveal">Practical notes on staying compliant.</h1>
          <p className="page-hero__lead reveal">
            Plain-language guidance on GST, income tax, accounting, and registration —
            written for business owners, not accountants.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services__grid">
            {posts.map((p) => (
              <article className="card reveal" key={p.slug}>
                <p className="card__meta"><span>{p.category}</span><span>{p.date}</span></p>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <Link className="link-ghost" href={`/insights/${p.slug}`}>Read more <span className="arrow" aria-hidden>→</span></Link>
              </article>
            ))}
          </div>
          <p className="placeholder-note reveal">
            Sample articles to be replaced with the firm&apos;s own published posts.
          </p>
        </div>
      </section>

      <section className="section why on-dark">
        <div className="container cta-strip">
          <p className="eyebrow reveal">Get started</p>
          <h2 className="reveal">Have a question the articles don&apos;t cover?</h2>
          <div className="cta-strip__actions reveal">
            <Button asChild variant="default">
              <Link href="/contact">Book a Consultation <span className="arrow" aria-hidden>↗</span></Link>
            </Button>
            <Button asChild variant="outline">
              <a href="tel:+919825442028">Call 98254 42028</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
