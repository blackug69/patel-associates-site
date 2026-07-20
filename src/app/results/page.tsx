import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Results · Patel Accounting & Legal Services",
  description:
    "Representative outcomes from our accounting, tax, GST, and registration work for individuals and businesses.",
};

const STATS = [
  { num: "20", lbl: "Years of experience" },
  { num: "500+", lbl: "Filings handled" },
  { num: "100%", lbl: "On-time filing goal" },
];

const CASES = [
  {
    title: "GST notice cleared, no penalty",
    situation: "A manufacturer received a GST notice over a mismatch in input tax credit.",
    action: "We reconciled the returns against the books, gathered supporting invoices, and filed a complete, documented response.",
    outcome: "The notice was closed with no penalty and a clean compliance record.",
  },
  {
    title: "Startup registered and books set up in three weeks",
    situation: "A founder needed to incorporate and start operating quickly, with finances in order from day one.",
    action: "We advised on structure, completed the registration, set up bookkeeping, and registered for GST.",
    outcome: "The business was operating compliantly within three weeks, with clean books from the first transaction.",
  },
  {
    title: "Tax outgo reduced, legitimately",
    situation: "A practising professional was paying more tax than necessary due to unplanned filings.",
    action: "We reviewed income and deductions, applied legitimate tax planning, and restructured the filing approach.",
    outcome: "A lower, fully compliant tax outgo — and a clear plan for the years ahead.",
  },
];

export default function ResultsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
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

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Case studies</p>
            <h2>How we turn compliance problems into peace of mind.</h2>
          </div>
          <div className="services__grid">
            {CASES.map((c) => (
              <article className="card reveal" key={c.title}>
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
            Illustrative outcomes based on the kind of work we do, to be replaced with real,
            named client results.
          </p>
        </div>
      </section>

      <section className="section why on-dark">
        <div className="container cta-strip">
          <p className="eyebrow reveal">Get started</p>
          <h2 className="reveal">Let&apos;s make your compliance a non-event.</h2>
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
