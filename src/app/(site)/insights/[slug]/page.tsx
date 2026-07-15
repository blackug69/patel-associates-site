import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { getPosts, getPost, formatDate } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL, FIRM } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.seo_title ?? post.title,
    description: post.seo_description ?? post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/insights/${post.slug}`,
      publishedTime: post.published_at ?? undefined,
      images: post.cover_url ? [post.cover_url] : undefined,
    },
  };
}

export default async function InsightPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    datePublished: post.published_at ?? undefined,
    image: post.cover_url ?? undefined,
    author: { "@type": "Organization", name: FIRM.name },
    publisher: { "@type": "Organization", name: FIRM.name, "@id": `${SITE_URL}/#business` },
    mainEntityOfPage: `${SITE_URL}/insights/${post.slug}`,
  };

  return (
    <main>
      <JsonLd data={articleSchema} />
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb reveal"><Link href="/">Home</Link> / <Link href="/insights">Insights</Link> / {post.title}</p>
          <p className="eyebrow reveal">{post.category}{post.published_at ? ` · ${formatDate(post.published_at)}` : ""}</p>
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
            <ReactMarkdown>{post.body}</ReactMarkdown>
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
