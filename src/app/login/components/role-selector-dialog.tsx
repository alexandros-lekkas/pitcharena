"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface RoleSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RoleSelectorDialog({ open, onOpenChange }: RoleSelectorDialogProps) {
  function selectRole(role: "founder" | "investor") {
    localStorage.setItem("userRole", role);
    onOpenChange(false);
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <h2 className="mb-4 text-xl font-bold text-center">Are you a Founder or an Investor?</h2>
        <div className="flex gap-4">
          <button
            className="flex-1 p-6 text-lg font-semibold rounded-lg border-2 transition border-primary bg-primary/10 hover:bg-primary/20 text-primary"
            onClick={() => selectRole("founder")}
          >
            I'm a Founder
          </button>
          <button
            className="flex-1 p-6 text-lg font-semibold rounded-lg border-2 transition border-secondary bg-secondary/10 hover:bg-secondary/20 text-secondary"
            onClick={() => selectRole("investor")}
          >
            I'm an Investor
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 