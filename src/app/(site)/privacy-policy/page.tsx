import { LegalDoc } from "@/components/legal-doc";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Privacy Policy",
  "How Patel Accounting & Legal Services collects, uses, and protects your personal data, in compliance with the DPDP Act, 2023 and the IT Act, 2000.",
  "/privacy-policy",
);

const UPDATED = "17 July 2026";

const CONTENT = `Patel Accounting & Legal Services ("we", "us", "our", "the Firm"), established in 2006 and operating from 4th Floor, Office No. 7, Vinod Chamber, Dariyapur Road, Dariyapur, Ahmedabad 380001, respects your privacy. This Privacy Policy explains what personal data we collect through this website, why we collect it, the legal basis on which we do so, and the rights you have over it. It is published in compliance with the Digital Personal Data Protection Act, 2023 ("DPDP Act") read with the Digital Personal Data Protection Rules, 2025, and Rule 4 of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 ("SPDI Rules") framed under the Information Technology Act, 2000.

This website is an information and enquiry website only. We do not operate user accounts, we do not take payments on this website, and we do not sell, rent, or trade your personal data to anyone.

## 1. What data we collect

We collect only what you choose to give us and a limited amount of technical data:

- **Enquiry-form data** — when you submit our contact/enquiry form, we collect your **name, phone number, email address, the service you are interested in, and the message** you write. Providing this data is voluntary, but it is necessary for us to respond to your enquiry.
- **Analytics and cookie data** — when you browse the site we, through standard analytics tools, may collect technical information such as your IP address, browser and device type, pages viewed, and time spent. This is explained fully in our [Cookie Policy](/cookie-policy).

We do not intentionally collect sensitive personal data (such as financial account details, health data, or biometric data) through this website. Please do not include such information in the free-text message field.

## 2. Why we collect it (purpose)

We use enquiry-form data only to:

- respond to your enquiry and provide the information or consultation you asked for;
- contact you about the accounting, bookkeeping, GST, income-tax, business-registration, or legal/compliance services you enquired about; and
- maintain a record of the enquiry for our own administrative and legal purposes.

We use analytics data only to understand how the site is used and to improve it. In keeping with the principle of purpose limitation under the DPDP Act, 2023, we will not use your data for any purpose other than the one for which you gave it without seeking your consent again.

## 3. Legal basis / consent

Our legal basis for processing your enquiry data is **your consent**, which you give by submitting the enquiry form after being shown this notice (as required under Sections 5 and 6 of the DPDP Act, 2023). Your consent is limited to the purposes set out in Section 2 above. For analytics cookies we rely on the consent you give through our cookie banner.

## 4. How long we keep it (retention)

We keep enquiry data only for as long as is necessary to deal with your enquiry and to meet our legitimate business and legal record-keeping needs, after which it is deleted or anonymised (consistent with the storage-limitation and erasure requirements of Section 8(7) of the DPDP Act, 2023). If you do not become a client and ask us to delete your enquiry, we will do so.

## 5. Who we share it with

We do **not** sell or trade your personal data. We share it only with:

- **staff and partners of the Firm** who need it to respond to you; and
- **service providers who operate this website and our email/analytics tools** on our behalf (for example, our website host, our transactional email provider, and our analytics provider), who are permitted to use the data only to provide those services to us.

We may also disclose data where we are required to do so by law, by a court, or by a government authority.

## 6. How we protect it (security)

We follow reasonable security practices and procedures to protect your data against unauthorised access, disclosure, or loss, as required under Section 43A of the IT Act, 2000 and Rule 8 of the SPDI Rules, 2011, and as required of a Data Fiduciary under Section 8(5) of the DPDP Act, 2023. No method of transmission over the internet is completely secure, but we take appropriate steps to safeguard the data we hold.

## 7. Your rights as a Data Principal

Under Chapter III of the DPDP Act, 2023 you have the right to:

- **access** a summary of the personal data we hold about you and how it is processed (Section 11);
- **correction and erasure** of your personal data that is inaccurate, incomplete, or no longer needed (Section 12);
- **grievance redressal** in respect of how we handle your data (Section 13); and
- **nominate** another individual to exercise your rights in the event of your death or incapacity (Section 14).

To exercise any of these rights, please contact our Grievance Officer using the details in Section 9.

## 8. How to withdraw consent

You may withdraw your consent at any time — for example, by emailing us and asking us to stop processing your data or to delete your enquiry, or by declining/clearing cookies through our cookie banner or your browser. Withdrawing consent is as easy as giving it (Section 6(4)–(6), DPDP Act, 2023). Withdrawal will not affect the lawfulness of processing done before you withdrew, and it may mean we can no longer respond to a pending enquiry.

## 9. Grievance Officer / contact for data protection

If you have any question, request, or complaint about your personal data, please contact our Grievance Officer (designated under Section 13 of the DPDP Act, 2023 and Rule 5(9) of the SPDI Rules, 2011):

- **Grievance Officer:** Mr. Saurabh H. Patel
- **Firm:** Patel Accounting & Legal Services
- **Address:** 4th Floor, Office No. 7, Vinod Chamber, Dariyapur Road, Dariyapur, Ahmedabad 380001, Gujarat, India
- **Email:** saurabhpateloffice2026@gmail.com
- **Phone:** 98254 42028

We will acknowledge and respond to your grievance within the timelines prescribed under applicable law. If you are not satisfied with our response, you may escalate the matter to the Data Protection Board of India under the DPDP Act, 2023.

## 10. Changes to this Policy

We may update this Privacy Policy from time to time. The current version, with its "Last updated" date, will always be available on this website. This Policy is governed by the laws of India, and any dispute relating to it is subject to the exclusive jurisdiction of the courts at Ahmedabad, Gujarat.`;

export default function PrivacyPolicyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      lead="How we collect, use, and protect your personal data — in line with India's Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000."
      updated={UPDATED}
      markdown={CONTENT}
    />
  );
}
