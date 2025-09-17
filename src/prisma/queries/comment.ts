import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

const commentWithUserArgs = Prisma.validator<Prisma.CommentDefaultArgs>()({
  include: {
    user: {
      select: { name: true, image: true },
    },
  },
});

export type CommentWithUser = Prisma.CommentGetPayload<typeof commentWithUserArgs>;

// 扩展类型以包含children
export type CommentWithUserAndChildren = CommentWithUser & {
  children: CommentWithUserAndChildren[];
};

export const getCommentsByPostId = async (postId: string) => {
  return await prisma.comment.findMany({
    include: {
      user: {
        select: { name: true, image: true },
      },
    },
    where: {
      postId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
};

// 优化的树形结构构建函数
export const getCommentsTreeByPostId = async (postId: string): Promise<CommentWithUserAndChildren[]> => {
  const allComments = await getCommentsByPostId(postId);
  
  // 构建树形结构 - 性能优化版本
  const commentMap = new Map<string, CommentWithUserAndChildren>();
  const rootComments: CommentWithUserAndChildren[] = [];

  // 第一遍：初始化所有评论
  allComments.forEach(comment => {
    commentMap.set(comment.id, { ...comment, children: [] });
  });

  // 第二遍：构建父子关系
  allComments.forEach(comment => {
    const commentWithChildren = commentMap.get(comment.id)!;
    
    if (comment.parentId) {
      const parent = commentMap.get(comment.parentId);
      if (parent) {
        parent.children.push(commentWithChildren);
      }
    } else {
      rootComments.push(commentWithChildren);
    }
  });

  return rootComments;
};
