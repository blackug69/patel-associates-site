import { LegalDoc } from "@/components/legal-doc";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Cookie Policy",
  "How the Patel Accounting & Legal Services website uses cookies and how you can control them.",
  "/cookie-policy",
);

const UPDATED = "17 July 2026";

const CONTENT = `This Cookie Policy explains how the website of Patel Accounting & Legal Services ("we", "us", "our") uses cookies and similar technologies, and how you can control them. It should be read together with our [Privacy Policy](/privacy-policy). Where cookies involve your personal data, we handle it in line with the Digital Personal Data Protection Act, 2023 and rely on your consent.

## 1. What cookies are

Cookies are small text files placed on your device when you visit a website. They let a site remember your actions and preferences and help the site owner understand how the site is used. Similar technologies (such as pixels and local storage) work in comparable ways; where we say "cookies" we mean all of them.

## 2. Categories of cookies we use

- **Strictly necessary cookies** — needed for the website to function (for example, to keep the site secure and to remember your cookie choices). These do not require consent and cannot be switched off through our banner.
- **Analytics/performance cookies** — set by us or our analytics provider to collect aggregated, mostly anonymised information about how visitors use the site (pages viewed, time on page, approximate location from IP, device/browser type). We use this only to measure and improve the site.

We do **not** use cookies to take payments, to run user accounts, or to sell your data, and we do not knowingly use cross-site advertising or profiling cookies.

## 3. Purpose

Necessary cookies keep the site working and secure. Analytics cookies help us understand which content is useful and how to improve the experience. We do not use cookie data to make any decision that affects you individually.

## 4. Consent

When you first visit the site you will see a cookie banner. **Non-essential (analytics) cookies are set only after you give consent**, in line with the consent requirements of the DPDP Act, 2023. You can accept or decline, and you can change your choice at any time (see Section 5). Declining will not stop you from using the informational parts of the site.

## 5. How to control or disable cookies

You can control cookies in two ways:

- **Through our cookie banner** — accept or decline non-essential cookies, and revisit your choice at any time.
- **Through your browser** — most browsers let you block or delete cookies in their settings. Note that blocking strictly necessary cookies may stop parts of the site from working correctly.

You may also opt out of specific analytics tools using any opt-out mechanism the provider offers. Withdrawing cookie consent is a form of withdrawing consent under our Privacy Policy.

## 6. Contact

Questions about this Cookie Policy can be sent to our Grievance Officer, Mr. Saurabh H. Patel, at saurabhpateloffice2026@gmail.com or 98254 42028. This Policy is governed by the laws of India, with the courts at Ahmedabad, Gujarat having exclusive jurisdiction.

## 7. Changes to this Policy

We may update this Cookie Policy as our use of cookies changes or as the law develops. The current version, with its "Last updated" date, will always be available on this website.`;

export default function CookiePolicyPage() {
  return (
    <LegalDoc
      title="Cookie Policy"
      lead="What cookies this site uses, why, and how you can control them."
      updated={UPDATED}
      markdown={CONTENT}
    />
  );
}
