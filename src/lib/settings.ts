import { createClient } from "@/lib/supabase/server";

export type SiteSettings = {
  firm_name?: string | null;
  tagline?: string | null;
  phone?: string | null;
  alt_phone?: string | null;
  email?: string | null;
  address?: string | null;
  hours?: string | null;
  whatsapp?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  seo_default_description?: string | null;
  og_image_url?: string | null;
};

// site_settings is a single row (id=1). Returns {} gracefully if the table
// doesn't exist yet (before docs/admin-v2.sql is applied).
export async function getSettings(): Promise<SiteSettings> {
  const sb = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (sb as any).from("site_settings").select("*").eq("id", 1).maybeSingle();
  return (data ?? {}) as SiteSettings;
}
