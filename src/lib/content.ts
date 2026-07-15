import { createPublicClient } from "@/lib/supabase/public";

export type Testimonial = {
  id: string;
  quote: string;
  author_name: string;
  author_role: string | null;
  rating: number | null;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  situation: string;
  action: string;
  outcome: string;
};

export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string;
  cover_url: string | null;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
};

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("id,quote,author_name,author_role,rating")
    .eq("published", true)
    .order("sort_order");
  if (error) throw new Error(`Failed to load testimonials: ${error.message}`);
  return data ?? [];
}

export async function getFaqs(): Promise<Faq[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("id,question,answer,category")
    .eq("published", true)
    .order("sort_order");
  if (error) throw new Error(`Failed to load FAQs: ${error.message}`);
  return data ?? [];
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("case_studies")
    .select("id,title,situation,action,outcome")
    .eq("published", true)
    .order("sort_order");
  if (error) throw new Error(`Failed to load case studies: ${error.message}`);
  return data ?? [];
}

const POST_COLUMNS =
  "slug,title,category,excerpt,body,cover_url,published_at,seo_title,seo_description";

export async function getPosts(): Promise<Post[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_COLUMNS)
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) throw new Error(`Failed to load posts: ${error.message}`);
  return data ?? [];
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_COLUMNS)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw new Error(`Failed to load post "${slug}": ${error.message}`);
  return data ?? undefined;
}

// Formats an ISO date as e.g. "15 June 2026". Empty string for null.
export function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Groups FAQs by category, preserving the sort_order-driven insertion order.
export function groupFaqs(faqs: Faq[]): { topic: string; items: Faq[] }[] {
  const groups: { topic: string; items: Faq[] }[] = [];
  for (const f of faqs) {
    let g = groups.find((x) => x.topic === f.category);
    if (!g) {
      g = { topic: f.category, items: [] };
      groups.push(g);
    }
    g.items.push(f);
  }
  return groups;
}
