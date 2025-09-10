"use client";

import { Badge, Chip } from "@heroui/react";
import { Topic } from "@prisma/client";
import type { Prisma } from "@prisma/client"; // 工具类型
import Link from "next/link";

interface TopicListItemProps {
  topic: Prisma.TopicGetPayload<{
    include: {
      _count: {
        select: {
          posts: true;
        };
      };
    };
  }>;
}
export default function TopicListItem({ topic }: TopicListItemProps) {
  return (
    <Link href={`/topic/${topic.id}`} className="inline-block">
      <Badge
        color="danger"
        content={topic._count.posts}
        classNames={{
          base: "ml-2",
        }}
      >
        <Chip variant="shadow" key={topic.id}>
          {topic.name}
        </Chip>
      </Badge>
    </Link>
  );
}
