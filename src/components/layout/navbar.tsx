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
} from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";

export default function Navbar() {
  const { user } = useAuth();
  
  return (
    <nav className="flex justify-between items-center px-8 py-4 w-full shadow-sm bg-primary">
      {/* Logo */}
      <Link href="/" className="flex gap-2 items-center">
        <Rocket className="w-7 h-7 text-secondary" />
        <span className="text-2xl font-bold tracking-tight text-secondary">
          Pitch Arena
        </span>
      </Link>

      {/* Nav */}
      <div className="flex gap-8 items-center font-medium text-primary-foreground">
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

      {/* User or Auth Buttons */}
      <div className="flex gap-3 items-center">
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
              >
                <LogIn className="w-5 h-5" /> Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                variant="default"
                className="flex gap-2 text-white bg-secondary hover:bg-secondary/90"
              >
                <UserPlus className="w-5 h-5" /> Register
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
