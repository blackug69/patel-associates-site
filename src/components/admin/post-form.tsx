"use client";

import type { ReactNode } from "react";
import { useActionState, useState } from "react";
import Link from "next/link";
import type { FormState } from "@/app/admin/form-state";
import { PostBodyEditor } from "@/components/admin/post-body-editor";
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

  // Mirror the content fields into state purely to drive the live preview.
  // Inputs stay uncontrolled (defaultValue) — the form still submits normally.
  const [title, setTitle] = useState(defaults.title ?? "");
  const [category, setCategory] = useState(defaults.category ?? "General");
  const [excerpt, setExcerpt] = useState(defaults.excerpt ?? "");
  const [body, setBody] = useState(defaults.body ?? "");
  const [cover, setCover] = useState(defaults.cover_url ?? "");

  const safeBody = body.replace(/<\/script/gi, "&lt;/script");

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,44rem)_minmax(0,1fr)]">
      <form action={formAction} className="flex min-w-0 flex-col gap-6">
        {defaults.id && <input type="hidden" name="id" value={defaults.id} />}

        <Card>
          <CardHeader><CardTitle>Content</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Field label="Title" required>
              <Input name="title" defaultValue={defaults.title} onChange={(e) => setTitle(e.target.value)} required />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Slug" hint="Leave blank to auto-generate from the title">
                <Input name="slug" defaultValue={defaults.slug} placeholder="gst-return-due-dates" />
              </Field>
              <Field label="Category">
                <Input name="category" defaultValue={defaults.category ?? "General"} onChange={(e) => setCategory(e.target.value)} />
              </Field>
            </div>
            <Field label="Excerpt" required hint="Shown in listings and search results">
              <Textarea name="excerpt" defaultValue={defaults.excerpt} onChange={(e) => setExcerpt(e.target.value)} className="min-h-20" required />
            </Field>
            <Field label="Body" required>
              <PostBodyEditor name="body" defaultHTML={defaults.body} onHTMLChange={setBody} />
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
                <ImageUpload name="cover_url" defaultUrl={defaults.cover_url ?? ""} folder="posts" onChange={setCover} />
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

      {/* Live preview — reflects the public article look (always light) as you
          type. Desktop-only; the form is the source of truth on narrow screens. */}
      <aside className="hidden min-w-0 xl:block">
        <div className="sticky top-6 flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Live preview</p>
          <div className="admin-post-preview">
            {cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover} alt="" className="admin-post-preview__cover" />
            )}
            <div className="admin-post-preview__body">
              <p className="admin-post-preview__eyebrow">{category || "General"}</p>
              <h1>{title || "Untitled post"}</h1>
              {excerpt && <p className="admin-post-preview__lead">{excerpt}</p>}
              {safeBody.trim() ? (
                <div className="admin-post-preview__content" dangerouslySetInnerHTML={{ __html: safeBody }} />
              ) : (
                <p className="admin-post-preview__empty">Start writing the body to see it here…</p>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
