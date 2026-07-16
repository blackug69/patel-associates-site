import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link className="nav__logo" href="/">PATEL</Link>
            <p>Accounting &amp; legal services in Ahmedabad since 2006. Your success. Our commitment.</p>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><Link href="/services/accounting">Accounting</Link></li>
              <li><Link href="/services/gst">GST</Link></li>
              <li><Link href="/services/income-tax">Income Tax</Link></li>
              <li><Link href="/services/registration">Registration</Link></li>
              <li><Link href="/services/legal">Legal &amp; Compliance</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/#about">About</Link></li>
              <li><Link href="/team">Team</Link></li>
              <li><Link href="/results">Results</Link></li>
              <li><Link href="/insights">Insights</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <address className="footer__nap">
              4th Floor, Office No. 7, Vinod Chamber,<br />
              Dariyapur Road, Ahmedabad 380001<br />
              <a href="tel:+919825442028">98254 42028</a> &middot; <a href="tel:+918980413939">89804 13939</a><br />
              <a href="mailto:saurabhpateloffice2026@gmail.com">saurabhpateloffice2026@gmail.com</a><br />
              Mon to Sat &middot; 10:00 to 19:00
            </address>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Patel Accounting &amp; Legal Services.</span>
          <span className="footer__legal">
            <Link href="/privacy-policy">Privacy</Link> &middot;{" "}
            <Link href="/terms">Terms</Link> &middot;{" "}
            <Link href="/cookie-policy">Cookies</Link> &middot;{" "}
            <Link href="/disclaimer">Disclaimer</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
