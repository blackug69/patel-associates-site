"use client";

import { useActionState } from "react";
import { submitEnquiry, type ContactState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
          <Label htmlFor="f-name">Name</Label>
          <Input id="f-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="field">
          <Label htmlFor="f-phone">Phone</Label>
          <Input id="f-phone" name="phone" type="tel" autoComplete="tel" required />
        </div>
      </div>
      <div className="field">
        <Label htmlFor="f-email">Email <span className="opt">(optional)</span></Label>
        <Input id="f-email" name="email" type="email" autoComplete="email" />
      </div>
      <div className="field">
        <Label htmlFor="f-service">Service</Label>
        <Select name="service">
          <SelectTrigger id="f-service">
            <SelectValue placeholder="Select a service…" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_OPTIONS.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="field">
        <Label htmlFor="f-message">Message</Label>
        <Textarea id="f-message" name="message" rows={4} required />
      </div>
      <div className="hp" aria-hidden>
        <label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <Button variant="default" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send enquiry"}
        {!pending && <span className="arrow" aria-hidden>↗</span>}
      </Button>
      {state.status === "error" && state.message && (
        <p className="form-note err" role="status" aria-live="polite">{state.message}</p>
      )}
    </form>
  );
}
