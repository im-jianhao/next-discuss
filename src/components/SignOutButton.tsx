"use client";

import { Button } from "@heroui/react";
import { signOutAction } from "@/actions/auth";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <Button type="submit" color="danger" variant="flat">
        Sign out
      </Button>
    </form>
  );
}
