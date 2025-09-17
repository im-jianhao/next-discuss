import CommentItem from "./CommentItem";
import { getCommentsTreeByPostId } from "@/prisma/queries/comment";

export default async function CommentList({ postId }: { postId: string }) {
  const comments = await getCommentsTreeByPostId(postId);
  
  // 计算总评论数（包括子评论）
  const countTotalComments = (comments: any[]): number => {
    return comments.reduce((total, comment) => {
      return total + 1 + countTotalComments(comment.children || []);
    }, 0);
  };
  
  const totalCount = countTotalComments(comments);
  
  return (
    <>
      <p className="my-3 text-lg font-bold">
        All {totalCount} comments ({comments.length} top-level)
      </p>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
}
