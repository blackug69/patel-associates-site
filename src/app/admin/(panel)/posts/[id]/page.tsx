import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PostForm } from "@/components/admin/post-form";
import { updatePost } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditPostPage(
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Edit post</h1>
      <PostForm action={updatePost} defaults={data} />
    </div>
  );
}
