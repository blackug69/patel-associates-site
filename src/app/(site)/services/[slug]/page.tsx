import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServices, getService } from "@/lib/services";
import { ServiceIcon } from "@/components/service-icon";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL, FIRM, OG_IMAGE } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  // Local long-tail targeting ("... in Ahmedabad") — the winning pattern for
  // this market. The layout title template appends the firm name.
  const ogTitle = `${service.title} in Ahmedabad · ${FIRM.name}`;
  return {
    title: `${service.title} in Ahmedabad`,
    description: service.lead,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: FIRM.name,
      title: ogTitle,
      description: service.lead,
      url: `/services/${service.slug}`,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: FIRM.name }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: service.lead, images: [OG_IMAGE] },
  };
}

export default async function ServicePage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} in Ahmedabad`,
    description: service.lead,
    serviceType: service.title,
    areaServed: { "@type": "City", name: "Ahmedabad" },
    provider: { "@type": "AccountingService", name: FIRM.name, "@id": `${SITE_URL}/#business` },
    url: `${SITE_URL}/services/${service.slug}`,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${SITE_URL}/services/${service.slug}` },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb reveal"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / {service.title}</p>
          <span className="page-hero__icon reveal"><ServiceIcon name={service.icon} /></span>
          <p className="eyebrow reveal">Service</p>
          <h1 className="reveal">{service.title}</h1>
          <p className="page-hero__lead reveal">{service.lead}</p>
          <div className="page-hero__actions reveal">
            <Button asChild variant="primary">
              <Link href="/contact">Book a Consultation <span className="arrow" aria-hidden>↗</span></Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/services">All Services</Link>
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
