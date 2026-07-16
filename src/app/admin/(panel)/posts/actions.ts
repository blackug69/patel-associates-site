"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createClient } from "@/lib/supabase/server";
import type { FormState } from "@/app/admin/form-state";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

function isEmptyHtml(h: string) {
  return h.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim() === "";
}

function revalidatePost(slug: string) {
  revalidatePath("/insights");
  revalidatePath(`/insights/${slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/posts");
}

function read(fd: FormData) {
  const published = fd.get("published") === "on";
  const pa = String(fd.get("published_at") || "").trim();
  return {
    title: String(fd.get("title") ?? "").trim(),
    slug: String(fd.get("slug") ?? "").trim(),
    category: String(fd.get("category") ?? "").trim() || "General",
    excerpt: String(fd.get("excerpt") ?? "").trim(),
    body: String(fd.get("body") ?? "").trim(),
    cover_url: String(fd.get("cover_url") || "").trim() || null,
    seo_title: String(fd.get("seo_title") || "").trim() || null,
    seo_description: String(fd.get("seo_description") || "").trim() || null,
    published,
    published_at: pa ? new Date(pa).toISOString() : published ? new Date().toISOString() : null,
  };
}

export async function createPost(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const f = read(fd);
  if (!f.title || !f.excerpt || isEmptyHtml(f.body)) return { error: "Title, excerpt, and body are required." };
  const slug = f.slug || slugify(f.title);
  const supabase = await createClient();
  const { error } = await supabase.from("posts").insert({ ...f, slug });
  if (error) return { error: error.message };
  revalidatePost(slug);
  redirect("/admin/posts");
}

export async function updatePost(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = String(fd.get("id") ?? "");
  if (!id) return { error: "Missing post id." };
  const f = read(fd);
  if (!f.title || !f.excerpt || isEmptyHtml(f.body)) return { error: "Title, excerpt, and body are required." };
  const slug = f.slug || slugify(f.title);
  const supabase = await createClient();
  const { error } = await supabase.from("posts").update({ ...f, slug }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePost(slug);
  redirect("/admin/posts");
}

export async function deletePost(fd: FormData) {
  await requireAdmin();
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("posts").delete().eq("id", id);
  revalidatePath("/insights");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/posts");
}
