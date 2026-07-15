import { PostForm } from "@/components/admin/post-form";
import { createPost } from "../actions";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <>
      <h1 className="admin__title">New post</h1>
      <PostForm action={createPost} />
    </>
  );
}
