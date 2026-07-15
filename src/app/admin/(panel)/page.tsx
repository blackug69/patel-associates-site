import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const headCount = { count: "exact" as const, head: true };

  const [leads, leadsNew, posts, team, testimonials, faqs, services, cases] =
    await Promise.all([
      supabase.from("leads").select("*", headCount),
      supabase.from("leads").select("*", headCount).eq("status", "new"),
      supabase.from("posts").select("*", headCount),
      supabase.from("team_members").select("*", headCount),
      supabase.from("testimonials").select("*", headCount),
      supabase.from("faqs").select("*", headCount),
      supabase.from("services").select("*", headCount),
      supabase.from("case_studies").select("*", headCount),
    ]);

  const cards = [
    { label: "Leads", href: "/admin/leads", count: leads.count ?? 0, note: (leadsNew.count ?? 0) > 0 ? `${leadsNew.count} new` : "" },
    { label: "Insights", href: "/admin/posts", count: posts.count ?? 0, note: "" },
    { label: "Team", href: "/admin/team", count: team.count ?? 0, note: "" },
    { label: "Testimonials", href: "/admin/testimonials", count: testimonials.count ?? 0, note: "" },
    { label: "FAQs", href: "/admin/faqs", count: faqs.count ?? 0, note: "" },
    { label: "Services", href: "/admin/services", count: services.count ?? 0, note: "" },
    { label: "Results", href: "/admin/case-studies", count: cases.count ?? 0, note: "" },
  ];

  return (
    <>
      <h1 className="admin__title">Dashboard</h1>
      <p className="admin__lead">Manage the site&apos;s content and review incoming leads.</p>
      <div className="admin__cards">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="admin__card">
            <span className="admin__card-num">{c.count}</span>
            <span className="admin__card-label">{c.label}</span>
            {c.note && <span className="admin__card-note">{c.note}</span>}
          </Link>
        ))}
      </div>
    </>
  );
}
