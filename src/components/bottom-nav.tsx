"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Phone, Mail, Menu, X } from "lucide-react";

const MORE_LINKS = [
  { href: "/team", label: "Team" },
  { href: "/results", label: "Results" },
  { href: "/insights", label: "Insights" },
  { href: "/faq", label: "FAQ" },
  { href: "/#about", label: "About" },
];

const PHONE = "+919825442028";

export function BottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";
  const isServices = pathname === "/services" || pathname.startsWith("/services/");
  const isContact = pathname === "/contact";

  return (
    <>
      {open && (
        <>
          <div className="bn-sheet__backdrop" onClick={() => setOpen(false)} aria-hidden />
          <div className="bn-sheet" role="dialog" aria-label="More pages">
            <div className="bn-sheet__head">
              <span className="bn-sheet__title">Menu</span>
              <button className="bn-sheet__close" type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X aria-hidden />
              </button>
            </div>
            <nav aria-label="More">
              {MORE_LINKS.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
              ))}
            </nav>
            <Link className="btn btn--primary bn-sheet__cta" href="/contact" onClick={() => setOpen(false)}>
              Book a Consultation <span className="arrow" aria-hidden>↗</span>
            </Link>
          </div>
        </>
      )}

      <nav className="bottom-nav" aria-label="Mobile">
        <Link className="bn-tab" href="/" aria-current={isHome ? "page" : undefined}>
          <Home aria-hidden /><span>Home</span>
        </Link>
        <Link className="bn-tab" href="/services" aria-current={isServices ? "page" : undefined}>
          <LayoutGrid aria-hidden /><span>Services</span>
        </Link>
        <a className="bn-tab" href={`tel:${PHONE}`}>
          <Phone aria-hidden /><span>Call</span>
        </a>
        <Link className="bn-tab" href="/contact" aria-current={isContact ? "page" : undefined}>
          <Mail aria-hidden /><span>Contact</span>
        </Link>
        <button className="bn-tab" type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <Menu aria-hidden /><span>More</span>
        </button>
      </nav>
    </>
  );
}
