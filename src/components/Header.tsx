"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Input } from "@heroui/react";
import { useSession } from "next-auth/react";
import UserAvatar from "./UserAvatar";
import SignInButton from "./SignInButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

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

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)" stroke="#000000" {...props}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default function Header() {
  const router = useRouter();
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

  // 搜索框的搜索功能
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  useEffect(() => {
    setSearchQuery(searchParams.get("searchQuery") || "");
  }, [searchParams]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?searchQuery=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <Navbar
      classNames={{
        brand: "cursor-pointer",
      }}
    >
      <NavbarBrand
        onClick={() => {
          router.push("/");
        }}
      >
        <AcmeLogo />
        <p className="font-bold text-inherit">DISCUSS</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<SearchIcon className="mb-0.5 dark:text-white/90  pointer-events-none shrink-0" />}
            onKeyDown={handleKeyDown}
          />
        </NavbarItem>
      </NavbarContent>
      {/* <NavbarContent justify="center">
        <NavbarItem>
          
        </NavbarItem>
      </NavbarContent> */}
      <NavbarContent justify="end">
        <ThemeSwitcher />
        {authContent}
      </NavbarContent>
    </Navbar>
  );
}
