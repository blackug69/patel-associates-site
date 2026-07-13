import { MessageCircle } from "lucide-react";

// Placeholder number — replace with the firm's real WhatsApp number.
// Format: country code + number, digits only (e.g. 919825442028).
const WHATSAPP_NUMBER = "910000000000";
const PREFILL = "Hello, I'd like to enquire about your accounting and legal services.";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILL)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-none border border-ink bg-pine px-4 py-3 text-paper shadow-[0_16px_40px_-16px_rgba(8,8,7,0.7)] transition-all duration-300 hover:bg-pine-deep sm:bottom-7 sm:right-7"
    >
      <MessageCircle className="size-5 shrink-0" />
      <span className="hidden font-mono text-xs uppercase tracking-[0.18em] sm:inline">
        WhatsApp
      </span>
    </a>
  );
}
