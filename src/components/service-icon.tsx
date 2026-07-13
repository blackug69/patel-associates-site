import { Calculator, ReceiptText, Landmark, Building2, FileCheck2 } from "lucide-react";

const MAP = {
  accounting: Calculator,
  gst: ReceiptText,
  "income-tax": Landmark,
  registration: Building2,
  legal: FileCheck2,
} as const;

export function ServiceIcon({ slug }: { slug: string }) {
  const Icon = MAP[slug as keyof typeof MAP] ?? Calculator;
  return <Icon aria-hidden strokeWidth={1.5} />;
}
