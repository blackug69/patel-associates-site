"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createClient } from "@/lib/supabase/server";

export type SettingsState = { ok?: boolean; error?: string } | null;

const FIELDS = [
  "firm_name", "tagline", "phone", "alt_phone", "email", "address", "hours",
  "whatsapp", "facebook", "instagram", "linkedin",
  "seo_default_description", "og_image_url",
];

export async function updateSettings(_prev: SettingsState, fd: FormData): Promise<SettingsState> {
  await requireAdmin();
  const row: Record<string, unknown> = { id: 1 };
  for (const f of FIELDS) row[f] = String(fd.get(f) ?? "").trim() || null;

  const sb = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (sb as any).from("site_settings").upsert(row);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
  return { ok: true };
}
