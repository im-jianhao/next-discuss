"use client";

import { Button } from "@heroui/react";
import { signInWithGithub } from "@/actions/auth";

export default function SignInButton() {
  return (
    <form action={signInWithGithub}>
      <Button type="submit" color="primary" variant="bordered">
        Sign in with GitHub
      </Button>
    </form>
  );
}
