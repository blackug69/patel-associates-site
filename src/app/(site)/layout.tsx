import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScrollReveals } from "@/components/scroll-reveals";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { JsonLd } from "@/components/json-ld";
import { localBusinessJsonLd } from "@/lib/site";

// Public site chrome. Lives in the (site) route group so the /admin panel
// (a sibling group) does NOT inherit the marketing nav/footer.
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <SiteNav />
      {children}
      <SiteFooter />
      <WhatsAppButton />
      <ScrollReveals />
    </>
  );
}
