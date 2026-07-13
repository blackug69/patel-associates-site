import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/services";
import { ServiceIcon } from "@/components/service-icon";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} · Patel Accounting & Legal Services`,
    description: service.lead,
  };
}

export default async function ServicePage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb reveal"><Link href="/">Home</Link> / <Link href="/#services">Services</Link> / {service.title}</p>
          <span className="page-hero__icon reveal"><ServiceIcon slug={service.slug} /></span>
          <p className="eyebrow reveal">Service</p>
          <h1 className="reveal">{service.title}</h1>
          <p className="page-hero__lead reveal">{service.lead}</p>
          <div className="page-hero__actions reveal">
            <Button asChild variant="primary">
              <Link href="/contact">Book a Consultation <span className="arrow" aria-hidden>↗</span></Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/#services">All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose reveal">
            {service.overview.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal"><p className="eyebrow">What is included</p><h2>Everything this service covers.</h2></div>
          <div className="included">
            {service.included.map((it) => (
              <div className="included__item reveal" key={it.name}>
                <h3>{it.name}</h3>
                <p>{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal"><p className="eyebrow">How it works</p><h2>A clear path from first call to done.</h2></div>
          <div className="process__grid">
            <div className="step reveal"><span className="step__n">STEP 01</span><h3>Consultation</h3><p>We review your requirement and documents, and tell you exactly what is needed.</p></div>
            <div className="step reveal"><span className="step__n">STEP 02</span><h3>Documentation &amp; filing</h3><p>We prepare and file accurately, keeping you updated at each step.</p></div>
            <div className="step reveal"><span className="step__n">STEP 03</span><h3>Ongoing support</h3><p>We track deadlines and handle notices so you stay compliant.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq__wrap">
          <div className="section-head reveal"><p className="eyebrow">FAQ</p><h2>Questions, answered.</h2></div>
          <div className="faq__list reveal">
            {service.faqs.map((f) => (
              <details className="faq__item" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section why on-dark">
        <div className="container cta-strip">
          <p className="eyebrow reveal">Get started</p>
          <h2 className="reveal">Talk to us about {service.title.toLowerCase()}.</h2>
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
