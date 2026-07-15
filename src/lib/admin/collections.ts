// Config-driven admin collections. One dynamic /admin/[collection] route renders
// all of these; `leads` and `posts` have bespoke routes that take precedence.

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "checkbox"
  | "lines" // textarea → string[] (one item per line)
  | "kvlines" // textarea → {name, desc}[] ("Name | Description" per line)
  | "qalines"; // textarea → {q, a}[] ("Question | Answer" per line)

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  default?: boolean; // checkbox default for new items
};

export type Collection = {
  key: string; // URL segment
  table: string; // DB table
  singular: string;
  plural: string;
  fields: Field[];
  listColumns: string[];
  order: { column: string; ascending: boolean };
  revalidate: string[]; // public paths to revalidate on save/delete
};

const ICON_HELP =
  "lucide name — one of: Calculator, ReceiptText, Landmark, Building2, FileCheck2, Scale, FileText, ShieldCheck, Briefcase, Stamp";

export const COLLECTIONS: Record<string, Collection> = {
  testimonials: {
    key: "testimonials",
    table: "testimonials",
    singular: "Testimonial",
    plural: "Testimonials",
    fields: [
      { name: "quote", label: "Quote", type: "textarea", required: true },
      { name: "author_name", label: "Author name", type: "text", required: true },
      { name: "author_role", label: "Author role", type: "text", placeholder: "Founder · Acme Traders" },
      { name: "rating", label: "Rating (1–5)", type: "number" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox", default: true },
    ],
    listColumns: ["author_name", "author_role", "published"],
    order: { column: "sort_order", ascending: true },
    revalidate: ["/"],
  },
  faqs: {
    key: "faqs",
    table: "faqs",
    singular: "FAQ",
    plural: "FAQs",
    fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
      { name: "category", label: "Category", type: "text", required: true, placeholder: "GST" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox", default: true },
    ],
    listColumns: ["question", "category", "published"],
    order: { column: "sort_order", ascending: true },
    revalidate: ["/faq", "/"],
  },
  team: {
    key: "team",
    table: "team_members",
    singular: "Team member",
    plural: "Team",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "photo_url", label: "Photo URL", type: "text", placeholder: "https://…" },
      { name: "is_leadership", label: "Leadership (shown as founder)", type: "checkbox" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox", default: true },
    ],
    listColumns: ["name", "role", "published"],
    order: { column: "sort_order", ascending: true },
    revalidate: ["/team"],
  },
  "case-studies": {
    key: "case-studies",
    table: "case_studies",
    singular: "Case study",
    plural: "Results",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "situation", label: "Situation", type: "textarea", required: true },
      { name: "action", label: "What we did", type: "textarea", required: true },
      { name: "outcome", label: "Outcome", type: "textarea", required: true },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox", default: true },
    ],
    listColumns: ["title", "published"],
    order: { column: "sort_order", ascending: true },
    revalidate: ["/results"],
  },
  services: {
    key: "services",
    table: "services",
    singular: "Service",
    plural: "Services",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true, placeholder: "gst" },
      { name: "lead", label: "Lead (one-line summary)", type: "textarea", required: true },
      { name: "icon", label: "Icon", type: "text", required: true, help: ICON_HELP },
      { name: "overview", label: "Overview paragraphs (one per line)", type: "lines" },
      { name: "included", label: "Included items (one per line: Name | Description)", type: "kvlines" },
      { name: "faqs", label: "FAQs (one per line: Question | Answer)", type: "qalines" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox", default: true },
    ],
    listColumns: ["title", "slug", "published"],
    order: { column: "sort_order", ascending: true },
    revalidate: ["/", "/services"],
  },
};

export function getCollection(key: string): Collection | undefined {
  return COLLECTIONS[key];
}
