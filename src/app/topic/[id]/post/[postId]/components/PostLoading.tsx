"use client";

import { Skeleton } from "@heroui/react";

export default function PostLoading() {
  return (
    <>
      <div className="w-full">
        <Skeleton className="my-6 w-20 h-12 rounded-lg" />
        <Skeleton className="my-6 w-full h-8 rounded" />
      </div>
      <div>{/* <CommentList comments={post?.comments} /> */}</div>
    </>
  );
}
