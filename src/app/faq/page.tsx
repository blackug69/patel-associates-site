import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQ · Patel Accounting & Legal Services",
  description:
    "Answers to common questions about GST, income tax, accounting, registration, and working with us.",
};

const GROUPS: { topic: string; items: { q: string; a: string }[] }[] = [
  {
    topic: "GST",
    items: [
      { q: "Do you provide GST Registration?", a: "Yes. We provide complete GST Registration along with post registration compliance support." },
      { q: "Can you file my monthly returns?", a: "Yes. We manage regular return filing so you never miss a due date." },
      { q: "What happens if I receive a GST notice?", a: "We review the notice, prepare a documented response, and handle it through to resolution." },
    ],
  },
  {
    topic: "Income Tax",
    items: [
      { q: "Who should file an Income Tax Return?", a: "Any individual or business whose income meets the applicable legal requirements, or who wishes to claim refunds, carry forward losses, or maintain financial records." },
      { q: "Can you respond to a tax notice for me?", a: "Yes. We handle notice responses and representation from start to finish." },
      { q: "Do you help with tax planning?", a: "Yes. We plan ahead legitimately so you pay what you owe and not a rupee more." },
    ],
  },
  {
    topic: "Accounting",
    items: [
      { q: "Can you handle bookkeeping for my business?", a: "Yes. We provide regular bookkeeping and accounting services for businesses of all sizes." },
      { q: "Do you prepare financial statements?", a: "Yes, including profit and loss, balance sheet, and MIS reports." },
    ],
  },
  {
    topic: "Registration",
    items: [
      { q: "Which business structure is right for me?", a: "We advise based on your goals, liability, and scale, then handle the registration for you." },
      { q: "How long does registration take?", a: "It varies by structure. We give you a clear timeline at the consultation." },
    ],
  },
  {
    topic: "General",
    items: [
      { q: "Do you assist startups?", a: "Absolutely. We help startups with business registration, GST, accounting, taxation, and ongoing compliance." },
      { q: "Can services be provided online?", a: "Yes. Most of our services can be completed digitally, allowing clients across India to work with us conveniently." },
    ],
  },
];

export default function FaqPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow reveal">FAQ</p>
          <h1 className="reveal">Questions, answered.</h1>
          <p className="page-hero__lead reveal">
            Common questions about GST, income tax, accounting, registration, and working
            with us. Don&apos;t see yours? <Link href="/contact">Get in touch</Link>.
          </p>
        </div>
      </section>

      {GROUPS.map((g) => (
        <section className="section" key={g.topic}>
          <div className="container faq__wrap">
            <div className="section-head reveal">
              <p className="eyebrow">{g.topic}</p>
            </div>
            <div className="faq__list reveal">
              {g.items.map((f) => (
                <details className="faq__item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section why on-dark">
        <div className="container cta-strip">
          <p className="eyebrow reveal">Get started</p>
          <h2 className="reveal">Still have a question?</h2>
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
