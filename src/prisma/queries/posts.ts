import { prisma } from "@/prisma";
import type { Prisma } from "@prisma/client";

export type PostWithUserAndCount = Prisma.PostGetPayload<{
  include: {
    user: {
      select: { name: true; image: true };
    };
    _count: {
      select: {
        comments: true;
      };
    };
  };
}>;

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
