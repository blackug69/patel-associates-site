import { createClient } from "@/lib/supabase/server";
import { updateLeadStatus, deleteLead } from "./actions";

export const dynamic = "force-dynamic";

const STATUSES = ["new", "contacted", "closed"];

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function LeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <h1 className="admin__title">Leads</h1>
      <p className="admin__lead">Enquiries from the website contact form. Newest first.</p>

      {!leads || leads.length === 0 ? (
        <p>No leads yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="admin__table">
            <thead>
              <tr>
                <th>Received</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Service</th>
                <th>Message</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td>{fmt(l.created_at)}</td>
                  <td>{l.name}</td>
                  <td>
                    <a href={`tel:${l.phone}`}>{l.phone}</a>
                    {l.email && (
                      <>
                        <br />
                        <a href={`mailto:${l.email}`}>{l.email}</a>
                      </>
                    )}
                  </td>
                  <td>{l.service ?? "—"}</td>
                  <td style={{ maxWidth: "28ch" }}>{l.message}</td>
                  <td>
                    <form action={updateLeadStatus} className="admin__actions">
                      <input type="hidden" name="id" value={l.id} />
                      <select name="status" defaultValue={l.status} aria-label="Status">
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button className="admin-btn admin-btn--ghost" type="submit">Save</button>
                    </form>
                  </td>
                  <td>
                    <form action={deleteLead}>
                      <input type="hidden" name="id" value={l.id} />
                      <button className="admin-btn admin-btn--danger" type="submit">Delete</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
