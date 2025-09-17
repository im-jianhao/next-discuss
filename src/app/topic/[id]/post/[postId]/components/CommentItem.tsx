"use client";

import { CommentWithUserAndChildren } from "@/prisma/queries/comment";
import { Avatar } from "@heroui/react";
import CreateComment from "./CreateComment";

interface CommentItemProps {
  comment: CommentWithUserAndChildren;
  depth?: number;
}

export default function CommentItem({ comment, depth = 0 }: CommentItemProps) {
  const maxDepth = 3; // 限制最大嵌套深度
  const shouldShowReply = depth < maxDepth;
  
  return (
    <div className={`border border-gray-200 rounded-md p-4 mt-4 ${depth > 0 ? `ml-${Math.min(depth * 4, 12)}` : ''}`}>
      <div className="flex flex-row gap-2">
        <Avatar src={comment.user.image || undefined} size={depth > 0 ? "sm" : "md"} />
        <div className="flex-1">
          <p className="font-medium">{comment.user.name}</p>
          <p className="text-gray-600 mt-1">{comment.content}</p>
          <p className="text-xs text-gray-400 mt-2">
            {comment.createdAt.toLocaleDateString()}
          </p>
          
          {/* 只在不超过最大深度时显示回复按钮 */}
          {shouldShowReply && (
            <CreateComment postId={comment.postId} parentId={comment.id} />
          )}
        </div>
      </div>
      
      {/* 递归渲染子评论 */}
      {comment.children && comment.children.length > 0 && (
        <div className="mt-2">
          {comment.children.map((child) => (
            <CommentItem 
              key={child.id} 
              comment={child} 
              depth={depth + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

