import Link from "next/link";
import { Inbox, PenSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/admin/ui/card";
import { Badge } from "@/components/admin/ui/badge";
import { Button } from "@/components/admin/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";

export const dynamic = "force-dynamic";

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

type StatusVariant = "brass" | "success" | "secondary";
function statusVariant(s: string): StatusVariant {
  return s === "new" ? "brass" : s === "closed" ? "success" : "secondary";
}

export default async function AdminDashboard() {
  const supabase = await createClient();
  const head = { count: "exact" as const, head: true };

  const [leads, leadsNew, posts, team, testimonials, faqs, services, cases, recentLeads, recentPosts] =
    await Promise.all([
      supabase.from("leads").select("*", head),
      supabase.from("leads").select("*", head).eq("status", "new"),
      supabase.from("posts").select("*", head),
      supabase.from("team_members").select("*", head),
      supabase.from("testimonials").select("*", head),
      supabase.from("faqs").select("*", head),
      supabase.from("services").select("*", head),
      supabase.from("case_studies").select("*", head),
      supabase.from("leads").select("id,name,service,status,created_at").order("created_at", { ascending: false }).limit(5),
      supabase.from("posts").select("id,title,published,updated_at").order("updated_at", { ascending: false }).limit(5),
    ]);

  const newLeads = leadsNew.count ?? 0;
  const stats = [
    { label: "Leads", href: "/admin/leads", n: leads.count ?? 0, note: newLeads > 0 ? `${newLeads} new` : "all handled", flag: newLeads > 0 },
    { label: "Insights", href: "/admin/posts", n: posts.count ?? 0, note: "posts", flag: false },
    { label: "Team", href: "/admin/team", n: team.count ?? 0, note: "members", flag: false },
    { label: "Testimonials", href: "/admin/testimonials", n: testimonials.count ?? 0, note: "quotes", flag: false },
    { label: "FAQs", href: "/admin/faqs", n: faqs.count ?? 0, note: "questions", flag: false },
    { label: "Services", href: "/admin/services", n: services.count ?? 0, note: "services", flag: false },
    { label: "Results", href: "/admin/case-studies", n: cases.count ?? 0, note: "case studies", flag: false },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage your website content and enquiries.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/posts/new"><PenSquare className="h-4 w-4" /> Write a post</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/leads"><Inbox className="h-4 w-4" /> Review leads</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="group">
            <Card className="h-full transition-colors group-hover:border-ring">
              <CardHeader className="pb-2">
                <CardDescription>{s.label}</CardDescription>
                <CardTitle className="text-3xl tabular-nums">{s.n}</CardTitle>
              </CardHeader>
              <CardContent>
                {s.flag ? (
                  <Badge variant="brass">{s.note}</Badge>
                ) : (
                  <span className="text-xs text-muted-foreground">{s.note}</span>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent enquiries</CardTitle>
            <CardDescription>Latest contact-form leads.</CardDescription>
            <CardAction>
              <Button asChild variant="ghost" size="sm"><Link href="/admin/leads">View all</Link></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {!recentLeads.data || recentLeads.data.length === 0 ? (
              <p className="text-sm text-muted-foreground">No leads yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentLeads.data.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="font-medium">{l.name}</TableCell>
                      <TableCell className="text-muted-foreground">{l.service ?? "—"}</TableCell>
                      <TableCell><Badge variant={statusVariant(l.status)}>{l.status}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{fmt(l.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent posts</CardTitle>
            <CardDescription>Your latest blog articles.</CardDescription>
            <CardAction>
              <Button asChild variant="ghost" size="sm"><Link href="/admin/posts">Manage</Link></Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {!recentPosts.data || recentPosts.data.length === 0 ? (
              <p className="text-sm text-muted-foreground">No posts yet.</p>
            ) : (
              recentPosts.data.map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/posts/${p.id}`}
                  className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2 text-sm transition-colors hover:bg-accent/50"
                >
                  <span className="min-w-0 flex-1 truncate">{p.title}</span>
                  <Badge variant={p.published ? "success" : "secondary"}>{p.published ? "Published" : "Draft"}</Badge>
                </Link>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
