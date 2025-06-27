"use client";

import Link from "next/link";

import {
  PlusIcon,
  LayoutDashboardIcon,
  HomeIcon,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
} from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";

const navItems = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
  { label: "List Startup", href: "/startup/list", icon: PlusIcon },
];

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-4 w-full bg-background/80 border-b-2  backdrop-blur-sm sticky top-0 z-50">
      <Link href="/" className="flex gap-2 items-center">
        <Logo />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden gap-3 items-center font-medium md:flex">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Button
            key={label}
            variant="outline"
            asChild
          >
            <Link href={href}>
              <Icon className="size-5" /> {label}
            </Link>
          </Button>
        ))}
      </div>

      {/* Desktop User/Auth */}
      <div className="hidden gap-3 items-center md:flex">
        {user ? (
          <div className="flex gap-3 items-center">
            <Avatar className="w-8 h-8 text-base font-bold bg-secondary text-secondary-foreground">
              {user.name ? user.name[0] : "U"}
            </Avatar>
            <span className="font-medium text-primary-foreground max-w-[120px] truncate">
              {user.name || "User"}
            </span>
            <button
              onClick={async () => {
                const { supabase } = await import("@/lib/supabase/client");
                await supabase.auth.signOut();
                window.location.href = "/auth/login";
              }}
              className="flex gap-1 items-center px-3 py-2 text-sm bg-white rounded border transition border-secondary text-primary hover:bg-secondary/10"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        ) : (
          <>
            <Link href="/auth/login">
              <Button
                variant="outline"
                className="flex gap-2 bg-white border-secondary text-primary hover:bg-secondary/10"
                aria-label="Login"
              >
                <LogIn className="w-5 h-5" /> Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                variant="default"
                className="flex gap-2 text-white bg-secondary hover:bg-secondary/90"
                aria-label="Register"
              >
                <UserPlus className="w-5 h-5" /> Register
              </Button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="flex items-center md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="w-7 h-7 text-secondary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {navItems.map(({ label, href, icon: Icon }) => (
              <DropdownMenuItem asChild key={label}>
                <Link href={href} className="flex gap-2 items-center">
                  <Icon className="w-5 h-5" /> {label}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            {user ? (
              <>
                <DropdownMenuItem asChild>
                  <span className="flex gap-2 items-center">
                    <Avatar className="w-7 h-7 text-base font-bold bg-secondary text-secondary-foreground">
                      {user.name ? user.name[0] : "U"}
                    </Avatar>
                    <span className="font-medium text-primary-foreground max-w-[120px] truncate">
                      {user.name || "User"}
                    </span>
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    const { supabase } = await import("@/lib/supabase/client");
                    await supabase.auth.signOut();
                    window.location.href = "/auth/login";
                  }}
                  className="text-destructive"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/auth/login" className="flex gap-2 items-center">
                    <LogIn className="w-5 h-5" /> Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/signup" className="flex gap-2 items-center">
                    <UserPlus className="w-5 h-5" /> Register
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
