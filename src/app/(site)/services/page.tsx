import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/services";
import { ServiceIcon } from "@/components/service-icon";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Accounting, GST, income tax, business registration, and legal compliance — everything you need to register, file, and stay compliant, in Ahmedabad.",
  alternates: { canonical: "/services" },
};

export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main>
      <section className="page-hero">
        <div className="container" style={{ paddingTop: "var(--s7)" }}>
          <p className="eyebrow reveal">What we do</p>
          <h1 className="reveal">A comprehensive range of professional services.</h1>
          <p className="page-hero__lead reveal">
            Everything an individual or business needs to register, file, and stay
            compliant — handled accurately, on time, and under one trusted roof.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services__grid">
            {services.map((s) => (
              <article className="card reveal" key={s.slug}>
                <span className="card__icon"><ServiceIcon name={s.icon} /></span>
                <h3>{s.title}</h3>
                <ul className="card__list">
                  {s.included.map((i) => <li key={i.name}>{i.name}</li>)}
                </ul>
                <Link className="link-ghost" href={`/services/${s.slug}`}>
                  Learn more <span className="arrow" aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section why on-dark">
        <div className="container cta-strip">
          <p className="eyebrow reveal">Get started</p>
          <h2 className="reveal">Not sure which service you need?</h2>
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
