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
import { supabase } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
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

export function Navbar() {
  const { user } = useAuth();

  return (
    <div className="w-full bg-background/80 border-b-2  backdrop-blur-sm sticky top-0 z-50">
      <nav className="flex container mx-auto justify-between items-center px-6 py-4">
        <Link href="/" className="flex gap-2 items-center">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden gap-3 items-center font-medium md:flex">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Button key={label} variant="outline" asChild>
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
              <Avatar className="size-10 bg-secondary items-center justify-center font-bold text-secondary-foreground">
                {user.name ? user.name[0] : "U"}
              </Avatar>

              <span className="text-foreground max-w-[120px] truncate font-semibold">
                {user.name || "User"}
              </span>

              <Button
                variant="outline"
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = "/auth/login";
                }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
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
              <Button size="icon" variant="outline">
                <Menu className="size-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              {/* Mobile Nav */}
              {navItems.map(({ label, href, icon: Icon }) => (
                <DropdownMenuItem asChild key={label}>
                  <Link href={href} className="flex gap-2 items-center">
                    <Icon className="w-5 h-5" /> {label}
                  </Link>
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              {/* Mobile User/Auth */}
              {user ? (
                <>
                  <DropdownMenuItem
                    onClick={async () => {
                      await supabase.auth.signOut();
                      window.location.href = "/auth/login";
                    }}
                    aria-label="Logout"
                    variant="destructive"
                  >
                    <LogOut /> Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/auth/login"
                      className="flex gap-2 items-center"
                    >
                      <LogIn className="w-5 h-5" /> Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/auth/signup"
                      className="flex gap-2 items-center"
                    >
                      <UserPlus className="w-5 h-5" /> Register
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}
