"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { FormState } from "@/app/admin/(panel)/posts/actions";

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

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

// yyyy-mm-dd for <input type="date">
function dateValue(iso?: string | null) {
  return iso ? iso.slice(0, 10) : "";
}

export function PostForm({ action, defaults = {} }: { action: Action; defaults?: PostDefaults }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, null);

  return (
    <form action={formAction} className="admin__form">
      {defaults.id && <input type="hidden" name="id" value={defaults.id} />}

      <label className="admin-field">
        <span>Title *</span>
        <input name="title" defaultValue={defaults.title} required />
      </label>

      <div className="admin__row">
        <label className="admin-field" style={{ flex: 1 }}>
          <span>Slug (leave blank to auto-generate)</span>
          <input name="slug" defaultValue={defaults.slug} placeholder="gst-return-due-dates" />
        </label>
        <label className="admin-field" style={{ flex: 1 }}>
          <span>Category</span>
          <input name="category" defaultValue={defaults.category ?? "General"} />
        </label>
      </div>

      <label className="admin-field">
        <span>Excerpt * (shown in listings and meta description)</span>
        <textarea name="excerpt" defaultValue={defaults.excerpt} style={{ minHeight: 80 }} required />
      </label>

      <label className="admin-field">
        <span>Body * (Markdown)</span>
        <textarea name="body" defaultValue={defaults.body} required />
      </label>

      <label className="admin-field">
        <span>Cover image URL (optional)</span>
        <input name="cover_url" defaultValue={defaults.cover_url ?? ""} placeholder="https://…" />
      </label>

      <div className="admin__row">
        <label className="admin-field" style={{ flex: 1 }}>
          <span>SEO title (optional)</span>
          <input name="seo_title" defaultValue={defaults.seo_title ?? ""} />
        </label>
        <label className="admin-field" style={{ flex: 1 }}>
          <span>Published date</span>
          <input name="published_at" type="date" defaultValue={dateValue(defaults.published_at)} />
        </label>
      </div>

      <label className="admin-field">
        <span>SEO description (optional)</span>
        <textarea name="seo_description" defaultValue={defaults.seo_description ?? ""} style={{ minHeight: 60 }} />
      </label>

      <label className="admin__actions">
        <input type="checkbox" name="published" defaultChecked={defaults.published} />
        <span>Published (visible on the site)</span>
      </label>

      {state?.error && <p className="admin-error" role="alert">{state.error}</p>}

      <div className="admin__actions">
        <button type="submit" className="admin-btn" disabled={pending}>
          {pending ? "Saving…" : "Save post"}
        </button>
        <Link href="/admin/posts" className="admin-btn admin-btn--ghost">Cancel</Link>
      </div>
    </form>
  );
}
