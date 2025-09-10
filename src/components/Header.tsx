"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Input } from "@heroui/react";
import { useSession } from "next-auth/react";
import UserAvatar from "./UserAvatar";
import SignInButton from "./SignInButton";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Header() {
  const { data: session, status } = useSession();
  let authContent;
  if (status === "loading") {
    authContent = <div>Loading...</div>;
  } else if (session?.user) {
    authContent = (
      <NavbarItem>
        <UserAvatar />
      </NavbarItem>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <SignInButton />
        </NavbarItem>
      </>
    );
  }
  return (
    <Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">DISCUSS</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Input type="email" />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">{authContent}</NavbarContent>
    </Navbar>
  );
}
