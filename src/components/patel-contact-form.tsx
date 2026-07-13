"use client";

import { useActionState } from "react";
import { submitEnquiry, type ContactState } from "@/app/actions";
import { Button } from "@/components/ui/button";

const initialState: ContactState = { status: "idle", message: "" };

const SERVICE_OPTIONS = [
  "Accounting Services",
  "GST Services",
  "Income Tax Services",
  "Business Registration",
  "Legal & Compliance",
  "Something else",
];

export function PatelContactForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  if (state.status === "success") {
    return (
      <div className="form-success reveal">
        <h3>Enquiry received</h3>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form className="contact-form reveal" action={formAction} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor="f-name">Name</label>
          <input id="f-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="f-phone">Phone</label>
          <input id="f-phone" name="phone" type="tel" autoComplete="tel" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-email">Email <span className="opt">(optional)</span></label>
        <input id="f-email" name="email" type="email" autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="f-service">Service</label>
        <select id="f-service" name="service" defaultValue="">
          <option value="">Select a service…</option>
          {SERVICE_OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-message">Message</label>
        <textarea id="f-message" name="message" rows={4} required />
      </div>
      <div className="hp" aria-hidden>
        <label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <Button variant="primary" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send enquiry"}
        {!pending && <span className="arrow" aria-hidden>↗</span>}
      </Button>
      {state.status === "error" && state.message && (
        <p className="form-note err" role="status" aria-live="polite">{state.message}</p>
      )}
    </form>
  );
}
