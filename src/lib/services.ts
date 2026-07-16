import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import type { Json } from "@/lib/supabase/types";

export type ServiceItem = { name: string; desc: string };
export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  title: string;
  lead: string;
  overview: string[];
  included: ServiceItem[];
  faqs: ServiceFaq[];
  icon: string;
};

type ServiceRow = {
  slug: string;
  title: string;
  lead: string;
  overview: string[];
  included: Json;
  faqs: Json;
  icon: string;
};

const COLUMNS = "slug,title,lead,overview,included,faqs,icon";

function mapRow(r: ServiceRow): Service {
  return {
    slug: r.slug,
    title: r.title,
    lead: r.lead,
    overview: r.overview ?? [],
    included: (r.included as ServiceItem[]) ?? [],
    faqs: (r.faqs as ServiceFaq[]) ?? [],
    icon: r.icon,
  };
}

export async function getServices(): Promise<Service[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("services")
    .select(COLUMNS)
    .eq("published", true)
    .order("sort_order");
  if (error) throw new Error(`Failed to load services: ${error.message}`);
  return (data ?? []).map(mapRow);
}

// cache(): generateMetadata + the page component both call getService(slug) in
// the same render; React request-dedupes so it's a single Supabase round trip.
export const getService = cache(async (slug: string): Promise<Service | undefined> => {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("services")
    .select(COLUMNS)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw new Error(`Failed to load service "${slug}": ${error.message}`);
  return data ? mapRow(data) : undefined;
});
