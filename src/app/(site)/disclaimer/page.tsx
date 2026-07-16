import { LegalDoc } from "@/components/legal-doc";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Disclaimer",
  "Important notice on the information-only, no-solicitation nature of the Patel Accounting & Legal Services website.",
  "/disclaimer",
);

const UPDATED = "17 July 2026";

const CONTENT = `This Disclaimer governs your use of the website of Patel Accounting & Legal Services ("the Firm"). By continuing to access and use this website, you confirm that you have read, understood, and accepted the terms below. If you do not accept them, please do not use this website.

## 1. No solicitation and information only

The rules of the Institute of Chartered Accountants of India (ICAI) and the Bar Council of India (Rule 36 of the Bar Council of India Rules) do not permit chartered accountants or advocates to solicit work or advertise. This website is therefore **not intended to be, and must not be construed as, any form of advertisement, solicitation, invitation, or inducement** to seek professional engagement.

By accessing this website, you acknowledge and agree that:

- you are seeking information about the Firm **of your own accord and initiative**, and there has been no advertisement, personal communication, solicitation, invitation, or inducement of any kind by the Firm or its members to solicit any work through this website;
- the information provided here is made available **only at your request and for your general understanding**; and
- the Firm is not liable for any consequence of any action taken by you in reliance on the content of this website.

## 2. No professional advice and no professional relationship

The content of this website is for **general information only and does not constitute professional, accounting, tax, financial, or legal advice**, nor an opinion on any specific matter. Every situation is different, and the law and tax rules change frequently. You should not rely on any content here as a substitute for professional advice tailored to your circumstances, and you should always consult a qualified professional before acting.

**Nothing on this website creates a chartered-accountant–client or advocate–client relationship** between you and the Firm or any of its members. Such a relationship is created only upon a formal, written engagement between you and the Firm.

## 3. Accuracy of information

While the Firm takes reasonable care to ensure that the information on this website is accurate and current, it makes **no representation or warranty, express or implied, as to its completeness, accuracy, reliability, or timeliness**. Laws, notifications, rates, and procedures relating to accounting, GST, income tax, business registration, and compliance change over time, and content on this website may not reflect the most recent position. The Firm disclaims all liability for any loss or damage arising from reliance on any content of this website.

## 4. External links

This website may contain links to third-party websites. These links are provided for convenience only. The Firm does not control, endorse, or take responsibility for the content, products, services, or privacy practices of any third-party website, and accepts no liability for them. You access such websites at your own risk.

## 5. Governing law and jurisdiction

This Disclaimer is governed by the laws of India. Any dispute arising out of or in connection with this website or this Disclaimer is subject to the **exclusive jurisdiction of the courts at Ahmedabad, Gujarat, India**.

For any clarification, contact the Firm at saurabhpateloffice2026@gmail.com or 98254 42028, or at 4th Floor, Office No. 7, Vinod Chamber, Dariyapur Road, Dariyapur, Ahmedabad 380001.`;

export default function DisclaimerPage() {
  return (
    <LegalDoc
      title="Disclaimer"
      lead="An important notice on the information-only, no-solicitation nature of this website."
      updated={UPDATED}
      markdown={CONTENT}
    />
  );
}
