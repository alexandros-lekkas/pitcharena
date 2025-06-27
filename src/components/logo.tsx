import { SwordsIcon } from "lucide-react";

export function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <SwordsIcon className="text-secondary size-8" />
      <span className="text-2xl font-bold tracking-tight text-primary">
        PitchArena
      </span>
    </div>
  );
}
