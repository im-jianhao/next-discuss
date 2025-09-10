import { prisma } from "@/prisma";
import TopicListItem from "./TopicListItem";

export default async function TopicList() {
  const topics = await prisma.topic.findMany({
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });
  return (
    <div className="border border-gray-200 rounded-md p-4 w-1/3 ml-auto space-y-5">
      {topics.map((topic) => (
        <TopicListItem key={topic.id} topic={topic} />
      ))}
    </div>
  );
}
