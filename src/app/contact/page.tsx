import type { Metadata } from "next";
import Link from "next/link";
import { PatelContactForm } from "@/components/patel-contact-form";

export const metadata: Metadata = {
  title: "Contact · Patel Accounting & Legal Services",
  description: "Contact Patel Accounting & Legal Services, Ahmedabad. Call, WhatsApp, email, or send an enquiry.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb reveal"><Link href="/">Home</Link> / Contact</p>
          <p className="eyebrow reveal">Contact</p>
          <h1 className="reveal">Need professional assistance?</h1>
          <p className="page-hero__lead reveal">Get in touch to schedule a consultation. We look forward to helping you manage your accounting and taxation with confidence.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact__grid">
          <div className="contact__intro reveal">
            <p className="eyebrow">Reach us</p>
            <h2 className="h-display">We are here to help.</h2>
            <ul className="contact__details">
              <li><span className="contact__k">Office</span><span>4th Floor, Office No. 7, Vinod Chamber, Dariyapur Road, Dariyapur, Ahmedabad 380001</span></li>
              <li><span className="contact__k">Call</span><a href="tel:+919825442028">98254 42028</a>, <a href="tel:+918980413939">89804 13939</a></li>
              <li><span className="contact__k">WhatsApp</span><a href="https://wa.me/919825442028">Message us</a></li>
              <li><span className="contact__k">Email</span><a href="mailto:saurabhpateloffice2026@gmail.com">saurabhpateloffice2026@gmail.com</a></li>
              <li><span className="contact__k">Hours</span><span>Mon to Sat · 10:00 to 19:00</span></li>
            </ul>
          </div>
          <PatelContactForm />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="frame map-ph media-ph reveal" role="img" aria-label="Map placeholder">
            <span className="tag">Google Map</span>
            <span className="note">Embed a Google Maps iframe of the Vinod Chamber, Dariyapur office here.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
