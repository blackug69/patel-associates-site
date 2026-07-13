import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScrollReveals } from "@/components/scroll-reveals";

// NOTE: Fonts are declared via CSS font stacks in globals.css (Fraunces / Libre
// Franklin / Spline Sans Mono with system fallbacks) rather than next/font/google,
// so builds/dev never block on fetching from the Google Fonts CDN.

export const metadata: Metadata = {
  title: "Patel Accounting & Legal Services — Compliance, handled with clarity",
  description:
    "A legacy accounting and legal practice in Ahmedabad since 2006. GST, income tax, bookkeeping, business registration, and compliance, handled with clarity and confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <SiteNav />
        {children}
        <SiteFooter />
        <ScrollReveals />
      </body>
    </html>
  );
}
