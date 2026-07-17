"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/admin/ui/sheet";

// Mobile nav drawer. Owns the Sheet's open state and closes it whenever the
// route changes, so tapping a nav link navigates AND dismisses the drawer
// (Radix Sheet doesn't close on client-side navigation by itself). The sidebar
// markup (server-rendered: logo, nav, avatar/logout) is passed as children.
export function AdminMobileNav({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const first = React.useRef(true);

  React.useEffect(() => {
    if (first.current) { first.current = false; return; }
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-card p-0">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        {children}
      </SheetContent>
    </Sheet>
  );
}
