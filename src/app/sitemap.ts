import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getServices } from "@/lib/services";
import { getPosts } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [services, posts] = await Promise.all([getServices(), getPosts()]);

  const staticRoutes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/insights", priority: 0.7 },
    { path: "/results", priority: 0.6 },
    { path: "/faq", priority: 0.6 },
    { path: "/team", priority: 0.5 },
    { path: "/contact", priority: 0.7 },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE_URL}${r.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/insights/${p.slug}`,
      lastModified: p.published_at ? new Date(p.published_at) : now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
