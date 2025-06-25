import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="mt-16 w-full">
      <Separator className="mb-4" />
      <div className="py-4 text-sm text-center text-muted-foreground">
        © {new Date().getFullYear()} Pitch Arena. All rights reserved.
      </div>
    </footer>
  );
}
