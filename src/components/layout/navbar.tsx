"use client";

import Link from "next/link";

import {
  Home,
  LayoutDashboard,
  Plus,
  Rocket,
  LogIn,
  UserPlus,
  LogOut,
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

export default function Navbar() {
  const { user } = useAuth();
  
  return (
    <nav className="flex justify-between items-center px-4 md:px-8 py-4 w-full shadow-sm bg-primary">
      {/* Logo */}
      <Link href="/" className="flex gap-2 items-center">
        <Rocket className="w-7 h-7 text-secondary" />
        <span className="text-2xl font-bold tracking-tight text-secondary">
          Pitch Arena
        </span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-8 items-center font-medium text-primary-foreground">
        <Link href="/" className="flex gap-1 items-center hover:underline">
          <Home className="w-5 h-5" /> Home
        </Link>
        <Link
          href="/dashboard"
          className="flex gap-1 items-center hover:underline"
        >
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </Link>
        <Separator orientation="vertical" className="h-6 bg-secondary/40" />
        <Link
          href="/startup/list"
          className="flex gap-1 items-center hover:underline"
        >
          <Plus className="w-5 h-5 text-secondary" /> List Startup
        </Link>
      </div>

      {/* Desktop User/Auth */}
      <div className="hidden md:flex gap-3 items-center">
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
      <div className="md:hidden flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="w-7 h-7 text-secondary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/" className="flex gap-2 items-center">
                <Home className="w-5 h-5" /> Home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="flex gap-2 items-center">
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/startup/list" className="flex gap-2 items-center">
                <Plus className="w-5 h-5 text-secondary" /> List Startup
              </Link>
            </DropdownMenuItem>
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
