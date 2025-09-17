"use client";

import { createCommentAction } from "@/actions/create-comment";
import { Form, Textarea, Chip, Button } from "@heroui/react";
import { useActionState, useState, useEffect } from "react";

export default function CreateComment({ postId, showReplyButton = true, parentId }: { postId: string; showReplyButton?: boolean; parentId?: string }) {
  const [content, setContent] = useState("");
  const [isReply, setIsReply] = useState(!showReplyButton);
  const [state, formAction, isPending] = useActionState(createCommentAction.bind(null, { postId, parentId }), {
    message: "",
    isSuccess: true,
  });

  // 当成功创建评论后重置表单
  useEffect(() => {
    if (state.isSuccess && state.message === "创建评论成功") {
      setContent(""); // 清空 Textarea 的值
    }
  }, [state.isSuccess, state.message]);

  return (
    <div className="mt-2">
      {showReplyButton && (
        <Button color="primary" variant="flat" size="sm" onPress={() => setIsReply(!isReply)}>
          Reply
        </Button>
      )}
      {isReply && (
        <Form action={formAction} className="mt-2 flex flex-col gap-2 w-full" validationBehavior="aria">
          <Textarea
            className="max-w-xs"
            label="Reply"
            placeholder="Enter your reply"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            isInvalid={!!state.errors?.fieldErrors?.content}
            size="sm"
            variant="bordered"
            errorMessage={state.errors?.fieldErrors?.content?.join(",")}
          />
          {!state.isSuccess ? (
            <Chip size="sm" color="warning">
              {state.message}
            </Chip>
          ) : null}
          <Button type="submit" color="primary" variant="bordered" isLoading={isPending}>
            {isPending ? "Loading..." : "Create Comment"}
          </Button>
        </Form>
      )}
    </div>
  );
}
