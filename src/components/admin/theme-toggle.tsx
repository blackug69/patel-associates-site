"use client";

import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/admin/ui/button";

const KEY = "patel-admin-theme";

// CSS-driven toggle: no React state, so server and client render identical
// markup (no hydration mismatch). AdminThemeScript sets the html attribute
// before paint; CSS (.admin-when-dark / .admin-when-light) shows the right
// icon+label. onClick just flips the attribute + persists it.
export function AdminThemeToggle() {
  function toggle() {
    const isLight = document.documentElement.getAttribute("data-admin-theme") === "light";
    const next = isLight ? "dark" : "light";
    if (next === "light") document.documentElement.setAttribute("data-admin-theme", "light");
    else document.documentElement.removeAttribute("data-admin-theme");
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  }

  return (
    <Button variant="outline" size="sm" onClick={toggle} className="gap-2" aria-label="Toggle light or dark theme" title="Toggle light / dark">
      <span className="admin-when-dark inline-flex items-center gap-2">
        <Sun className="h-4 w-4" />
        <span className="text-xs">Light</span>
      </span>
      <span className="admin-when-light inline-flex items-center gap-2">
        <Moon className="h-4 w-4" />
        <span className="text-xs">Dark</span>
      </span>
    </Button>
  );
}
