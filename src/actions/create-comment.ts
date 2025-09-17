"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

const CreateCommentSchema = z.object({
  content: z.string().min(1, { message: "Content is required" }).max(1000, { message: "Content must be less than 1000 characters" }),
});

// 定义一个清晰的状态类型，用于返回给客户端
export type State = {
  errors?: z.ZodFlattenedError<z.infer<typeof CreateCommentSchema>>;
  isSuccess: boolean;
  message: string;
};

export async function createCommentAction({ postId, parentId }: { postId: string; parentId?: string }, prevState: State, formData: FormData) {
  // 验证是否登录
  const session = await auth();

  if (!session?.user) {
    return {
      isSuccess: false,
      message: "请先登录",
    };
  }

  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = CreateCommentSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    return {
      isSuccess: false,
      errors: z.flattenError(validatedFields.error),
      message: "表单字段填写有误，无法创建评论。",
    };
  }

  let comment;
  try {
    comment = await prisma.comment.create({
      data: {
        content: validatedFields.data.content,
        userId: session.user.id!,
        postId,
        parentId,
      },
    });
  } catch (error) {
    // if(isRedirectError(error)) throw error;
    console.error(error);
    if (error instanceof Error) {
      return {
        isSuccess: false,
        message: error.message,
      };
    }
    return {
      isSuccess: false,
      message: "创建评论失败",
    };
  }
  // 根据postId查询帖子的id
  const topic = await prisma.topic.findFirst({
    where: {
      posts: {
        some: { id: postId },
      },
    },
  });
  if (!topic) {
    return {
      isSuccess: false,
      message: "帖子不存在",
    };
  }
  revalidatePath(`/topic/${topic.id}/post/${postId}`);
  return {
    isSuccess: true,
    message: "创建评论成功",
  };
}
