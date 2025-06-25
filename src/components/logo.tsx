"use client";

import { Rocket } from "lucide-react";
import * as React from "react";

export default function Logo({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <span className={`flex gap-2 items-center ${className}`}>
      <Rocket className="text-secondary" width={size} height={size} />
      <span className="text-2xl font-bold tracking-tight text-secondary">
        Pitch Arena
      </span>
    </span>
  );
} 