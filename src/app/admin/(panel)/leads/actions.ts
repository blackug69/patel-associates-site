"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createClient } from "@/lib/supabase/server";

const STATUSES = ["new", "contacted", "closed"] as const;

export async function updateLeadStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !STATUSES.includes(status as (typeof STATUSES)[number])) return;
  const supabase = await createClient();
  await supabase.from("leads").update({ status }).eq("id", id);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function deleteLead(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("leads").delete().eq("id", id);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
