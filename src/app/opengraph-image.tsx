import { ImageResponse } from "next/og";
import { FIRM } from "@/lib/site";

// Default social share image, applied sitewide (Next merges this into every
// page's og:image / twitter:image unless a page sets its own images — e.g. an
// insight post with a cover). Rendered at build time; warm-monochrome brand.
export const alt = FIRM.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14120E",
          color: "#F5F2EA",
          padding: "76px 84px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C79A54" }}>
          Ahmedabad · Est. 2006
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 78, fontWeight: 600, lineHeight: 1.03, letterSpacing: "-0.02em" }}>
            {FIRM.name}
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#A79F8F", fontFamily: "sans-serif" }}>
            Accounting, tax, GST &amp; legal compliance — handled with clarity.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#A79F8F", fontFamily: "sans-serif", letterSpacing: "0.04em" }}>
          patelaccounting.in
        </div>
      </div>
    ),
    { ...size },
  );
}
