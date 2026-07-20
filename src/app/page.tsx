import Link from "next/link";
import { services } from "@/lib/services";
import { ServiceIcon } from "@/components/service-icon";
import { Button } from "@/components/ui/button";

const WHY = [
  "Nearly two decades of professional experience",
  "Personalized attention to every client",
  "Accurate & timely compliance",
  "Transparent professional advice",
  "Affordable & reliable services",
  "Technology-driven solutions",
  "Confidentiality & data security",
  "Dedicated client support",
];

const INDUSTRIES = [
  "Manufacturing Industries",
  "Traders & Wholesalers",
  "Retail Businesses",
  "Service Providers",
  "Professionals (Doctors, Architects, Consultants)",
  "Startups",
  "E-commerce Businesses",
  "Import & Export Businesses",
  "Construction & Real Estate",
  "Educational Institutions",
  "NGOs & Trusts",
  "Freelancers",
  "Individuals & Salaried Employees",
];

const TESTIMONIALS = [
  { quote: "They took our GST filing off our plate entirely. Returns are on time and I finally understand my own numbers.", role: "Founder · [Company]" },
  { quote: "Registered my company and set up the books in weeks. Clear advice, no surprises, genuinely responsive.", role: "Proprietor · [Business]" },
  { quote: "A tax notice that worried me was handled calmly and correctly. This is the firm I recommend to everyone now.", role: "Director · [Company]" },
];


export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="section" id="home" style={{ borderBottom: 0 }}>
        <div className="container hero__grid" style={{ paddingBlock: 0 }}>
          <div className="hero__copy">
            <p className="eyebrow reveal">Est. 2006 · Ahmedabad</p>
            <h1 className="h-display hero__title reveal">
              Your numbers, handled with <em>clarity</em>.
            </h1>
            <p className="hero__lede reveal">
              A legacy accounting and legal practice keeping individuals, startups, professionals,
              and businesses compliant across GST, income tax, bookkeeping, registration, and
              advisory, under one trusted roof.
            </p>
            <div className="hero__ctas reveal">
              <Button asChild variant="default">
                <Link href="/contact">Book a Consultation <span className="arrow" aria-hidden>↗</span></Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/services">View Services</Link>
              </Button>
            </div>
            <div className="hero__contact reveal">
              <a href="tel:+919825442028">Call 98254 42028</a>
              <a href="https://wa.me/919825442028">WhatsApp</a>
            </div>
            <dl className="stats reveal">
              <div className="stat"><dd className="stat__num">20</dd><dt className="stat__lbl">Years of experience</dt></div>
              <div className="stat"><dd className="stat__num">2006</dd><dt className="stat__lbl">Established</dt></div>
            </dl>
          </div>
          <div className="frame hero__media reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/legacy.jpg" alt="Lady Justice statue holding balanced scales" width={1200} height={800} style={{ objectPosition: "62% center" }} />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="container about__grid">
          <div className="frame about__media reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/contact-office.jpg" alt="Adviser at a desk beside brass scales of justice" width={1400} height={2100} />
          </div>
          <div className="about reveal">
            <p className="eyebrow">Our story</p>
            <h2 className="h-display">A legacy of trust, carried into a modern practice.</h2>
            <p>The firm began in 2006 as <em>Hitendra S. Patel, Tax Consultant</em>, founded by Late Mr. Hitendra S. Patel with a commitment to reliable, ethical, and timely accounting, taxation, and compliance services.</p>
            <p>Today that legacy is carried forward by Mr. Saurabh H. Patel, who upholds the same values of integrity and client satisfaction while embracing modern technology and evolving regulation. With nearly two decades of experience, we help clients stay compliant and focus on their growth.</p>
            <p className="about__tagline h-display">&ldquo;Your Success. Our Commitment.&rdquo;</p>
            <div className="about__stats">
              <div className="stat"><dd className="stat__num">20</dd><dt className="stat__lbl">Years of experience</dt></div>
              <div className="stat"><dd className="stat__num">5</dd><dt className="stat__lbl">Service areas</dt></div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">What we do</p>
            <h2>A comprehensive range of professional services.</h2>
            <p>Everything an individual or business needs to register, file, and stay compliant.</p>
          </div>
          <div className="services__grid">
            {services.map((s) => (
              <article className="card reveal" key={s.slug}>
                <span className="card__icon"><ServiceIcon slug={s.slug} /></span>
                <h3>{s.title}</h3>
                <ul className="card__list">
                  {s.included.map((i) => <li key={i.name}>{i.name}</li>)}
                </ul>
                <Link className="link-ghost" href={`/services/${s.slug}`}>Learn more <span className="arrow" aria-hidden>→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section" id="process">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">How we work</p>
            <h2>A clear path from first call to ongoing peace of mind.</h2>
          </div>
          <div className="process__grid">
            <div className="step reveal"><span className="step__n">STEP 01</span><h3>Consultation</h3><p>We understand your situation, obligations, and goals. No jargon, no pressure.</p></div>
            <div className="step reveal"><span className="step__n">STEP 02</span><h3>Filing &amp; setup</h3><p>We handle registration, returns, and paperwork accurately and on schedule.</p></div>
            <div className="step reveal"><span className="step__n">STEP 03</span><h3>Ongoing compliance</h3><p>We keep you current all year. Deadlines tracked, notices handled, books clean.</p></div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section why on-dark" id="why">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Why choose us</p>
            <h2>We don&apos;t just complete compliances. We build relationships.</h2>
          </div>
          <ul className="why__grid reveal">
            {WHY.map((w) => (
              <li className="why__item" key={w}><span className="why__check" aria-hidden>✓</span>{w}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section" id="industries">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Industries we serve</p>
            <h2>Trusted across a broad range of businesses.</h2>
          </div>
          <ul className="industries__grid reveal">
            {INDUSTRIES.map((i) => <li key={i}>{i}</li>)}
          </ul>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" id="testimonials">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Client words</p>
            <h2>Trusted by the businesses we serve.</h2>
          </div>
          <div className="quotes">
            {TESTIMONIALS.map((t, i) => (
              <figure className="quote reveal" key={i}>
                <span className="quote__mark" aria-hidden>&ldquo;</span>
                <blockquote><p>{t.quote}</p></blockquote>
                <figcaption className="quote__who">
                  <span className="quote__name">[Client name]</span>
                  <span className="quote__role">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="placeholder-note reveal">Placeholder testimonials, to be replaced with real client quotes.</p>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="section why on-dark">
        <div className="container cta-strip">
          <p className="eyebrow reveal">Get started</p>
          <h2 className="reveal">Talk to Patel about your compliance.</h2>
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
