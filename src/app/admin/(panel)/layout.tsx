import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../actions";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/posts", label: "Insights" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/case-studies", label: "Results" },
];

export default async function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="admin">
      <aside className="admin__side">
        <div className="admin__brand">PATEL · Admin</div>
        <nav className="admin__nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
        </nav>
        <form action={logout} className="admin__account">
          <span className="admin__email">{user?.email}</span>
          <button type="submit" className="admin-btn admin-btn--ghost">Sign out</button>
        </form>
      </aside>
      <main className="admin__main">{children}</main>
    </div>
  );
}
