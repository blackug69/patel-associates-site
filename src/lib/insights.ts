export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string; // display string, e.g. "15 June 2026"
  excerpt: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "gst-return-due-dates",
    title: "GST return due dates you shouldn't miss",
    category: "GST",
    date: "15 June 2026",
    excerpt:
      "A quick, practical calendar of the GST filings most businesses need to track, and what late filing actually costs you.",
    body: [
      "Missing a GST due date rarely feels urgent until the late fee and interest show up. For most regular taxpayers the rhythm is monthly: GSTR-1 for outward supplies, followed by GSTR-3B for the summary return and payment. Businesses under the QRMP scheme file quarterly but still pay monthly.",
      "The annual return, GSTR-9, is a separate deadline that catches people out because it arrives long after the monthly routine has become habit. Reconciling it against your books before filing avoids notices later.",
      "Our advice is simple: put every due date on a shared calendar, reconcile before you file rather than after, and never treat a return as filed until the acknowledgement is in hand. If a deadline has already slipped, file as soon as possible — the fee accrues per day.",
    ],
  },
  {
    slug: "llp-vs-private-limited",
    title: "LLP vs Private Limited: choosing the right structure",
    category: "Business Registration",
    date: "28 May 2026",
    excerpt:
      "Both give you limited liability. The right choice comes down to how you plan to raise money, share ownership, and handle compliance.",
    body: [
      "A Limited Liability Partnership and a Private Limited Company both protect your personal assets, but they suit different ambitions. An LLP is lighter to run: fewer compliance filings, no mandatory audit until you cross turnover or contribution thresholds, and profit-sharing defined simply in the LLP agreement.",
      "A Private Limited Company is the structure investors expect. If you intend to raise external capital, issue shares to a team, or eventually scale toward funding rounds, the company form makes that clean and familiar. The trade-off is heavier compliance — board meetings, statutory registers, and annual filings with the Registrar.",
      "There is no universally correct answer. We usually ask three questions: will you take on outside investment, how many owners will there be, and how much compliance overhead are you willing to carry. The answers point clearly to one structure — and we handle the registration either way.",
    ],
  },
  {
    slug: "income-tax-notice",
    title: "What to do when an income-tax notice arrives",
    category: "Income Tax",
    date: "10 May 2026",
    excerpt:
      "A notice is not an accusation. Most are routine, and calm, timely, accurate responses close them without drama.",
    body: [
      "The first thing to know about an income-tax notice is that receiving one is common and usually procedural. Notices are issued for mismatches, missing information, refund verification, or simple confirmation — not necessarily because anything is wrong.",
      "Read the notice carefully for the section it is issued under and the deadline to respond. The section tells you what the department is asking; the deadline is real and should not be missed. Gather the relevant returns, statements, and supporting documents before drafting a response.",
      "Where clients get into trouble is by ignoring the notice or replying in a hurry without documentation. We review the notice, prepare a complete and accurate response, and represent you through to resolution so a routine query stays routine.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
