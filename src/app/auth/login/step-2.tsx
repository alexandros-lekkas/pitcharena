import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Step2({ onSelect, selectedRole }: { onSelect: (role: "founder" | "investor") => void, selectedRole: "founder" | "investor" }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Select your account type</CardTitle>
          <CardDescription>
            Are you a founder or an investor?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant={selectedRole === "founder" ? "default" : "outline"}
              className="flex-1 py-6 text-lg"
              onClick={() => onSelect("founder")}
            >
              I'm a Founder
            </Button>
            <Button
              variant={selectedRole === "investor" ? "default" : "outline"}
              className="flex-1 py-6 text-lg"
              onClick={() => onSelect("investor")}
            >
              I'm an Investor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 