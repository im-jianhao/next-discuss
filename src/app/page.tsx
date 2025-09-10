import PostList from "@/components/post/PostList";
import CreateTopicButton from "@/components/topic/CreateTopicButton";
import TopicList from "@/components/topic/TopicList";
import { getPosts } from "@/prisma/queries/posts";

export default async function Page() {
  const posts = await getPosts();

  return (
    <div className="mx-auto px-6 max-w-[1024px]">
      <div className="flex w-full flex-row relative flex-nowrap items-center justify-between">
        <h3>Top Posts</h3>
        <CreateTopicButton />
      </div>
      <div className="flex flex-row gap-2 mt-5">
        <PostList posts={posts} />
        <TopicList />
      </div>
    </div>
  );
}
