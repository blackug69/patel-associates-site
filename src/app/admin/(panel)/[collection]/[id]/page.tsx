import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCollection } from "@/lib/admin/collections";
import { CollectionForm } from "@/components/admin/collection-form";
import { saveCollection } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditCollectionItemPage(
  { params }: { params: Promise<{ collection: string; id: string }> },
) {
  const { collection, id } = await params;
  const coll = getCollection(collection);
  if (!coll) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb: any = await createClient();
  const { data } = await sb.from(coll.table).select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Edit {coll.singular.toLowerCase()}</h1>
      <CollectionForm collection={coll} action={saveCollection} defaults={data as Record<string, unknown>} />
    </div>
  );
}
