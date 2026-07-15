// Single source of truth for firm identity / NAP (name, address, phone) — used
// by metadata, JSON-LD structured data, the footer, and contact affordances.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.patelaccounting.in";

export const FIRM = {
  name: "Patel Accounting & Legal Services",
  phone: "+919825442028",
  phoneDisplay: "98254 42028",
  altPhone: "+918980413939",
  email: "saurabhpateloffice2026@gmail.com",
  whatsapp: "919825442028",
  foundingDate: "2006",
  street: "4th Floor, Office No. 7, Vinod Chamber, Dariyapur Road, Dariyapur",
  locality: "Ahmedabad",
  region: "Gujarat",
  postalCode: "380001",
  country: "IN",
} as const;

// schema.org LocalBusiness (AccountingService subtype). Rendered once, sitewide,
// so the firm is eligible for local rich results — something almost no competitor
// in this market has.
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${SITE_URL}/#business`,
    name: FIRM.name,
    url: SITE_URL,
    telephone: FIRM.phone,
    email: FIRM.email,
    foundingDate: FIRM.foundingDate,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: FIRM.street,
      addressLocality: FIRM.locality,
      addressRegion: FIRM.region,
      postalCode: FIRM.postalCode,
      addressCountry: FIRM.country,
    },
    areaServed: { "@type": "City", name: "Ahmedabad" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "19:00",
      },
    ],
  };
}
