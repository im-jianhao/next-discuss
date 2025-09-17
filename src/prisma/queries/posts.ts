import { prisma } from "@/prisma";
// import type { Prisma } from "@prisma/client";
import { Prisma } from "@prisma/client";

const postWithUserAndCountArgs = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: {
    user: {
      select: { name: true, image: true },
    },
    _count: {
      select: {
        comments: true,
      },
    },
  },
});

export type PostWithUserAndCount = Prisma.PostGetPayload<typeof postWithUserAndCountArgs>;

export async function getPostsByTopicId(topicId: string) {
  return await prisma.post.findMany({
    include: {
      user: {
        select: { name: true },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    where: {
      topicId,
    },
  });
}

export async function getPosts() {
  return await prisma.post.findMany({
    include: {
      user: {
        select: { name: true, image: true },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      comments: {
        _count: "desc",
      },
    },
    take: 5,
  });
}

export async function getPostById(id: string) {
  return await prisma.post.findUnique({
    where: { id },
  });
}

/**
 * 查询帖子的标题或者名称是否有包含查询条件的字符串
 * @param searchQuery 查询条件
 * @returns 查询结果
 */
export async function getPostsBySearchQuery(searchQuery: string) {
  return await prisma.post.findMany({
    include: {
      user: {
        select: { name: true, image: true },
      },
      topic: {
        select: { name: true },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    where: {
      OR: [{ title: { contains: searchQuery } }, { content: { contains: searchQuery } }],
    },
  });
}
