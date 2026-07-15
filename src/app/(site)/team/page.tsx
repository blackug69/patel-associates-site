import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTeam } from "@/lib/team";

export const metadata: Metadata = {
  title: "Our Team",
  description: "The people behind Patel Accounting & Legal Services, Ahmedabad.",
};

export const revalidate = 3600;

export default async function TeamPage() {
  const team = await getTeam();
  const leadership = team.filter((m) => m.is_leadership);
  const members = team.filter((m) => !m.is_leadership);

  return (
    <main>
      <section className="page-hero">
        <div className="container" style={{ paddingTop: "var(--s7)" }}>
          <p className="eyebrow reveal">Our team</p>
          <h1 className="reveal">The people behind Patel.</h1>
          <p className="page-hero__lead reveal">A practice built on relationships. You work directly with experienced people who know your file, not a call queue.</p>
        </div>
      </section>

      {leadership.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <p className="eyebrow">Leadership</p>
              <h2>A legacy carried forward.</h2>
            </div>
            <div className="founders">
              {leadership.map((m) => (
                <article className="founder reveal" key={m.id}>
                  {m.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="founder__photo" src={m.photo_url} alt={`Portrait of ${m.name}`} width={480} height={600} />
                  ) : (
                    <div className="photo-ph founder__photo"><span>Portrait</span></div>
                  )}
                  <div>
                    <h3>{m.name}</h3>
                    <p className="founder__role">{m.role}</p>
                    {m.bio && <p>{m.bio}</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {members.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <p className="eyebrow">The team</p>
              <h2>Experienced hands across accounting, tax, and compliance.</h2>
            </div>
            <div className="team__grid">
              {members.map((m) => (
                <article className="member reveal" key={m.id}>
                  {m.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="member__photo" src={m.photo_url} alt={`Photo of ${m.name}`} width={360} height={360} />
                  ) : (
                    <div className="photo-ph member__photo"><span>Photo</span></div>
                  )}
                  <h3>{m.name}</h3>
                  <p className="member__role">{m.role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

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
