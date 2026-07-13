import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/insights";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} · Patel Accounting & Legal Services`,
    description: post.excerpt,
  };
}

export default async function InsightPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb reveal"><Link href="/">Home</Link> / <Link href="/insights">Insights</Link> / {post.title}</p>
          <p className="eyebrow reveal">{post.category} · {post.date}</p>
          <h1 className="reveal">{post.title}</h1>
          <p className="page-hero__lead reveal">{post.excerpt}</p>
          <div className="page-hero__actions reveal">
            <Button asChild variant="outline">
              <Link href="/insights">All Insights</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose reveal">
            {post.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="section why on-dark">
        <div className="container cta-strip">
          <p className="eyebrow reveal">Get started</p>
          <h2 className="reveal">Talk to us about your situation.</h2>
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
