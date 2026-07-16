import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Server-side admin guard. Call at the TOP of every admin server action — the
// proxy/middleware does NOT protect Server Actions invoked directly, so this is
// the real boundary (alongside RLS).
//
// Today it enforces "must be an authenticated user". After docs/admin-hardening.sql
// is applied (adds the `admins` allowlist + is_admin()), uncomment the is_admin
// check below to enforce the allowlist as well (defense-in-depth).
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  // const { data: isAdmin } = await supabase.rpc("is_admin");
  // if (!isAdmin) redirect("/admin/login");

  return user;
}
