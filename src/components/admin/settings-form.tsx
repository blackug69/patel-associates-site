"use client";

import type { ReactNode } from "react";
import { useActionState } from "react";
import type { SettingsState } from "@/app/admin/(panel)/settings/actions";
import type { SiteSettings } from "@/lib/settings";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Textarea } from "@/components/admin/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { ImageUpload } from "@/components/admin/image-upload";

type Action = (prev: SettingsState, fd: FormData) => Promise<SettingsState>;
const v = (x?: string | null) => x ?? "";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export function SettingsForm({ action, defaults }: { action: Action; defaults: SiteSettings }) {
  const [state, formAction, pending] = useActionState<SettingsState, FormData>(action, null);
  const d = defaults;

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-6">
      <Card>
        <CardHeader><CardTitle>Firm profile</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Firm name"><Input name="firm_name" defaultValue={v(d.firm_name)} /></Field>
          <Field label="Tagline"><Input name="tagline" defaultValue={v(d.tagline)} /></Field>
          <Field label="Phone"><Input name="phone" defaultValue={v(d.phone)} /></Field>
          <Field label="Alternate phone"><Input name="alt_phone" defaultValue={v(d.alt_phone)} /></Field>
          <Field label="Email"><Input name="email" type="email" defaultValue={v(d.email)} /></Field>
          <Field label="Business hours"><Input name="hours" defaultValue={v(d.hours)} /></Field>
          <div className="sm:col-span-2">
            <Field label="Address"><Textarea name="address" defaultValue={v(d.address)} className="min-h-16" /></Field>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Social &amp; WhatsApp</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="WhatsApp number"><Input name="whatsapp" defaultValue={v(d.whatsapp)} placeholder="919825442028" /></Field>
          <Field label="Facebook URL"><Input name="facebook" defaultValue={v(d.facebook)} /></Field>
          <Field label="Instagram URL"><Input name="instagram" defaultValue={v(d.instagram)} /></Field>
          <Field label="LinkedIn URL"><Input name="linkedin" defaultValue={v(d.linkedin)} /></Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>SEO defaults</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Field label="Default meta description">
            <Textarea name="seo_default_description" defaultValue={v(d.seo_default_description)} className="min-h-16" />
          </Field>
          <Field label="Default social share image (OG)">
            <ImageUpload name="og_image_url" defaultUrl={v(d.og_image_url)} folder="settings" />
          </Field>
        </CardContent>
      </Card>

      {state?.error && (
        <p role="alert" className="rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive-foreground">{state.error}</p>
      )}
      {state?.ok && <p className="text-sm text-success">Saved ✓</p>}
      <div>
        <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Save settings"}</Button>
      </div>
    </form>
  );
}
