import { createClient } from "@/lib/supabase/server";
import { LeadsTable, type Lead } from "@/components/admin/leads-table";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("leads")
    .select("id,name,phone,email,service,message,status,created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
        <p className="text-sm text-muted-foreground">
          Enquiries from the website contact form. Set a status to track follow-up.
        </p>
      </div>
      <LeadsTable leads={(data ?? []) as Lead[]} />
    </div>
  );
}
