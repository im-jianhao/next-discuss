"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

const CreateTopicSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(5, { message: "Title must be less than 5 characters" })
    .regex(/^[a-zA-Z0-9]+$/, { message: "Title must be alphanumeric" }),
  description: z.string().min(1, { message: "Description is required" }).max(1000, { message: "Description must be less than 1000 characters" }),
});

// 定义一个清晰的状态类型，用于返回给客户端
export type State = {
  errors?: ReturnType<typeof z.flattenError<typeof CreateTopicSchema>>;
  isSuccess: boolean;
  message: string;
};

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function createTopicAction(prevState: State, formData: FormData) {
  // 验证是否登录
  const session = await auth();
  console.log(session?.user);

  if (!session?.user) {
    return {
      isSuccess: false,
      message: "请先登录",
    };
  }

  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = CreateTopicSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    // {
    //   formErrors: [],
    //   fieldErrors: {
    //     title: [ 'Title must be less than 5 characters' ],
    //     description: [ 'Description is required' ]
    //   }
    // }
    return {
      isSuccess: false,
      errors: z.flattenError(validatedFields.error),
      message: "表单字段填写有误，无法创建话题。",
    };
  }

  let topic;
  try {
    topic = await prisma.topic.create({
      data: {
        name: validatedFields.data.title,
        description: validatedFields.data.description,
        userId: session.user.id!,
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
      message: "创建话题失败",
    };
  } finally {
    if (topic) {
      redirect(`/topic/${topic.id}`);
    }
  }

  return {
    isSuccess: true,
    message: "创建话题成功",
  };
}
