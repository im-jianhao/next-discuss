"use client";

import { createPostAction } from "@/actions/create-post";
import { Button, Chip, Form, Input, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useActionState } from "react";

export default function CreatePostButton({ topicId }: { topicId: string }) {
  const [state, formAction, isPending] = useActionState(createPostAction.bind(null, topicId), {
    message: "",
    isSuccess: true,
  });

  return (
    <Popover showArrow backdrop="opaque" offset={10} placement="bottom">
      <PopoverTrigger>
        <Button type="submit" color="primary" variant="bordered">
          Create Post
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        <div className="px-1 py-2 w-full">
          <p className="text-small font-bold text-foreground">Create a Post</p>
          <Form action={formAction} className="mt-2 flex flex-col gap-2 w-full" validationBehavior="aria">
            <Input name="title" isInvalid={!!state.errors?.fieldErrors?.title} label="Title" size="sm" variant="bordered" errorMessage={state.errors?.fieldErrors?.title?.join(",")} />
            <Input name="content" isInvalid={!!state.errors?.fieldErrors?.content} label="Content" size="sm" variant="bordered" errorMessage={state.errors?.fieldErrors?.content?.join(",")} />
            {!state.isSuccess ? (
              <Chip size="sm" color="warning">
                {state.message}
              </Chip>
            ) : null}
            <Button type="submit" color="primary" variant="bordered" isLoading={isPending}>
              {isPending ? "正在提交..." : "提交"}
            </Button>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
