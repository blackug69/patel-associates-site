import { PostForm } from "@/components/admin/post-form";
import { createPost } from "../actions";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">New post</h1>
      <PostForm action={createPost} />
    </div>
  );
}
