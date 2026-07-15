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
  const { data: post } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (!post) notFound();

  return (
    <>
      <h1 className="admin__title">Edit post</h1>
      <PostForm action={updatePost} defaults={post} />
    </>
  );
}
