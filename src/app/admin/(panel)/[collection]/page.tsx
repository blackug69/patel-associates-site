import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCollection } from "@/lib/admin/collections";
import { deleteCollection } from "./actions";

export const dynamic = "force-dynamic";

function cell(v: unknown) {
  if (typeof v === "boolean") return v ? "Yes" : "No";
  return v == null || v === "" ? "—" : String(v);
}

export default async function CollectionListPage(
  { params }: { params: Promise<{ collection: string }> },
) {
  const { collection } = await params;
  const coll = getCollection(collection);
  if (!coll) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb: any = await createClient();
  const { data } = await sb
    .from(coll.table)
    .select("*")
    .order(coll.order.column, { ascending: coll.order.ascending });
  const rows = (data ?? []) as Record<string, unknown>[];

  return (
    <>
      <div className="admin__bar">
        <h1 className="admin__title">{coll.plural}</h1>
        <Link href={`/admin/${coll.key}/new`} className="admin-btn">
          New {coll.singular.toLowerCase()}
        </Link>
      </div>

      {rows.length === 0 ? (
        <p>No {coll.plural.toLowerCase()} yet.</p>
      ) : (
        <table className="admin__table">
          <thead>
            <tr>
              {coll.listColumns.map((c) => <th key={c}>{c.replace(/_/g, " ")}</th>)}
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={String(r.id)}>
                {coll.listColumns.map((c) => <td key={c}>{cell(r[c])}</td>)}
                <td>
                  <div className="admin__actions">
                    <Link href={`/admin/${coll.key}/${r.id}`} className="admin-btn admin-btn--ghost">Edit</Link>
                    <form action={deleteCollection}>
                      <input type="hidden" name="__collection" value={coll.key} />
                      <input type="hidden" name="__id" value={String(r.id)} />
                      <button type="submit" className="admin-btn admin-btn--danger">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
