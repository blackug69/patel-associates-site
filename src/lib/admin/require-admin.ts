import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Server-side admin guard. Call at the TOP of every admin server action — the
// proxy/middleware does NOT protect Server Actions invoked directly, so this is
// the real boundary (alongside RLS).
//
// Enforces authenticated AND membership in the `admins` allowlist (via the
// is_admin() SQL function from docs/admin-hardening.sql), so it matches the
// DB-level RLS. This is the real boundary — the proxy does not protect actions.
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  // is_admin() isn't in the generated types; cast at this trusted boundary.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: isAdmin } = await (supabase as any).rpc("is_admin");
  if (!isAdmin) redirect("/admin/login");

  return user;
}
