"use client";

import { useActionState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { submitEnquiry, type ContactState } from "@/app/actions";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle", message: "" };

const serviceOptions = [
  "Accounting & Bookkeeping",
  "GST Services",
  "Income Tax Services",
  "Business Registration",
  "Legal & Compliance",
  "Other / Not sure",
];

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  if (state.status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 border border-line bg-paper p-10 text-center">
        <span className="flex size-12 items-center justify-center border border-pine text-pine">
          <CheckCircle2 className="size-6" />
        </span>
        <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
          Enquiry received
        </h3>
        <p className="max-w-sm text-[0.95rem] leading-7 text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="border border-line bg-paper" noValidate>
      <div className="border-b border-line px-6 py-5">
        <p className="eyebrow text-muted">Send an Enquiry</p>
        <p className="mt-1.5 text-[0.95rem] leading-6 text-ink">
          Share a few details and the office will get back to you.
        </p>
      </div>

      <div className="grid gap-5 p-6">
        <Field label="Name" name="name" error={state.errors?.name}>
          <input
            id="name"
            type="text"
            name="name"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Your full name"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone" name="phone" error={state.errors?.phone}>
            <input
              id="phone"
              type="tel"
              name="phone"
              required
              autoComplete="tel"
              className={inputClass}
              placeholder="98254 42028"
            />
          </Field>
          <Field label="Email" name="email" optional error={state.errors?.email}>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              className={inputClass}
              placeholder="you@example.com"
            />
          </Field>
        </div>

        <Field label="Service" name="service" optional>
          <select id="service" name="service" className={cn(inputClass, "appearance-none")} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Message" name="message" error={state.errors?.message}>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className={cn(inputClass, "resize-none")}
            placeholder="How can we help?"
          />
        </Field>

        {/* Honeypot — hidden from users, catches bots */}
        <div aria-hidden className="hidden">
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {state.status === "error" && state.message && (
          <p className="text-sm text-ink" role="alert" aria-live="polite">
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="group mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-none bg-pine px-7 text-[0.95rem] font-semibold tracking-tight text-paper transition-all duration-300 hover:bg-pine-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send Enquiry"}
          {!pending && (
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-none border border-line-strong bg-paper px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-muted/70 transition-colors focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink";

function Field({
  label,
  name,
  optional,
  error,
  children,
}: {
  label: string;
  name: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="eyebrow flex items-center gap-2 text-[0.62rem] text-muted"
      >
        {label}
        {optional && <span className="text-[0.58rem] normal-case tracking-normal">(optional)</span>}
      </label>
      {children}
      {error && <span className="text-xs text-ink/80">{error}</span>}
    </div>
  );
}
