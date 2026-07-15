import { MessageCircle } from "lucide-react";
import { FIRM } from "@/lib/site";

// Persistent WhatsApp click-to-chat — the dominant conversion mechanic for this
// market (see competitive research). Warm-monochrome per DESIGN_DIRECTION.md:
// ink fill, paper text, hairline, no color, subtle shadow only.
const PREFILL =
  "Hello, I'd like to enquire about your accounting and legal services.";

export function WhatsAppButton() {
  const href = `https://wa.me/${FIRM.whatsapp}?text=${encodeURIComponent(PREFILL)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="wa-fab"
    >
      <MessageCircle size={20} strokeWidth={1.5} aria-hidden />
      <span className="wa-fab__label">WhatsApp</span>
    </a>
  );
}
