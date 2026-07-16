import { LegalDoc } from "@/components/legal-doc";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Terms & Conditions",
  "The terms governing your use of the Patel Accounting & Legal Services website.",
  "/terms",
);

const UPDATED = "17 July 2026";

const CONTENT = `These Terms of Use ("Terms") govern your access to and use of the website of Patel Accounting & Legal Services ("we", "us", "our", "the Firm"), a firm based at 4th Floor, Office No. 7, Vinod Chamber, Dariyapur Road, Dariyapur, Ahmedabad 380001. By accessing or using this website you agree to these Terms. If you do not agree, please do not use the website.

## 1. Use of this website

This website is provided for general information about the Firm and the accounting, bookkeeping, GST, income-tax, business-registration, and legal/compliance services we offer. You may use it for lawful, personal, and informational purposes only. You must not misuse the site, attempt to gain unauthorised access to it, disrupt it, or use it in any way that breaches applicable law.

## 2. Information only — no professional advice

The content on this website is provided for **general information only and does not constitute professional, financial, tax, accounting, or legal advice**. It is not a substitute for advice tailored to your specific circumstances. You should not act, or refrain from acting, on the basis of any content here without obtaining professional advice from a qualified professional. Please also read our [Disclaimer](/disclaimer), which forms part of these Terms.

## 3. No solicitation and no professional relationship

In keeping with the Council Guidelines and Code of Ethics of the Institute of Chartered Accountants of India (ICAI) and Rule 36 of the Bar Council of India Rules, this website is **not an advertisement, solicitation, invitation, or inducement** of any kind to create a professional relationship. By accessing this website you acknowledge that you are doing so of your own accord and that there has been no solicitation of any kind by the Firm. **Browsing this website, or contacting us through it, does not by itself create any chartered-accountant–client or advocate–client relationship, nor any duty of care**, between you and the Firm. Such a relationship arises only when we expressly agree in writing to act for you.

## 4. Intellectual property

All content on this website — including text, layout, design, graphics, logos, and the Firm's name — is owned by or licensed to the Firm and is protected under the Copyright Act, 1957 and other applicable laws. You may view and print content for your own personal, non-commercial use, but you must not copy, reproduce, republish, or distribute it for any other purpose without our prior written consent.

## 5. Third-party links

This website may contain links to third-party websites for your convenience. We do not control and are not responsible for the content, accuracy, or privacy practices of those websites, and a link does not imply endorsement. You access third-party websites at your own risk and subject to their own terms.

## 6. Limitation of liability

While we take reasonable care to keep the information on this website accurate and up to date, we make no warranty that it is complete, current, or error-free. To the fullest extent permitted by law, the Firm shall not be liable for any loss or damage — direct, indirect, incidental, or consequential — arising from your use of, or reliance on, this website or its content, or from its temporary unavailability.

## 7. Contact

For any query about these Terms, contact us at saurabhpateloffice2026@gmail.com or 98254 42028, or write to us at the address above.

## 8. Governing law and jurisdiction

These Terms are governed by and construed in accordance with the laws of India. Any dispute arising out of or relating to this website or these Terms is subject to the **exclusive jurisdiction of the courts at Ahmedabad, Gujarat, India**.

## 9. Changes to these Terms

We may revise these Terms from time to time. The revised version will be posted on this website with an updated "Last updated" date, and your continued use of the website after that constitutes acceptance of the revised Terms.`;

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms & Conditions"
      lead="The terms on which this website is made available. Please read them together with our Privacy Policy and Disclaimer."
      updated={UPDATED}
      markdown={CONTENT}
    />
  );
}
