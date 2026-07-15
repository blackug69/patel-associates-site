"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type FormState = { error: string } | null;

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function revalidatePosts(slug: string) {
  revalidatePath("/insights");
  revalidatePath(`/insights/${slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/posts");
}

function readFields(formData: FormData) {
  const published = formData.get("published") === "on";
  const publishedAt = String(formData.get("published_at") || "").trim();
  return {
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim() || "General",
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    cover_url: String(formData.get("cover_url") || "").trim() || null,
    seo_title: String(formData.get("seo_title") || "").trim() || null,
    seo_description: String(formData.get("seo_description") || "").trim() || null,
    published,
    published_at: publishedAt
      ? new Date(publishedAt).toISOString()
      : published
        ? new Date().toISOString()
        : null,
  };
}

export async function createPost(_prev: FormState, formData: FormData): Promise<FormState> {
  const f = readFields(formData);
  if (!f.title || !f.body || !f.excerpt) return { error: "Title, excerpt, and body are required." };
  const slug = f.slug || slugify(f.title);
  const supabase = await createClient();
  const { error } = await supabase.from("posts").insert({ ...f, slug });
  if (error) return { error: error.message };
  revalidatePosts(slug);
  redirect("/admin/posts");
}

export async function updatePost(_prev: FormState, formData: FormData): Promise<FormState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing post id." };
  const f = readFields(formData);
  if (!f.title || !f.body || !f.excerpt) return { error: "Title, excerpt, and body are required." };
  const slug = f.slug || slugify(f.title);
  const supabase = await createClient();
  const { error } = await supabase.from("posts").update({ ...f, slug }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePosts(slug);
  redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("posts").delete().eq("id", id);
  revalidatePath("/insights");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/posts");
}
