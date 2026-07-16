import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE_URL, FIRM } from "@/lib/site";

// NOTE: Fonts are declared via CSS font stacks in globals.css (Fraunces / Libre
// Franklin / Spline Sans Mono with system fallbacks) rather than next/font/google,
// so builds/dev never block on fetching from the Google Fonts CDN.
//
// Public chrome (nav/footer/WhatsApp) lives in (site)/layout.tsx, not here, so
// the /admin panel does not inherit it. This root layout only owns <html>/<body>
// and the sitewide metadata defaults.

const DEFAULT_TITLE =
  "Patel Accounting & Legal Services — Compliance, handled with clarity";
const DEFAULT_DESCRIPTION =
  "A legacy accounting and legal practice in Ahmedabad since 2006. GST, income tax, bookkeeping, business registration, and compliance, handled with clarity and confidence.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s · Patel Accounting & Legal Services",
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: FIRM.name,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        {/* Applies the saved admin theme before paint (no flash). beforeInteractive
            avoids the "script in component" warning and never re-runs on client nav. */}
        <Script id="admin-theme-init" strategy="beforeInteractive">
          {`try{if(localStorage.getItem('patel-admin-theme')==='light')document.documentElement.setAttribute('data-admin-theme','light')}catch(e){}`}
        </Script>
      </head>
      {/* suppressHydrationWarning: browser extensions (Grammarly, etc.) inject
          attributes onto <body> before React hydrates, which would otherwise
          log a hydration-mismatch warning. This suppresses only <body>'s own
          attribute diff, not its children. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
