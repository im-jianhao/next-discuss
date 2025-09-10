import CreatePostButton from "@/components/post/CreatePostButton";
import PostList from "@/components/post/PostList";
import { getPostsByTopicId } from "@/prisma/queries/posts";

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const posts = await getPostsByTopicId(id);

  return (
    <div className="mx-auto px-6 max-w-[1024px]">
      <div className="flex w-full flex-row relative flex-nowrap items-center justify-between">
        <h3>Top Posts {id}</h3>
        <CreatePostButton topicId={id} />
      </div>
      <PostList posts={posts} />
    </div>
  );
}
