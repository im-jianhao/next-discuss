import { Suspense } from "react";
import Post from "./components/Post";
import PostLoading from "./components/PostLoading";
import CreateComment from "./components/CreateComment";
import CommentList from "./components/CommentList";

export default async function PostDetailPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;

  return (
    <div className="mx-auto px-6 max-w-[1024px]">
      <Suspense fallback={<PostLoading />}>
        <Post postId={postId} />
      </Suspense>
      <CreateComment postId={postId} showReplyButton={false} />
      <CommentList postId={postId} />
    </div>
  );
}
