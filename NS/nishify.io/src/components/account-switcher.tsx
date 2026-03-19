"use client";

import { BadgeCheck, Bell, CreditCard, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { useSession } from "@/hooks/use-session";

export function AccountSwitcher({}: {
  readonly users: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly username: string;
    readonly avatar: string;
    readonly role: string;
  }>;
}) {
  const { session, logout } = useSession();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-9 rounded-lg border">
            <AvatarImage
              src={session?.user?.avatar || undefined}
              alt={session?.user?.name}
            />
            <AvatarFallback className="rounded-lg">
              {getInitials(session?.user?.name)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-56 space-y-1 rounded-lg"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuItem key={session?.user?.email}>
            <div className="flex w-full items-center justify-between gap-2 px-1 py-1.5">
              <Avatar className="size-9 rounded-lg">
                <AvatarImage
                  src={session?.user?.avatar || undefined}
                  alt={session?.user?.name}
                />
                <AvatarFallback className="rounded-lg">
                  {getInitials(session?.user?.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {session?.user?.name}
                </span>
                <span className="truncate text-xs capitalize">
                  {session?.user?.role}
                </span>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="hidden" />
          <DropdownMenuGroup className="hidden">
            <DropdownMenuItem>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleLogout()}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
