import Link from "next/link";
import { Menu, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../actions";
import { AdminNav } from "@/components/admin/admin-nav";
import { Toaster } from "@/components/admin/ui/sonner";
import { Button } from "@/components/admin/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/admin/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/admin/ui/avatar";
import { AdminThemeToggle } from "@/components/admin/theme-toggle";

export default async function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const email = user?.email ?? "";
  const initials = (email.slice(0, 2) || "AD").toUpperCase();

  const sidebar = (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link href="/admin" className="px-2 py-1 text-sm font-semibold tracking-tight">
        <span className="text-brass">Patel</span>
        <span className="text-muted-foreground"> · Admin</span>
      </Link>
      <AdminNav />
      <div className="mt-auto flex items-center gap-3 rounded-md border border-border bg-background/40 p-2.5">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
        <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">{email}</p>
        <form action={logout}>
          <Button type="submit" variant="ghost" size="icon" aria-label="Sign out">
            <LogOut className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="admin-root flex min-h-dvh">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card md:block md:sticky md:top-0 md:h-dvh md:overflow-y-auto">
        {sidebar}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-card p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              {sidebar}
            </SheetContent>
          </Sheet>
          <span className="text-sm font-medium text-muted-foreground">Patel Admin</span>
          <div className="ml-auto"><AdminThemeToggle /></div>
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
