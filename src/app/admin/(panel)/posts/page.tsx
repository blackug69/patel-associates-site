import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deletePost } from "./actions";

export const dynamic = "force-dynamic";

export default async function PostsAdminPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id,title,category,published,published_at,slug")
    .order("published_at", { ascending: false });

  return (
    <>
      <div className="admin__bar">
        <h1 className="admin__title">Insights</h1>
        <Link href="/admin/posts/new" className="admin-btn">New post</Link>
      </div>

      {!posts || posts.length === 0 ? (
        <p>No posts yet. <Link href="/admin/posts/new">Write the first one</Link>.</p>
      ) : (
        <table className="admin__table">
          <thead>
            <tr><th>Title</th><th>Category</th><th>Status</th><th aria-label="Actions" /></tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td><Link href={`/admin/posts/${p.id}`}>{p.title}</Link></td>
                <td>{p.category}</td>
                <td>{p.published ? "Published" : "Draft"}</td>
                <td>
                  <div className="admin__actions">
                    <Link href={`/admin/posts/${p.id}`} className="admin-btn admin-btn--ghost">Edit</Link>
                    <form action={deletePost}>
                      <input type="hidden" name="id" value={p.id} />
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
