import PostList from "@/components/post/PostList";
import { getPostsBySearchQuery } from "@/prisma/queries/posts";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ searchQuery: string }> }) {
  const { searchQuery } = await searchParams;

  const decodedName = decodeURIComponent(searchQuery);

  const posts = await getPostsBySearchQuery(decodedName);

  console.log(posts);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">搜索结果</h1>
      <p className="mb-4">
        搜索词：<span className="font-semibold">{decodedName}</span>
      </p>
      <PostList posts={posts} />
    </div>
  );
}
