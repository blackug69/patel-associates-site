import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCollection } from "@/lib/admin/collections";
import { Button } from "@/components/admin/ui/button";
import { CollectionTable } from "@/components/admin/collection-table";

export const dynamic = "force-dynamic";

export default async function CollectionListPage(
  { params }: { params: Promise<{ collection: string }> },
) {
  const { collection } = await params;
  const coll = getCollection(collection);
  if (!coll) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb: any = await createClient();
  const { data } = await sb.from(coll.table).select("*").order(coll.order.column, { ascending: coll.order.ascending });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">{coll.plural}</h1>
        <Button asChild>
          <Link href={`/admin/${coll.key}/new`}><Plus className="h-4 w-4" /> New {coll.singular.toLowerCase()}</Link>
        </Button>
      </div>
      <CollectionTable collection={coll} rows={(data ?? []) as Record<string, unknown>[]} />
    </div>
  );
}
