"use server";

import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

const OFFICE_EMAIL = "saurabhpateloffice2026@gmail.com";

// Where the lead notification is delivered. Uses Resend when RESEND_API_KEY is
// configured; otherwise the enquiry is logged server-side so the demo flow still
// works end-to-end without a mail provider.
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<"name" | "phone" | "email" | "service" | "message", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d+\-\s()]{7,20}$/;

function field(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function submitEnquiry(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = field(formData, "name");
  const phone = field(formData, "phone");
  const email = field(formData, "email");
  const service = field(formData, "service");
  const message = field(formData, "message");

  // Honeypot: real users leave this empty; bots tend to fill every field.
  if (field(formData, "company")) {
    return { status: "success", message: "Thank you. We'll be in touch shortly." };
  }

  const errors: NonNullable<ContactState["errors"]> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!PHONE_RE.test(phone)) errors.phone = "Please enter a valid phone number.";
  if (email && !EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  if (message.length < 5) errors.message = "Please add a short message.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      errors,
    };
  }

  const summary = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    email && `Email: ${email}`,
    service && `Service: ${service}`,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  // Persist the lead first — this is the durable source of truth. If the DB
  // write fails, tell the user (rather than silently losing the enquiry).
  const supabase = await createClient();
  const { error: insertError } = await supabase.from("leads").insert({
    name,
    phone,
    email: email || null,
    service: service || null,
    message,
  });
  if (insertError) {
    console.error("Failed to save enquiry:", insertError);
    return {
      status: "error",
      message: "Something went wrong saving your message. Please call us instead.",
    };
  }

  // Best-effort email notification. The lead is already saved, so an email
  // failure must not fail the submission — just log it.
  try {
    if (resend) {
      await resend.emails.send({
        from: "Patel Website <onboarding@resend.dev>",
        to: OFFICE_EMAIL,
        replyTo: email || undefined,
        subject: `New enquiry from ${name}${service ? ` — ${service}` : ""}`,
        text: summary,
      });
    } else {
      // No mail provider configured (e.g. local/demo). Log the notification.
      console.info("[contact enquiry]\n" + summary);
    }
  } catch (err) {
    console.error("Failed to send enquiry email (lead was saved):", err);
  }

  return {
    status: "success",
    message: "Thank you. Your enquiry has been received — we'll be in touch shortly.",
  };
}
