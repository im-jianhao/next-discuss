"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

const CreatePostSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(5, { message: "Title must be less than 5 characters" })
    .regex(/^[a-zA-Z0-9]+$/, { message: "Title must be alphanumeric" }),
  content: z.string().min(1, { message: "Content is required" }).max(1000, { message: "Content must be less than 1000 characters" }),
});

// 定义一个清晰的状态类型，用于返回给客户端
export type State = {
  // errors?: ReturnType<typeof z.flattenError<typeof CreatePostSchema>>;
  errors?: z.ZodFlattenedError<z.infer<typeof CreatePostSchema>>;
  isSuccess: boolean;
  message: string;
};

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function createPostAction(topicId: string, prevState: State, formData: FormData) {
  // 验证是否登录
  const session = await auth();

  if (!session?.user) {
    return {
      isSuccess: false,
      message: "请先登录",
    };
  }

  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = CreatePostSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    return {
      isSuccess: false,
      errors: z.flattenError(validatedFields.error),
      message: "表单字段填写有误，无法创建帖子。",
    };
  }

  let post;
  try {
    // const topic = await prisma.topic.findUnique({
    //   where: {
    //     id: topicId,
    //   },
    // });
    post = await prisma.post.create({
      data: {
        title: validatedFields.data.title,
        content: validatedFields.data.content,
        userId: session.user.id!,
        topicId,
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
      message: "创建帖子失败",
    };
  } finally {
    if (post) {
      redirect(`/topic/${topicId}/post/${post.id}`);
    }
  }

  return {
    isSuccess: true,
    message: "创建帖子成功",
  };
}
