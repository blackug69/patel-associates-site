import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFaqs, groupFaqs } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about GST, income tax, accounting, registration, and working with us.",
  alternates: { canonical: "/faq" },
};

export const revalidate = 3600;

export default async function FaqPage() {
  const faqs = await getFaqs();
  const groups = groupFaqs(faqs);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <main>
      <JsonLd data={faqSchema} />
      <section className="page-hero">
        <div className="container" style={{ paddingTop: "var(--s7)" }}>
          <p className="eyebrow reveal">FAQ</p>
          <h1 className="reveal">Questions, answered.</h1>
          <p className="page-hero__lead reveal">
            Common questions about GST, income tax, accounting, registration, and working
            with us. Don&apos;t see yours? <Link href="/contact">Get in touch</Link>.
          </p>
        </div>
      </section>

      {groups.map((g) => (
        <section className="section" key={g.topic}>
          <div className="container faq__wrap">
            <div className="section-head reveal">
              <p className="eyebrow">{g.topic}</p>
            </div>
            <div className="faq__list reveal">
              {g.items.map((f) => (
                <details className="faq__item" key={f.id}>
                  <summary>{f.question}</summary>
                  <p>{f.answer}</p>
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
