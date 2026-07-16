"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/admin/ui/button";

const KEY = "patel-admin-theme";

function apply(theme: "dark" | "light") {
  if (theme === "light") document.documentElement.setAttribute("data-admin-theme", "light");
  else document.documentElement.removeAttribute("data-admin-theme");
}

export function AdminThemeToggle() {
  // AdminThemeScript sets the attribute before hydration, so we read the
  // already-applied value here (no effect / no setState-in-effect).
  const [theme, setTheme] = React.useState<"dark" | "light">(() =>
    typeof document !== "undefined" &&
    document.documentElement.getAttribute("data-admin-theme") === "light"
      ? "light"
      : "dark",
  );

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    apply(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle} suppressHydrationWarning aria-label="Toggle theme" title="Toggle light / dark">
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

// Runs before paint to avoid a flash of the wrong theme (static, hardcoded).
export function AdminThemeScript() {
  const js = `try{if(localStorage.getItem('${KEY}')==='light')document.documentElement.setAttribute('data-admin-theme','light')}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
