"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function BookmarkButton({ startupId }: { startupId: string }) {
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <Button
      variant={bookmarked ? "default" : "outline"}
      onClick={() => setBookmarked((b) => !b)}
      aria-pressed={bookmarked}
      className="flex items-center gap-2"
    >
      <span>{bookmarked ? "Bookmarked" : "Bookmark"}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={bookmarked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-5-7 5V5z"
        />
      </svg>
    </Button>
  );
} 