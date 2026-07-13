import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Team · Patel Accounting & Legal Services",
  description: "The people behind Patel Accounting & Legal Services, Ahmedabad.",
};

const TEAM = [
  { role: "Accountant" },
  { role: "Tax Associate" },
  { role: "Compliance Executive" },
  { role: "Client Support" },
];

export default function TeamPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow reveal">Our team</p>
          <h1 className="reveal">The people behind Patel.</h1>
          <p className="page-hero__lead reveal">A practice built on relationships. You work directly with experienced people who know your file, not a call queue.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Leadership</p>
            <h2>A legacy carried forward.</h2>
          </div>
          <div className="founders">
            <article className="founder reveal">
              <div className="photo-ph founder__photo"><span>Portrait</span></div>
              <div>
                <h3>Late Shri Hitendra S. Patel</h3>
                <p className="founder__role">Founder</p>
                <p>Founded the firm in 2006 as <em>Hitendra S. Patel, Tax Consultant</em>, earning the trust of individuals, professionals, and businesses through accurate, ethical, and timely service. His standards still guide the practice today.</p>
              </div>
            </article>
            <article className="founder reveal">
              <div className="photo-ph founder__photo"><span>Portrait</span></div>
              <div>
                <h3>Mr. Saurabh H. Patel</h3>
                <p className="founder__role">Principal</p>
                <p>Carries the legacy forward, upholding the same values of integrity and client satisfaction while bringing modern technology and current regulatory practice to every engagement.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">The team</p>
            <h2>Experienced hands across accounting, tax, and compliance.</h2>
          </div>
          <div className="team__grid">
            {TEAM.map((m, i) => (
              <article className="member reveal" key={i}>
                <div className="photo-ph member__photo"><span>Photo</span></div>
                <h3>[Team member]</h3>
                <p className="member__role">{m.role}</p>
              </article>
            ))}
          </div>
          <p className="placeholder-note reveal">Placeholder team members, to be replaced with real names, roles, and photos.</p>
        </div>
      </section>

      <section className="section why on-dark">
        <div className="container cta-strip">
          <p className="eyebrow reveal">Get started</p>
          <h2 className="reveal">Work with a firm that knows your file.</h2>
          <div className="cta-strip__actions reveal">
            <Button asChild variant="primary">
              <Link href="/contact">Book a Consultation <span className="arrow" aria-hidden>↗</span></Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
