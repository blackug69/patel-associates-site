import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/admin/ui/button";
import { PostsTable, type PostRow } from "@/components/admin/posts-table";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("id,title,category,published,updated_at")
    .order("updated_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Insights</h1>
          <p className="text-sm text-muted-foreground">Your blog articles — drafts and published.</p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new"><Plus className="h-4 w-4" /> New post</Link>
        </Button>
      </div>
      <PostsTable posts={(data ?? []) as PostRow[]} />
    </div>
  );
}
