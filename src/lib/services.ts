export type Service = {
  slug: string;
  title: string;
  lead: string;
  overview: string[];
  included: { name: string; desc: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "accounting",
    title: "Accounting Services",
    lead: "Reliable daily accounting so you always know exactly where your business stands.",
    overview: [
      "We keep your books accurate and current, turning daily transactions into clear financial statements and reports you can actually use to make decisions.",
      "Whether you are a growing business or an established one, we handle the routine so you can focus on running the company.",
    ],
    included: [
      { name: "Bookkeeping", desc: "Accurate daily recording of every transaction." },
      { name: "Accounting & Financial Statements", desc: "Profit and loss, balance sheet, and year end statements." },
      { name: "MIS Reports", desc: "Management reports that show performance at a glance." },
      { name: "Bank Reconciliation", desc: "Books matched to your bank, every period." },
    ],
    faqs: [
      { q: "Can you handle bookkeeping for my business?", a: "Yes. We provide regular bookkeeping and accounting for businesses of all sizes." },
      { q: "Do you prepare financial statements?", a: "Yes, including profit and loss, balance sheet, and MIS reports." },
    ],
  },
  {
    slug: "gst",
    title: "GST Services",
    lead: "GST registration, returns, and compliance, handled accurately and filed on time.",
    overview: [
      "From first registration to monthly returns and annual filing, we manage your GST from start to finish and keep you clear of penalties.",
      "If a notice arrives, we handle the response and resolution for you.",
    ],
    included: [
      { name: "GST Registration", desc: "New registration with full support afterwards." },
      { name: "GST Return Filing", desc: "Timely monthly and quarterly returns." },
      { name: "GST Annual Return", desc: "Accurate annual return preparation and filing." },
      { name: "GST Notices & Compliance", desc: "Response and resolution for GST notices." },
    ],
    faqs: [
      { q: "Do you provide GST Registration?", a: "Yes. We provide complete GST Registration along with compliance support afterwards." },
      { q: "Can you file my monthly returns?", a: "Yes. We manage regular return filing so you never miss a due date." },
    ],
  },
  {
    slug: "income-tax",
    title: "Income Tax Services",
    lead: "File right, plan ahead, and handle any notice with confidence.",
    overview: [
      "We prepare and file income tax returns for individuals and businesses, and plan ahead so you pay what you owe and not a rupee more.",
      "We also represent you on notices and handle your PAN and TAN needs.",
    ],
    included: [
      { name: "Income Tax Return Filing", desc: "Accurate ITR filing for individuals and businesses." },
      { name: "Tax Planning", desc: "Legitimate planning to reduce your tax burden." },
      { name: "Tax Consultancy", desc: "Advice for decisions with tax implications." },
      { name: "Income Tax Notices", desc: "Response and representation for notices." },
      { name: "PAN & TAN Services", desc: "Application and correction support." },
    ],
    faqs: [
      { q: "Who should file an Income Tax Return?", a: "Any individual or business whose income meets the applicable legal requirements, or who wishes to claim refunds, carry forward losses, or maintain financial records." },
      { q: "Can you respond to a tax notice for me?", a: "Yes. We handle notice responses and representation." },
    ],
  },
  {
    slug: "registration",
    title: "Business Registration",
    lead: "Start your business the right way, with the right structure.",
    overview: [
      "We help you choose and register the right structure, from proprietorship to private limited company, and get you MSME registered.",
      "Clear advice up front means fewer surprises later.",
    ],
    included: [
      { name: "Proprietorship Registration", desc: "Simple setup for solo businesses." },
      { name: "Partnership Firm Registration", desc: "Registration and deed support." },
      { name: "LLP Registration", desc: "Limited liability partnership setup." },
      { name: "Private Limited Company", desc: "Incorporation, from start to finish." },
      { name: "MSME (Udyam) Registration", desc: "Udyam registration for benefits and schemes." },
    ],
    faqs: [
      { q: "Which structure is right for me?", a: "We advise based on your goals, liability, and scale, then handle the registration." },
      { q: "How long does registration take?", a: "It varies by structure. We give you a clear timeline at the consultation." },
    ],
  },
  {
    slug: "legal",
    title: "Legal & Compliance",
    lead: "Stay compliant and protected, with the paperwork handled.",
    overview: [
      "From trademarks and digital signatures to professional tax and shop establishment, we handle the legal and statutory compliance that keeps your business in good standing.",
      "One point of contact for the details that are easy to miss.",
    ],
    included: [
      { name: "Trademark Registration", desc: "Protect your brand name and mark." },
      { name: "Digital Signature Certificate (DSC)", desc: "Issuance and renewal." },
      { name: "Professional Tax", desc: "Registration and periodic compliance." },
      { name: "Shop & Establishment Registration", desc: "Statutory registration for your premises." },
      { name: "Other Business Compliance", desc: "Ongoing statutory compliance support." },
    ],
    faqs: [
      { q: "Do you handle trademark registration?", a: "Yes, from search and application through to registration." },
      { q: "Can you get a Digital Signature Certificate?", a: "Yes. We handle DSC issuance and renewal." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
