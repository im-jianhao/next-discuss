"use client";

import { createTopicAction } from "@/actions/create-topic";
import { Button, Chip, Form, Input, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useActionState } from "react";

export default function CreateTopicButton() {
  const [state, formAction, isPending] = useActionState(createTopicAction, {
    message: "",
    isSuccess: true,
  });

  console.log(state);

  return (
    <Popover showArrow backdrop="opaque" offset={10} placement="bottom">
      <PopoverTrigger>
        <Button type="submit" color="primary" variant="bordered">
          Create Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        <div className="px-1 py-2 w-full">
          <p className="text-small font-bold text-foreground">Create a Topic</p>
          <Form action={formAction} className="mt-2 flex flex-col gap-2 w-full" validationBehavior="aria">
            <Input name="title" isInvalid={!!state.errors?.fieldErrors?.title} label="Title" size="sm" variant="bordered" errorMessage={state.errors?.fieldErrors?.title?.join(",")} />
            <Input
              name="description"
              isInvalid={!!state.errors?.fieldErrors?.description}
              label="Description"
              size="sm"
              variant="bordered"
              errorMessage={state.errors?.fieldErrors?.description?.join(",")}
            />
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
