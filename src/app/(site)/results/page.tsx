import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Representative outcomes from our accounting, tax, GST, and registration work for individuals and businesses.",
  alternates: { canonical: "/results" },
};

export const revalidate = 3600;

// Firm-level stats are structural copy, not per-record content — kept in code.
const STATS = [
  { num: "20", lbl: "Years of experience" },
  { num: "500+", lbl: "Filings handled" },
  { num: "100%", lbl: "On-time filing goal" },
];

export default async function ResultsPage() {
  const cases = await getCaseStudies();

  return (
    <main>
      <section className="page-hero">
        <div className="container" style={{ paddingTop: "var(--s7)" }}>
          <p className="eyebrow reveal">Our track record</p>
          <h1 className="reveal">Results that speak for the work.</h1>
          <p className="page-hero__lead reveal">
            Nearly two decades of keeping individuals and businesses compliant, calm, and
            focused on growth. Here is a sample of the outcomes we deliver.
          </p>
          <dl className="stats reveal">
            {STATS.map((s) => (
              <div className="stat" key={s.lbl}>
                <dd className="stat__num">{s.num}</dd>
                <dt className="stat__lbl">{s.lbl}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {cases.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <p className="eyebrow">Case studies</p>
              <h2>How we turn compliance problems into peace of mind.</h2>
            </div>
            <div className="services__grid">
              {cases.map((c) => (
                <article className="card reveal" key={c.id}>
                  <h3>{c.title}</h3>
                  <p className="eyebrow">Situation</p>
                  <p>{c.situation}</p>
                  <p className="eyebrow">What we did</p>
                  <p>{c.action}</p>
                  <p className="eyebrow">Outcome</p>
                  <p>{c.outcome}</p>
                </article>
              ))}
            </div>
            <p className="placeholder-note reveal">
              Illustrative outcomes based on the kind of work we do, to be replaced with
              real, named client results.
            </p>
          </div>
        </section>
      )}

      <section className="section why on-dark">
        <div className="container cta-strip">
          <p className="eyebrow reveal">Get started</p>
          <h2 className="reveal">Let&apos;s make your compliance a non-event.</h2>
          <div className="cta-strip__actions reveal">
            <Button asChild variant="primary">
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
