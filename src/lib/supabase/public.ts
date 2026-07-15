import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Public, cookie-less client for reading published content in Server Components.
// Because it never touches cookies(), pages using it stay statically
// prerenderable (+ ISR) rather than being forced dynamic. Subject to RLS:
// only `published = true` rows are visible with the anon key.
export function createPublicClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}
