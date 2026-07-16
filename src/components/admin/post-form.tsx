"use client";

import type { ReactNode } from "react";
import { useActionState } from "react";
import Link from "next/link";
import type { FormState } from "@/app/admin/form-state";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Textarea } from "@/components/admin/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { ImageUpload } from "@/components/admin/image-upload";

export type PostDefaults = {
  id?: string;
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  body?: string;
  cover_url?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  published?: boolean;
  published_at?: string | null;
};

type Action = (prev: FormState, fd: FormData) => Promise<FormState>;
const dateVal = (iso?: string | null) => (iso ? iso.slice(0, 10) : "");

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}{required ? " *" : ""}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function PostForm({ action, defaults = {} }: { action: Action; defaults?: PostDefaults }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, null);

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-6">
      {defaults.id && <input type="hidden" name="id" value={defaults.id} />}

      <Card>
        <CardHeader><CardTitle>Content</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Field label="Title" required>
            <Input name="title" defaultValue={defaults.title} required />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Slug" hint="Leave blank to auto-generate from the title">
              <Input name="slug" defaultValue={defaults.slug} placeholder="gst-return-due-dates" />
            </Field>
            <Field label="Category">
              <Input name="category" defaultValue={defaults.category ?? "General"} />
            </Field>
          </div>
          <Field label="Excerpt" required hint="Shown in listings and search results">
            <Textarea name="excerpt" defaultValue={defaults.excerpt} className="min-h-20" required />
          </Field>
          <Field label="Body" required>
            <RichTextEditor name="body" defaultHTML={defaults.body} />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Publishing &amp; SEO</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="published" defaultChecked={defaults.published} className="size-4 accent-current" />
            Published (visible on the site)
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Published date">
              <Input type="date" name="published_at" defaultValue={dateVal(defaults.published_at)} />
            </Field>
            <Field label="Cover image">
              <ImageUpload name="cover_url" defaultUrl={defaults.cover_url ?? ""} folder="posts" />
            </Field>
          </div>
          <Field label="SEO title">
            <Input name="seo_title" defaultValue={defaults.seo_title ?? ""} />
          </Field>
          <Field label="SEO description">
            <Textarea name="seo_description" defaultValue={defaults.seo_description ?? ""} className="min-h-16" />
          </Field>
        </CardContent>
      </Card>

      {state?.error && (
        <p role="alert" className="rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive-foreground">{state.error}</p>
      )}
      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Save post"}</Button>
        <Button asChild variant="outline"><Link href="/admin/posts">Cancel</Link></Button>
      </div>
    </form>
  );
}
