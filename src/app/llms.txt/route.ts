import { SITE_URL, FIRM } from "@/lib/site";

// llms.txt — a plain-text summary + link map for AI crawlers/assistants.
// Static (no per-request data); regenerated at build.
export const dynamic = "force-static";

export function GET() {
  const body = `# ${FIRM.name}

> Accounting, GST, income tax, business registration, and legal compliance for individuals and businesses in Ahmedabad, India. A legacy practice established in ${FIRM.foundingDate}.

## Services
- ${SITE_URL}/services/accounting: Accounting & bookkeeping
- ${SITE_URL}/services/gst: GST registration & returns
- ${SITE_URL}/services/income-tax: Income tax filing & planning
- ${SITE_URL}/services/registration: Business registration
- ${SITE_URL}/services/legal: Legal & compliance

## Key pages
- ${SITE_URL}/: Home
- ${SITE_URL}/services: All services
- ${SITE_URL}/insights: Articles & guides
- ${SITE_URL}/results: Representative client outcomes
- ${SITE_URL}/team: Our team
- ${SITE_URL}/faq: Frequently asked questions
- ${SITE_URL}/contact: Contact & enquiry

## Contact
- Phone: ${FIRM.phoneDisplay}
- Email: ${FIRM.email}
- Address: ${FIRM.street}, ${FIRM.locality} ${FIRM.postalCode}, ${FIRM.region}, India
- Hours: Monday to Saturday, 10:00 to 19:00 IST
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
