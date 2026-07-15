import {
  Calculator,
  ReceiptText,
  Landmark,
  Building2,
  FileCheck2,
  Scale,
  FileText,
  ShieldCheck,
  Briefcase,
  Stamp,
  type LucideIcon,
} from "lucide-react";

// Maps a service's stored `icon` (a lucide component name) to the component.
// Keeps a small allow-list so admin-added services can pick a known icon;
// anything unrecognized falls back to a neutral default rather than breaking.
const MAP: Record<string, LucideIcon> = {
  Calculator,
  ReceiptText,
  Landmark,
  Building2,
  FileCheck2,
  Scale,
  FileText,
  ShieldCheck,
  Briefcase,
  Stamp,
};

export function ServiceIcon({ name }: { name: string }) {
  const Icon = MAP[name] ?? Calculator;
  return <Icon aria-hidden strokeWidth={1.5} />;
}
