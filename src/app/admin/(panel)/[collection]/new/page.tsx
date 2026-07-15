import { notFound } from "next/navigation";
import { getCollection } from "@/lib/admin/collections";
import { CollectionForm } from "@/components/admin/collection-form";
import { saveCollection } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewCollectionItemPage(
  { params }: { params: Promise<{ collection: string }> },
) {
  const { collection } = await params;
  const coll = getCollection(collection);
  if (!coll) notFound();

  return (
    <>
      <h1 className="admin__title">New {coll.singular.toLowerCase()}</h1>
      <CollectionForm collection={coll} action={saveCollection} />
    </>
  );
}
