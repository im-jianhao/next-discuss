"use client";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@heroui/react";
import { useSession } from "next-auth/react";
import { signOutAction } from "@/actions/auth";

export default function UserAvatar() {
  const { data: session } = useSession();
  if (!session?.user) return null;
  
  const handleSignOut = async () => {
    await signOutAction();
  };
  
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar src={session.user.image || ""} alt="User Avatar" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
