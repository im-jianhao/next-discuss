import { getPostById } from "@/prisma/queries/posts";
import { notFound } from "next/navigation";

export default async function Post({ postId }: { postId: string }) {
  const post = await getPostById(postId);
  if (!post) {
    return notFound();
  }
  return (
    <>
      <div className="w-full">
        <h3 className="text-2xl font-bold my-6">{post?.title}</h3>
        <div className="border border-gray-200 rounded-md p-4">{post?.content}</div>
      </div>
      <div>{/* <CommentList comments={post?.comments} /> */}</div>
    </>
  );
}
