"use client";

import { PostWithUserAndCount } from "@/prisma/queries/posts";
import { Avatar } from "@heroui/react";

export default function PostList({ posts }: { posts: PostWithUserAndCount[] }) {
  return (
    <div className="space-y-5">
      {posts.map((post) => (
        <div className="border border-gray-200 rounded-md p-4 flex flex-row gap-2 items-center">
          {post.user.image ? <Avatar src={post.user.image} size="sm" /> : null}
          <div>
            <h2 className="text-lg font-bold">{post.title}</h2>
            <div className="flex flex-row gap-2">
              <div>
                <span className="text-gray-500 font-bold">创建人：</span>
                <span className="text-gray-500">{post.user.name}</span>
              </div>
              <div>
                <span className="text-gray-500 font-bold">评论数量：</span>
                <span className="text-gray-500">{post._count.comments}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
